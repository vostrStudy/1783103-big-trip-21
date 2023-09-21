import AbstractView from '../framework/view/abstract-view.js';
import {createOfferButtonTemplate} from '../template/offer-button-template.js';

export default class OfferView extends AbstractView{
  #offers = null;

  constructor({offers}){
    super();
    this.#offers = offers;
  }

  get template() {
    return createOfferButtonTemplate(this.#offers);
  }
}
