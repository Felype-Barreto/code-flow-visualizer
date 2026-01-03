#!/usr/bin/env node
/**
 * Usage: set VERCEL_TOKEN and VERCEL_PROJECT (name) in env or tmp/.env
 * Then run: node scripts/vercel_apply_envs.js
 * The script reads values from process.env for the keys below and creates/updates them in the project.
 */
import fs from 'fs';
import path from 'path';
// use global fetch available in Node 18+
import dotenv from 'dotenv';

// Load local env files (not committed). Priority: tmp/.env overrides the others.
// This lets us keep app secrets in .env.production while only adding Vercel auth in tmp/.env.
dotenv.config({ path: './.env.production' });
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });
// NOTE: dotenv does NOT override existing process.env values unless override=true.
// We want tmp/.env to be the highest priority source.
dotenv.config({ path: './tmp/.env', override: true });

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
// Accept either project name or project id.
const PROJECT = process.env.VERCEL_PROJECT || process.env.VERCEL_PROJECT_ID;
// Optional: team/owner scope. Vercel APIs generally accept teamId.
const TEAM = process.env.VERCEL_TEAM || process.env.VERCEL_TEAM_ID; // optional

if (!VERCEL_TOKEN || !PROJECT) {
  console.error('Set VERCEL_TOKEN and VERCEL_PROJECT (or VERCEL_PROJECT_ID) in env or tmp/.env');
  process.exit(1);
}

const API = 'https://api.vercel.com';

async function resolveTeamId(token, teamValue) {
  if (!teamValue) return null;
  const raw = String(teamValue).trim();
  if (!raw) return null;
  // If it already looks like a Vercel teamId, use it as-is.
  if (/^team_[a-zA-Z0-9]+$/.test(raw)) return raw;

  try {
    const res = await fetch(`${API}/v1/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return raw;
    const data = await res.json();
    const teams = Array.isArray(data?.teams) ? data.teams : [];
    const match = teams.find(t => t?.slug === raw || t?.name === raw || t?.id === raw);
    return match?.id || raw;
  } catch {
    return raw;
  }
}

const envKeys = [
  'DATABASE_URL',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_PRO_MONTHLY_USD',
  'STRIPE_PRICE_PRO_ANNUAL_USD',
  'STRIPE_PRICE_PRO_MONTHLY_BRL',
  'STRIPE_PRICE_PRO_ANNUAL_BRL',
  'STRIPE_PRICE_BATTLE_PASS',
  'PUBLIC_BASE_URL'
];

let RESOLVED_TEAM_ID = null;

async function api(pathSuffix, opts = {}) {
  const baseHeaders = { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' };

  const makeUrl = (useTeam) => {
    const teamPart = useTeam && RESOLVED_TEAM_ID ? `?teamId=${encodeURIComponent(RESOLVED_TEAM_ID)}` : '';
    return API + pathSuffix + teamPart;
  };

  // First attempt: include teamId if we have a real one.
  let res = await fetch(makeUrl(true), Object.assign({ headers: baseHeaders }, opts));

  // If scope is wrong (common when users paste an owner/scope slug), retry without teamId.
  if (!res.ok && RESOLVED_TEAM_ID && (res.status === 404 || res.status === 403)) {
    res = await fetch(makeUrl(false), Object.assign({ headers: baseHeaders }, opts));
  }

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Vercel API ${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

async function getProject(){
  try {
    return await api(`/v9/projects/${encodeURIComponent(PROJECT)}`);
  } catch (err) {
    // Fallback: list projects and match by id or name.
    try {
      const list = await api(`/v9/projects?limit=100`);
      const projects = Array.isArray(list?.projects) ? list.projects : [];
      const match = projects.find(p => p?.id === PROJECT || p?.name === PROJECT);
      if (match) return match;
    } catch {
      // ignore; throw original
    }
    throw err;
  }
}

async function listEnv(projectId){
  return api(`/v2/projects/${projectId}/env`);
}

async function removeEnv(projectId, envId){
  return api(`/v2/projects/${projectId}/env/${envId}`, { method: 'DELETE' });
}

async function createEnv(projectId, key, value){
  const body = { key, value: String(value), target: ['production','preview'], type: 'encrypted' };
  return api(`/v2/projects/${projectId}/env`, { method: 'POST', body: JSON.stringify(body) });
}

async function main(){
  const maybeTeamId = await resolveTeamId(VERCEL_TOKEN, TEAM);
  // Only use it if it looks like an actual Vercel team id.
  RESOLVED_TEAM_ID = /^team_[a-zA-Z0-9]+$/.test(String(maybeTeamId || '')) ? String(maybeTeamId) : null;
  const proj = await getProject();
  const projectId = proj.id || proj.uid || proj.projectId || proj.name;
  console.log('Project resolved:', proj.name, projectId);

  const existing = await listEnv(projectId);
  const byKey = new Map((existing.envs || existing).map(e=>[e.key,e]));

  for (const k of envKeys){
    const v = process.env[k];
    if (typeof v === 'undefined') {
      console.log('Skipping', k, '- not set in environment');
      continue;
    }
    if (byKey.has(k)){
      const e = byKey.get(k);
      console.log('Updating', k, ' (deleting old id', e.uid || e.id || e.key, ')');
      try { await removeEnv(projectId, e.uid || e.id); } catch(err){ console.warn('delete failed, continuing', err.message); }
    }
    console.log('Creating', k);
    await createEnv(projectId, k, v);
    console.log('Created', k);
  }

  console.log('All done. Please redeploy the project from Vercel dashboard or via CLI to pick up new envs.');
}

main().catch(err=>{ console.error('ERROR', err && (err.stack||err.message||err)); process.exit(2); });
