import { render } from './render.js';
import FilterView from '../src/view/filter-view.js';
import SortView from '../src/view/sort-view.js';


import EventPresenter from './presenter/event-presenter.js';
import EventModel from '../src/model/event-model.js';
import MockService from './mock/points.js';

const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const mockService = new MockService();
const eventModel = new EventModel(mockService);


const eventPresenter = new EventPresenter({
  eventContainer: tripEvents,
  eventModel,
});

render (new FilterView(),tripFilters);
render (new SortView(), tripEvents);


eventPresenter.init();
