import { render,remove,RenderPosition} from '../framework/render.js';
import EventList from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { SortType,enabledSortType, FilterType, UpdateType, UserAction } from '../utils/const.js';
import PointPresenter from './point-presenter.js';
import { sortByPrice,sortByTime } from '../utils/utils.js';
import { sort } from '../utils/sort.js';
import { filters } from '../utils/filter.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #eventComponent = null;
  // #sourcedBoardPoints = [];

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  // #points = [];

  #pointPresenters = new Map();

  constructor({eventContainer, eventModel,filterModel }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    // this.#points = sort[this.#currentSortType](this.#eventModel.get());
  }

  get points() {

    const filterType = this.#filterModel.filter;
    const points = this.#eventModel.events;
    const filteredPoints = filters[filterType](points);

    // const points = this.#eventModel.events;
    switch (this.#currentSortType) {
      case SortType.PRICE:
        // return [...this.#eventModel.events].sort(sortByPrice);
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        // return [...this.#eventModel.events].sort(sortByTime);
        return filteredPoints.sort(sortByTime);
    }
    // return this.#eventModel.events;

    return filteredPoints;

  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#eventComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    //*finding the object by id in prerspective// set- stores objects of unique values of any type
    this.#pointPresenters.set(point.id,pointPresenter);
  }

  #renderPoints() {
    const points = this.#eventModel.get();
    const sortedPoints = sort[this.#currentSortType](points);
    sortedPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearPoints(){
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {

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
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, state) => {
    // console.log(updateType, state);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this.#pointPresenters.get(state.id).init(state);
        break;
      case UpdateType.MINOR:

        this.#clearPoints();

        this.#renderPoints();
        // - обновить список
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderPoints();
        // - обновить всю доску
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
    this.#clearPoints();
    this.#renderPoints();

    this.#currentSortType = sortType;
    // check why in the project they use clear board and render board instead of whats above
    this.#clearBoard();
    this.#renderBoard();

  };

  #renderPointsContainer = () => {
    this.#eventComponent = new EventList();
    render(this.#eventComponent, this.#eventContainer);
    this.#renderPoints();
  };

  #renderBoard = () => {

    // const points = this.points;
    const pointCount = 2;
    // const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointsContainer();
  };

  #clearBoard({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);


    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  }


  init() {
    this.#renderBoard();
  }
}
