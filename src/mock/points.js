import {getRandomArrayElement} from '../utils.js';
import {CITIES,TYPE} from '../const.js';

const mockPoints = [
  {
    basePrice: 100,
    dateFrom: 11.01,
    dateTo: 11.20,
    destination: getRandomArrayElement(CITIES),
    isFavorite: true,
    offers: true,
    type: getRandomArrayElement(TYPE),
  },
  {
    basePrice: 100,
    dateFrom: 11.01,
    dateTo: 11.20,
    destination: getRandomArrayElement(CITIES),
    isFavorite: true,
    offers: true,
    type: getRandomArrayElement(TYPE),
  },
  {
    basePrice: 100,
    dateFrom: 11.01,
    dateTo: 11.20,
    destination: getRandomArrayElement(CITIES),
    isFavorite: true,
    offers: true,
    type: getRandomArrayElement(TYPE),
  },
  {
    basePrice: 100,
    dateFrom: 11.01,
    dateTo: 11.20,
    destination: getRandomArrayElement(CITIES),
    isFavorite: true,
    offers: true,
    type: getRandomArrayElement(TYPE),
  },
  {
    basePrice: 100,
    dateFrom: 11.01,
    dateTo: 11.20,
    destination: getRandomArrayElement(CITIES),
    isFavorite: true,
    offers: true,
    type: getRandomArrayElement(TYPE),
  },
]

function getRandomPoint() {
    return getRandomArrayElement(mockPoints);
  }

console.log(mockPoints.type)

console.log(mockPoints)

  export{getRandomPoint}
