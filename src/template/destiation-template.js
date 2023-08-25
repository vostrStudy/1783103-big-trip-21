import { CITIES,TYPE,DESCRIPTION,UUID } from "../const.js";
import {getRandomArrayElement, getRandomNumber} from '../utils.js';


function createDestinationTemplate(destination){
    const {id,description,pictures,src,pictureDescription} = destination;
   
    const pictureSrc = pictures.map(pictures => pictures.src);
    const pictureAlt = pictures.map(pictures =>pictures.pictureDescription); 
    console.log(destination.id, pictureSrc)
    function createDestinationPhotoTempate(){
        return(
            `<img class="event__photo" src="${pictureSrc}" alt="${pictureAlt}">`
        )
    }
    const destinationPhotoTemplate = createDestinationPhotoTempate();
    return(
        `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
            <div class="event__photos-tape">
                ${destinationPhotoTemplate}
                ${destinationPhotoTemplate}
                ${destinationPhotoTemplate}
                ${destinationPhotoTemplate}
                ${destinationPhotoTemplate}                
            </div>
            </div>
      </section>`
    )
}

export {createDestinationTemplate}