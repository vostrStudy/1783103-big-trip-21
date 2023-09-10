export default class EventModel {
  constructor(service) {
    this.service = service;
    this.events = this.service.getPoints();
  }

  get() {
    return this.events;
  }
}


