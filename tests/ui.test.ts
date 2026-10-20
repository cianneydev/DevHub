import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-ui-${Date.now()}`);

describe('ui logic', () => {
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

  it('compteurs corrects', () => {
    snippetStore.add('s1', 'c');
    snippetStore.add('s2', 'c');
    noteStore.add('n1', 'n');
    expect(snippetStore.count()).toBe(2);
    expect(noteStore.count()).toBe(1);
  });

  it('suppression retire l\'élément', () => {
    snippetStore.add('r', 'c');
    const ok = snippetStore.remove('r');
    expect(ok).toBe(true);
    expect(snippetStore.count()).toBe(0);
  });
});