export default class OffersModel {

  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    this.#offers = await this.#pointsApiService.getOffers();
    return this.#offers;
  }

  get offers() {

    return this.#offers;
  }

  getByType(type) {

    return this.#offers
      .find((offer) => offer.type === type).offers;
  }
}
