import AbstractView from '../framework/view/abstract-view.js';
import {createFilterTemplate} from '../template/filter-template.js';

export default class FilterView extends AbstractView{
  #filters = null;
  // #handleFilterClick = null;

  constructor ({filters}) {
    super();
    this.#filters = filters;
    // this.#handleFilterClick = handleFilterClick;

    // this.element.querySelectorAll('.trip-filters__filter-label')
    //   .forEach ((tripFilters) => {
    //     tripFilters.addEventListener('click', this.#filterClickHandler);
    //   });
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  // #filterClickHandler = (evt) => {
  //   evt.preventDefault();
  // console.log('yes');
  // this.#handleFilterClick;
  // };
}
