function createOfferTemplate(pointOffers){
    const{offers} = pointOffers;
  const offersArray = pointOffers.offers
  const offersIdArray = offersArray.map(offersArray => offersArray.id);
  const offersTitleArray = offersArray.map(offersArray => offersArray.title);
  const offersPriceArray = offersArray.map(offersArray => offersArray.offerPrice);
  console.log(offersArray)
  console.log(offersIdArray, offersTitleArray, offersPriceArray)
// const offersArrayArray = offersArray.map((offersArray) => 


for(let i=0; i <= offersArray.length; i++ ){
  return(
  `
  <div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offersIdArray[i]}" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offersTitleArray[i]}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offersPriceArray[i]}</span>
    </label>
  </div>
</div>
`
)    

}
  
  
}  
    
  
  export {createOfferTemplate};