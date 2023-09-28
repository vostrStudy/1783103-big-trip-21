import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createEditTemplate} from '../template/event-edit-template.js';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class EditView extends AbstractStatefulView {
  // #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handleSaveForm = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point, pointOffers,pointDestination, onSaveForm}) {
    super();

    this.#pointOffers = pointOffers;
    this.#pointDestination = pointDestination;
    this.#handleSaveForm = onSaveForm;

    this._setState(EditView.parsePointToState(point));

    this._restoreHandlers();
  }


  get template() {
    return createEditTemplate({
      state: {
        ...this._state,
        offers: this.#getCurrentOffers(this._state.type),
        destination: this.#getCurrentDestination(this._state.id)
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
    this.element.querySelector('.event__save-btn')
      .addEventListener('submit',this.#saveFormHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click',this.#saveFormHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click',this.#saveFormHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationChangeHandler);

    this.#setDatepicker();
  }

  #saveFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveForm(EditView.parseStateToPoint(this._state));
  };

  #getCurrentOffers(offerType) {
    return this.#pointOffers.filter((offer) => offer.type === offerType);
  }

  #getCurrentDestination(destinationType) {
  //* dstination points don't generate because mock id is either genereates random id numbers, or the same id at the moment.
  //* This problem should go away after recieving the data from the server in the end

    return this.#pointDestination .find((destinationById) => destinationById.id === destinationType);


  }
  //*need to generate different price when choosing different type and destination//

  #eventTypeChangeHandler = (evt) => {

    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: this.#getCurrentOffers(evt.target.value),
    });

  };


  #eventDestinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestination
      .find((destination) => destination.name === evt.target.value);
    const selectedDestinationId = selectedDestination.id;

    // const selectedDestination = this.#pointDestination
    //   .find((destination) => destination.name === evt.target.value);

    // const selectedDestinationId = (selectedDestination)
    //   ? selectedDestination.id
    //   : null;

    this.updateElement({
      ...this._state,
      id: selectedDestinationId,
      destination: this.#getCurrentDestination(selectedDestinationId),
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        price: evt.target.valueAsNumber,
      }
    });
  };

  #dateFromCloseHandeler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      }
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandeler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
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

  static parseStateToPoint = (state) => state.point;

}
