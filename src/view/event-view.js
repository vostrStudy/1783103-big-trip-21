import {createElement} from '../render.js';
import {createEventTemplate} from '../template/event-template.js';

export default class EventView {
  constructor({task}){
    this.task = task;
  }
  getTemplate() {
    return createEventTemplate(this.task);
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
