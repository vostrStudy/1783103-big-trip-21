import AbstractView from '../framework/view/abstract-view.js';
import {createFilterListEmptyTemplate } from '../template/filter-list-empty-template.js';

export default class FilterEmpty extends AbstractView {
  get template () {
    return createFilterListEmptyTemplate();
  }
}
