import AbstractView from '../framework/view/abstract-view.js';
import {createOfferButtonTemplate} from '../template/offer-button-template.js';

export default class OfferView extends AbstractView{
  #offers = null;
  #handleOffersChange = null;
  constructor({offers, isChecked, onOfferChange}){
    super();
    this.#offers = offers;
    this.#handleOffersChange = onOfferChange;

    this.element.addEventListener('change', this.#offerChangeHandler);
  }

  get template() {
    return createOfferButtonTemplate(this.#offers);
  }

  #offerChangeHandler = (evt) => {

    evt.preventDefault();
    this.#handleOffersChange(evt.target.dataset.item);
  };
}
