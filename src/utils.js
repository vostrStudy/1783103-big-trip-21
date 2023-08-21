import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatEventDate(date) {
    return date ? dayjs(date).format(DATE_FORMAT) : '';
}


export{getRandomArrayElement, formatEventDate};
