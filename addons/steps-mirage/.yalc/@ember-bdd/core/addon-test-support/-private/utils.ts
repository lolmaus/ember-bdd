import { Next } from '../types';

export function wrapWithNodeStyle(callback: (...args: unknown[]) => unknown) {
  return async function nodeStyleWrapper(...args: unknown[]): Promise<void> {
    const next = args.pop() as Next;

    try {
      // eslint-disable-next-line node/no-callback-literal
      const result = await callback(...args);
      next(null, result);
    } catch (err) {
      next(err);
    }
  };
}

type ConverterYadda =
  | ((arg1: unknown, next: Next) => Promise<void>)
  | ((arg1: unknown, arg2: unknown, next: Next) => Promise<void>)
  | ((arg1: unknown, arg2: unknown, arg3: unknown, next: Next) => Promise<void>)
  | ((arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, next: Next) => Promise<void>)
  | ((
      arg1: unknown,
      arg2: unknown,
      arg3: unknown,
      arg4: unknown,
      arg5: unknown,
      next: Next
    ) => Promise<void>);

export function wrapWithNodeStyleLengthSafe(
  callback: (...args: unknown[]) => unknown
): ConverterYadda {
  switch (callback.length) {
    case 1:
      return async function nodeStyleWrapper(arg: unknown, next: Next): Promise<void> {
        try {
          // eslint-disable-next-line node/no-callback-literal
          const result = await callback(arg);
          next(null, result);
        } catch (err) {
          next(err);
        }
      };
    case 2:
      return async function nodeStyleWrapper(
        arg1: unknown,
        arg2: unknown,
        next: Next
      ): Promise<void> {
        try {
          // eslint-disable-next-line node/no-callback-literal
          const result = await callback(arg1, arg2);
          next(null, result);
        } catch (err) {
          next(err);
        }
      };
    case 3:
      return async function nodeStyleWrapper(
        arg1: unknown,
        arg2: unknown,
        arg3: unknown,
        next: Next
      ): Promise<void> {
        try {
          // eslint-disable-next-line node/no-callback-literal
          const result = await callback(arg1, arg2, arg3);
          next(null, result);
        } catch (err) {
          next(err);
        }
      };
    case 4:
      return async function nodeStyleWrapper(
        arg1: unknown,
        arg2: unknown,
        arg3: unknown,
        arg4: unknown,
        next: Next
      ): Promise<void> {
        try {
          // eslint-disable-next-line node/no-callback-literal
          const result = await callback(arg1, arg2, arg3, arg4);
          next(null, result);
        } catch (err) {
          next(err);
        }
      };
    case 5:
      return async function nodeStyleWrapper(
        arg1: unknown,
        arg2: unknown,
        arg3: unknown,
        arg4: unknown,
        arg5: unknown,
        next: Next
      ): Promise<void> {
        try {
          // eslint-disable-next-line node/no-callback-literal
          const result = await callback(arg1, arg2, arg3, arg4, arg5);
          next(null, result);
        } catch (err) {
          next(err);
        }
      };
    default:
      throw new Error(
        `Converter supports 1-5 arguments (rest/spread is not supported), but it has ${callback.length} arguments`
      );
  }
}
