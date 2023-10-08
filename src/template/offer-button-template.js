function createOfferButtonTemplate(offerItem) {

  return offerItem.offers.map(({
    id,
    price,
    title,
    isChecked,
  }) => (
    `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${id}"
           type="checkbox" name="${title}"
           data-item = "${title}"
           ${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="${title}-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
            
          </label>
        </div>`
  )).join('');
}

export { createOfferButtonTemplate };
