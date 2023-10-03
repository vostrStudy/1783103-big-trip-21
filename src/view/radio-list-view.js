import AbstractView from '../framework/view/abstract-view.js';

export default class RadioListView extends AbstractView {
  _items = [];
  _handleItemsChange;

  constructor({items, onItemChange}){

    super();

    this._items = items;
    this._handleItemsChange = onItemChange;

    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {

    evt.preventDefault();
    this._handleItemsChange?.(evt.target.dataset.item);
    //* если не вызвали обработчик, то ошибки не будет// optional chaining.
  };
}
