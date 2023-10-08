function createOfferTemplate(offerItem) {

  return offerItem.offers.map((item) => (
    `<li class="event__offer" >
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
      </li>`
  )).join('');
}
export {createOfferTemplate};
