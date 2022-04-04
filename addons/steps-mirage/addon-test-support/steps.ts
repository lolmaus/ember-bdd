/* global server */

import {
  BddTestContext,
  REGEX_COMMA_AND_SEPARATOR,
  STR_STRING_WITH_ESCAPE as emberBddString,
} from '@ember-bdd/core';
import { isString } from '@sniptt/guards/build';
import { expect } from 'chai';
// import { expect } from 'chai';
import { Server } from 'miragejs';

declare global {
  const server: Server;
}

export interface KeyValuePairRaw {
  key: string | null;
  value: string | null;
}

export default {
  [`Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName(?: with)?(?: traits? ${emberBddString})?(?: and)?(?: propert(?:y|ies) ({.+?}))?`](
    countRaw = '1',
    type: string,
    traitsRaw = '',
    propertiesRaw = '{}'
  ): void {
    const count = parseInt(countRaw, 10);
    const traits = traitsRaw.split(REGEX_COMMA_AND_SEPARATOR).filter((str) => str.length);
    let properties;

    try {
      properties = JSON.parse(propertiesRaw) as Record<string, unknown>;
    } catch (e) {
      throw new Error(`Invalid JSON passed as "properties"`);
    }

    server.createList(type, count, ...traits, properties);
  },

  [`Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$emberBddTable`](
    this: BddTestContext,
    countRaw = '1',
    type: string,
    traitsRaw = '',
    propertiesRawArray: Array<Record<string, string>> | undefined
  ): void {
    const count = parseInt(countRaw, 10);
    const traits = traitsRaw.split(REGEX_COMMA_AND_SEPARATOR).filter((str) => str.length);

    const properties =
      propertiesRawArray === undefined
        ? {}
        : propertiesRawArray.reduce((result, propertiesRaw) => {
            let m;

            m = 'The seeding table for this step must contain column "key"';
            this.assert.ok(propertiesRaw.key, m);

            m = 'The seeding table for this step must contain column "value"';
            this.assert.ok(propertiesRaw.value !== undefined, m);

            try {
              result[propertiesRaw.key] = JSON.parse(propertiesRaw.value);
            } catch (e) {
              throw new Error(`Invalid JSON passed for attribute "${propertiesRaw.key}`);
            }

            return result;
          }, {} as Record<string, unknown>);

    server.createList(type, count, ...traits, properties);
  },

  'Given there are records of type $emberBddMirageModelName with the following properties:\n$emberBddTable'(
    type: string,
    rowsRaw: Record<string, string>[]
  ): void {
    rowsRaw.forEach((row) => {
      let traits: string[] = [];

      const properties = Object.entries(row).reduce(
        (hash, [keyRaw, valueRaw]: [string, string | null]) => {
          const key = keyRaw.trim();
          const value = valueRaw?.trim ? valueRaw.trim() : valueRaw;

          let result: unknown;

          // Traits
          if ((key === 'trait' || key === 'traits') && value) {
            expect(isString(value)).ok;

            traits = value.split(REGEX_COMMA_AND_SEPARATOR).filter((str) => str.length);
          }

          // Empty cell
          else if (!value || value.length === 0) {
            result = null;
          }

          // Numbers, Strings, Booleans, Arrays and Objects
          else {
            try {
              result = JSON.parse(value);
            } catch (e) {
              throw new Error(`Invalid JSON passed as "${key}"`);
            }
          }

          hash[key] = result;
          return hash;
        },
        {} as Record<string, unknown>
      );

      delete properties.trait;
      delete properties.traits;

      server.create(type, ...traits, properties);
    });
  },
};
