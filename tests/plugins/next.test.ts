import assert from 'node:assert/strict';
import { test } from 'bun:test';
import { main } from '../../src/index.js';
import { resolve } from '../../src/util/path.js';
import baseArguments from '../helpers/baseArguments.js';
import baseCounters from '../helpers/baseCounters.js';

const cwd = resolve('fixtures/plugins/next');

test('Find dependencies in Next.js configuration', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(issues.unlisted['next.config.js']['next-transpile-modules']);
  assert(issues.unlisted['pages/[[...route]].tsx']['react']);
  assert(issues.unlisted['pages/[[...route]].tsx']['react-helmet']);
  assert(issues.unlisted['pages/page.tsx']['react']);

  assert.deepEqual(counters, {
    ...baseCounters,
    devDependencies: 0,
    unlisted: 4,
    processed: 3,
    total: 3,
  });
});
