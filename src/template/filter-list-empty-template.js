import { FilterType } from '../utils/const.js';

const NoPointsFilterTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]:'There are no past events now',
  [FilterType.PRESENT]:'There are no present events now',
  [FilterType.FUTURE]:'There are no future events now',
};

function createFilterListEmptyTemplate(filterType) {

  const noPointsFilterText = NoPointsFilterTextType[filterType];
  return (`
    <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">${noPointsFilterText}</p>
        
  </section>
    `);
}

export {createFilterListEmptyTemplate};
