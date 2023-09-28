import { render,RenderPosition} from '../framework/render.js';
import EventList from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { SortType,enabledSortType, FilterType } from '../utils/const.js';
import PointPresenter from './point-presenter.js';
import { updateItem,sortByPrice,sortByTime } from '../utils/utils.js';
import { sort } from '../utils/sort.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #eventComponent = null;
  #sourcedBoardPoints = [];

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #points = [];

  #pointPresenters = new Map();

  constructor({eventContainer, eventModel }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#points = sort[this.#currentSortType](this.#eventModel.get());
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

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handlePointsChange = (updatedPoint) => {
    //*update the changes
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints , updatedPoint);
    //*initialize presenter with updated changes
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #renderSort = () => {
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

    render (this.#sortComponent, this.#eventContainer);

  };

  //* - Сортируем точки sortType = (evt.target.dataset.item). запоминаем current type, then sort it afterwards;
  #sortPoints = (sortType) =>{
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в исходный массив
        this.#points = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
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

    if (this.#currentSortType === sortType) {
      return;
    }
    // - Сортируем точки
    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPoints();
    // - Рендерим список заново
    this.#renderPoints();

  };

  #renderPointsContainer = () => {
    this.#eventComponent = new EventList();
    render(this.#eventComponent, this.#eventContainer);
  };

  #renderBoard = () => {
    this.#renderSort();
    this.#renderPointsContainer();
    this.#renderPoints();
  };

  init() {
    this.#renderBoard();
    this.#sourcedBoardPoints = this.#eventModel.get();
  }
}
