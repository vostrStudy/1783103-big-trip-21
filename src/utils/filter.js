import { FilterType } from './const.js';
import { generateRandomDate } from './utils.js';
import dayjs from 'dayjs';

const currentDate = generateRandomDate(new Date(2023, 1, 1), new Date());
// console.log(currentDate);

function isPast(dateTo) {
  return dateTo && dayjs(currentDate).isAfter(dateTo, 'minutes');
}

function isCurrent (dateFrom, dateTo) {
  return dateTo && (dayjs(currentDate).isSame(dateFrom, 'minute') || dayjs(currentDate).isAfter(dateFrom, 'minute'))
  && (dayjs().isSame(dateTo, 'minute') || dayjs().isBefore(dateTo, 'minute'));
}

function isFuture (dateFrom) {
  return dateFrom && dayjs(currentDate).isBefore (dateFrom, 'minutes');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isCurrent(point.dateFrom,point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};

export {filter};
