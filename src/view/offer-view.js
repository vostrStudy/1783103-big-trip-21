import {createElement} from '../render.js';
import {createOfferTemplate} from '../template/offer-template.js';

export default class OfferView {
  constructor({offer}){
    this.offer = offer;
  }
    getTemplate() {
        return createOfferTemplate(this.offer);
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
