import {createElement} from '../render.js';
import {createEditTemplate} from '../template/event--edit-template.js';

// createEditTemplate (task)


export default class EditView {

  constructor({points}){
    this.points = points;
  }
  
  getTemplate() {
    return createEditTemplate(this.points);
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
