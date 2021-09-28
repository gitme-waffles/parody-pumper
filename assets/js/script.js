//var apiKey = "9819adc6647bd8d274faffe9529fdba9";//api in music match
var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#input");
searchBtn.on("click", enterSong);
function enterSong(event) {
    event.preventDefault();
    var songtoSearch = inputSong.val().trim();
    if (songtoSearch) {
        searchSong(songtoSearch);
    }
}

function searchSong(songtoSearch) {
    console.log(songtoSearch);

    var songUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" + songtoSearch + "&appid=1695a85bf822350fc6b4ed134da665b7";
    fetch(songUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //display the lyric and add the highlight / click

        })
        .catch(function (error) {
            console.error(error);
        });
}

function convertText(){ 
    $('.lyric-api-text').each(function() {
        var lyricEl = $(this);
        var x = lyricEl.text().replace(/(\w+)/gi, "<span>$1</span>")
        $('.lyric-api-text').text(''); // clear the text
        $('.lyric-api-text').append(x); // add the clickable text
    });
}


$('.lyric-api-text').on('click', 'span', function(event){
    console.log($(event.target).text())
    // click on text function goes here
})


convertText()