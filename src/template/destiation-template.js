function createDestinationTemplate(pointDestination){

  const {description,pictures,name} = pointDestination;

  const pictureArray = pictures.map(({src, pictureDescription}) =>
    `<img class="event__photo" src="${src}" alt="${pictureDescription}">`
  );

  return(
    `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${name}</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
            <div class="event__photos-tape">
                ${pictureArray}     
            </div>
            </div>
      </section>`
  );
}

export {createDestinationTemplate};
