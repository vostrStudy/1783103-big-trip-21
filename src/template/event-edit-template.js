import { CITIES,TYPE,UUID } from "../const.js";
import {getRandomArrayElement,formatFullDate, getEventDuration} from '../utils.js';
import { createDestinationTemplate } from "./destiation-template.js";
import { createOfferTemplate } from "./offer-template.js";



const BLANK_POINT = {
  id:UUID,
  eventDate:null,
  eventPrice: 0,
  destination: getRandomArrayElement(CITIES),
  dateFrom:null,
  dateTo:null,
  isFavorite: false,
  type: getRandomArrayElement(TYPE),
  offers:[],
}

function createEventTypeItemTemplate(type){
  return(
    `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
  )
}

 function createEditTemplate({point, pointDestination, pointOffers, offers}){

  const { type,destination, dateFrom,dateTo,eventPrice,eventDate} = point;
  
  const eventTypeItem = createEventTypeItemTemplate(type);
  const destinationOption = destination;
  
  return(
            `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}

                      ${createEventTypeItemTemplate(type)}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    Flight
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationOption}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    <option value="${destinationOption}"></option>
                    <option value="${destinationOption}"></option>
                    <option value="${destinationOption}"></option>
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Cancel</button>
              </header>
              <section class="event__details">
                ${createOfferTemplate({pointOffers})}
                ${createDestinationTemplate({pointDestination})}

            </form>
          </li>`
          );
}

export {createEditTemplate,BLANK_POINT };
