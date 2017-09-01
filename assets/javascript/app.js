      
      $(document).ready(function(){


      // Initial array of Animals
      var animals = ["MONKEY"];

      
      function displayAnimalInfo() {
      
              $("#animals-view").empty();


        var animal = $(this).attr("data-name");
       
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=0149705534b84f72a74112ce7581ade1";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
             

          // Creating a div to hold the animal
          var animalDiv = $("<div class='animal'>");

          // Storing the rating data
          var results = response.data;

           // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img data-state='still' class='gif'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              

               

             
    
              

              // Appending the paragraph and animalImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#animals-view" div in the HTML
              $("#animals-view").prepend(gifDiv);
            }
          }

           $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });

          });


        // });

        }

      // Function for displaying animals array data
      function renderButtons() {

        // Deleting the animals prior to adding new 

        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var animalName = $("<button>");
          // Adding a class of animal to our button
          animalName.addClass("animal");
          // Adding a data-attribute
          animalName.attr("data-name", animals[i]);
          // Providing the initial button text
          animalName.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(animalName);
        }
      }



      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

    

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


    });