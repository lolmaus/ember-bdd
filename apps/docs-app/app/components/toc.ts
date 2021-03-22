import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import TocService from '../services/toc';
import PageObj from 'docs-app/utils/page-obj';

export interface TocComponentArgs {
  pageObj?: PageObj;
  noIndex?: boolean;
}

export default class TocComponent extends Component<TocComponentArgs> {
  @service toc!: TocService;

  get pageObj(): PageObj {
    const pageObj = this.args.pageObj ?? this.toc.pageObjsById.index;

    if (!pageObj) {
      throw new Error("Missing page with id 'index', it is mandatory");
    }

    return pageObj;
  }
}
