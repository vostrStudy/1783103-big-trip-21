
function createFilterItemTemplate({type, isChecked,isDisabled}){

  return `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" 
    type="radio" 
    name="trip-filter" 
    value="${type}" 
    data-item = "${type}"
    ${isChecked ? 'checked' : ''}
    ${isDisabled ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}<span class="filter__${type}-count">
    </span></label>
  </div>
  `;
}

function createFilterTemplate(filters){

  return `
        <form class="trip-filters" action="#" method="get">
               ${filters.map(createFilterItemTemplate).join ('')}

                <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
    `;
}
export{createFilterTemplate};
