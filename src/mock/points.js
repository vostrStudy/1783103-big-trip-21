import {getRandomArrayElement,getRandomNumber} from '../utils.js';
import {CITIES,TYPE, UUID} from '../const.js';


function generatePoints (type,destinationId, offerIds){
  return {
    id:UUID,
    eventDate:"2019-03-18",
    eventPrice: getRandomNumber(),
    destination: destinationId,
    dateFrom:"2019-03-18T10:30",
    dateTo:"2019-03-18T11:00",
    isFavorite: false,
    type,
    offers:offerIds,
  }
}
  export{generatePoints}
