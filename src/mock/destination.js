import { CITIES, DESCRIPTION, UUID } from "../const.js"
import { getRandomArrayElement, getRandomNumber } from "../utils.js"

function generateDestination (destination) {
    return {
        id: UUID,
        description:DESCRIPTION,
        name:getRandomArrayElement(CITIES),
        pictures:[{
            src:'https://loremflickr.com/248/152?random='+getRandomNumber(),
            pictureDescription:UUID,
            }
        ]
    }
}

export {generateDestination}