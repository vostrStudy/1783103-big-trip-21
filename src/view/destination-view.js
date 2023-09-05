import {createElement} from '../render.js';
import {createDestinationTemplate} from '../template/destiation-template.js';

export default class DestinationView {
  
  constructor({pointDestination}){
    this.pointDestination = pointDestination;
  }
    getTemplate() {
        return createDestinationTemplate(this.pointDestination);
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
  