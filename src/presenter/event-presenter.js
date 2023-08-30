import {render} from '../render.js';
import EventList from '../view/event-list-view.js';
import EditView from '../view/event-edit-view.js';
import PointView from '../view/point-view.js';
import OfferView from '../view/offer-view.js';
import DestinationView from '../view/destination-view.js';
import SortView from '../view/sort-view.js';

export default class EventPresenter { 
  eventComponent = new EventList();
  eventListComponent = new EventList();

  constructor({eventContainer, eventModel,offerModel,destinationModel }) {
    this.eventContainer = eventContainer;
    this.eventModel = eventModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;

    this.points = [... eventModel.get()];
  }
 

  init() {
    // this.eventsPoints = [...this.eventModel.getPoints()];
    // this.eventsOffer = [...this.offerModel.getOffers()];
    // this.eventsDestination = [...this.destinationModel.getDestination()];
    render(this.eventComponent, this.eventContainer);
    render(this.eventListComponent, this.eventContainer);

    render(new EditView({
      points: this.points[0],
      pointDestinations: this.destinationModel.get(),
      pointOffers: this.offerModel.get(),
    }), 
    this.eventComponent.getElement());

    this.points.forEach((point) => {
      render (
        new PointView ({
          point,
          pointDestination: this.destinationModel.getById(point.destination),
          pointOffers: this.offerModel.getByType(point.type)
        }),
        this.eventComponent.getElement()
      )
    })
  }
}
  