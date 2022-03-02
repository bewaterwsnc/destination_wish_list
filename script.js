//create eventListener for html lines 26-44
document
  .querySelector("#details_form")
  .addEventListener("submit", submitHandler);

/*function 2: submit form data via eventListener (submitHandler)
          clear form / create event variables / create card / change title of card display area
          if new list populates / add card to staged area */
function submitHandler(e) {
  //creating destination variables from each form line
  //event.target-element-that-triggered-event's.value
  let destName = e.target.elements["destination_name"].value;
  let destLocation = e.target.elements["location_name"].value;
  let destDescription = e.target.elements["description"].value;

  //no refresh on form submission
  e.preventDefault();

  //clears form -- (f1)
  clearForm(e.target);

  //store destination variables in a card
  let displayCard = generateNewCard(destName, destLocation, destDescription);

  //place card_stage in variable to allow title change for html line 47-48
  let destinationCardContainer = document.querySelector("#card_stage");

  /*title change for "staging" - "ENTER DESTINATION DETAILS"
            if the container + is null, set new title to "My Wishlist" */
  if (destinationCardContainer.children.length === 0) {
    document.querySelector("#staging").innerHTML = "My Wishlist";
  }

  //adds form->card to container in html line 51-
  document.querySelector("#card_stage").appendChild(displayCard);
}
function clearForm(form) {
  for (var i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

/*function 3: generate a new card with form items listed and formatted
 */

function generateNewCard(
  destination_name,
  location_name,
  description
) {
  //create main div element aka the card body - set the style (css) attributes
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.margin = "20px";
  card.style.width = "22rem";
  card.style.padding = "1rem";
  card.style.height = "fit-content";
  card.style.boxShadow = "4px 5px gray";
  card.style.border = "1px solid black";

  const getPhoto = async (destination_name) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?query=${destination_name}&per_page=20&client_id=P7zYITish6OXTeC1eoHLRYCzsktwmwJsot5AGj9m2Q0`
      );
      const pictures = await response.json();
      return pictures.results[0].urls.thumb;
    } catch (error) {
      console.log("Error during fetch: " + error.message);
    }
  };

  //create card body w/ form details
  let cardMain = document.createElement("div");
  cardMain.setAttribute("class", "full-card");

  //destination --> create dest element --> destination added to card
  let cardName = document.createElement("h5");
  cardName.setAttribute("class", "card-name");
  cardName.innerText = destination_name;

  cardMain.appendChild(cardName);

  //location --> create location element --> location added to card
  let cardLocation = document.createElement("h6");
  cardLocation.setAttribute("class", "card-location mb-2 text-muted");
  cardLocation.innerText = location_name;

  cardMain.appendChild(cardLocation);

  //description --> create description element --> description added to card
  if (description.length !== 0) {
    let cardDetails = document.createElement("p");
    cardDetails.setAttribute("class", "card-details");
    cardDetails.innerText = dest_description;
    cardMain.appendChild(cardDetails);
  }

  //photoSrc -->  create img element --> img added to card
  let cardImg = document.createElement("img");
  cardImg.setAttribute("class", "card-img-top");
  cardImg.setAttribute("alt", destination_name);

  getPhoto(destination_name).then((photo) => {
    cardImg.setAttribute("src", photo);
    card.appendChild(cardImg);
  });

  //create container for edit & delete card buttons
  let btnContainer = document.createElement("div");
  btnContainer.setAttribute("class", "button-container");

  let editButton = document.createElement("button");
  editButton.setAttribute("class", "btn btn-warning");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", editEntry);
  btnContainer.appendChild(editButton);

  let removeButton = document.createElement("button");
  removeButton.setAttribute("class", "btn btn-danger");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", removeEntry);

  /* add remove and edit buttons to card */
  btnContainer.appendChild(removeButton);
  btnContainer.appendChild(editButton);

  cardMain.appendChild(btnContainer);

  card.appendChild(cardMain);

  return card;
}

function editEntry(e) {
  /*call card body from card container 2x up DOM
            destination name first child-element
            location name second child element*/
  let cardMain = e.target.parentElement.parentElement;
  let cardName = cardMain.children[0];
  let cardLocation = cardMain.children[1];

  /*img component update*/
  let card = cardMain.parentElement;
  let photo = card.children[0];

  /*add updated values to card*/
  let newCardName = window.prompt("Enter new destination name: ");
  let newCardLocation = window.prompt("Enter new location: ");
  let newPhoto = window.prompt("Enter new photo URL: ");

  /*set updated values*/
  if (newCardName.length > 0) {
    cardName.innerText = newCardName;
  }

  if (newCardLocation.length > 0) {
    cardLocation.innerText = newCardLocation;
  }
  if (newPhoto.length > 0) {
    photo.setAttribute("src", newPhoto);
  }
}

function removeEntry(e) {
  /*call card body from card container 2x up DOM*/
  let cardMain = e.target.parentElement.parentElement;
  let card = cardMain.parentElement;
  card.remove();
}
