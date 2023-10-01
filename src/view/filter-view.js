import {createFilterTemplate} from '../template/filter-template.js';
import RadioListView from './radio-list-view.js';

export default class FilterView extends RadioListView{

  get template() {

    return createFilterTemplate(this._items);
  }
}
