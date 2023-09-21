import { SortType } from './const.js';
import { sortByDay,sortByPrice, sortByTime } from './utils.js';

const sort = {
  [SortType.DAY]:(points) => points.toSorted(sortByDay),
  [SortType.TIME]:(points) => points.toSorted(sortByTime),
  [SortType.PRICE]:(points) => points.toSorted(sortByPrice),
  [SortType.OFFERS]:() => {
    throw new Error (`Sort by ${SortType.OFFERS} is disabled`);
  },
  [SortType.EVENT]:() => {
    throw new Error (`Sort by ${SortType.EVENT} is disabled`);
  },
};

export{sort};
