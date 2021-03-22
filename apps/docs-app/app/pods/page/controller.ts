import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { Page } from '../../types';
import { PageRouteModel } from './route';
import TocService from '../../services/toc';
import { tracked } from '@glimmer/tracking';
import PageObj from 'docs-app/utils/page-obj';

export default class PageController extends Controller {
  @service toc!: TocService;

  @tracked model!: PageRouteModel; // need tracked here, otherwise the template won't update

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
