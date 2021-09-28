var apiKey = "9819adc6647bd8d274faffe9529fdba9"; //api in music match
var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result");
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

    var songUrl = "http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP" + songtoSearch + "&appid=" + apiKey;
    fetch(songUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.error(error);
        });
}
