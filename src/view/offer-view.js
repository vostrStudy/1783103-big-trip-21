import {createElement} from '../render.js';
import {createOfferButtonTemplate} from '../template/offer-button-template.js';

export default class OfferView {

  constructor({offers}){
    this.offers = offers;
  }

  getTemplate() {
    return createOfferButtonTemplate(this.offers);
  }

  getElement(){
    if(!this.element){
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
