#!/usr/bin/env node

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const args = process.argv.slice(2);
const helpText = `
OUAGx Terminal

Usage:
  npm run terminal
  npm run terminal -- --provider openrouter
  npm run terminal -- --provider openai --model gpt-4.1-mini
  npm run terminal -- --provider gemini --model gemini-2.5-flash
  npm run terminal -- --provider custom --base-url https://your-url/v1
  npm run terminal -- --provider ouagx-api --api-url https://ouagx.com/api

Environment variables:
  OUAGX_API_KEY       API key for your model provider
  OUAGX_MODEL         Model name (provider default applies when omitted)
  OUAGX_PROVIDER      openrouter | openai | gemini | custom | ouagx-api
  OUAGX_BASE_URL      Base URL for custom OpenAI-compatible APIs
  OUAGX_API_URL       URL for the OUAGx API service (default: https://ouagx.com/api)

Notes:
  - Default provider is OpenRouter.
  - If no API key is set, the app asks for one in the terminal.
  - The OUAGx API route connects the CLI to the online OUAGx project API at https://ouagx.com/api.
`;

if (args.includes('--help') || args.includes('-h')) {
  console.log(helpText.trim());
  process.exit(0);
}

function parseArgs() {
  const values = { provider: process.env.OUAGX_PROVIDER || 'openrouter', model: process.env.OUAGX_MODEL || undefined, baseUrl: process.env.OUAGX_BASE_URL || undefined, apiKey: process.env.OUAGX_API_KEY || process.env.OPENAI_API_KEY || '', apiUrl: process.env.OUAGX_API_URL || 'https://ouagx.com/api' };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    const next = args[i + 1];

    if (arg === '--provider' && next) values.provider = next;
    if (arg === '--model' && next) values.model = next;
    if (arg === '--base-url' && next) values.baseUrl = next;
    if (arg === '--api-key' && next) values.apiKey = next;
    if (arg === '--api-url' && next) values.apiUrl = next;
    if (arg === '--openai') values.provider = 'openai';
    if (arg === '--custom') values.provider = 'custom';
    if (arg === '--ouagx-api') values.provider = 'ouagx-api';
  }

  return values;
}

function getDefaultModel(provider) {
  if (provider === 'openai') return 'gpt-4.1-mini';
  if (provider === 'gemini') return 'gemini-2.5-flash';
  if (provider === 'custom') return 'your-model-name';
  return 'openai/gpt-4.1-mini';
}

function getModelPresets(provider) {
  if (provider === 'openai') return ['gpt-4.1-mini', 'gpt-4.1', 'o4-mini'];
  if (provider === 'gemini') return ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];
  if (provider === 'openrouter') return ['openai/gpt-4.1-mini', 'google/gemini-2.5-flash', 'anthropic/claude-sonnet-4'];
  return [];
}

function getEndpoint(provider, baseUrl) {
  if (provider === 'custom') {
    if (!baseUrl) throw new Error('Custom provider needs --base-url or OUAGX_BASE_URL.');
    return baseUrl.replace(/\/$/, '') + '/chat/completions';
  }
  if (provider === 'openai') return 'https://api.openai.com/v1/chat/completions';
  if (provider === 'gemini') return 'https://generativelanguage.googleapis.com/v1beta/models';
  return 'https://openrouter.ai/api/v1/chat/completions';
}

async function requestModel({ provider, model, baseUrl, apiKey, apiUrl }, messages) {
  if (provider === 'ouagx-api') {
    const endpoint = `${(apiUrl || 'https://ouagx.com/api').replace(/\/$/, '')}/chat`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: process.env.OUAGX_PROVIDER && process.env.OUAGX_PROVIDER !== 'ouagx-api' ? process.env.OUAGX_PROVIDER : 'openrouter',
        model: model || getDefaultModel(process.env.OUAGX_PROVIDER && process.env.OUAGX_PROVIDER !== 'ouagx-api' ? process.env.OUAGX_PROVIDER : 'openrouter'),
        apiKey: apiKey || process.env.OUAGX_API_KEY || '',
        baseUrl: baseUrl || process.env.OUAGX_BASE_URL || '',
        messages,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || 'OUAGx API request failed.');
    }

    return data.result || data.answer || 'No response returned.';
  }

  const endpoint = getEndpoint(provider, baseUrl);
  const finalModel = model || getDefaultModel(provider);

  if (!apiKey) {
    throw new Error('No API key found. Set OUAGX_API_KEY or pass --api-key.');
  }

  if (provider === 'gemini') {
    const response = await fetch(`${endpoint}/${finalModel}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are OUAGx: direct, precise, practical, and warm. Help users turn intent into useful action.' }] },
        contents: messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Gemini request failed.');
    return data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('') || 'No response returned.';
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://ouagx.com';
    headers['X-Title'] = 'OUAGx';
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: finalModel,
      messages: [
        { role: 'system', content: 'You are OUAGx: direct, precise, practical, and warm. Help users turn intent into useful action.' },
        ...messages,
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || data?.message || 'Model request failed.';
    throw new Error(message);
  }

  return data.choices?.[0]?.message?.content || 'No response returned.';
}

function normalizeProvider(input) {
  const value = String(input || '').trim().toLowerCase();
  if (!value) return 'openrouter';
  if (['1', 'openrouter', 'open-router'].includes(value)) return 'openrouter';
  if (['2', 'openai'].includes(value)) return 'openai';
  if (['3', 'gemini', 'google'].includes(value)) return 'gemini';
  if (['4', 'custom'].includes(value)) return 'custom';
  if (['5', 'ouagx-api', 'ouagxapi', 'local-api'].includes(value)) return 'ouagx-api';
  return value;
}

async function configureProvider(options, rl) {
  if (process.argv.includes('--provider') || process.argv.includes('--model') || process.argv.includes('--base-url') || process.argv.includes('--api-key') || process.argv.includes('--api-url')) {
    return options;
  }

  console.log('Choose your AI provider:');
  console.log('  1) OpenRouter');
  console.log('  2) OpenAI');
  console.log('  3) Google Gemini');
  console.log('  4) Custom API');
  console.log('  5) OUAGx API (local project API)');

  const choice = await rl.question('Provider number or name [1]: ');
  const provider = normalizeProvider(choice || '1');
  options.provider = provider;

  if (!options.model) {
    options.model = getDefaultModel(provider);
  }

  const presets = getModelPresets(provider);
  if (presets.length) console.log(`Available models: ${presets.join(', ')}`);

  if (provider === 'custom') {
    const baseUrl = await rl.question('Custom API base URL: ');
    options.baseUrl = baseUrl.trim() || options.baseUrl;
  }

  if (provider === 'ouagx-api') {
    const apiUrl = await rl.question('OUAGx API URL [https://ouagx.com/api]: ');
    options.apiUrl = (apiUrl || 'https://ouagx.com/api').trim();
    options.model = (await rl.question(`Model [${options.model}]: `)).trim() || options.model;
    options.apiKey = (await rl.question('API key for the backend provider: ')).trim();
    return options;
  }

  const modelInput = await rl.question(`Model [${options.model}]: `);
  options.model = modelInput.trim() || options.model;

  const apiKey = await rl.question('Enter your API key: ');
  options.apiKey = apiKey.trim();

  return options;
}

async function main() {
  const options = parseArgs();
  const rl = readline.createInterface({ input, output });

  const configured = await configureProvider(options, rl);

  console.log('\nOUAGx terminal assistant');
  console.log(`Provider: ${configured.provider}`);
  console.log(`Model: ${configured.model || getDefaultModel(configured.provider)}`);
  console.log('Type "exit" to quit.');
  console.log('');

  if (!configured.apiKey) {
    const apiKey = await rl.question('Enter your API key: ');
    configured.apiKey = apiKey.trim();
  }

  const history = [];

  while (true) {
    const prompt = await rl.question('OUAGx> ');

    if (prompt.trim().toLowerCase() === 'exit') {
      console.log('Goodbye.');
      rl.close();
      process.exit(0);
    }

    try {
      history.push({ role: 'user', content: prompt });
      const reply = await requestModel(configured, history);
      console.log('\nOUAGx:', reply, '\n');
      history.push({ role: 'assistant', content: reply });
    } catch (error) {
      console.error('\nError:', error instanceof Error ? error.message : 'Unknown error', '\n');
    }
  }
}

main().catch((error) => {
  console.error('Fatal error:', error instanceof Error ? error.message : error);
  process.exit(1);
});
