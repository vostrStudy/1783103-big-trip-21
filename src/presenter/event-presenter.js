import { render, replace } from '../framework/render.js';
import EditView from '../view/event-edit-view.js';
import EventList from '../view/event-list-view.js';
import PointView from '../view/point-view.js';

export default class EventPresenter {
  #eventContainer = null;
  #eventModel = null;

  #points = [];

  #eventComponent = new EventList();
  #eventListComponent = new EventList();

  constructor({eventContainer, eventModel }) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

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
