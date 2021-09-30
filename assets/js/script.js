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
    if (songtoSearch && artisttoSearch) {
        //  searchSong("ACDC", "Highway to hell");
        searchSong(songtoSearch, artisttoSearch);
        addHeading(songtoSearch, artisttoSearch);
    }
}

function searchSong(song, artist) {
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
            console.log(data, "data");

            var lyrics = data.lyrics.split("\r\n")[1];
            var individualLyric = lyrics.split("\n");
            getLyrics(lyrics, individualLyric);
            convertText();
        })
        .catch(function (error) {
            console.error(error);
        });
}

//function to display song in container
function getLyrics(lyrics, individualLyric) {
    $("form")[0].reset();
    $(".lyric-text").text(" ");

    console.log(lyrics, "lyrics of song");
    // console.log(individualLyric, "individual Lyrics");

    $(".lyric-text").append(lyrics);
}

//function to dispaly song name and artist name as heading
function addHeading(song, artist) {
    $("#song").text(" ");
    $("#artist").text(" ");
    $("#song").append(song.toUpperCase());
    $("#artist").append(artist.toUpperCase());
}

function convertText() {
    $(".lyric-text").each(function () {
        var lyricEl = $(this);
        var x = lyricEl.text().replace(/(\w+)/gi, "<span>$1</span>");
        $(".lyric-text").text(""); // clear the text
        $(".lyric-text").append(x); // add the clickable text
    });
}

$(".lyric-text").on("click", "span", function (event) {
    console.log($(event.target).text());
    // click on text function goes here
});
