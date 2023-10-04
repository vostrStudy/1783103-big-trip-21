import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createEditTemplate} from '../template/event-edit-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { generateRandomDate,getRandomArrayElement,getRandomInteger,getRandomNumber } from '../utils/utils.js';
import { TYPE, UUID,CITIES,DESTINATION_COUNT,DESCRIPTION} from '../utils/const.js';

// const destinations = this.generateDestination();
function generateDestination(destinationAmount) {
  return Array.from({ length: destinationAmount }, () => ({
    id: self.crypto.randomUUID(),
    description:DESCRIPTION,
    name:getRandomArrayElement(CITIES),
    pictures: Array.from({length:DESTINATION_COUNT}, () => ({
      src:`https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      pictureDescription:UUID,
    })
    )
  }));
}

function generateOffers(offersAmount) {
  return TYPE.map((type) => ({
    type,
    offers : Array.from({length: offersAmount}, () => ({
      id: self.crypto.randomUUID(),
      title: `Offer ${type}`,
      offerPrice: getRandomNumber(),
    })
    )
  }));
}
const destinations = generateDestination(5);

const BLANK_POINT = {
  id: self.crypto.randomUUID(),
  dateFrom: generateRandomDate(new Date(2023, 1, 1), new Date()),
  dateTo: generateRandomDate(new Date(2023, 1, 1), new Date()),
  price: '0',
  type: getRandomArrayElement(TYPE),
  isFavorite: '',
  offers: generateOffers(
    getRandomInteger(1, 5),
  ),
  destinations,
  destination: destinations[0].name,
};


export default class EditView extends AbstractStatefulView {

  #pointDestination = null;
  #pointOffers = null;
  #handleOnSaveForm = null;
  #handleDeleteClick = null;
  #handleCloseForm = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = BLANK_POINT,onSaveForm,onCloseForm, onDeleteClick}) {
    super();

    this.#pointOffers = point.offers;
    this.#pointDestination = point.destinations;
    this.#handleOnSaveForm = onSaveForm;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseForm = onCloseForm;

    this._setState(EditView.parsePointToState(point));

    this._restoreHandlers();
  }


  get template() {
    debugger
    return createEditTemplate({
      state: {
        ...this._state,
        offers: this.#getCurrentOffers(this._state.type),
        destination: this._state.destination,
      }
    });
  }

  //check why in retrospective there is a n arrow function and slightly different value//
  // reset = (point) => this.updateElement({point});
  reset(point) {

    this.updateElement(
      EditView.parsePointToState(point),
    );
  }

  removeElement = () => {
    super.removeElement();
    if (this.#datepickerFrom){
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo){
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers (){
    this.element.querySelector('.event--edit')
      .addEventListener('submit',this.#saveFormHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click',this.#closeFormHandler);
    this.element.querySelector('.event__offer-selector')
      .addEventListener('click',this.#checkOfferHandler);


    this.#setDatepicker();
  }

  #saveFormHandler = (evt) => {

    evt.preventDefault();
    this.#handleOnSaveForm(EditView.parseStateToPoint(this._state));
  };

  #closeFormHandler = (evt) => {

    evt.preventDefault();
    this.#handleCloseForm();
  };


  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditView.parseStateToPoint(this._state));
  };

  #getCurrentOffers(offerType) {

    return this.#pointOffers.filter((offer) => offer.type === offerType);
  }

  // #getCurrentDestination(destinationType) {

  //   return this.#pointDestination.find((destinationByName) => destinationByName.name === destinationType);
  // }
  //*need to generate different price when choosing different type and destination//

  #eventTypeChangeHandler = (evt) => {

    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: this.#getCurrentOffers(evt.target.value),
    });

  };

  #checkOfferHandler = (evt) => {

    const checkedOffersOffers = this.#getCurrentOffers(this._state.type)[0].offers.map ((checkedItem) => {
      if (checkedItem.title === evt.target.innerText) {
        checkedItem. isChecked = !checkedItem. isChecked;
      }
      return checkedItem;
    });

    this.updateElement({
      state: {
        offers:{
          offers:checkedOffersOffers,
        }
      }
    });
  };
  //*need to check how to apply querySelectorAll; also check if the evt.target.innerText is a suitable option

  #eventDestinationChangeHandler = (evt) => {

    // const selectedDestination = this.#pointDestination
    //   .find((destination) => destination.name === evt.target.value);

    // const selectedDestinationId = selectedDestination.id;

    // const selectedDestination = this.#pointDestination
    //   .find((destination) => destination.name === evt.target.value);

    // const selectedDestinationId = (selectedDestination)
    //   ? selectedDestination.id
    //   : null;

    this.updateElement({
      ...this._state,
      // id: selectedDestinationId,
      destination: evt.target.value,

    });

  };

  #priceInputHandler = (evt) => {
  //*check why the price keeps popping out as NaN
    evt.preventDefault();
    this._setState({
      ...this._state,
      price: evt.target.valueAsNumber,
    });
  };

  #dateFromCloseHandeler = ([userDate]) => {
    this._setState({
      ...this._state,
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandeler = ([userDate]) => {
    this._setState({
      ...this._state.point,
      dateTo: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateTo);
  };

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: ' d/m/y H:i',
      enableTime:true,
      locale:{
        firstDayOfWeek:1,
      },
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandeler,
        maxDate: this._state.dateTo,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandeler,
        minDate: this._state.dateFrom,
      }
    );
  }

  static parsePointToState = (point) => ({...point});
  //*gotta fill in the parse

  static parseStateToPoint = (state) => ({...state});
  //*gotta fill in the parse
}
