import { CITIES,TYPE,UUID } from '../const.js';
import { formatEventDate, formatEventTimeFrom,formatEventTimeTo, formatFullDate } from '../utils.js';
import { createDestinationTemplate } from './destiation-template.js';
import { createOfferTemplate } from './offer-template.js';

function createEventTypeItemTemplate(type){
  return(
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
  );
}

function createEditTemplate({point,pointDestination,pointOffers}){

  const { destinations,isFavorite,type,id,eventPrice, eventDate, dateFrom,dateTo,price,hasOffers,offers} = point;

  const eventTypeItem = createEventTypeItemTemplate(type);
  console.log(offers)
  const offersByType = offers.find((offerByType) => offerByType.type === type);
  console.log(offersByType)

  const timeFrom = formatFullDate (point.dateFrom);
  const timeTo = formatFullDate (point.dateTo);
  // const destinationById = destinations.find((destinationById) => destinationById.id === id);
  // console.log(destinationById)


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

                      ${createEventTypeItemTemplate(type)}

                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.name}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    <option value="${destinations.name}"></option>
                    <option value="${destinations.name}"></option>
                    <option value="${destinations.name}"></option>
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
                <button class="event__reset-btn" type="reset">Cancel</button>
              </header>
              <section class="event__details">
              ${createOfferTemplate(offersByType)}
                ${createDestinationTemplate(destinations)}

            </form>
          </li>`
  );
}

export {createEditTemplate};
