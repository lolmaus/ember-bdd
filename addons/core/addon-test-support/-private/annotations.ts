import { Annotations } from 'yadda';
import { assert } from '@ember/debug';
import { AnnotationsRecord, isAnnotationsRecord } from '../types';

export function applyAnnotations(annotations: Annotations, hooks: NestedHooks): void {
  const annotationFunctionsRecord = getAnnotations();

  if (!annotationFunctionsRecord) return;

  Object.keys(annotations).forEach((annotationNameLowCase: string) => {
    if (['only', 'skip', 'todo'].includes(annotationNameLowCase)) return;

    const annotationFunction = annotationFunctionsRecord[annotationNameLowCase];

    assert(
      `Annotation ${annotationNameLowCase} was not defined when calling \`setupAnnotations()\` (case-insensitive)`,
      annotationFunction
    );

    const arg = annotations[annotationNameLowCase] as string | true;

    if (arg === true) {
      // If the annotation is in the form @annotation, i.e. arg is true, then we don't pass true as an argument, as the function might expect other types as its 2nd argument
      // that's true for e.g. setupApplicationTest, which expects an object of type `SetupTestOptions`
      annotationFunction(hooks);
    } else {
      // only when the annotation is in the form @annotation=someString, we pass someString along
      annotationFunction(hooks, arg);
    }
  });
}

let _annotations: AnnotationsRecord | undefined;

export function setupAnnotations(annotations: AnnotationsRecord): void {
  assert('You must not call `setupAnnotations()` twice!', !_annotations);
  assert(
    'Expected an object of functions passed to `setupAnnotations()`!',
    isAnnotationsRecord(annotations)
  );

  // use lower case keys
  _annotations = Object.entries(annotations).reduce(
    (result, [key, value]) => ({
      ...result,
      [key.toLowerCase()]: value,
    }),
    {} as AnnotationsRecord
  );

  assert(
    'keys in object passed to `setupAnnotations()` have case collisions. Yadda annotations are case-insensitive',
    Object.keys(annotations).length === Object.keys(_annotations).length
  );
}

export function getAnnotations(): AnnotationsRecord | undefined {
  return _annotations;
}
