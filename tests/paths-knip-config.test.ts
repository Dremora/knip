import assert from 'node:assert/strict';
import { test } from 'bun:test';
import { main } from '../src/index.js';
import { resolve } from '../src/util/path.js';
import baseArguments from './helpers/baseArguments.js';
import baseCounters from './helpers/baseCounters.js';

test.skip('Resolve import path aliases', async () => {
  const cwd = resolve('fixtures/paths-knip-config');

  const { counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert.deepEqual(counters, {
    ...baseCounters,
    processed: 6,
    total: 6,
  });
});
