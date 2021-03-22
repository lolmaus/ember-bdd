import { module, test } from 'qunit';
import yadda, { Yadda, Dictionary } from 'yadda';
import { Library } from 'yadda/lib/localisation/English';
import FeatureParser, {
  SpecificationExport,
  ScenarioExport,
} from 'yadda/lib/parsers/FeatureParser';
import { cached } from 'tracked-toolbox';
import requireModule from 'ember-require-module';
import composeSteps from './-private/compose-steps';
import { isStepImplementationsRecord } from './types';
import { generateDictionary } from './-private/dictionary';
import { assert } from '@ember/debug';

export default class TestDeclarator {
  protected relativePath: string;
  protected featureStr: string;

  @cached protected get projectName(): string {
    return this.relativePath.split('/')[0];
  }

  @cached protected get legacyStepsFileName(): string {
    return this.relativePath.slice(0, this.relativePath.lastIndexOf('.')) + '-steps';
  }

  @cached protected get opinionatedStepsFileName(): string {
    return `${this.projectName}/tests/bdd/steps`;
  }

  @cached protected get featureParser(): FeatureParser {
    return new yadda.parsers.FeatureParser();
  }

  @cached protected get featureParsed(): SpecificationExport {
    return this.featureParser.parse(this.featureStr);
  }

  @cached protected get dictionary(): Dictionary {
    return generateDictionary(this.projectName);
  }

  @cached protected get library(): Library {
    const stepImplementationsRecord = requireModule(this.opinionatedStepsFileName);

    assert(
      `The ember-bdd step implementaions library ${this.opinionatedStepsFileName} must be an object with functions or strings`,
      isStepImplementationsRecord(stepImplementationsRecord)
    );

    const library: Library = yadda.localisation.default.library(this.dictionary);

    return composeSteps(library, stepImplementationsRecord);
  }

  @cached protected get yaddaInstance(): Yadda {
    return yadda.createInstance(this.library);
  }

  constructor({ relativePath, feature }: { relativePath: string; feature: string }) {
    this.relativePath = relativePath;
    this.featureStr = feature;
  }

  public declare(): void {
    module(this.featureParsed.title, (/* hooks: NestedHooks */) => {
      this.featureParsed.scenarios.forEach((scenario: ScenarioExport) => {
        test(scenario.title, (assert: Assert) => {
          return this.runScenario(scenario, assert);
        });
      });
    });
  }

  protected runScenario(scenario: ScenarioExport, assert: Assert): Promise<void> {
    return new Promise((resolve, reject) => {
      this.yaddaInstance.run(scenario.steps, { assert, ctx: {} }, (err: Error | null) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }
}
