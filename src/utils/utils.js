import dayjs from 'dayjs';
const FULL_DATE_FORMAT = 'DD/mm/YY HH:mm';
const DATE_FORMAT = 'DD MMM';
const TIME_FORMAT = 'HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(){
  return Math.floor(Math.random() * 1000) + 1;
}

function getRandomNumberPhotos(){
  return Math.floor(Math.random() * 10) + 1;
}

function formatEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function formatFullDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(FULL_DATE_FORMAT) : '';
}

function formatEventTimeFrom(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
}
function formatEventTimeTo(dateTo) {
  return dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
}

function getEventDuration (dateFrom,dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom),'minutes');
}


function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomValue(items) {
  return items[getRandomInteger(1, items.length - 1)];
}

const randomBoolean = Math.random() >= 0.5;

function generateRandomDate(from, to) {
  return new Date(
    from.getTime() +
      Math.random() * (to.getTime() - from.getTime()),
  );
}
//*source: https://bobbyhadz.com/blog/javascript-generate-random-date*//

function getDateTo (date){
  return dayjs(date).add(30,'minutes');
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}


function sortByDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateTo);

  return weight ?? dayjs(pointB.dateTo).diff(dayjs(pointA.dateFrom));
}

function sortByPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.price, pointB.price);

  return weight ?? pointB.price - pointA.price;
}

function sortByTime(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateTo);
  const durationA = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const durationB = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));

  return weight ?? durationA - durationB;
}


function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export{getRandomArrayElement,getRandomNumber, formatEventDate,
  formatEventTimeFrom, formatEventTimeTo, getEventDuration,
  getRandomNumberPhotos,formatFullDate, getRandomInteger, getRandomValue,
  randomBoolean, generateRandomDate, getDateTo,sortByDay,sortByPrice,sortByTime, updateItem };
