var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#songName");
var inputArtist = $("#artistName");
var $lyricText = $(".lyric-text");
var copytoClip = $("#copyBtn");
searchBtn.on("click", enterSong);
copytoClip.on("click", copyToClipboard);
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
// little algorithm

function copyToClipboard() {
    //     // get the lyric text element
    //     // iterate through the childrend
    //     // if its a div, iterate through the words
    //     // if its a break, skip it and add a new line (\n)
    //     // sum up the strings into the original song lyric
    var $child = $lyricText.children();
    console.log($child);
    for (var i = 0; i < $child.length; i++) {
        console.log($child[i]);
    }
}
function searchSong(song, artist) {
    var songUrl =
        "https://private-anon-e83b93ca5b-lyricsovh.apiary-proxy.com/v1/" +
        encodeURIComponent(artist) +
        "/" +
        encodeURIComponent(song);

    // DO NOT REMOVE!
    // fetch(songUrl)
    //     .then(function (response) {
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data, "data");

    //         var lyrics = data.lyrics.split("\r\n")[1];
    //         var individualLyric = lyrics.split("\n");
    //         getLyrics(lyrics, individualLyric);
    //         convertText();
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    var mockedResponse = new Promise(function (res) {
        res({
            lyrics: "Paroles de la chanson Adventure Of A Lifetime par Coldplay\r\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nWe are legends\nEvery day\nThat's what she told him!\n\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\nWe are diamonds\n\nI feel my heart beating\nI feel my heart beneath my skin\nI feel my heart beating\n\n\nOhhh, you make me feel\nLike I'm alive again\nAlive again\nOhhh, you make me feel\nLike I'm alive again\n\nSaid I can't go on, not in this way\nI'm a dream, I die by light of day\nGonna hold up half the sky and say\nOhhh, we are omen\n\nI feel my heart beating\nI feel my heart beneath my skin\nOhhh, I can feel my heart beating\nCause you make me feel\nLike I'm alive again\nAlive again...\n\nOhhh, you make me feel\nLike I'm alive again\n\nTurn your magic on, to me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\n\nWe are diamonds taking shape!\nWe are diamonds taking shape!\n\nIf we've only got this life\nThen this adventure, more than I\nAnd if we've only got this life\nYou'll get me through alive\nAnd if we've only got this life\nThen this adventure, more than I\nWanna share with you\nWith you, with you\n\nI said, oh, say oh\n\nWoo hoo, woo hoo...",
        });
    });

    mockedResponse.then(function (data) {
        console.log(data, "data");

        var lyrics = data.lyrics.split("\r\n")[1];
        console.log(lyrics);
        renderLyricsToScreen(lyrics);
        convertText();
    });
}

//function to display song in container
function renderLyricsToScreen(lyrics) {
    inputArtist.val("");
    inputSong.val("");

    console.log(lyrics, "lyrics of song");
    // console.log(individualLyric, "individual Lyrics");
    var splitLyricsIntoLines = lyrics.split("\n");

    for (var i = 0; i < splitLyricsIntoLines.length; i++) {
        // "" // we add a br
        // "Text" // we wrap it in a div
        if (lyrics[i] !== "") {
            var paraContainer = $("<div>");
            var words = splitLyricsIntoLines[i].split(" ");
            for (let j = 0; j < words.length; j++) {
                var span = $("<span>");
                span.text(words[j]);

                span.attr("word", words[j]);
                paraContainer.append(span);
                $lyricText.append(paraContainer);
            }
        } else {
            var breakElem = $("<br>");
            $lyricText.append(breakElem);
        }
    }

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
    //   $(".lyric-text").each(function () {
    //     var lyricEl = $(this);
    //     var x = lyricEl.text().replace(/(\w+)/gi, "<span>$1</span>");
    //     $(".lyric-text").text(""); // clear the text
    //     $(".lyric-text").append(x); // add the clickable text
    //   });
}

$(".lyric-text").on("click", "span", function (event) {
    console.log($(event.target).text());
    // click on text function goes here
});
