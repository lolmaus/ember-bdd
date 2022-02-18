import {
  $emberBddInt,
  $emberBddJson,
  $emberBddLabel,
  $emberBddString,
  ConvertersOpinionatedRecord,
} from '@ember-bdd/core';

const dictionary: ConvertersOpinionatedRecord = {
  // A regular expression with a capturing group
  $email: /(.+?@.+)/, // john.doe@example.com

  // A regular expression with multiple capturing groups
  $fullName: /(.+?) (.+?)/, // John Doe

  // An alias delegating to another macro
  $eMail: '$email',

  // An alias delegating to multiple aliases
  $fullNameWithEmail: '$fullName <$email>', // John Doe <john.doe@example.com>

  // // A tuple of a regular expression and a converter function
  // $index: [/(\d+)/, (numberStr) => parseInt(numberStr, 10) - 1],

  $index: [
    /(\d+)(?:st|nd|rd|th)/, // ?: means a non-capturing group
    (numberStr: string): number => parseInt(numberStr, 10) - 1,
  ],

  $collection: [
    /(.+)/,
    (selector: string): Element[] => Array.from(document.querySelectorAll(selector)),
  ],

  $quotedString: /"(.+?)"/, // Unquotes the string

  $emberBddInt,
  $emberBddJson,
  $emberBddLabel,
  $emberBddString,
};

export default dictionary;
