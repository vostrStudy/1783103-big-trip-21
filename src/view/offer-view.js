import {createElement} from '../render.js';
import {createOfferTemplate} from '../template/offer-template.js';

export default class OfferView {

  constructor({offers}){
    this.offers = offers;
  }

  getTemplate() {
    return createOfferTemplate(this.offers);
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
