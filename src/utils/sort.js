import { SortType } from './const.js';

function fromBiggestToSmallest() {
  console.log('sort the array from biggest to smallest');
}

const sort = {
  [SortType.DAY]:(points) =>points,
  [SortType.TIME]:(points) =>points.sort((point) => fromBiggestToSmallest(point)),
  [SortType.PRICE]:(points) =>points.sort((point) => fromBiggestToSmallest(point)),
  [SortType.OFFERS]:() => {
    // throw new Error (`Sort by ${SortType.OFFERS} is disabled`);
  },
  [SortType.EVENT]:() => {
    // throw new Error (`Sort by ${SortType.EVENT} is disabled`);
  },
};

console.log(sort);

export{sort};
