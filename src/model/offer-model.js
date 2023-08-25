import { generateOffer } from '../mock/offer.js';

const EVENT_COUNT = 5;

export default class OfferModel {
  offers = Array.from({length: EVENT_COUNT}, generateOffer);

  getOffers() {
    return this.offers;
  }

  getByType(type) {
    return this.offers
    .find((offers) => offers.type === type).offers;
  }
}

// export default class OfferModel {
//     constructor(service){
//       this.service = service;
//       this.offers = this.service.getOffers
//     }


//   get() {
//     return this.offers;
//   }

  // getByType(type) {
  //   return this.offers
  //   findCacheDir((offer)=> offer.type === type).offers;
  // }
// }