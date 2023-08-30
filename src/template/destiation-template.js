import { CITIES,TYPE,DESCRIPTION,UUID } from "../const.js";
import {getRandomArrayElement, getRandomNumber} from '../utils.js';


function createDestinationTemplate(destination){
    const {pointDestination,description} = destination;
   console.log(pointDestination)
    const pictureSrc = 'pictures.map(picture => picture.src)'
    const pictureAlt = 'pictures.map(picture =>pictures.pictureDescription) '
    
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