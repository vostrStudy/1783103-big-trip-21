import FilterView from '../view/filter-view.js';
import { filters } from '../utils/filter.js';
import { render,replace,remove } from '../framework/render.js';
import { FilterType, UpdateType } from '../utils/const.js';


export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #filters = [];

  #filterComponent = null;

  constructor ({container, pointsModel,filterModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#filters = Object.entries(filters).map(
      ([filterType ],index) => ({
        type: filterType,
        isChecked: index === 0,

      }),
    );
  }

  get filters() {
    return Object.values(FilterType).map((type) => ({
      type,
    }));
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

  init() {

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      items:this.#filters,
      currentFilterType: this.#filterModel.filter,
      onItemChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

}
