import { StepFn } from 'yadda';
import { isArray, isFunction, isObject, isString } from '@hqoss/guards';

// prettier-ignore
export type StepArgs =
| []
| [unknown | undefined]
| [unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined]
| [unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined, unknown | undefined];

export type StepImplementation = (
  this: StepFnOpinionated,
  ...args: StepArgs
) => void | Promise<void>;
export type StepImplementationOrAlias = StepImplementation | string;
export type StepImplementationsRecord = Record<string, StepImplementationOrAlias>;
export type LabelOverridesRecord = Record<string, string>;
export type Label = string;
export type SelectorCompound = string;

export interface StepFnOpinionated extends StepFn {
  assert: Assert;
}

export type ConverterOpinionatedFunction = (...args: unknown[]) => unknown;

export type ConverterOpinionatedSimple = string | RegExp;

export type ConverterOpinionatedTuple = [RegExp, ConverterOpinionatedFunction];

export type ConverterOpinionated = ConverterOpinionatedSimple | ConverterOpinionatedTuple;

export type ConvertersOpinionatedRecord = Record<string, ConverterOpinionated>;

export function isRegExp(maybeRegExp: unknown): maybeRegExp is RegExp {
  return maybeRegExp instanceof RegExp;
}

export function isConverterSimple(
  maybeConverter: unknown
): maybeConverter is ConverterOpinionatedSimple {
  return isString(maybeConverter) || isRegExp(maybeConverter);
}

export function isConverterTuple(
  maybeConverter: unknown
): maybeConverter is ConverterOpinionatedTuple {
  // prettier-ignore
  return (
    isArray(maybeConverter)
    && isConverterSimple(maybeConverter[0])
    && isFunction(maybeConverter[1])
  );
}

export function isConverter(maybeConverter: unknown): maybeConverter is ConverterOpinionated {
  return isConverterSimple(maybeConverter) || isConverterTuple(maybeConverter);
}

export function isConvertersRecord(
  maybeConvertersRecord: unknown
): maybeConvertersRecord is ConvertersOpinionatedRecord {
  return (
    isObject(maybeConvertersRecord) &&
    Object.keys(maybeConvertersRecord).every((key) => {
      // @ts-ignore Asserting type
      return isConverter(maybeConvertersRecord[key]);
    })
  );
}

export function isStepImplementationsRecord(
  maybeStepImplRecord: unknown
): maybeStepImplRecord is StepImplementationsRecord {
  return (
    isObject(maybeStepImplRecord) &&
    Object.keys(maybeStepImplRecord).every((key) => {
      // @ts-ignore Asserting type
      return isString(maybeStepImplRecord[key]) || isFunction(maybeStepImplRecord[key]);
    })
  );
}

export function isLabelOverridesRecord(
  maybeLabelOverridesRecord: unknown
): maybeLabelOverridesRecord is LabelOverridesRecord {
  return (
    isObject(maybeLabelOverridesRecord) &&
    Object.keys(maybeLabelOverridesRecord).every((key) => {
      // @ts-ignore Asserting type
      return isString(maybeLabelOverridesRecord[key]);
    })
  );
}

export type MethodName = 'given' | 'when' | 'then';

export function isMethodName(maybeMethodName: unknown): maybeMethodName is MethodName {
  return maybeMethodName === 'given' || maybeMethodName === 'when' || maybeMethodName === 'then';
}

export type Next = (err: Error | null, result?: unknown) => void;

export interface AnnotationsRecord {
  [index: string]: (hooks: NestedHooks, arg?: string | unknown) => void;
}

export function isAnnotationsRecord(
  maybeAnnotationsRecord: unknown
): maybeAnnotationsRecord is AnnotationsRecord {
  return (
    isObject(maybeAnnotationsRecord) &&
    !isArray(maybeAnnotationsRecord) &&
    Object.values(maybeAnnotationsRecord).every(isFunction)
  );
}

export type ModuleFunc = moduleFunc1 | moduleFunc2;
export type TestFunc = QUnit['test'] | QUnit['only'] | QUnit['skip'] | QUnit['todo'];
