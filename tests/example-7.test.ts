import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { waitForDelay } from './utils';

describe('Suite 7', () => {
  beforeAll(() => {
    console.log('Starting suite 7');
  });

  afterAll(() => {
    console.log('Finishing suite 7');
  });

  it('example', async () => {
    await waitForDelay(3000);
    expect(1 + 1).toBe(2);
  });
});
