import { Annotations } from 'yadda';
import requireModule from 'ember-require-module';
import { assert } from '@ember/debug';
import { isAnnotationsRecord } from '../types';

export default function applyAnnotations(annotations: Annotations, hooks: NestedHooks): void {
  const annotationFunctionsRecord = requireModule('@ember-bdd/core/app/annotations');

  if (!annotationFunctionsRecord) return;

  assert(
    'The default export of `tests/bdd/annotations.js` must be a record of functions',
    isAnnotationsRecord(annotationFunctionsRecord)
  );

  const keysMap = Object.keys(annotationFunctionsRecord).reduce((result, key) => {
    result[key.toLowerCase()] = key;
    return result;
  }, {} as Record<string, string>);

  assert(
    'keys in `tests/bdd/annotations.js` have case collisions. Yadda annotations are case-insensitive',
    Object.keys(keysMap).length === Object.keys(annotationFunctionsRecord).length
  );

  Object.keys(annotations).forEach((annotationNameLowCase: string) => {
    if (['only', 'skip', 'todo'].includes(annotationNameLowCase)) return;

    const annotationName = keysMap[annotationNameLowCase];
    const annotationFunction = annotationFunctionsRecord[annotationName];

    assert(
      `Annotation ${annotationNameLowCase} is not defined in \`tests/bdd/annotations.js\` (case-insensitive)`,
      annotationFunction
    );

    const arg = annotations[annotationNameLowCase] as string | true;

    annotationFunction(hooks, arg);
  });
}
