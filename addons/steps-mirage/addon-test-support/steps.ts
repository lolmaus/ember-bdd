/* global server */

import {
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

  [`Given there(?: is a|'s a| are|'re) (?:(\\d+) )?records? of type $emberBddMirageModelName with(?: traits? ${emberBddString})?(?: and)? the following properties:\n$opinionatedJSONObject`](
    countRaw = '1',
    type: string,
    traitsRaw = '',
    properties: Record<string, unknown>
  ): void {
    const count = parseInt(countRaw, 10);
    const traits = traitsRaw.split(REGEX_COMMA_AND_SEPARATOR).filter((str) => str.length);
    server.createList(type, count, ...traits, properties);
  },

  // 'Given there is a record of type $emberBddMirageModelName with the following properties:\n$emberBddTable'(
  //   type: string,em
  //   rows: Array<KeyValuePairRaw>
  // ): void {
  //   let traits: string[] = [];

  //   const properties = rows.reduce((result, { key, value }) => {
  //     if ()

  //     key = key.trim();
  //     value = value.trim();

  //     // Traits
  //     if (key === 'trait' || key === 'traits') {
  //       traits = value.split(REGEX_COMMA_AND_SEPARATOR).filter((str) => str.length);
  //     }

  //     // Empty cell
  //     else if (value.length === 0) {
  //       value = null;
  //     }

  //     // Numbers, Strings, Booleans, Arrays and Objects
  //     else {
  //       try {
  //         value = JSON.parse(value);
  //       } catch (e) {
  //         throw new Error(`Invalid JSON passed as "${key}":\n${value}`);
  //       }
  //     }

  //     result[key] = value;
  //     return result;
  //   });

  //   delete properties.trait;
  //   delete properties.traits;

  //   server.create(type, ...traits, properties);
  // },

  'Given there are records of type $emberBddMirageModelName with the following properties:\n$emberBddTable'(
    type: string,
    rowsRaw: Record<string, string>[]
  ): void {
    rowsRaw.forEach((row) => {
      let traits: string[] = [];

      const properties = Object.entries(row).reduce((hash, [keyRaw, valueRaw]) => {
        const key = keyRaw.trim();
        const value = valueRaw.trim();

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
      }, {} as Record<string, unknown>);

      delete properties.trait;
      delete properties.traits;

      server.create(type, ...traits, properties);
    });
  },
};
