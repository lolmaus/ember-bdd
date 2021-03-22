import Service, { inject as service } from '@ember/service';
import { cached } from '@glimmer/tracking';
import FetchService from './fetch';
import { TaskGenerator } from 'ember-concurrency';
import { dropTask } from 'ember-concurrency-decorators';
import { PageSparse } from '../types';
import { taskFor } from 'ember-concurrency-ts';
import PageObj from 'docs-app/utils/page-obj';

export default class TocService extends Service {
  @service fetch!: FetchService;

  @dropTask fetchPagesSparseTask = taskFor(function* (
    this: TocService
  ): TaskGenerator<PageSparse[]> {
    return (yield this.fetch.fetchPagesWithShoebox()) as PageSparse[];
  });

  get pagesSparse(): PageSparse[] {
    return this.fetchPagesSparseTask.last?.value ?? [];
  }

  @cached
  get pageObjs(): PageObj[] {
    return this.pagesSparse.map((pageSparse) => new PageObj(this, pageSparse));
  }

  @cached
  get pageObjsById(): Record<string, PageObj> {
    return this.pageObjs.reduce((result, pageObj) => {
      result[pageObj.id] = pageObj;
      return result;
    }, {} as Record<string, PageObj>);
  }
}
