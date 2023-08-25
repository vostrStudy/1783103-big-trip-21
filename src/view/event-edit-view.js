import {createElement} from '../render.js';
import {createEditTemplate, BLANK_POINT } from '../template/event-edit-template.js';

// createEditTemplate (task)


export default class EditView {

    constructor({task = BLANK_POINT}) {
      this.task = task;
    }

  
  getTemplate() {
    return createEditTemplate(this.task);
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
