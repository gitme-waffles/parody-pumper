var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#songName");
var inputArtist = $("#artistName");
searchBtn.on("click", enterSong);
function enterSong(event) {
    event.preventDefault();
    var songtoSearch = inputSong.val().trim();
    var artisttoSearch = inputArtist.val().trim();
    if (songtoSearch) {
        searchSong("ACDC", "Highway to hell");
        // searchSong(songtoSearch, artisttoSearch);
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
            getLyrics(lyrics, individualLyric);
        })
        .catch(function (error) {
            console.error(error);
        });
}
function getLyrics(lyrics, individualLyric) {
    $("form")[0].reset();
    $(".lyric-text").text = " ";
    console.log(lyrics, "lyrics of song");
    console.log(individualLyric, "individual Lyrics");
    $(".lyric-text").append(lyrics);
}

function convertText() {
    $(".lyric-api-text").each(function () {
        var lyricEl = $(this);
        var x = lyricEl.text().replace(/(\w+)/gi, "<span>$1</span>");
        $(".lyric-api-text").text(""); // clear the text
        $(".lyric-api-text").append(x); // add the clickable text
    });
}

$(".lyric-api-text").on("click", "span", function (event) {
    console.log($(event.target).text());
    // click on text function goes here
});

convertText();
