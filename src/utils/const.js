import { getRandomInteger } from './utils.js';

const CITIES = [
  'Tokyo',
  'Singapore',
  'Copenhagen',
  'Stockholm',
  'Melbourne',
  'Hong Kong',
  'Amsterdam',
  'Wellington'
];

const DURATION = [];

const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];

const PRICE = [];

const TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const FilterType = {
  EVERYTHING:'everything',
  FUTURE: 'future',
  PRESENT:'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

// const UserAction = {
//   UPDATE_TASK: 'UPDATE_TASK',
//   ADD_TASK: 'ADD_TASK',
//   DELETE_TASK: 'DELETE_TASK',
// };

// const UpdateType = {
//   PATCH: 'PATCH',
//   MINOR: 'MINOR',
//   MAJOR: 'MAJOR',
// };

const UUID = self.crypto.randomUUID();
const DESTINATION_COUNT = getRandomInteger(1, 10);
const POINT_COUNT = 4;

export {CITIES,TYPE,DURATION,PRICE,
  DESCRIPTION,UUID,DESTINATION_COUNT,
  POINT_COUNT, FilterType,SortType,
  enabledSortType, Mode};
