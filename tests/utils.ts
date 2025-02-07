export async function waitForDelay(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
