interface PageAttributesSparse {
  title?: string;
  index?: number;
  sectionOnly?: boolean;
}

export interface PageSparse {
  id: string;
  type: 'project';
  attributes?: PageAttributesSparse;
}

interface PageAttributes extends PageAttributesSparse {
  html: string;
}

export interface Page extends PageSparse {
  attributes: PageAttributes;
}

//

export interface ResponseArray<T> {
  data: T[];
}

export interface ResponseSingle<T> {
  data: T;
}
