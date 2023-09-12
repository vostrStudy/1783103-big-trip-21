import AbstractView from '../framework/view/abstract-view.js';
import {createPointTemplate} from '../template/point-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handlePointRollClick = null;

  constructor({ point, onPointRollClick }){
    super();
    this.#point = point;
    this.#handlePointRollClick = onPointRollClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#pointRollClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers:this.#pointOffers,
    });
  }

  #pointRollClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlePointRollClick();
  };
}
