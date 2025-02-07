import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { waitForDelay } from './utils';

describe('Suite 3', () => {
  beforeAll(() => {
    console.log('Starting suite 3');
  });

  afterAll(() => {
    console.log('Finishing suite 3');
  });

  it('example', async () => {
    await waitForDelay(3000);
    expect(1 + 1).toBe(2);
  });
});
