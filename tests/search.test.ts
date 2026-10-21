import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-search-${Date.now()}`);

describe('search', () => {
  let snippetStore: typeof import('../src/storage/snippetStore.js').snippetStore;

  beforeEach(async () => {
    process.env.DEVHUB_DIR = TEST_DIR;
    fs.mkdirSync(TEST_DIR, { recursive: true });
    vi.resetModules();
    const sMod = await import('../src/storage/snippetStore.js');
    snippetStore = sMod.snippetStore;
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    delete process.env.DEVHUB_DIR;
  });

  it('retourne les snippets correspondant au nom', () => {
    snippetStore.add('hello', 'console.log("hi")');
    snippetStore.add('world', 'console.log("world")');
    snippetStore.add('other', 'const x = 1;');

    const all = snippetStore.list();
    const matches = all.filter((s) => s.name.toLowerCase().includes('hello'));
    
    expect(matches.length).toBe(1);
    expect(matches[0].name).toBe('hello');
  });

  it('retourne les snippets correspondant au code', () => {
    snippetStore.add('a', 'console.log("a")');
    snippetStore.add('b', 'const x = 42;');
    snippetStore.add('c', 'console.log("c")');

    const all = snippetStore.list();
    const matches = all.filter((s) => s.code.toLowerCase().includes('console.log'));
    
    expect(matches.length).toBe(2);
  });

  it('est insensible à la casse', () => {
    snippetStore.add('HelloWorld', 'console.log("test")');
    
    const all = snippetStore.list();
    const matches = all.filter((s) => s.name.toLowerCase().includes('helloworld'));
    
    expect(matches.length).toBe(1);
  });

  it('retourne un tableau vide si aucun résultat', () => {
    snippetStore.add('hello', 'console.log("hi")');
    
    const all = snippetStore.list();
    const matches = all.filter((s) => s.name.toLowerCase().includes('xyz-inexistant-123'));
    
    expect(matches.length).toBe(0);
  });
});