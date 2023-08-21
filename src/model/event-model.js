import {getRandomPoint} from '../mock/points.js';

const EVENT_COUNT = 3;

export default class EventModel {
  events = Array.from({length: EVENT_COUNT}, getRandomPoint);

  getEvents() {
    return this.events;
  }
}
