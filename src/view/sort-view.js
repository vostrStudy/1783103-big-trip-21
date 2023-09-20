import RadioListView from './radio-list-view.js';
import {createSortTemplate} from '../template/sort-template.js';

export default class SortView extends RadioListView{

  get template() {
    return createSortTemplate(this._items);
  }
}
