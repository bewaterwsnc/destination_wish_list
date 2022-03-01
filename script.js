    //function 1: clears form
    function clearForm(form) {
        //iterate full form & set values to null 
        for (var i = 0; i < form.length; i++) {
            form.elements[i].value = "";
        }
    }

    //create eventListener for html lines 26-44 
    document.querySelector("#details_form")
            .addEventListener("submit", submitHandler);
        
        /*function 2: submit form data via eventListener (submitHandler)
          clear form / create event variables / create card / change title of card display area
          if new list populates / add card to staged area */
        function submitHandler(e) {

            //clears form -- (f1)
            clearForm(e.target);
        
            //creating destination variables from each form line
                           //event.target-element-that-triggered-event's.value
            const destName = e.target.elements["destination_name"].value;
            const destLocation = e.target.elements["location_name"].value;
            const destPhoto = e.target.elements["photo"].value;
            const destDescription = e.target.elements["description"].value
    
            //store destination variables in a card
            var displayCard = createDestCard(
                destName,
                destLocation,
                destPhoto,
                destDescription
            );
        
            //place card_stage in variable to allow title change for html line 47-48
            var destCardContainer = document.querySelector("#card_stage");
        
            /*title change for "staging" - "ENTER DESTINATION DETAILS"
            if the container + is null, set new title to "My Wishlist" */
            if (destCardContainer.children.length === 0) {
                document.querySelector("#staging").innerHTML = "My Wishlist";
            } 

            //adds form->card to container in html line 51-
            document.querySelector("#card_stage")
                    .appendChild(displayCard)
        }
        /*function 3: generate a new card with form items listed and formatted
                    */
        function generateNewCard(destination, location, photoSrc, description){

            //create main div element aka the card body - set the style (css) attributes
            var card = document.createElement("div");
                card.setAttribute("class", "card");
                card.style.margin("16px");
                card.style.width("18rem");
                card.style.height("fit-content");
                card.style.backgroundColor("#6c757d");
                card.style.boxShadow("5px 3px 3px yellow");
        }

            //create card body w/ form details
            var fullCard = document.createElement("div");
                fullCard.setAttribute("class", "full-card");

            //destination --> create dest element --> destination added to card
            var cardDest = document.createElement("h4");
                cardDest.setAttribute("class", "cardDest");
                cardDest.innerText= destination;
                fullCard.appendChild(cardDest);

            //location --> create location element --> location added to card
            var cardGeoLo = document.createElement("h5");
                cardGeoLo.setAttribute("class", "cardGeoLo mb-2 text-muted");
                cardGeoLo.innerText= location;
                fullCard.appendChild(cardGeoLo);

            //photoSrc -->  create img element --> img added to card
            var cardImg = document.createElement("img");
                cardImg.setAttribute("class", "card-img-top");
                cardImg.setAttribute("alt", destination);
                    //create photo placeholder
                    var holder = "https://www.movaglobes.com/blog/wp-content/uploads/2018/01/MOVA-Buying-Guide1200x600.jpg";
                    
                    /*if user puts in url of zero characters (null) set placeholder
                    else set user's url*/
                    if(photoSrc.length === 0) {
                        cardImg.setAttribute("src", holder);
                    } else {
                        cardImg.setAttribute("src", photoSrc);
                    }
                card.appendChild(cardImg); 

            //description --> create description element --> description added to card
            if(description.length !== 0){
                var cardDetails = document.createElement("p");
                    cardDetails.setAttribute("class", "card-details");
                    cardDetails.innerText = description;
                    fullCard.appendChild(cardDetails);
            }   
            
            //create container for edit & delete card buttons
            var buttonContainer = document.createElement("div");
                buttonContainer.setAttribute("class", "button-container");

                var editButton = document.createElement("button");
                    editButton.setAttribute("class", "btn btn-warning");
                    editButton.innerText = "Edit";
                    editButton.addEventListener("click", editEntry);
                    buttonContainer.appendChild(editButton);

                var removeButton = document.createElement("button");
                    removeButton.setAttribute("class, btn btn-danger");
                    removeButton.innerText = "Remove";
                    removeButton.addEventListener("click", removeEntry);
            
            /* add remove and edit buttons to card */
            buttonContainer.appendChild(removeButton)
            buttonContainer.appendChild(editButton);
            fullCard.appendChild(buttonContainer);

            card.appendChild(fullCard)
            
            return card;

       function editEntry(e) {
        //edit code
       }

       function removeEntry(e) {
           //removal code

       }
                

        
