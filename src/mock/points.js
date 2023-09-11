import {randomBoolean,getRandomArrayElement,getRandomNumber, getRandomValue,getRandomInteger} from '../utils.js';
import { CITIES,TYPE, UUID,POINT_COUNT,DESTINATION_COUNT,DESCRIPTION } from '../const.js';


export default class MockService {
  points = [];

  constructor(){
    this.points = this.generatePoints();
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
    return Array.from({ length: POINT_COUNT }, () => ({
      id: UUID,
      eventDate: '2019-03-18',
      dateFrom: '2019-03-18T10:30',
      dateTo: '2019-03-18T11:00',
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
    return this.points;
  }
}
