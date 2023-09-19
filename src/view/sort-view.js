import RadioListView from './radio-list-view.js';
import {createSortTemplate} from '../template/sort-template.js';

export default class SortView extends RadioListView{
  // #sort = null;
  // #currentSortType = null;
  // #handleSortTypeChange = null;

  // constructor() {
  //   super();
  //   this.#sort = sort;
  // this.#currentSortType = currentSortType;
  // this.#handleSortTypeChange = handleSortTypeChange;

  // this.element.addEventListener('click', this.#handleSortTypeChange);
  // }

  get template() {
    return createSortTemplate(this._items);
  }

  // #sortTypeChangeHandler = (evt) => {
  //   if (evt.target.tagName !== 'A') {
  //     return;
  //   }

  //   evt.preventDefault();
  //   this.#handleSortTypeChange(evt.target.dataset.sortType);
  // };

}
