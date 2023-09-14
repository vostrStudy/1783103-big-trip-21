import {randomBoolean,getRandomArrayElement,getRandomNumber, getRandomValue,getRandomInteger, generateRandomDate, getDateTo} from '../utils/utils.js';
import { CITIES,TYPE, UUID,POINT_COUNT,DESTINATION_COUNT,DESCRIPTION } from '../utils/const.js';


export default class MockService {
  #points = [];

  constructor(){
    this.#points = this.generatePoints();
  }

  generateDestination(destinationAmount) {
    return Array.from({ length: destinationAmount }, () => ({
      id: UUID,
      description:DESCRIPTION,
      name:getRandomArrayElement(CITIES),
      pictures: Array.from({length:DESTINATION_COUNT}, () => ({
        src:`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        pictureDescription:UUID,
      })
      )
    }));
  }

  generateOffers(offersAmount) {
    return TYPE.map((type) => ({
      type,
      offers : Array.from({length: offersAmount}, () => ({
        id: UUID,
        title: `Offer ${type}`,
        offerPrice: getRandomNumber(),
      })
      )
    }));
  }

  generatePoints() {
  // for recieving the data from the server, need to delete the getter for the dateTo key//
    return Array.from({ length: POINT_COUNT }, () => ({
      id: UUID,
      eventDate: generateRandomDate(new Date(2023, 1, 1), new Date()),
      get dateFrom(){
        return this.eventDate;
      },
      get dateTo(){
        return getDateTo(this.eventDate);
      },
      price: getRandomNumber(),
      type: getRandomArrayElement(TYPE),
      isFavorite: randomBoolean,
      offers: this.generateOffers(
        getRandomInteger(0, 2),
      ),
      destinations: getRandomValue(
        this.generateDestination(3),
      ),
    }));
  }

  getPoints(){
    return this.#points;
  }
}
