import {createElement} from '../render.js';
import {createDestinationTemplate} from '../template/destiation-template.js';

export default class DestinationView {
  constructor({destination}){
    this.destination = destination;
  }
    getTemplate() {
        return createDestinationTemplate(this.destination);
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