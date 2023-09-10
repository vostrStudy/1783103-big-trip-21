import {render} from '../render.js';
import EventList from '../view/event-list-view.js';
import EditView from '../view/event-edit-view.js';
import PointView from '../view/point-view.js';

export default class EventPresenter {
  eventComponent = new EventList();
  eventListComponent = new EventList();

  constructor({eventContainer, eventModel }) {
    this.eventContainer = eventContainer;
    this.eventModel = eventModel;
    
  }

  init() {
    this.points = this.eventModel.get();
    render(this.eventComponent, this.eventContainer);
    render(this.eventListComponent, this.eventContainer);

    render(
      new EditView({point: this.points[0]}),
      this.eventComponent.getElement()
    );

    this.points.forEach((point) => {
      render (
        new PointView ({point}),
        this.eventComponent.getElement()
      );
    });
  }
}
