import AbstractView from '../framework/view/abstract-view';
import { createNoPointTemplate } from '../template/no-point-template';

export default class NoPoinTView extends AbstractView {
  #filterTypeNoPoint = null;

  constructor ({filterTypeNoPoint}) {
    super();
    this.#filterTypeNoPoint = filterTypeNoPoint;
  }

  get template() {
    return createNoPointTemplate(this.#filterTypeNoPoint);
  }
}
