import Controller from '@ember/controller';
import TocService from 'docs-app/services/toc';
import { Page } from '../../types';
import { IndexRouteModel } from './route';
import { inject as service } from '@ember/service';
import PageObj from 'docs-app/utils/page-obj';

export default class IndexController extends Controller {
  @service toc!: TocService;

  model!: IndexRouteModel;

  get page(): Page {
    return this.model.page;
  }

  get pageObj(): PageObj {
    const pageObj = this.toc.pageObjsById[this.page.id];

    if (!pageObj) {
      throw new Error(`PageObj not found for page ${this.page.id}`);
    }

    return pageObj;
  }
}
