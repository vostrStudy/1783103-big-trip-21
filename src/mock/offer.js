import { UUID,} from "../const.js";
import { getRandomNumber } from "../utils.js";

function generateOffer(type){
    return {
        id: UUID,
        title: `Offer ${type}`,
        offerPrice: getRandomNumber(),
    }
}

export {generateOffer};

