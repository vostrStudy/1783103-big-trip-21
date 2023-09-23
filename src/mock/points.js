import {randomBoolean,getRandomArrayElement,getRandomNumber, getRandomValue,getRandomInteger, generateRandomDate} from '../utils/utils.js';
import { CITIES,TYPE, UUID,POINT_COUNT,DESTINATION_COUNT,DESCRIPTION } from '../utils/const.js';


export default class MockService {
  #points = [];

  constructor(){
    this.#points = this.generatePoints();
  }

  generateDestination(destinationAmount) {
    return Array.from({ length: destinationAmount }, () => ({
      id: self.crypto.randomUUID(),
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
        id: self.crypto.randomUUID(),
        title: `Offer ${type}`,
        offerPrice: getRandomNumber(),
      })
      )
    }));
  }

  generatePoints() {
    return Array.from({ length: POINT_COUNT }, () => ({
      id: self.crypto.randomUUID(),
      eventDate: generateRandomDate(new Date(2023, 1, 1), new Date()),
      dateFrom: generateRandomDate(new Date(2023, 1, 1), new Date()),
      dateTo: generateRandomDate(new Date(2023, 1, 1), new Date()),
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
