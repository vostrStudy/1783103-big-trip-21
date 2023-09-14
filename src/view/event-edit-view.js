import AbstractView from '../framework/view/abstract-view.js';
import {createEditTemplate} from '../template/event-edit-template.js';

export default class EditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handleSaveForm = null;

  constructor({point, pointDestination, pointOffers, onSaveForm}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleSaveForm = onSaveForm;

    this.element.querySelector('.event__save-btn')
      .addEventListener('submit',this.#saveFormHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click',this.#saveFormHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click',this.#saveFormHandler);
  }

  get template() {
    return createEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers:this.#pointOffers
    });
  }

  #saveFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveForm();
  };
}
