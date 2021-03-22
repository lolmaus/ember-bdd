import { helper } from '@ember/component/helper';

export function inc([input]: [string] /*, hash */): number {
  return parseInt(input, 10) + 1;
}

export default helper(inc);
