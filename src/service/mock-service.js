// import { TYPE } from '../const';
// import { generateDestination } from '../mock/destination.js';
// import { generateOffers } from '../mock/offer.js';
// import {generatePoints} from '../mock/points.js';
// import { getRandomNumber, getRandomValue,getRandomInteger, getRandomArrayElement } from '../utils';
// import { DESTINATION_COUNT,OFFER_COUNT, POINT_COUNT,EVENT_COUNT } from '../const';

// export default class MockService {
//   destinations = [];
//   offers = [];
//   points = [];

//   constructor(){
//     this.destinations = this.generateDestination();
//     this.offers = this.generateOffers();
//     this.points = this.generatePoints();
//   }

//   getDestinations(){
//     return this.destinations;
//   }

//   getOffers(){
//     return this.offers;
//   }

//   getPoints(){
//     return this.points;
//   }

//   generateDestination() {
//     return Array.from ({length:DESTINATION_COUNT}, () => generateDestination()
//     );
//   }

//   generateOffers() {
//     return TYPE.map((type) => ({
//       type,
//       offers : Array.from({length: OFFER_COUNT}, () => generateOffers(type)
//       )
//     }));
//   }

//   generatePoints() {
//     // return Array.from({length: POINT_COUNT}, () => {
//     //   const type = getRandomArrayElement(TYPE);
//     //   const destination = getRandomValue(this.destinations);
//     //   const hasOffers = getRandomInteger(0,1);
//     //   const offersByType = this.offers
//     //     .find((offerByType) => offerByType.type === type);
//     //   const offerIds = (hasOffers)
//     //     ? offersByType.offers
//     //       .slice (0, getRandomInteger(0, OFFER_COUNT))
//     //       .map((offer) => offer.id)
//     //     : [];
//       return generatePoints ();

//     }

// }
