function createOfferTemplate(offerItem) {
  return offerItem.offers.map((item) => (
    `<li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.offerPrice}</span>
      </li>`
    )).join('');
  }  
  export {createOfferTemplate};