import { Command } from 'commander';
import clipboardy from 'clipboardy';
import { logger } from '../utils/logger.js';
import { snippetStore } from '../storage/snippetStore.js';

export function registerCopyCommand(program: Command): void {
  program
    .command('copy <name>')
    .description('Copier un snippet dans le presse-papiers')
    .action(async (name: string) => {
      const snippet = snippetStore.get(name);

      if (!snippet) {
        logger.error(`Snippet "${name}" introuvable`);
        return;
      }

      try {
        await clipboardy.write(snippet.code);
        logger.success(`Snippet "${name}" copié !`);
        const preview = snippet.code.length > 50
          ? `${snippet.code.slice(0, 50)}…`
          : snippet.code;
        logger.info(`📋 ${preview}`);
      } catch (err) {
        logger.error(`Impossible de copier : ${(err as Error).message}`);
      }
    });
}