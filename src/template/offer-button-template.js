function createOfferButtonTemplate(offerItem) {

  const checked = offerItem.offers.includes(offerItem.offers.id) ? 'checked' : '';
  return offerItem.offers.map(({
    id,
    offerPrice: price,
    title,
  }) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${id}"
           type="checkbox" name="${title}" ${checked}>
          <label class="event__offer-label" for="${title}-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
  )).join('');
}

export { createOfferButtonTemplate };
