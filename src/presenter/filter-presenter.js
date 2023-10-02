import FilterView from '../view/filter-view.js';
import { filters } from '../utils/filter.js';
import { render,replace,remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../utils/const.js';


export default class FilterPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;
  #filters = [];

  #filterComponent = null;

  constructor ({container, eventModel,filterModel}) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#filters = Object.entries(filters).map(
      ([filterType, filterPoints ],index) => ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: filterPoints (this.#eventModel.get()).length === 0,
      }),
    );
  }

  get filters() {
    const points = this.#eventModel.events;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filters[type](points).length
    }));
    // debugger
  }


  init() {

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items:this.#filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  // init() {
  //   debugger
  //   render (new FilterView({items:this.#filters}),this.#container);
  // }
}
