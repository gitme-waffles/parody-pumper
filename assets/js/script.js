var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result");
var inputSong = $("#input");
searchBtn.on("click", enterSong);
function enterSong(event) {
    event.preventDefault();
    var songtoSearch = inputSong.val().trim();
    if (songtoSearch) {
        searchSong("ACDC", "Highway to hell");
    }
}

function searchSong(artist, song) {
    var songUrl =
        "https://private-anon-e83b93ca5b-lyricsovh.apiary-proxy.com/v1/" +
        encodeURIComponent(artist) +
        "/" +
        encodeURIComponent(song);

    fetch(songUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lyrics = data.lyrics.split("\r\n")[1];
            var individualLyric = lyrics.split("\n");
        })
        .catch(function (error) {
            console.error(error);
        });

    // fetch("https://mourits-lyrics.p.rapidapi.com/cacheCount", {
    //     method: "GET",
    //     headers: {
    //         "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
    //         "x-rapidapi-key": "SIGN-UP-FOR-KEY",
    //     },
    // })
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
}

function convertText() {
    $(".lyricText").each(function () {
        var lyricEl = $(this);
        var x = lyricEl.text().replace(/(\w+)/gi, "<span>$1</span>");
        $(".lyricText").text(""); // clear the text
        $(".lyricText").append(x); // add the clickable text
    });
}

$(".lyricText").on("click", "span", function (event) {
    console.log($(event.target).text());
    // click on text function goes here
});

convertText();
