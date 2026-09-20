#!/usr/bin/env node

import http from 'node:http';

const PORT = Number(process.env.OUAGX_API_PORT || 4020);

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'OUAGx API',
      status: 'ok',
      providers: ['openrouter', 'openai', 'custom', 'ouagx-api'],
      endpoint: '/api/chat',
    }));
    return;
  }

  if (method === 'POST' && url === '/api/chat') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const provider = payload.provider || process.env.OUAGX_PROVIDER || 'openrouter';
        const model = payload.model || process.env.OUAGX_MODEL || 'openai/gpt-4.1-mini';
        const apiKey = payload.apiKey || process.env.OUAGX_API_KEY || '';
        const baseUrl = payload.baseUrl || process.env.OUAGX_BASE_URL || '';
        const messages = Array.isArray(payload.messages) ? payload.messages : [];

        if (!apiKey) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing API key. Set OUAGX_API_KEY or send apiKey in the request.' }));
          return;
        }

        const endpoint = provider === 'openai'
          ? 'https://api.openai.com/v1/chat/completions'
          : provider === 'custom' && baseUrl
            ? `${baseUrl.replace(/\/$/, '')}/chat/completions`
            : 'https://openrouter.ai/api/v1/chat/completions';

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
            model,
            messages: [
              { role: 'system', content: 'You are OUAGx: direct, precise, practical, and warm. Help users turn intent into useful action.' },
              ...messages,
            ],
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          res.writeHead(response.status || 500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: data?.error?.message || data?.message || 'Provider request failed.' }));
          return;
        }

        const answer = data.choices?.[0]?.message?.content || data.output_text || 'No response returned.';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result: answer, provider, model }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected server error.' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found.' }));
});

server.listen(PORT, () => {
  console.log(`OUAGx API listening on http://localhost:${PORT}`);
});
