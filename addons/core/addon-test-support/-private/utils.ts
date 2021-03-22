export function wrapWithNodeStyle(callback: (...args: unknown[]) => unknown) {
  return async function nodeStyleWrapper(...args: unknown[]): Promise<void> {
    const next = args.pop() as (err: Error | null, result?: unknown) => void;

    try {
      // eslint-disable-next-line node/no-callback-literal
      const result = await callback(...args);
      next(null, result);
    } catch (err) {
      next(err);
    }
  };
}
