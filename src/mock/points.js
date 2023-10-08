import {randomBoolean,getRandomArrayElement,getRandomNumber,getRandomInteger, generateRandomDate} from '../utils/utils.js';
import { CITIES,TYPE, UUID,POINT_COUNT,DESTINATION_COUNT,DESCRIPTION } from '../utils/const.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class MockService extends Observable {
  #points = [];

  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      // console.log(point);
      console.log(points.map(this.#adaptToClient));
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }
  // constructor(){
  //   super();
  //   this.#points = this.generatePoints();
  // }

  // generateDestination(destinationAmount) {
  //   return Array.from({ length: destinationAmount }, () => ({
  //     id: self.crypto.randomUUID(),
  //     description:DESCRIPTION,
  //     name:getRandomArrayElement(CITIES),
  //     pictures: Array.from({length:DESTINATION_COUNT}, () => ({
  //       src:`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
  //       pictureDescription:UUID,
  //     })
  //     )
  //   }));
  // }

  // generateOffers(offersAmount) {
  //   return TYPE.map((type) => ({
  //     type,
  //     offers : Array.from({length: offersAmount}, () => ({
  //       id: self.crypto.randomUUID(),
  //       title: `Offer ${type}`,
  //       offerPrice: getRandomNumber(),
  //     })
  //     )
  //   }));
  // }

  // generatePoints() {

  //   const destinations = this.generateDestination(4);

  //   return Array.from({ length: POINT_COUNT }, (_el, idx) => ({
  //     id: self.crypto.randomUUID(),
  //     // eventDate: generateRandomDate(new Date(2023, 1, 1), new Date()),
  //     dateFrom: generateRandomDate(new Date(2023, 1, 1), new Date()),
  //     dateTo: generateRandomDate(new Date(2023, 1, 1), new Date()),
  //     price: getRandomNumber(),
  //     type: getRandomArrayElement(TYPE),
  //     isFavorite: randomBoolean,
  //     offers: this.generateOffers(
  //       getRandomInteger(1, 5),
  //     ),
  //     destinations,
  //     destination: destinations[idx].name,
  //   }));
  // }

  get(){
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      price: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
