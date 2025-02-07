import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { waitForDelay } from './utils';

describe('Suite 9', () => {
  beforeAll(() => {
    console.log('Starting suite 9');
  });

  afterAll(() => {
    console.log('Finishing suite 9');
  });

  it('example', async () => {
    await waitForDelay(3000);
    expect(1 + 1).toBe(2);
  });
});
