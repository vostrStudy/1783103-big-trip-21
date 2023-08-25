import dayjs from 'dayjs';
const FULL_DATE_FORMAT = 'YY/MM/DDThh:mm'
const DATE_FORMAT = 'DD MMM';
const TIME_FORMAT = 'hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(){
    return Math.floor(Math.random() *1000) +1;
}

function getRandomNumberPhotos(){
    return Math.floor(Math.random() *10) +1;
}

function formatEventDate(eventDate) {
    return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

function formatFullDate(dateFrom) {
    return dateFrom ? dayjs(dateFrom).format(FULL_DATE_FORMAT): '';
}

function formatEventTimeFrom(dateFrom) {
    return dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
}
function formatEventTimeTo(dateTo) {
    return dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
}

function getEventDuration (dateFrom,dateTo) {
    const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom),'minutes');
}



export{getRandomArrayElement,getRandomNumber, formatEventDate,
     formatEventTimeFrom, formatEventTimeTo, getEventDuration,getRandomNumberPhotos,formatFullDate};
