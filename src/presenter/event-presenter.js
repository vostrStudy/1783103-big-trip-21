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
    this.points = [... eventModel.get()];
  }

  init() {
    render(this.eventComponent, this.eventContainer);
    render(this.eventListComponent, this.eventContainer);

    render(new EditView({
      points: this.points[0],
      pointDestination: this.destination,
      pointOffers: this.offers,
    }),
    this.eventComponent.getElement());

    this.points.forEach((point) => {
      render (
        new PointView ({
          point ,
          pointDestination: this.destination,
          pointOffers: this.offers,
        }),
        this.eventComponent.getElement()
      );
    });
  }
}
