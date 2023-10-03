import {remove, render, RenderPosition} from '../framework/render.js';
import EditView from '../view/event-edit-view.js';
import { UserAction, UpdateType } from '../utils/const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {

    if (this.#pointComponent !== null) {
      return;
    }

    this.#pointComponent = new EditView({

      onDeleteClick: this.#handleDeleteClick,
      nSaveForm: this.#handleOnSaveForm,
      onCloseForm: this.#handleCloseForm,
    //   onOfferChange: this.#handleOfferChange,
    });

    render(this.#pointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointComponent);
    this.#pointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleOnSaveForm = (point) => {

    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,

      {id: self.crypto.randomUUID(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleCloseForm = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
