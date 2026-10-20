import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-import-${Date.now()}`);
const IMPORT_FILE = path.join(TEST_DIR, 'import.json');

describe('import', () => {
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

  it('importe des snippets', () => {
    const data = { snippets: [{ name: 'a', code: 'A' }, { name: 'b', code: 'B' }], notes: [] };
    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data));
    for (const s of JSON.parse(fs.readFileSync(IMPORT_FILE, 'utf-8')).snippets) {
      snippetStore.add(s.name, s.code);
    }
    expect(snippetStore.count()).toBe(2);
  });

  it('importe des notes', () => {
    const data = { snippets: [], notes: [{ title: 'n1', content: 'C1' }, { title: 'n2', content: 'C2' }] };
    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data));
    for (const n of JSON.parse(fs.readFileSync(IMPORT_FILE, 'utf-8')).notes) {
      noteStore.add(n.title, n.content);
    }
    expect(noteStore.count()).toBe(2);
  });

  it('ignore les doublons', () => {
    snippetStore.add('dup', 'original');
    const data = { snippets: [{ name: 'dup', code: 'nouveau' }], notes: [] };
    fs.writeFileSync(IMPORT_FILE, JSON.stringify(data));
    for (const s of JSON.parse(fs.readFileSync(IMPORT_FILE, 'utf-8')).snippets) {
      snippetStore.add(s.name, s.code);
    }
    expect(snippetStore.count()).toBe(1);
    expect(snippetStore.get('dup')?.code).toBe('original');
  });
});