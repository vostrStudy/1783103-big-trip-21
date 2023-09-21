import { filterNoPoints } from '../utils/no-point';

function createNoPointTemplate (filterTypeNoPoint) {
  const noPointFilterText = filterNoPoints [filterTypeNoPoint];
  return `
    <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">${noPointFilterText}</p>
  </section>`;
}

export {createNoPointTemplate};
