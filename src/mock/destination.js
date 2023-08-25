import { DESCRIPTION, UUID } from "../const.js"
import { getRandomNumber } from "../utils.js"

function generateDestination () {
    return {
        id: UUID,
        description:DESCRIPTION,
        name:'',
        pictures:[{
            src:'https://loremflickr.com/248/152?random='+getRandomNumber(),
            pictureDescription:UUID,
            }
        ]
    }
}

export {generateDestination}