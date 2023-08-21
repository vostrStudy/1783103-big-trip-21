import {render} from '../render.js';
import EventList from '../view/event-list-view.js';
import EditView from '../view/event--edit-view.js';
import EventView from '../view/event-view.js';
import EventModel from '../model/event-model.js';
export default class EventPresenter { 
  eventComponent = new EventList();
  eventListComponent = new EditView();
  constructor({eventContainer, eventModel}) {
    this.eventContainer = eventContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.eventsPoints = [...this.eventModel.getEvents()];
    render(this.eventComponent, this.eventContainer);
    render(new EditView(), this.eventComponent.getElement());
    for (let i = 0; i < this.eventsPoints.length; i++) {
      render(new EventView({points: this.eventsPoints[i]}), this.eventComponent.getElement());
    }
  }
}
console.log('what')
