import { render, replace, remove } from '../framework/render.js';
import EditView from '../view/event-edit-view.js';
import EventList from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { SortType,enabledSortType } from '../utils/const.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;
  #sortComponent = null;

  #currentSortType = SortType.DAY;

  #points = [];

  #eventComponent = new EventList();
  #eventListComponent = new EventList();


  constructor({eventContainer, eventModel }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

  #renderSort = () => {
    const prevSortComponent = this.#sortComponent;

    // формирует объект SortType на основе SortType from const.js//
    const sortTypes = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type],
    }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      //колбэк при смене сортировки//
      onItemChange: this.#sortTypeChangeHandler
    });

    if(prevSortComponent) {
      replace (this.#sortComponent, prevSortComponent);
      remove (prevSortComponent);
    } else {
      render (this.#sortComponent, this.#eventContainer);
    }
  };

  // - Сортируем точки sortType = (evt.target.dataset.item). запоминаем current type, then sort it afterwards;
  #sortPoints = (sortType) =>{
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.points);
  };

  #clearPoints = () => {

  };

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

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    //*pointComponent- точки маршрута*//
    const pointComponent = new PointView({
      point,
      onPointRollClick: () => {
        replacePointForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    //*pointEditComponent- форма редактирования точек маршрута*//
    const pointEditComponent = new EditView ({
      point,
      onSaveForm: () => {
        replaceEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditForm(){
      replace (pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventComponent.element);
  }

  init() {
    this.#points = this.#eventModel.get();
    render(this.#eventComponent, this.#eventContainer);
    render(this.#eventListComponent, this.#eventContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

}
