import AbstractView from '../framework/view/abstract-view.js';
import {createDestinationTemplate} from '../template/destiation-template.js';

export default class DestinationView extends AbstractView{
  #pointDestination = null;

  constructor({pointDestination}){
    super();
    this.#pointDestination = pointDestination;
  }

  get template(){
    if (!this.#pointDestination) {
      debugger
    }
    return createDestinationTemplate(this.#pointDestination);
  }
}
