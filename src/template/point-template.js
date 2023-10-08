import { formatMainEventDate, formatEventTimeFrom,formatEventTimeTo, getEventDuration } from '../utils/utils.js';
import { createOfferTemplate } from './offer-template.js';


function createPointTemplate({point, pointDestination, pointOffers}){

  const { destination, isFavorite, type, dateFrom, dateTo, price} = point;

  const date = formatMainEventDate (dateFrom);
  const timeFrom = formatEventTimeFrom (dateFrom);
  const timeTo = formatEventTimeTo (dateTo);
  const duration = getEventDuration(dateFrom, dateTo);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn event__favorite-btn--disabled';
  const destinationsById = pointDestination.find((destinationById) => destinationById.id === destination);
  const offersByType = pointOffers.find((offerByType) => offerByType.type === type);

  return(
    `
    <li class="trip-events__item">
        <div class="event">
        <time class="event__date" datetime="2019-03-18">${date}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationsById.name} </h3>
        <div class="event__schedule">
            <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
            </p>
            <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${createOfferTemplate(offersByType)}
        </section>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
        </div>
  </li>`);
}
export {createPointTemplate};
