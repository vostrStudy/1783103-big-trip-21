import {generatePoints} from '../mock/points.js';

const EVENT_COUNT = 5;

export default class EventModel {
  events = Array.from({length: EVENT_COUNT}, generatePoints);

  getEvents() {
    return this.events;
  }
}


