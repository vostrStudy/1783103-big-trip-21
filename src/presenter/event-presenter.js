import { render,remove,RenderPosition} from '../framework/render.js';
import EventList from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
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
  #pointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #noPointComponent = null;

  #pointListContainer = null;
  #eventComponent = new EventList();
  #loadingComponent = new LoadingView();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #renderedPointsCount = 10;
  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({eventContainer, pointsModel,filterModel,offersModel,destinationsModel, onNewPointDestroy }) {

    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.get();

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

  #renderPoint(point,offers,destinations) {


    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#eventComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point,offers,destinations);

    this.#pointPresenters.set(point.id,pointPresenter);
  }

  #renderPoints(points,offers,destinations) {

    points.forEach((point) => this.#renderPoint(point,offers,destinations));
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
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deletePoint(updateType, update);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

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

  #renderPointsContainer = (points,offers,destinations) => {
    this.#eventComponent = new EventList();
    render(this.#eventComponent, this.#eventContainer);
    this.#renderPoints(points.slice(0, 2),offers, destinations);
    // this.#renderPoints(points.slice(0, this.#renderedPointsCount),offers, destinations);
  };

  #renderBoard = () => {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const offers = this.#offersModel.offers;
    const destinations = this.#destinationsModel.destinations;

    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();

    this.#renderPointsContainer(points,offers, destinations);
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

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
