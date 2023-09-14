
function createFilterItemTemplate(filter, isChecked){
  const { type, count } = filter;

  return `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" 
    ${isChecked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}<span class="filter__${type}-count">${count}</span></label>
  </div>
  `;
}

function createFilterTemplate(filterItems){
  const filtersItemTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join ('');

  return `
        <form class="trip-filters" action="#" method="get">
               ${filtersItemTemplate}

                <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    `;
}
export{createFilterTemplate};
