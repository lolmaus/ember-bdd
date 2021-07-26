import { getOwner, setOwner } from '@ember/application';
import { PageSparse } from 'docs-app/types';
import { inject as service } from '@ember/service';
import TocService from 'docs-app/services/toc';
import { cached } from '@glimmer/tracking';

export default class PageObj {
  @service toc!: TocService;

  pageSparse: PageSparse;

  constructor(context: unknown, pageSparse: PageSparse) {
    setOwner(this, getOwner(context));
    this.pageSparse = pageSparse;
  }

  get id(): string {
    return this.pageSparse.id;
  }

  get index(): number {
    return this.pageSparse.attributes?.index ?? Infinity;
  }

  get title(): string | undefined {
    return this.pageSparse.attributes?.title;
  }

  get sectionOnly(): boolean {
    return this.pageSparse.attributes?.sectionOnly ?? false;
  }

  @cached
  get depth(): number {
    return this.id === 'index' ? 0 : this.id.split('/').length;
  }

  get indexEffective(): number {
    return this.parent?.children.indexOf(this) ?? 0;
  }

  get isFirstSibling(): boolean {
    return this.indexEffective === 0;
  }

  get isLastSibling(): boolean {
    return this.parent?.children.length
      ? this.indexEffective === this.parent?.children.length - 1
      : true;
  }

  @cached
  get parent(): PageObj | undefined {
    if (this.id === 'index') return;

    const lastIndexOfSlash = this.id.lastIndexOf('/');
    const parentId = lastIndexOfSlash === -1 ? 'index' : this.id.slice(0, lastIndexOfSlash);

    const parent = this.toc.pageObjsById[parentId];

    if (!parent) {
      throw new Error(`Parent ${parentId} is missing for page ${this.id}`);
    }

    return parent;
  }

  @cached
  get children(): PageObj[] {
    return (
      this.id === 'index'
        ? this.toc.pageObjs.filter((pageObj) => pageObj.depth === 1)
        : this.toc.pageObjs.filter((pageObj) => {
            return pageObj.id.startsWith(`${this.id}/`) && pageObj.depth === this.depth + 1;
          })
    ).sort((a, b) => a.index - b.index);
  }

  protected get _firstChild(): PageObj | undefined {
    return this.children[0];
  }

  protected get _lastChild(): PageObj | undefined {
    return this.children[this.children.length - 1];
  }

  protected get _firstChildOrSelf(): PageObj {
    return this._firstChild || this;
  }

  protected get _previousSibling(): PageObj | undefined {
    return this.parent?.children[this.indexEffective - 1];
  }

  protected get _nextSibling(): PageObj | undefined {
    return this.parent?.children[this.indexEffective + 1];
  }

  protected get _deepestLastChildOrSelf(): PageObj {
    return this._lastChild?._deepestLastChildOrSelf ?? this;
  }

  protected get _selfOrPrevous(): PageObj | undefined {
    return this.sectionOnly ? this.previousPageObj : this;
  }

  protected get _selfOrNext(): PageObj | undefined {
    return this.sectionOnly ? this.nextPageObj : this;
  }

  @cached
  get previousPageObj(): PageObj | undefined {
    if (this._previousSibling) {
      return this._previousSibling._selfOrPrevous;
    } else if (this.parent && !this.parent.sectionOnly) {
      return this.parent;
    } else if (this.parent?._previousSibling?.children.length) {
      return this.parent._previousSibling._deepestLastChildOrSelf._selfOrPrevous;
    } else if (this.parent?._previousSibling) {
      return this.parent._previousSibling._selfOrPrevous;
    } else if (this.parent) {
      return this.parent.previousPageObj;
    } else {
      return undefined;
    }
  }

  @cached
  get nextPageObj(): PageObj | undefined {
    if (this._firstChild) {
      return this._firstChild._selfOrNext;
    } else if (this._nextSibling) {
      return this._nextSibling._selfOrNext;
    } else if (this.parent?._nextSibling) {
      return this.parent._nextSibling._selfOrNext;
    } else {
      return undefined;
    }
  }
}
