export default class DestinationsModel {

  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.getDestinations();
    return this.#destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
