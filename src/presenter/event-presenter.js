import { render,remove,RenderPosition} from '../framework/render.js';
import EventList from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
// import NoPointView from '../view/no-point-view.js';
import FilterEmptyView from '../view/filter-list-empty-view.js';
import { SortType,enabledSortType, FilterType, UpdateType, UserAction } from '../utils/const.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortByDay, sortByPrice,sortByTime } from '../utils/utils.js';
// import { sort } from '../utils/sort.js';
import { filters } from '../utils/filter.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #eventComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({eventContainer, eventModel,filterModel, onNewPointDestroy }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({

      eventContainer: this.#eventContainer,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {


    const points = this.#eventModel.get();
    const filterType = this.#filterModel.filter;
    const filteredPoints = filters[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }
    return filteredPoints;
  }

  createPoint() {

    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#eventComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id,pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }


  #clearPoints(){
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoint() {
    this.#noPointComponent = new FilterEmptyView({
      filterType: this.#filterModel.filter,
    });
    render(this.#noPointComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {

    // console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#eventModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#eventModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, state) => {
    // console.log(updateType, state);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(state.id).init(state);
        break;
      case UpdateType.MINOR:

        this.#clearBoard();

        this.#renderBoard();

        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        // ({resetSortType: true});
        this.#renderBoard();

        break;
    }
  };


  #renderSort = () => {
    //* формирует объект SortType на основе SortType from const.js//
    const sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type],
    }));

    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      items: sortTypes,
      //*колбэк при смене сортировки//
      onItemChange: this.#sortTypeChangeHandler
    });

    render (this.#sortComponent, this.#eventContainer);

  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();

  };

  #renderPointsContainer = (points) => {
    this.#eventComponent = new EventList();
    render(this.#eventComponent, this.#eventContainer);
    this.#renderPoints(points);
  };

  #renderBoard = () => {

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointsContainer(points);
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  init() {
    this.#renderBoard();
  }
}
