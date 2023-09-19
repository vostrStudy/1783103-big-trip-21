// import { render } from './framework/render.js';
// import SortView from '../src/view/sort-view.js';
// import { generateSort } from './mock/sort.js';


import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
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

const filterPresenter = new FilterPresenter({
  container: tripFilters,
  eventModel
});

// const sort = generateSort(eventModel.events);

// render (new SortView({items:this.#sortType}), tripEvents);


eventPresenter.init();
filterPresenter.init();
