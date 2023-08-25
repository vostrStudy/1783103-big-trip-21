import { generateDestination } from "../mock/destination.js";

const DESTINATION_COUNT = 5;

export default class DestinationModel {
    destination = Array.from ({length:DESTINATION_COUNT}, generateDestination);

    getDestination() {
    return this.destination;
    }
    getById(id){
        return this.destination
        .find((destination) => destination.id === id)

      }
}