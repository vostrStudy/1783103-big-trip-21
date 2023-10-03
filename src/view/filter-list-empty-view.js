import AbstractView from '../framework/view/abstract-view.js';
import {createFilterListEmptyTemplate } from '../template/filter-list-empty-template.js';

export default class FilterEmptyView extends AbstractView {

  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template () {
    return createFilterListEmptyTemplate(this.#filterType);
  }
}
