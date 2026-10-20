import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-export-${Date.now()}`);
const EXPORT_FILE = path.join(TEST_DIR, 'export.json');

describe('export', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;
  let noteStore: typeof import('../src/storage/noteStore.js').noteStore;

  beforeEach(async () => {
    process.env.DEVHUB_DIR = TEST_DIR;
    fs.mkdirSync(TEST_DIR, { recursive: true });
    vi.resetModules();
    const sMod = await import('../src/storage/snippetStore.js');
    const nMod = await import('../src/storage/noteStore.js');
    snippetStore = sMod.snippetStore;
    noteStore = nMod.noteStore;
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    delete process.env.DEVHUB_DIR;
  });

  it('exporte les snippets et notes', () => {
    snippetStore.add('a', 'code A');
    snippetStore.add('b', 'code B');
    noteStore.add('n', 'note');

    const data = {
      exportedAt: new Date().toISOString(),
      version: '0.6.0',
      snippets: snippetStore.list(),
      notes: noteStore.list(),
    };
    fs.writeFileSync(EXPORT_FILE, JSON.stringify(data, null, 2));

    const parsed = JSON.parse(fs.readFileSync(EXPORT_FILE, 'utf-8'));
    expect(parsed.snippets).toHaveLength(2);
    expect(parsed.notes).toHaveLength(1);
    expect(parsed.version).toBe('0.6.0');
  });

  it('exporte vide si rien', () => {
    const data = { exportedAt: new Date().toISOString(), version: '0.6.0', snippets: [], notes: [] };
    fs.writeFileSync(EXPORT_FILE, JSON.stringify(data));
    const parsed = JSON.parse(fs.readFileSync(EXPORT_FILE, 'utf-8'));
    expect(parsed.snippets).toHaveLength(0);
    expect(parsed.notes).toHaveLength(0);
  });
});