import { render, replace, remove } from '../framework/render.js';
import EditView from '../view/event-edit-view.js';
import PointView from '../view/point-view.js';
import { Mode } from '../utils/const.js';
import { UserAction, UpdateType } from '../utils/const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    //creating constants for storing previously rendered items.
    //If the items have been rendered before (not equal to null),
    //need to replce the previous ones with the new ones

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      onPointRollClick: this.#handleOnPointRollClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditView ({
      point: this.#point,
      pointOffers: this.#point.offers,
      onSaveForm: this.#handleOnSaveForm,
      onDeleteClick: this.#handleDeleteClick
    });


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }


  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {

    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  }

  #replacePointToEdit = () => {

    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;

  };

  #replaceEditToPoint = () => {

    replace (this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {

    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleOnPointRollClick = () => {

    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.PATCH,
      this.#point,
    );
    this.#replacePointToEdit();
  };

  #handleOnSaveForm = (update) => {

    function isTypeEqual(TypeA, TypeB) {
      return (TypeA === TypeB);
    }
    const isMinorUpdate =
    //* Changed the type
   ! isTypeEqual (this.#point.type, update.type);

    this.#handleDataChange(

      UserAction.UPDATE_TASK,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
      // UpdateType.MINOR,
      // this.#point,
    );
    // this.#replaceEditToPoint();
  };
  //* Changed the destination
  //* Changed the time
  //* Changed the price


  #handleDeleteClick = () => {
    this.#handleDataChange(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      this.#point,

    );
  };


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };
}

