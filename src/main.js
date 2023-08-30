import {render} from '../src/render.js';
import FilterView from '../src/view/filter-view.js';
import SortView from '../src/view/sort-view.js';


import EventPresenter from './presenter/event-presenter.js';
import EventModel from '../src/model/event-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import MockService from './service/mock-service.js';

const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const offerModel = new OfferModel(mockService);
const eventModel = new EventModel(mockService);


const eventPresenter = new EventPresenter({
    eventContainer: tripEvents,
    eventModel,
    offerModel,
    destinationModel,
});

render (new FilterView(),tripFilters);
render (new SortView(), tripEvents);


eventPresenter.init();
