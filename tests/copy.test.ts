import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-copy-${Date.now()}`);

describe('copy', () => {
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

  it('récupère un snippet par nom', () => {
    snippetStore.add('copyme', 'console.log("test")');
    const snippet = snippetStore.get('copyme');

    expect(snippet).toBeTruthy();
    expect(snippet?.code).toBe('console.log("test")');
  });

  it('retourne null si le snippet n\'existe pas', () => {
    const snippet = snippetStore.get('inexistant-' + Date.now());
    expect(snippet).toBeNull();
  });

  it('le snippet copiable contient le bon code', () => {
    snippetStore.add('a', 'code A');
    snippetStore.add('b', 'code B');

    const snippet = snippetStore.get('b');
    expect(snippet?.code).toBe('code B');
  });
});