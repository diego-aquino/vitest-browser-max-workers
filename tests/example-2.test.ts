import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { waitForDelay } from './utils';

describe('Suite 2', () => {
  beforeAll(() => {
    console.log('Starting suite 2');
  });

  afterAll(() => {
    console.log('Finishing suite 2');
  });

  it('example', async () => {
    await waitForDelay(3000);
    expect(1 + 1).toBe(2);
  });
});
