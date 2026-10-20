import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-snippet-${Date.now()}`);

describe('snippetStore', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;

  beforeEach(async () => {
    process.env.DEVHUB_DIR = TEST_DIR;
    fs.mkdirSync(TEST_DIR, { recursive: true });
    vi.resetModules();
    const mod = await import('../src/storage/snippetStore.js');
    snippetStore = mod.snippetStore;
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    delete process.env.DEVHUB_DIR;
  });

  it('démarre avec 0 snippet', () => {
    expect(snippetStore.count()).toBe(0);
  });

  it('ajoute un snippet', () => {
    const result = snippetStore.add('test-hello', "console.log('hi')");
    expect(result).toBe(true);
    expect(snippetStore.count()).toBe(1);
  });

  it('refuse les doublons', () => {
    snippetStore.add('test-dup', 'code A');
    const result = snippetStore.add('test-dup', 'code B');
    expect(result).toBe(false);
    expect(snippetStore.count()).toBe(1);
  });

  it('liste les snippets ajoutés', () => {
    snippetStore.add('test-list-a', 'code A');
    snippetStore.add('test-list-b', 'code B');
    const list = snippetStore.list();
    expect(list.length).toBe(2);
    expect(list[0].name).toBe('test-list-a');
    expect(list[1].name).toBe('test-list-b');
  });

  it('supprime un snippet existant', () => {
    snippetStore.add('test-remove', 'code');
    const result = snippetStore.remove('test-remove');
    expect(result).toBe(true);
    expect(snippetStore.count()).toBe(0);
  });

  it("retourne false si le snippet n'existe pas", () => {
    const result = snippetStore.remove('test-inexistant-' + Date.now());
    expect(result).toBe(false);
  });
});