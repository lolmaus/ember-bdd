import { helper } from '@ember/component/helper';

export function capitalize([input]: [string] /*, hash */): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export default helper(capitalize);
