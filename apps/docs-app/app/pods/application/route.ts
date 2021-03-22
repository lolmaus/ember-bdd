import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { PageSparse } from 'docs-app/types';
import RSVP from 'rsvp';
import TocService from '../../services/toc';

export interface ApplicationRouteModel {
  pagesSparse: PageSparse[];
}

export default class PageRoute extends Route {
  @service toc!: TocService;

  model(): Promise<ApplicationRouteModel> {
    return RSVP.hash({
      pagesSparse: this.toc.fetchPagesSparseTask.perform(),
    });
  }
}
