import { module, only, skip, test, todo } from 'qunit';
import yadda, { Dictionary, Yadda } from 'yadda';
import { Library } from 'yadda/lib/localisation/English';
import FeatureParser, {
  AnnotationsExport,
  ScenarioExport,
  SpecificationExport,
} from 'yadda/lib/parsers/FeatureParser';
import { cached } from 'tracked-toolbox';
import composeSteps from './-private/compose-steps';
import { BddTestContext, ModuleFunc, TestFunc } from './types';
import { generateDictionary } from './-private/dictionary';
import { assert } from '@ember/debug';
import { applyAnnotations } from './-private/annotations';
import { getSteps } from '@ember-bdd/core/steps';

export default class TestDeclarator {
  protected relativePath: string;
  protected featureStr: string;

  @cached protected get projectName(): string {
    return this.relativePath.split('/')[0];
  }

  @cached protected get legacyStepsFileName(): string {
    return this.relativePath.slice(0, this.relativePath.lastIndexOf('.')) + '-steps';
  }

  @cached protected get featureParser(): FeatureParser {
    return new yadda.parsers.FeatureParser();
  }

  @cached protected get featureParsed(): SpecificationExport {
    return this.featureParser.parse(this.featureStr);
  }

  @cached protected get dictionary(): Dictionary {
    return generateDictionary();
  }

  @cached protected get library(): Library {
    const stepImplementationsRecord = getSteps();
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
    const moduleFunction = this.getModuleFunction();

    moduleFunction(this.featureParsed.title, (hooks: NestedHooks) => {
      applyAnnotations(this.featureParsed.annotations, hooks);

      this.featureParsed.scenarios.forEach((scenario: ScenarioExport) => {
        const testFunction = this.getTestFunction(scenario.annotations);

        if (this.areThereCustomAnnotations(scenario.annotations)) {
          // Need to wrap the test with another moodule so that hooks can be run for individual test
          module('', (hooks: NestedHooks) => {
            applyAnnotations(scenario.annotations, hooks);

            testFunction(scenario.title, (assert: Assert) => {
              return this.runScenario(scenario, assert, this as unknown as BddTestContext);
            });
          });
        } else {
          testFunction(scenario.title, (assert: Assert) => {
            return this.runScenario(scenario, assert, this as unknown as BddTestContext);
          });
        }
      });
    });
  }

  protected runScenario(
    scenario: ScenarioExport,
    assert: Assert,
    context: BddTestContext
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      context.assert = assert;
      context.ctx = {};

      this.yaddaInstance.run(scenario.steps, context, (err: Error | null) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  protected getModuleFunction(): ModuleFunc {
    const annotations = this.featureParsed.annotations;

    // prettier-ignore
    assert('Annotations @only, @skip and @todo cannot be used together',
      !(
        (annotations.skip && annotations.todo)
        || (annotations.skip && annotations.only)
        || (annotations.only && annotations.todo)
      )
    );

    // prettier-ignore
    return (
      annotations.skip ? module.skip :
      annotations.only ? module.only :
      annotations.todo ? module.todo :
                         module
    );
  }

  protected getTestFunction(annotations: AnnotationsExport): TestFunc {
    // prettier-ignore
    assert('Annotations @only, @skip and @todo cannot be used together',
      !(
        (annotations.skip && annotations.todo)
        || (annotations.skip && annotations.only)
        || (annotations.only && annotations.todo)
      )
    );

    // prettier-ignore
    return (
      annotations.skip ? skip :
      annotations.only ? only :
      annotations.todo ? todo :
                         test
    );
  }

  protected areThereCustomAnnotations(annotations: AnnotationsExport): boolean {
    // prettier-ignore
    const annotationsFiltered =
      Object
        .keys(annotations)
        .filter((key) => key !== 'only' && key !== 'skip' && key !== 'todo')

    return annotationsFiltered.length > 0;
  }
}
