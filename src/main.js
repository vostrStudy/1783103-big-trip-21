import { render } from './framework/render.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-view.js';
import PointsApiService from './points-api-service.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const AUTHORIZATION = 'Basic hS8sfS88wcl8sa8j';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const pageHeader = document.querySelector('.page-header');
const tripFilters = pageHeader.querySelector('.trip-controls__filters');
const tripMain = pageHeader.querySelector('.trip-main');

const pageMain = document.querySelector('.page-body__page-main');
const tripEvents = pageMain.querySelector('.trip-events');

const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  offersModel,
  destinationsModel,
});

const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  eventContainer: tripEvents,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  container: tripFilters,
  pointsModel,
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

eventPresenter.init();
filterPresenter.init();

pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMain);
  });

