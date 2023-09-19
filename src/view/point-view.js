import AbstractView from '../framework/view/abstract-view.js';
import {createPointTemplate} from '../template/point-template.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handlePointRollClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onPointRollClick, onFavoriteClick }){
    super();
    this.#point = point;
    this.#handlePointRollClick = onPointRollClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#pointRollClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener ('click', this.#favoriteClickHandler);
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

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
