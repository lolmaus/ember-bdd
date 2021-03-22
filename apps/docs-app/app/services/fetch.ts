import Service, { inject as service } from '@ember/service';
import fetch from 'fetch';
import FastBootService from 'ember-cli-fastboot/services/fastboot';
import { Page, PageSparse, ResponseArray, ResponseSingle } from '../types';
import NotFoundError from 'docs-app/utils/errors/not-found';
import config from 'docs-app/config/environment';

export default class FetchService extends Service {
  @service fastboot!: FastBootService;

  namespace = 'api'; // no leading or trailing slash

  // Random alphanumeric string of length 8.
  cacheBuster = Date.now().toString(36);

  get baseURL(): string {
    return this.fastboot.isFastBoot
      ? `http://${this.fastboot.request.host}${config.rootURL}${this.namespace}`
      : `${config.rootURL}${this.namespace}`;
  }

  _url(resource: string): string {
    return `${this.baseURL}/${resource}.json?${this.cacheBuster}`;
  }

  async fetch(resource: string): Promise<Response> {
    const url = this._url(resource);
    const response = await fetch(url);

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new NotFoundError();
    }
  }

  async fetchJSON(resource: string): Promise<unknown> {
    const url = this._url(resource);
    const response = await fetch(url);
    return response.json();
  }

  post(url: string, data: Record<string, unknown>): Promise<unknown> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async fetchArray<T>(resourceNamePlural: string): Promise<T[]> {
    const response = (await this.fetchJSON(`${resourceNamePlural}/all`)) as ResponseArray<T>;
    return response.data;
  }

  fetchArrayWithShoebox<T>(resourceNamePlural: string): Promise<T[]> {
    return this._fetchWithShoebox(resourceNamePlural, () => this.fetchArray<T>(resourceNamePlural));
  }

  async fetchSingle<T>(resourceNamePlural: string, id: string): Promise<T> {
    const response = (await this.fetchJSON(`${resourceNamePlural}/${id}`)) as ResponseSingle<T>;
    return response.data;
  }

  fetchSingleWithShoebox<T>(resourceNamePlural: string, id: string): Promise<T> {
    return this._fetchWithShoebox(`${resourceNamePlural} ${id}`, () =>
      this.fetchSingle<T>(resourceNamePlural, id)
    );
  }

  fetchPagesWithShoebox(): Promise<PageSparse[]> {
    return this.fetchArrayWithShoebox<PageSparse>('pages');
  }

  fetchPageWithShoebox(slug: string): Promise<Page> {
    return this.fetchSingleWithShoebox('pages', slug);
  }

  async _fetchWithShoebox<T>(shoeboxName: string, callback: () => Promise<T>): Promise<T> {
    const shoeboxNameSafe = shoeboxName.replace(/\//g, '__');

    if (this.fastboot.isFastBoot) {
      const result: T = await callback();
      this.fastboot.shoebox.put(shoeboxNameSafe, result);
      return result;
    } else {
      const result: T = this.fastboot.shoebox.retrieve(shoeboxNameSafe) as T;
      return result ?? callback();
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    fetch: FetchService;
  }
}
