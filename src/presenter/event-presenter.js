import { render, replace, remove } from '../framework/render.js';
import EventList from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import { SortType,enabledSortType } from '../utils/const.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
import { sort } from '../utils/sort.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;
  #sortComponent = null;
  // #noPointComponent = new NoPointView();

  #currentSortType = SortType.DAY;

  #points = [];

  #pointPresenters = new Map();

  #eventComponent = new EventList();

  constructor({eventContainer, eventModel }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }


  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#eventComponent.element,
      onDataChange: this.#handlePointsChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    //*finding the object by id in prerspective// set- stores objects of unique values of any type
    this.#pointPresenters.set(point.id,pointPresenter);
  }

  // #renderNoPoint() {
  //   render(this.#noPointComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  // }

  #handlePointsChange = (updatedPoint) => {
    //*update the changes
    this.#points = updateItem(this.#points, updatedPoint);
    //*initialize presenter with updated changes
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    const prevSortComponent = this.#sortComponent;

    //* формирует объект SortType на основе SortType from const.js//
    const sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type],
    }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      //*колбэк при смене сортировки//
      onItemChange: this.#sortTypeChangeHandler
    });

    if(prevSortComponent) {
      replace (this.#sortComponent, prevSortComponent);
      remove (prevSortComponent);
    } else {
      render (this.#sortComponent, this.#eventContainer);
    }

  };

  //* - Сортируем точки sortType = (evt.target.dataset.item). запоминаем current type, then sort it afterwards;
  #sortPoints = (sortType) =>{
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.points);
  };

  #clearPoints(){
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point)
    );
  };

  #sortTypeChangeHandler = (sortType) => {

    // - Сортируем точки
    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPoints();
    // - Рендерим список заново
    this.#renderSort();
    this.#renderPoints();
  };

  init() {
    this.#points = this.#eventModel.get();
    render(this.#eventComponent, this.#eventContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
