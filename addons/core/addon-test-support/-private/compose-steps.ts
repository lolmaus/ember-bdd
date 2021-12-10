import {
  isMethodName,
  StepFnOpinionated,
  StepImplementation,
  StepImplementationsRecord,
} from '../types';
import QUnit from 'qunit';
import { Library } from 'yadda/lib/localisation/English';
import { isCollection } from '../dom-helpers';

export const REGEX_STEP_NAME = /^(\S+) ([\s\S]+)$/;

function lookupStepByAlias(
  mergedStepDefinitions: StepImplementationsRecord,
  maybeStepImplementation: StepImplementation | string
): StepImplementation {
  let currentStepImplementation = maybeStepImplementation;
  let i = 0;

  // Lookup by alias
  while (typeof currentStepImplementation === 'string') {
    i++;

    if (i >= 256) {
      throw new Error(
        `Infinite loop in Yadda step aliases involving "${currentStepImplementation}"`
      );
    }

    if (!mergedStepDefinitions[currentStepImplementation]) {
      throw new Error(
        `Yadda step references a non-existing step.\nAlias: ${currentStepImplementation}`
      );
    }

    currentStepImplementation = mergedStepDefinitions[currentStepImplementation];
  }

  return currentStepImplementation;
}

function makeBetterMessage({
  message,
  stepName,
  stepImplName,
  args,
}: {
  message: string;
  stepName: string;
  stepImplName: string;
  args: unknown[];
}): string {
  message = `\n👟 ${stepName}\n⚙ ${stepImplName}\n⚠ ${message}\n\n🛠Arguments:`;

  args.forEach((arg, i) => {
    const argMessage = isCollection(arg)
      ? `Collection. Length: ${arg.elements.length}, Label: ${arg.label}, Selector: ${arg.selector}`
      : arg;

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message += `\n    ${i}: ${argMessage}`;
  });

  return message;
}

function makeBetterError({
  error,
  stepName,
  stepImplName,
  args,
  message = makeBetterMessage({ message: error.message, stepName, stepImplName, args }),
}: {
  error: Error;
  stepName: string;
  stepImplName: string;
  args: unknown[];
  message?: string;
}): Error {
  const stack = error.stack?.slice(error.message.length + error.constructor.name.length + 2) || '';
  const newError = new Error(message || error.message);

  newError.stack = `${message}\n\n${stack}`;

  return newError;
}

async function runAndLogOrThrow({
  assert,
  callback,
  stepName,
  stepImplName,
  args,
}: {
  assert: Assert;
  callback: () => void | Promise<void>;
  stepName: string;
  stepImplName: string;
  args: unknown[];
}): Promise<void> {
  let result;

  try {
    result = await callback();
  } catch (e) {
    const error = e instanceof Error ? e : new Error();

    const betterError = makeBetterError({ error, stepName, stepImplName, args });

    // No Try/Catch
    if (QUnit.config.notrycatch) {
      throw betterError;
    }

    // Normal
    assert.pushResult({
      result: false,
      message: betterError.message,
      actual: undefined,
      expected: undefined,
    });

    // Stop scenario execution without spamming into the report output
    throw new Error('Terminating further scenario execution after a previous error');
  }

  // Log successful step to QUnit
  // eslint-disable-next-line no-irregular-whitespace
  assert.pushResult({
    result: true,
    message: `👟 ${stepName}\n  ⚙ ${stepImplName}`,
    actual: undefined,
    expected: undefined,
  });

  return result;
}

export default function composeSteps(
  library: Library,
  ...stepDefinitions: StepImplementationsRecord[]
): Library {
  const mergedStepDefinitions = stepDefinitions.reduce((a, b) => ({ ...a, ...b }));

  Object.keys(mergedStepDefinitions).forEach((stepImplName) => {
    const stepImplementation = mergedStepDefinitions[stepImplName];

    const stepImplNameRegexResult = REGEX_STEP_NAME.exec(stepImplName);

    if (!stepImplNameRegexResult) {
      throw new Error(
        `Expected step implementation name "${stepImplName}" to match REGEX_STEP_NAME`
      );
    }

    const [, methodNameRaw, assertionNameRaw] = stepImplNameRegexResult;

    const methodName = methodNameRaw.toLowerCase();

    async function decoratedCallback(this: StepFnOpinionated, ...args: unknown[]): Promise<void> {
      const currentStepImplementation = lookupStepByAlias(
        mergedStepDefinitions,
        stepImplementation
      );

      return runAndLogOrThrow({
        assert: this.assert,
        callback: () => currentStepImplementation.call(this, ...args), // eslint-disable-line @typescript-eslint/no-unsafe-return
        stepName: this.step,
        stepImplName,
        args,
      });
    }

    if (!isMethodName(methodName)) {
      throw new Error(
        `Yadda step name must start with given/when/then/define, was: "${stepImplName}"`
      );
    }

    // https://github.com/acuminous/yadda/issues/243#issuecomment-453115035
    const assertionName = `${assertionNameRaw}$`;

    library[methodName](assertionName, decoratedCallback);
  });

  return library;
}
