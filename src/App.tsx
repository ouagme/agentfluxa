import { ArrowUp, BarChart3, Bot, Check, ChevronDown, Copy, ExternalLink, Globe2, KeyRound, LayoutDashboard, Link2, Mail, Menu, Plus, Save, Settings2, Sparkles, Users, X } from 'lucide-react';
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import coreImage from './assets/agentfluxa-core.png';
import { adminUser, demoUsers, nutritionPlans, progressData, workouts, workoutHistory } from './data/mockData';
import { AuthState, User } from './types';

type ProviderId = 'openai' | 'gemini' | 'openrouter' | 'custom';
type Message = { role: 'user' | 'assistant'; content: string };
type Settings = Record<ProviderId, { key: string; model: string; endpoint?: string }>;

const providers: Record<ProviderId, { name: string; tag: string; defaultModel: string }> = {
  openai: { name: 'OpenAI', tag: 'Responses API', defaultModel: 'gpt-4.1-mini' },
  gemini: { name: 'Google Gemini', tag: 'Google AI', defaultModel: 'gemini-2.0-flash' },
  openrouter: { name: 'OpenRouter', tag: 'Multi-model', defaultModel: 'openai/gpt-4.1-mini' },
  custom: { name: 'Custom LLM', tag: 'OpenAI compatible', defaultModel: 'your-model-name' },
};

const defaultSettings: Settings = Object.fromEntries(Object.entries(providers).map(([id, provider]) => [id, { key: '', model: provider.defaultModel }])) as Settings;
const starterMessages: Message[] = [{ role: 'assistant', content: 'I am AgentFLUXA. Connect a provider, then bring me the problem you want to move forward.' }];

function getSettings(): Settings {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem('agentfluxa-connections') || '{}') }; } catch { return defaultSettings; }
}

async function runModel(provider: ProviderId, config: Settings[ProviderId], messages: Message[]) {
  if (!config.key.trim()) throw new Error(`Add a ${providers[provider].name} API key in Connections first.`);
  if (provider === 'openai') {
    const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.key}` }, body: JSON.stringify({ model: config.model, instructions: 'You are AgentFLUXA: direct, precise, practical, and warm. Help users turn intent into useful action.', input: messages.map(message => ({ role: message.role, content: [{ type: 'input_text', text: message.content }] })) }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'OpenAI request failed.'); return data.output_text || data.output?.flatMap((item: { content?: { text?: string }[] }) => item.content || []).map((part: { text?: string }) => part.text || '').join('') || 'No text response returned.';
  }
  if (provider === 'gemini') {
    const contents = messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] }));
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.key)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: 'You are AgentFLUXA: direct, precise, practical, and warm.' }] }, contents }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'Gemini request failed.'); return data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('') || 'No text response returned.';
  }
  const endpoint = provider === 'openrouter' ? 'https://openrouter.ai/api/v1/chat/completions' : config.endpoint?.replace(/\/$/, '') + '/chat/completions';
  if (!endpoint || endpoint.startsWith('undefined')) throw new Error('Add your custom LLM base URL in Connections.');
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.key}`, ...(provider === 'openrouter' ? { 'HTTP-Referer': window.location.origin, 'X-Title': 'AgentFLUXA' } : {}) }, body: JSON.stringify({ model: config.model, messages: [{ role: 'system', content: 'You are AgentFLUXA: direct, precise, practical, and warm. Help users turn intent into useful action.' }, ...messages] }) });
  const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'Model request failed.'); return data.choices?.[0]?.message?.content || 'No text response returned.';
}

function ChatPage() {
  const [provider, setProvider] = useState<ProviderId>('openai');
  const [settings, setSettings] = useState<Settings>(getSettings);
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [prompt, setPrompt] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const composer = useRef<HTMLTextAreaElement>(null);
  const threadEnd = useRef<HTMLDivElement>(null);
  const active = providers[provider];
  const ready = Boolean(settings[provider].key);

  useEffect(() => { localStorage.setItem('agentfluxa-connections', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { threadEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [messages, isSending]);
  const modelLabel = useMemo(() => `${active.name} · ${settings[provider].model}`, [active.name, provider, settings]);
  const updateSetting = (field: 'key' | 'model' | 'endpoint', value: string) => setSettings(current => ({ ...current, [provider]: { ...current[provider], [field]: value } }));
  const resetChat = () => { setMessages(starterMessages); setPrompt(''); composer.current?.focus(); };
  const copyResponse = async (value: string) => { await navigator.clipboard?.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); };
  const send = async (event?: FormEvent) => {
    event?.preventDefault(); const text = prompt.trim(); if (!text || isSending) return;
    if (!ready) { setSettingsOpen(true); return; }
    const next = [...messages, { role: 'user' as const, content: text }]; setMessages(next); setPrompt(''); setIsSending(true);
    try { const answer = await runModel(provider, settings[provider], next); setMessages(current => [...current, { role: 'assistant', content: answer }]); }
    catch (error) { setMessages(current => [...current, { role: 'assistant', content: `Connection note: ${error instanceof Error ? error.message : 'The request could not be completed.'}` }]); }
    finally { setIsSending(false); }
  };
  return <main className="chat-app">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Bot size={18} /></div><span>AGENT<span>FLUXA</span></span></div>
      <button className="new-chat" onClick={resetChat}><Plus size={18} /> New conversation</button>
      <div className="side-label">Today</div>
      <button className="history active"><span>Build a research plan</span><ChevronDown size={15} /></button>
      <button className="history"><span>Product launch angles</span></button>
      <button className="history"><span>Explain multi-agent systems</span></button>
      <div className="sidebar-bottom"><button className="connection-state" onClick={() => setSettingsOpen(true)}><span className={ready ? 'live-dot' : 'idle-dot'} /><span>{ready ? `${active.name} connected` : 'Connect a provider'}</span><Settings2 size={16} /></button><p>AgentFLUXA v1.0</p></div>
    </aside>
    <section className="conversation">
      <header className="chat-header"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><Link to="/" className="model-picker"><span className="model-orb"><Sparkles size={14} /></span><div><strong>AgentFLUXA</strong><small>{modelLabel}</small></div><ChevronDown size={16} /></Link><button className="header-control" onClick={() => setSettingsOpen(true)}><KeyRound size={17} /> <span>Connections</span></button></header>
      <div className="thread">{messages.map((message, index) => <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
        {message.role === 'assistant' && <img src={coreImage} alt="" className="message-avatar" />}
        <div className="message-body"><div className="message-name">{message.role === 'assistant' ? 'AGENTFLUXA' : 'YOU'}</div><p>{message.content}</p>{message.role === 'assistant' && index > 0 && <button className="copy-answer" onClick={() => copyResponse(message.content)}>{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}</button>}</div>
      </article>)}{isSending && <article className="message assistant"><img src={coreImage} alt="" className="message-avatar" /><div className="typing"><i /><i /><i /></div></article>}<div ref={threadEnd} /></div>
      <div className="composer-zone"><div className="suggestions"><button onClick={() => setPrompt('Help me turn a rough idea into a focused plan.')}>Make a plan</button><button onClick={() => setPrompt('What should I focus on today?')}>Find focus</button><button onClick={() => setPrompt('Challenge my assumptions about this idea: ')}>Challenge an idea</button></div><form className="composer" onSubmit={send}><textarea ref={composer} value={prompt} onChange={event => setPrompt(event.target.value)} placeholder={ready ? 'Message AgentFLUXA...' : 'Connect a model to begin...'} rows={1} /><button className="send-button" aria-label="Send message" disabled={!prompt.trim() || isSending}><ArrowUp size={19} /></button></form><p className="privacy-note"><Globe2 size={12} /> Your provider key stays in this browser. Model requests go directly to the selected provider.</p></div>
    </section>
    {menuOpen && <div className="mobile-drawer"><button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button><div className="brand"><div className="brand-mark"><Bot size={18} /></div><span>AGENT<span>FLUXA</span></span></div><button className="new-chat" onClick={() => { resetChat(); setMenuOpen(false); }}><Plus size={18} /> New conversation</button><button className="connection-state" onClick={() => { setSettingsOpen(true); setMenuOpen(false); }}><span className={ready ? 'live-dot' : 'idle-dot'} /><span>{ready ? `${active.name} connected` : 'Connect a provider'}</span></button></div>}
    {settingsOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSettingsOpen(false)}><section className="settings-modal" role="dialog" aria-modal="true" aria-label="Provider connections" onMouseDown={event => event.stopPropagation()}><div className="modal-title"><div><p>MODEL ROUTING</p><h2>Connections</h2></div><button onClick={() => setSettingsOpen(false)} aria-label="Close connections"><X size={19} /></button></div><div className="provider-tabs">{(Object.keys(providers) as ProviderId[]).map(id => <button className={id === provider ? 'selected' : ''} onClick={() => setProvider(id)} key={id}>{providers[id].name}</button>)}</div><div className="setting-fields"><label>API key<input type="password" value={settings[provider].key} onChange={event => updateSetting('key', event.target.value)} placeholder={`Paste ${active.name} API key`} /></label><label>Model<input value={settings[provider].model} onChange={event => updateSetting('model', event.target.value)} placeholder={active.defaultModel} /></label>{provider === 'custom' && <label>Base URL<input value={settings.custom.endpoint || ''} onChange={event => updateSetting('endpoint', event.target.value)} placeholder="https://your-llm.example/v1" /></label>}<p className="connection-help">{provider === 'custom' ? 'Uses the standard /chat/completions route.' : `Requests are sent directly to ${active.name}.`}</p></div><div className="modal-actions"><button className="text-button" onClick={() => updateSetting('key', '')}>Clear key</button><button className="save-button" onClick={() => setSettingsOpen(false)}>Save connection</button></div></section></div>}
  </main>;
}

function LinkBioPage() {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return <main className="bio-page">
    <div className="bio-grid" aria-hidden="true" />
    <nav className="bio-nav"><span className="bio-wordmark">AGENT<span>FLUXA</span></span><button className="bio-copy" onClick={copyLink} aria-label="Copy profile link">{copied ? <Check size={18} /> : <Copy size={18} />}</button></nav>
    <section className="bio-profile">
      <div className="bio-portrait"><img src={coreImage} alt="Abstract AgentFLUXA intelligence core" /><i /></div>
      <p className="bio-eyebrow"><Sparkles size={13} /> Autonomous intelligence</p>
      <h1>AgentFLUXA</h1><p className="bio-handle">@agentfluxa</p>
      <p className="bio-intro">An AI model that turns a thread of intent into focused, useful action.</p>
      <div className="bio-meta"><span>MODEL v1.0</span><i /><span>ONLINE</span><i /><span>OPEN RESEARCH</span></div>
    </section>
    <section className="bio-links" aria-label="AgentFLUXA links">
      <Link to="/chat" className="bio-link bio-primary"><span>01</span><div><strong>Chat with AgentFLUXA</strong><small>Open the multi-provider AI workspace.</small></div><ExternalLink size={19} /></Link>
      <Link to="/about" className="bio-link"><span>02</span><div><strong>Meet AgentFLUXA</strong><small>The autonomous AI model built for real momentum.</small></div><ChevronDown size={19} /></Link>
      <a href="mailto:hello@agentfluxa.com" className="bio-link"><span>03</span><div><strong>Collaborate with us</strong><small>hello@agentfluxa.com</small></div><Mail size={19} /></a>
    </section>
    <section className="bio-signal" id="about"><p>BUILT IN PUBLIC</p><strong>11.8K</strong><span>people following the signal</span></section>
    <div className="bio-social"><a href="https://x.com/Agentfluxacom" target="_blank" rel="noreferrer">X / @Agentfluxacom <ExternalLink size={13} /></a></div>
    <footer className="bio-footer">AGENTFLUXA AI MODEL <span>///</span> 2026 <Link to="/admin">ADMIN</Link></footer>
  </main>;
}

function AboutPage() {
  return <main className="about-page">
    <nav className="about-nav"><Link to="/" className="bio-wordmark">AGENT<span>FLUXA</span></Link><div><a href="https://x.com/Agentfluxacom" target="_blank" rel="noreferrer">@Agentfluxacom</a><Link to="/chat">Open chat</Link></div></nav>
    <section className="about-hero"><div><p className="about-kicker"><Sparkles size={14} /> ABOUT AGENTFLUXA</p><h1>Intelligence that stays close to the work.</h1><p>AgentFLUXA is an adaptable AI layer for research, planning, and decision-making. It routes your work through the model provider you choose, while keeping every conversation grounded in action.</p><div className="about-actions"><Link to="/chat" className="about-primary">Start a conversation <ArrowUp size={16} /></Link><a href="mailto:hello@agentfluxa.com" className="about-secondary">hello@agentfluxa.com</a></div></div><div className="about-visual"><img src={coreImage} alt="AgentFLUXA intelligence core" /><span>AGENTFLUXA<br />MODEL v1.0</span></div></section>
    <section className="about-principles"><article><span>01</span><h2>Intent first</h2><p>Start with the question that matters. AgentFLUXA helps shape it into a useful next move.</p></article><article><span>02</span><h2>Provider flexible</h2><p>Use OpenAI, Gemini, OpenRouter, or an OpenAI-compatible model through one focused workspace.</p></article><article><span>03</span><h2>Built in public</h2><p>Research notes, product changes, and conversations stay open to the people building alongside us.</p></article></section>
  </main>;
}

function AdminPage() {
  const [authorized, setAuthorized] = useState(() => sessionStorage.getItem('agentfluxa-admin') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<'overview' | 'content' | 'models'>('overview');
  const [saved, setSaved] = useState(false);
  const [links, setLinks] = useState([{ title: 'Chat with AgentFLUXA', active: true }, { title: 'Meet AgentFLUXA', active: true }, { title: 'Collaborate with us', active: true }]);
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1400); };
  const signIn = (event: FormEvent) => {
    event.preventDefault();
    if (password === '254637') { sessionStorage.setItem('agentfluxa-admin', 'true'); setAuthorized(true); setAuthError(false); return; }
    setAuthError(true);
  };
  if (!authorized) return <main className="admin-login"><section><Link to="/" className="brand"><div className="brand-mark"><Bot size={18} /></div><span>AGENT<span>FLUXA</span></span></Link><p className="admin-login-kicker">RESTRICTED AREA</p><h1>Admin console</h1><p>Enter the access password to manage the AgentFLUXA public experience.</p><form onSubmit={signIn}><label>Password<input autoFocus type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter password" /></label>{authError && <span className="auth-error">That password is not correct.</span>}<button type="submit">Continue <ArrowUp size={16} /></button></form><Link to="/" className="admin-login-back">Return to public page</Link></section></main>;
  return <main className="admin-page"><aside className="admin-sidebar"><Link to="/" className="brand"><div className="brand-mark"><Bot size={18} /></div><span>AGENT<span>FLUXA</span></span></Link><p>ADMIN CONSOLE</p><nav><button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}><LayoutDashboard size={17} /> Overview</button><button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}><Link2 size={17} /> Bio content</button><button className={tab === 'models' ? 'active' : ''} onClick={() => setTab('models')}><Settings2 size={17} /> Model routing</button></nav><Link to="/" className="admin-back">Back to public page</Link></aside><section className="admin-workspace"><header><div><p>AGENTFLUXA / ADMIN</p><h1>{tab === 'overview' ? 'Good morning, Fluxa team.' : tab === 'content' ? 'Bio page content' : 'Model routing'}</h1></div><button className="admin-save" onClick={save}>{saved ? <Check size={16} /> : <Save size={16} />}{saved ? 'Saved' : 'Save changes'}</button></header>{tab === 'overview' && <><section className="metrics"><article><span><Users size={17} /></span><p>Profile visits</p><strong>11,842</strong><small>+18.4% this week</small></article><article><span><BarChart3 size={17} /></span><p>Chat sessions</p><strong>2,614</strong><small>+12.1% this week</small></article><article><span><Link2 size={17} /></span><p>Bio link clicks</p><strong>4,907</strong><small>41.4% conversion</small></article></section><section className="admin-panel"><div className="panel-heading"><div><p>LIVE SIGNAL</p><h2>Recent activity</h2></div><span>Last 24 hours</span></div><div className="activity"><div><i /> <span>OpenAI connection saved</span><small>9 min ago</small></div><div><i /> <span>Chat launch link opened</span><small>18 min ago</small></div><div><i /> <span>New collaboration email click</span><small>42 min ago</small></div><div><i /> <span>About page viewed</span><small>1 hr ago</small></div></div></section></>}{tab === 'content' && <section className="admin-panel editor"><div className="panel-heading"><div><p>PUBLIC PROFILE</p><h2>Profile and links</h2></div></div><label>Display name<input defaultValue="AgentFLUXA" /></label><label>Profile line<textarea defaultValue="An AI model that turns a thread of intent into focused, useful action." /></label><div className="link-admin-list">{links.map((link, index) => <div key={link.title}><span>0{index + 1}</span><strong>{link.title}</strong><button onClick={() => setLinks(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, active: !item.active } : item))} className={link.active ? 'toggle on' : 'toggle'} aria-label={`Toggle ${link.title}`}><i /></button></div>)}</div></section>}{tab === 'models' && <section className="admin-panel model-admin"><div className="panel-heading"><div><p>MODEL AVAILABILITY</p><h2>Enabled providers</h2></div></div>{Object.entries(providers).map(([id, item]) => <div className="provider-admin" key={id}><div><strong>{item.name}</strong><span>{item.tag} · default {item.defaultModel}</span></div><button className="toggle on" aria-label={`Toggle ${item.name}`}><i /></button></div>)}<p className="admin-note">Provider keys are intentionally managed in each browser session and are never stored in this dashboard.</p></section>}</section></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<LinkBioPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/chat" element={<ChatPage />} /><Route path="/admin" element={<AdminPage />} /><Route path="*" element={<LinkBioPage />} /></Routes>;
}

const defaultAuthState: AuthState = { user: demoUsers[1], isAuthenticated: true, isAdmin: false };
export const AppContext = React.createContext<{ authState: AuthState; setAuthState: React.Dispatch<React.SetStateAction<AuthState>>; users: User[]; workouts: typeof workouts; nutritionPlans: typeof nutritionPlans; progressData: typeof progressData; workoutHistory: typeof workoutHistory; allUsers: User[]; adminUser: User; }>({ authState: defaultAuthState, setAuthState: () => undefined, users: demoUsers, workouts, nutritionPlans, progressData, workoutHistory, allUsers: demoUsers, adminUser });
