import annotations from './annotations';
import dictionary from './dictionary';
import labelOverrides from './label-overrides';
import steps from './steps';
import {
  setupAnnotations,
  setupDictionary,
  setupLabelOverrides,
  setupSteps,
} from '@ember-bdd/core';

export default function setupEmberBdd(): void {
  setupAnnotations(annotations);
  setupDictionary(dictionary);
  setupLabelOverrides(labelOverrides);
  setupSteps(steps);
}
