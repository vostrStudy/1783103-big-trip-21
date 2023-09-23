import { formatFullDate } from '../utils/utils.js';
import { createDestinationTemplate } from './destiation-template.js';
import { createOfferButtonTemplate } from './offer-button-template.js';
import { TYPE, CITIES } from '../utils/const.js';

function createEventTypeItemTemplate(){
  return TYPE.map((type) => (
    `<div class="event__type-item">
         <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
         <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`
  )).join('');

}

function createDestinationItemTemplate(){
  return CITIES.map((destinations) => (
    `
    <option value="${destinations}"></option>
    `
  )).join('');
}


function createEditTemplate({state}){
  const point = state;
  console.log(state.destinations)
  const { destinations,type,price,offers} = point;
  const offersByType = offers.find((offerByType) => offerByType.type === type);
  const timeFrom = formatFullDate (point.dateFrom);
  const timeTo = formatFullDate (point.dateTo);

  return(
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeItemTemplate(point)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${createDestinationItemTemplate(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
              </header>
              <section class="event__details">
              <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${createOfferButtonTemplate(offersByType)}
                  </div>
                </section>
              </section>
                ${createDestinationTemplate(destinations)}

            </form>
          </li>`
  );
}

export {createEditTemplate};
