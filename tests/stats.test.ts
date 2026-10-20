import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-stats-${Date.now()}`);

describe('stats', () => {
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

  it('compte 0 snippet et 0 note au départ', () => {
    expect(snippetStore.count()).toBe(0);
    expect(noteStore.count()).toBe(0);
  });

  it('compte correctement les snippets', () => {
    snippetStore.add('s1', 'code 1');
    snippetStore.add('s2', 'code 2');
    expect(snippetStore.count()).toBe(2);
  });

  it('compte correctement les notes', () => {
    noteStore.add('n1', 'contenu 1');
    noteStore.add('n2', 'contenu 2');
    noteStore.add('n3', 'contenu 3');
    expect(noteStore.count()).toBe(3);
  });

  it('compte snippets et notes séparément', () => {
    snippetStore.add('s1', 'code');
    noteStore.add('n1', 'note');
    expect(snippetStore.count()).toBe(1);
    expect(noteStore.count()).toBe(1);
  });
});