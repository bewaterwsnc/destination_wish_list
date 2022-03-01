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
