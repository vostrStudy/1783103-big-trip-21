import AbstractView from '../framework/view/abstract-view.js';
import {createEventsListTemplate} from '../template/event-list-template.js';

export default class EventList extends AbstractView{
  get template() {
    return createEventsListTemplate();
  }
}
