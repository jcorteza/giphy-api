var showsArray = ["Friends", "Game of Thrones", "Parks and Recreation", "The Office", "The Goldbergs", "Jane the Virgin", "Supergirl", "Golden Girls", "The Flash", "Riverdale", "The Good Place", "Once Upon a Time"]

var show;
var limit = 0;
var currentShowGif = "";
var newShowGif = "";

$(document).ready(function() {
    /* this for loop function creates a button for each item in showsArray, sets its text to the current item text, and appends it to #btnsDiv*/
    function displayBtns() {
        for(i = 0; i < showsArray.length; i++) {
            let showName = showsArray[i];
            let newBtn = $("<button>").attr("class", "showBtn" + [i]).text(showName);
            $(newBtn).appendTo("#btnsDiv");
        }
    }
    displayBtns();

    $("#submitBtn").on("click", function(event) {
        event.preventDefault();
        if($("#addGIF").val()){
            $("#btnsDiv").empty();
            let newShow = $("#addGIF").val().trim();
            console.log(newShow);
            showsArray.push(newShow);
            /*let newBtn = $("<button class=\"btnGif\">").text(newShow);
            $(newBtn).appendTo("#btnsDiv");*/
            $("#addGIF").val("");
            displayBtns();
        }
    });

    $("#btnsDiv").on("click", function(event){
        show = $(event.target).text();
        if(currentShowGif === "") {
            currentShowGif = show;
        }
        else if (currentShowGif !== show && limit === 30) {
            limit = 0;
            currentShowGif = show;
        }
        else if (currentShowGif === show && limit === 30){
            return;
        }
        if(limit < 30) {
            limit = limit + 10;
        }
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + " TV&api_key=dtUIzKvehNyBcZktUSC8WrdG25ZRh6jP&limit=" + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var result = response.data;
            //console.log(result);
            $(gifsHolderDiv).empty();
            for(i = 0; i < result.length; i++) {
                const gifDiv = $("<div>").attr("class", "newDiv");
                const gifInfoDiv = $("<div>").attr("class", "newDivText");
                const ratingText = $("<p>").text("Rating: " + result[i].rating);
                const titleText = $("<p>").text("Title: " + result[i].title);
                const scoreText = $("<p>").text("Score: " + result[i]._score);
                const gifImg = $("<img class=\"gifResult\">").attr("src", result[i].images.fixed_width_still.url);;
                if ($(gifImg).attr("type")) {
                    $(gifImg).removeAttr("type");
                }
                $(gifImg).attr("type", "still").attr("data-sublink", result[i].images.fixed_width.url);
                $(titleText).add(scoreText).add(ratingText).appendTo(gifInfoDiv);
                $(gifImg).add(gifInfoDiv).appendTo(gifDiv);
                $(gifDiv).appendTo($("#gifsHolderDiv"));
            }
        });
    });
    /* custom attributes need to start with data- in order to validate on w3c based on web content accessibility guidelines*/
    $("#gifsHolderDiv").on("click", ".gifResult", function(event) {
        console.log("Inside gifsHolderDiv function.");
        if($(event.target).attr("type") === "still") {
            $(event.target).attr("type", "gif");
            const stillGif = $(event.target).attr("src");
            const animatedGif = $(event.target).attr("data-subLink");
            $(event.target).attr("src", animatedGif);
            $(event.target).attr("data-subLink", stillGif);
        }
        else if ($(event.target).attr("type") === "gif") {
            $(event.target).attr("type", "still");
            const animatedGif = $(event.target).attr("src");
            const stillGif = $(event.target).attr("data-subLink");
            $(event.target).attr("src", stillGif);
            $(event.target).attr("data-subLink", animatedGif);
        }
    });
});
