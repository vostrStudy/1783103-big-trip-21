import { SortType } from './const.js';
import { sortTimeDown } from './utils.js';

const sort = {
  [SortType.DAY]:(points) =>points,
  [SortType.TIME]:(points) =>points.toSorted(sortTimeDown),
  [SortType.PRICE]:(points) =>points.toSorted(sortTimeDown),
  [SortType.OFFERS]:() => {
    throw new Error (`Sort by ${SortType.OFFERS} is disabled`);
  },
  [SortType.EVENT]:() => {
    throw new Error (`Sort by ${SortType.EVENT} is disabled`);
  },
};

export{sort};
