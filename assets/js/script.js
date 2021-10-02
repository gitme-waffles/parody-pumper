var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#songName");
var inputArtist = $("#artistName");
var $lyricText = $(".lyric-text");
var $wordsBoxEl = $(".words-box");
var $lyricClick;
var $copyToclip = $("#copyBtn");
searchBtn.on("click", enterSong);
$copyToclip.on("click", copyFunc);
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

    $lyricText.append(lyrics);
}

//function to display song name and artist name as heading
function addHeading(song, artist) {
    $("#song").text(" ");
    $("#artist").text(" ");
    $("#song").append(song.toUpperCase());
    $("#artist").append(artist.toUpperCase());
}
function copyFunc() {
    // get the lyric text element
    // iterate through the childrend
    // if its a div, iterate through the words
    // if its a break, skip it and add a new line (\n)
    // sum up the strings into the original song lyric
    // var copyText = “”;
    // for (var i = 0; i < $lyricText.children().length; i++) {
    //   var $lyricLine = $lyricText.children().eq(i).children();
    //   for (var j = 0; j < $lyricLine.length; j++) {
    //     copyText += $lyricLine.eq(j).text();
    //     if (j < $lyricLine.length - 1) {
    //       copyText += ” “;
    //     }
    //   }
    //   copyText += “\n”; // add a new line
    // }
    // console.log(copyText);

    var $childDiv = $(".lyric-text").children();

    // var $grandchild = $(".lyric-text").find("span").text();
    console.log($childDiv, "child div");
    // console.log($grandchild, "grand child");
    var $childSpan = $(".lyric-text>div>span");
    console.log($childSpan);

    for (var i = 0; i < $childDiv.length; i++) {
        console.log($childDiv[i]);
    }
    var $lyricText = $(".lyric-text");
    console.log($lyricText.children().length, "lyric text");
    console.log($lyricText.children().length, "lyric text");
}
//fetch rhymes from wordAPI
function getWordRhymes(searchWord) {
    var searchUrl = "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/rhymes";
    fetch(searchUrl, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "af8db37aacmsha96cf214afa8261p1acb2bjsn4c1925c3f5c2",
        },
    })
        .then((response) => {
            console.log(response);
            return response.json(response);
        })
        .then((data) => {
            console.log(data);
            if (!data.rhymes.all) {
                throw new Error("No Rhymes Found");
            }
            printRhyming(data.rhymes.all);
        })
        .catch((err) => {
            console.log(err);
            printRhyming(["No Rhymes Found"]);
        });
}
//fetch synonyms from wordAPI
function getWordSynonyms(searchWord) {
    var searchUrl = "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/synonyms";
    fetch(searchUrl, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "af8db37aacmsha96cf214afa8261p1acb2bjsn4c1925c3f5c2",
        },
    })
        .then((response) => {
            console.log(response);
            return response.json(response);
        })
        .then((data) => {
            console.log(data);
            if (!data.synonyms) {
                throw new Error("No synonyms Found");
            }
            printSynonyms(data.synonyms);
        })
        .catch((err) => {
            console.log(err);
            printSynonyms(["No synonyms Found"]);
        });
}
//fetch antonyms from wordAPI
function getWordAntonyms(searchWord) {
    var searchUrl = "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/antonyms";
    fetch(searchUrl, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "af8db37aacmsha96cf214afa8261p1acb2bjsn4c1925c3f5c2",
        },
    })
        .then((response) => {
            console.log(response);
            return response.json(response);
        })
        .then((data) => {
            console.log(data);
            if (!data.antonyms || data.antonyms.length === 0) {
                throw new Error("No antonyms Found");
            }
            printAntonyms(data.antonyms);
        })
        .catch((err) => {
            console.log(err);
            printAntonyms(["No antonyms Found"]);
        });
}
// Print rhymes to screen
function printRhyming(wordArr) {
    $("#rhymingWords").text(""); //clear any children
    for (var i = 0; i < wordArr.length; i++) {
        rhymeEl = $("<li>").text(wordArr[i]);
        $("#rhymingWords").append(rhymeEl);
    }
}
// Print Synonyms to screen
function printSynonyms(wordArr) {
    $("#synonyms").text(""); //clear any children
    for (var i = 0; i < wordArr.length; i++) {
        rhymeEl = $("<li>").text(wordArr[i]);
        $("#synonyms").append(rhymeEl);
    }
}
//Print Antonyms to screen
function printAntonyms(wordArr) {
    $("#antonyms").text(""); //clear any children
    for (var i = 0; i < wordArr.length; i++) {
        rhymeEl = $("<li>").text(wordArr[i]);
        $("#antonyms").append(rhymeEl);
    }
}

// event delegation - click on lyric word.
$lyricText.on("click", "span", function (event) {
    if ($lyricClick) {
        $lyricClick.removeClass("highLightColor");
        $lyricClick.addClass("changedColor");
    }
    $lyricClick = $(event.target);
    $lyricClick.addClass("highLightColor");
    getWordRhymes($lyricClick.text());
    getWordSynonyms($lyricClick.text());
    getWordAntonyms($lyricClick.text());
});

// Event delegation
$wordsBoxEl.on("click", "li", function (event) {
    console.log($(event.target).text());
    console.log($lyricClick.text());
    //$lyricClick.text() = $(event.target).text();
    $lyricClick.text($(event.target).text());
});
