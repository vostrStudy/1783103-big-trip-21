import {render} from '../render.js';
import EventList from '../view/event-list-view.js';
import EditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import OfferView from '../view/offer-view.js';
import DestinationView from '../view/destination-view.js';

export default class EventPresenter { 
  eventComponent = new EventList();
  // eventListComponent = new OfferView();
  constructor({eventContainer, eventModel,offerModel,destinationModel }) {
    this.eventContainer = eventContainer;
    this.eventModel = eventModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;

  }
 

  init() {
    this.eventsPoints = [...this.eventModel.getEvents()];
    this.eventsOffer = [...this.offerModel.getOffers()];
    this.eventsDestination = [...this.destinationModel.getDestination()];
    render(this.eventComponent, this.eventContainer);
    render(new EditView({task: this.eventsPoints[0]}), this.eventComponent.getElement());
    render(new OfferView({offer: this.eventsOffer[0]}), this.eventComponent.getElement());
    render(new DestinationView({destination: this.eventsDestination[0]}), this.eventComponent.getElement());
    
    for (let i = 1; i < this.eventsPoints.length; i++) {
      render(new EventView({task: this.eventsPoints[i]}), this.eventComponent.getElement());
    }
  }
}
  