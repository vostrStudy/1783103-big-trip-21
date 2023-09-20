import { SortType } from './const.js';
import { sortByDay,sortByPrice } from './utils.js';

const sort = {
  [SortType.DAY]:(points) => points.toSorted(sortByDay),
  [SortType.TIME]:() => {
    throw new Error (`Sort by ${SortType.OFFERS} is disabled`);
  },
  [SortType.PRICE]:(points) => points.toSorted(sortByPrice),
  [SortType.OFFERS]:() => {
    throw new Error (`Sort by ${SortType.OFFERS} is disabled`);
  },
  [SortType.EVENT]:() => {
    throw new Error (`Sort by ${SortType.EVENT} is disabled`);
  },
};

export{sort};
