function createOfferTemplate(pointOffers){

  const{offers,type,id,title,offerPrice, point} = pointOffers;
  

  console.log(offers)


  return(
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offerPrice}</span>
            </label>
          </div>
        </div>
      </section>`
  );
}

export {createOfferTemplate};
