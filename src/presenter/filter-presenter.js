import FilterView from '../view/filter-view.js';
import { filter } from '../utils/filter.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {
  #container = null;
  #eventModel = null;
  #filters = [];

  constructor ({container, eventModel}) {
    this.#container = container;
    this.#eventModel = eventModel;

    this.#filters = Object.entries(filter).map(
      ([filterType, filterPoints ],index) => ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: filterPoints (this.#eventModel.get()).length === 0,
      }),
    );
  }

  init() {
    render (new FilterView({items:this.#filters}),this.#container);
  }
}
