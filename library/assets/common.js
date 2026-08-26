import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY, LIBRARY_BASE_URL } from '../config.js';

export const isConfigured = () => !SUPABASE_URL.includes('YOUR_PROJECT') && !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE');
export const supabase = isConfigured() ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
export const baseUrl = LIBRARY_BASE_URL;

export const esc = (v='') => String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
export const money = v => v==null || v==='' ? '—' : new Intl.NumberFormat('en-BD',{style:'currency',currency:'BDT',maximumFractionDigits:0}).format(Number(v));
export const fmtDate = v => v ? new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(v+'T00:00:00Z')) : '—';
export const bookUrl = book => `${baseUrl}book.html?id=${encodeURIComponent(book.id)}`;
export const coverHtml = (book, cls='') => book.cover_url ? `<img class="${cls}" src="${esc(book.cover_url)}" alt="Cover of ${esc(book.title)}">` : `<div class="cover-fallback">${esc(book.title)}</div>`;
export function configWarning(el){ if(!isConfigured()) el.innerHTML='<div class="notice error">Supabase is not configured yet. Open <strong>config.js</strong> and add your Project URL and anon key.</div>'; }
