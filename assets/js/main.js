var arr = ["Dog","Mouse","Llama","Cookie Monster"];

function drawButton(name) {
    let button = document.createElement("button");
    button.setAttribute("animal",name);
    button.innerText = name;
    button.onclick = drawGifs;
    document.getElementById("animalButtons").appendChild(button);
}

function addAnimal() {
    event.preventDefault();
    let input = document.getElementById("animal-input").value;
    drawButton(input);
    document.getElementById("animal-input").value = "";
}

function pausePlay() {
    let target = event.target;
    var state = target.getAttribute("data-state");
    
    if(state == "still")
    {
        target.setAttribute("src",$(this).attr("data-animate"));
        target.setAttribute("data-state","animated");
    }
    else
    {
        target.setAttribute("src",$(this).attr("data-still"));
        target.setAttribute("data-state","still");
    }
}

function drawGifs() {
    console.log(event.target);
    document.getElementById("gifsGoHere").innerHTML = "";
    var animal = event.target.getAttribute("animal")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            var results = response.data;
            console.log(response);
            for (var i = 0; i < results.length; i++) {
            var gifDiv = document.createElement("div");
            gifDiv.classList.add("item")
            var rating = results[i].rating;
            var p = document.createElement("p");
            p.innerText = "Rating: " + rating;
            var animalImage = document.createElement("img");
            animalImage.setAttribute("src",results[i].images.fixed_height_still.url);
            animalImage.setAttribute("data-still",results[i].images.fixed_height_still.url);
            animalImage.setAttribute("data-animate",results[i].images.fixed_height.url);
            animalImage.setAttribute("data-state","still");
            animalImage.onclick = pausePlay;
            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);
            document.getElementById("gifsGoHere").prepend(gifDiv);
          }
        });
}

window.onload = function() {
    for(var i = 0; i < arr.length; i++) {
        drawButton(arr[i]);
    }
}