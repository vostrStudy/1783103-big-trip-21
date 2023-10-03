import { render } from './framework/render.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventModel from '../src/model/event-model.js';
import MockService from './mock/points.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-view.js';

const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const mockService = new MockService();
const eventModel = new EventModel(mockService);
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  eventContainer: tripEvents,
  eventModel,
  filterModel,
  onNewPointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  container: tripFilters,
  eventModel,
  filterModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewTaskFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  eventPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMain);

eventPresenter.init();
filterPresenter.init();
