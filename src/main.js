import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventModel from '../src/model/event-model.js';
import MockService from './mock/points.js';
import FilterModel from './model/filter-model.js';

const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const mockService = new MockService();
const eventModel = new EventModel(mockService);
const filterModel = new FilterModel(mockService);

const eventPresenter = new EventPresenter({
  eventContainer: tripEvents,
  eventModel,
});

const filterPresenter = new FilterPresenter({
  container: tripFilters,
  eventModel
});

eventPresenter.init();
filterPresenter.init();
