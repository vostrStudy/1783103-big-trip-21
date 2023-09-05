function createDestinationTemplate(pointDestination){
  const {destinations,description,pictures,name,id} = pointDestination;


  console.log(destinations);

  function createDestinationPhotoTempate(){
    return(
      `<img class="event__photo" src="${pictures}" alt="{destinationPicturesAlt}">`
    );
  }
  const destinationPhotoTemplate = createDestinationPhotoTempate();
  return(
    `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${name}</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
            <div class="event__photos-tape">
                ${createDestinationPhotoTempate()}     
            </div>
            </div>
      </section>`
  );
}

export {createDestinationTemplate};
