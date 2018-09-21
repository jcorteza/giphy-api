var showsArray = ["Friends", "Game of Thrones", "Parks and Recreation", "The Office", "The Goldbergs", "Jane the Virgin", "Supergirl", "Golden Girls", "The Flash", "Riverdale", "The Good Place", "Once Upon a Time"]


/* this for loop creates a button for each item in showsArray, sets its text to the current item text, and appends it to #btnsDiv*/
for(i = 0; i < showsArray.length; i++) {
    let showName = showsArray[i];
    let newBtn = $("<button>").text(showName);
    $(newBtn).appendTo("#btnsDiv");
}

$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    let newShow = addGIF.value;
    console.log(newShow);
    let newBtn = $("<button>").text(newShow);
    $(newBtn).appendTo("#btnsDiv");
});

$("#btnsDiv").on("click", function(event){
    let show = $(event.target).text();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + " TV&api_key=dtUIzKvehNyBcZktUSC8WrdG25ZRh6jP&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var result = response.data;
        console.log(result);
        for(i = 0; i < result.length; i++) {
            let gifDiv = $("<div>").attr("id", "newDiv");
            let ratingText = $("<p>").text("Rating: " + result[i].rating);
            let gifImg = $("<img class=\"gifResult\">");
            $(gifImg).attr("src", result[i].images.fixed_width_still.url);
            if ($(gifImg).attr("type")) {
                $(gifImg).removeAttr("type");
            }
            $(gifImg).attr("type", "still");
            $(gifImg).attr("sublink", result[i].images.fixed_width.url);
            $(gifDiv).prependTo(gifsHolderDiv);
            $(gifImg).appendTo(gifDiv);
            $(ratingText).prependTo(gifDiv);
        }
    });
    $("#gifsHolderDiv").off("click").on("click", function(event) {
        console.log("Inside gifsHolderDiv function.");
        if($(event.target).attr("type") === "still") {
            $(event.target).attr("type", "gif");
            let stillGif = $(event.target).attr("src");
            let animatedGif = $(event.target).attr("subLink");
            $(event.target).attr("src", animatedGif);
            $(event.target).attr("subLink", stillGif);
        }
        else if ($(event.target).attr("type") === "gif") {
            $(event.target).attr("type", "still");
            let animatedGif = $(event.target).attr("src");
            let stillGif = $(event.target).attr("subLink");
            $(event.target).attr("src", stillGif);
            $(event.target).attr("subLink", animatedGif);
        }
    });
});

