import {createElement} from '../render.js';
import {createPointTemplate} from '../template/point-template.js';

export default class PointView {

  constructor({ point }){
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers:this.pointOffers,
    });
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
