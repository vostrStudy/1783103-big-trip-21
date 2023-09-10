import {createElement} from '../render.js';
import {createEditTemplate} from '../template/event-edit-template.js';

export default class EditView {
  constructor({point, pointDestination, pointOffers}) {
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