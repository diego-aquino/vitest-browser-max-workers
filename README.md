# Vitest reproduction: browser mode does not follow `maxWorkers`

This is a reproduction for https://github.com/vitest-dev/vitest/issues/7446.

## Getting started

1. Clone the repository:

   ```bash
   git clone git@github.com:diego-aquino/vitest-browser-max-workers.git
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Reproduction

1. Run the test suite:

   ```bash
   pnpm test run
   ```

There are 10 test files, each with a simple test that waits for 3 seconds before succeeding.

```ts
describe('Suite 1', () => {
  beforeAll(() => {
    console.log('Starting suite 1');
  });

  afterAll(() => {
    console.log('Finishing suite 1');
  });

  it('example', async () => {
    await waitForDelay(3000);
    expect(1 + 1).toBe(2);
  });
});
```

The [`vitest.config.mts`](./vitest.config.mts) file is configured to run the tests in browser mode with 2 workers.
However, they run in all available CPUs instead.

<details>
<summary>An example output in my local machine with 12 CPUs:</summary>

```
Number of available CPUs: 12
Running tests with { minWorkers: 1, maxWorkers: 2 }

RUN  v3.0.5 /home/diegoaquino/www/vitest-issues/vitest-browser-max-workers

Number of available CPUs: 12
Running tests with { minWorkers: 1, maxWorkers: 2 }
stdout | tests/example-3.test.ts > Suite 3
Starting suite 3
stdout | tests/example-6.test.ts > Suite 6
Starting suite 6
stdout | tests/example-10.test.ts > Suite 10
Starting suite 10
stdout | tests/example-4.test.ts > Suite 4
Starting suite 4
stdout | tests/example-9.test.ts > Suite 9
Starting suite 9
stdout | tests/example-2.test.ts > Suite 2
Starting suite 2
stdout | tests/example-1.test.ts > Suite 1
Starting suite 1
stdout | tests/example-5.test.ts > Suite 5
Starting suite 5
stdout | tests/example-8.test.ts > Suite 8
Starting suite 8
stdout | tests/example-7.test.ts > Suite 7
Starting suite 7
stdout | tests/example-3.test.ts > Suite 3
Finishing suite 3
stdout | tests/example-6.test.ts > Suite 6
Finishing suite 6
stdout | tests/example-10.test.ts > Suite 10
Finishing suite 10
stdout | tests/example-4.test.ts > Suite 4
Finishing suite 4
✓  chromium  tests/example-3.test.ts (1 test) 3007ms
  ✓ Suite 3 > example 3005ms
✓  chromium  tests/example-6.test.ts (1 test) 3005ms
  ✓ Suite 6 > example 3003ms
✓  chromium  tests/example-10.test.ts (1 test) 3005ms
  ✓ Suite 10 > example 3003ms
✓  chromium  tests/example-4.test.ts (1 test) 3006ms
  ✓ Suite 4 > example 3004ms
stdout | tests/example-2.test.ts > Suite 2
Finishing suite 2
stdout | tests/example-1.test.ts > Suite 1
Finishing suite 1
✓  chromium  tests/example-2.test.ts (1 test) 3004ms
  ✓ Suite 2 > example 3002ms
✓  chromium  tests/example-1.test.ts (1 test) 3004ms
  ✓ Suite 1 > example 3002ms
stdout | tests/example-5.test.ts > Suite 5
Finishing suite 5
stdout | tests/example-9.test.ts > Suite 9
Finishing suite 9
✓  chromium  tests/example-5.test.ts (1 test) 3005ms
  ✓ Suite 5 > example 3003ms
✓  chromium  tests/example-9.test.ts (1 test) 3005ms
  ✓ Suite 9 > example 3004ms
stdout | tests/example-8.test.ts > Suite 8
Finishing suite 8
✓  chromium  tests/example-8.test.ts (1 test) 3004ms
  ✓ Suite 8 > example 3002ms
stdout | tests/example-7.test.ts > Suite 7
Finishing suite 7
✓  chromium  tests/example-7.test.ts (1 test) 3005ms
  ✓ Suite 7 > example 3002ms
Test Files  10 passed (10)
      Tests  10 passed (10)
  Start at  19:52:48
  Duration  5.23s (transform 0ms, setup 0ms, collect 307ms, tests 30.05s, environment 0ms, prepare 14.02s)
```

</details>

The logs show a `Starting suite ...` message for all 10 test files before any `Finishing suite ...` message, so many
more than 2 workers are running in parallel.
