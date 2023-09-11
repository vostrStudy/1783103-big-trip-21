function createOfferButtonTemplate(offerItem) {
  return offerItem.offers.map(({
    id,
    offerPrice: price,
    title,
  }) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
  )).join('');
}

export { createOfferButtonTemplate };
