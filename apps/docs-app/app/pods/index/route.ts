import Route from '@ember/routing/route';
import { Page } from '../../types';
import { inject as service } from '@ember/service';
import FetchService from '../../services/fetch';

export interface IndexRouteModel {
  page: Page;
}

export default class IndexRoute extends Route {
  @service fetch!: FetchService;

  async model(): Promise<IndexRouteModel> {
    return {
      page: await this.fetch.fetchPageWithShoebox('index'),
    };
  }
}
