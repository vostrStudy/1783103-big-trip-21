import {remove, render, RenderPosition} from '../framework/render.js';
import EditView from '../view/event-edit-view.js';
import { UserAction, UpdateType } from '../utils/const.js';


export default class NewPointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;


  #handleDataChange = null;
  #handleDestroy = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditView({

      onDeleteClick: this.#handleDeleteClick,
      nSaveForm: this.#handleOnSaveForm,
      onCloseForm: this.#handleCloseForm,
    //   onOfferChange: this.#handleOfferChange,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.BEFOREEND);
    debugger
    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

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
