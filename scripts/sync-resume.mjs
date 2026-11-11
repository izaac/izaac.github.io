#!/usr/bin/env node
/**
 * Publishes the single source of truth (src/data/resume.json) as a static,
 * machine-readable endpoint at /resume.json so ATS parsers and `curl`
 * consumers get the same data the site renders.
 *
 * Runs automatically via the `dev` and `build` npm scripts (see package.json),
 * and can be run standalone with `npm run sync:resume`.
 */
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'src/data/resume.json');
const target = resolve(root, 'public/resume.json');

const raw = await readFile(source, 'utf8');

// Fail fast on malformed JSON rather than shipping a broken endpoint.
JSON.parse(raw);

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

console.log(`[sync-resume] ${source} -> ${target} (${raw.length} bytes)`);
