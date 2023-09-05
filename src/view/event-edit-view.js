import {createElement} from '../render.js';
import {createEditTemplate, BLANK_POINT } from '../template/event-edit-template.js';

export default class EditView {

  constructor({point = BLANK_POINT, pointDestination, pointOffers}) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createEditTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers:this.pointOffers
    });
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
