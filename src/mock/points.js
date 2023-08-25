import {getRandomArrayElement,getRandomNumber} from '../utils.js';
import {CITIES,TYPE, UUID} from '../const.js';


function generatePoints (){
  return {
    id:UUID,
    eventDate:"2019-03-18",
    eventPrice: getRandomNumber(),
    destination: getRandomArrayElement(CITIES),
    dateFrom:"2019-03-18T10:30",
    dateTo:"2019-03-18T11:00",
    isFavorite: false,
    type: getRandomArrayElement(TYPE),
    offers:[
      {
        //Не знаю что добавлять сюда, из мок offers? 
      }
    ]
  }
}

  export{generatePoints}
