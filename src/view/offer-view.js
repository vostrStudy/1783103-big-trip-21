import {createElement} from '../render.js';
import {createOfferTemplate} from '../template/offer-template.js';

export default class OfferView {
  constructor(pointOffers) {
    this.pointOffers = point;

  }

  getTemplate() {
    return createOfferTemplate(this.pointOffers);
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
