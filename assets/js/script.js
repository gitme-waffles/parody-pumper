var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#songName");
var inputArtist = $("#artistName");
var $lyricText = $(".lyric-text");
var $wordsBoxEl = $(".words-box");
var $toggleHlt = $("#toggleHlt");
var $copyToclip = $("#copyBtn");
var $toggleCng = $("#toggleCng");
var $lyricClick;
var $lyricClick, songtoSearch, artisttoSearch;
var recentSearch = [];
var changedLyric = [];
var toggleHltTxt = false;
var toggleCngTxt = false;

searchBtn.on("click", enterSong);
$copyToclip.on("click", copyFunc);
//$gameStart.on("click", startPlay);
//var wordsPlay = [];
function enterSong(event) {
    event.preventDefault();
    songtoSearch = inputSong.val().trim();
    artisttoSearch = inputArtist.val().trim();
    if (songtoSearch && artisttoSearch) {
        searchSong(songtoSearch, artisttoSearch);
        addHeading(songtoSearch, artisttoSearch);

        if (recentSearch !== null) {
            recentSearch.push({ artist: artisttoSearch, song: songtoSearch });
        } else {
            recentSearch = [{ artist: artisttoSearch, song: songtoSearch }];
        }
        saveRecent();
        getRecent();
    } else {
        renderModal();
    }
}

function modalError(eMessage) {
    // clears all previous info
    $("#modalField").html("");
    console.log(eMessage);
    // create El
    var errorEl = $("<p>");
    var songVal = inputSong.val();
    var artistVal = inputArtist.val();

    // set innerHTML with a value =>> error
    if (eMessage == 404) {
        errorEl.html(`Error ${eMessage} <br /> Could not find '${songVal}' by '${artistVal}'`);
    } else {
        errorEl.html(`Error ${eMessage}`);
    }

    $("#modalField").append(errorEl);

    // run modal remove $(".hide")
    $("#modal").removeClass("hide");
    $("#modal").modal({ fadeDuration: 100 });
}

function renderModal() {
    $("#modalField").html("");
    var errorEl = $("<p>");
    errorEl.html(`Song and Artist is required`);
    $("#modalField").append(errorEl);
    $("#modal").removeClass("hide");
    $("#modal").modal({
        fadeDuration: 100,
    });
}

function searchSong(song, artist) {
    var songUrl =
        "https://private-anon-e83b93ca5b-lyricsovh.apiary-proxy.com/v1/" +
        encodeURIComponent(artist) +
        "/" +
        encodeURIComponent(song);

    // DO NOT REMOVE!
    // fetch(songUrl)
    //   .then(function (response) {
    //       console.log(response);
    //       if (response.status != 200) {
    //         modalError(response.status)
    //       }
    //       return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data, "data");

    //     var lyrics = data.lyrics.split("\r\n")[1];
    //     //console.log(lyrics);
    //     renderLyricsToScreen(lyrics);
    //   }).catch(function(e) {
    //     console.log(e);
    //     // modalError(e.message);
    // });

    var mockedResponse = new Promise(function (res) {
        res({
            lyrics: "Paroles de la chanson Adventure Of A Lifetime par Coldplay\r\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nWe are legends\nEvery day\nThat's what she told him!\n\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\nWe are diamonds\n\nI feel my heart beating\nI feel my heart beneath my skin\nI feel my heart beating\n\n\nOhhh, you make me feel\nLike I'm alive again\nAlive again\nOhhh, you make me feel\nLike I'm alive again\n\nSaid I can't go on, not in this way\nI'm a dream, I die by light of day\nGonna hold up half the sky and say\nOhhh, we are omen\n\nI feel my heart beating\nI feel my heart beneath my skin\nOhhh, I can feel my heart beating\nCause you make me feel\nLike I'm alive again\nAlive again...\n\nOhhh, you make me feel\nLike I'm alive again\n\nTurn your magic on, to me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\n\nWe are diamonds taking shape!\nWe are diamonds taking shape!\n\nIf we've only got this life\nThen this adventure, more than I\nAnd if we've only got this life\nYou'll get me through alive\nAnd if we've only got this life\nThen this adventure, more than I\nWanna share with you\nWith you, with you\n\nI said, oh, say oh\n\nWoo hoo, woo hoo...",
        });
    });

    mockedResponse
        .then(function (data) {
            console.log(data);
            //throw new Error(); removed for functionality
            console.log(data, "data");

            var lyrics = data.lyrics.split("\r\n")[1];
            //console.log(lyrics);
            renderLyricsToScreen(lyrics);
        })
        .catch(function (e) {
            console.log(e);
            modalError(e.message);
        });

    mockedResponse
        .then(function (data) {
            console.log(data);
            //throw new Error(); removed for functionality
            console.log(data, "data");

            var lyrics = data.lyrics.split("\r\n")[1];
            //console.log(lyrics);
            renderLyricsToScreen(lyrics);
            convertText();
        })
        .catch(function (e) {
            console.log(e);
            modalError(e.message);
        });
}

//function to display song in container
function renderLyricsToScreen(lyrics) {
    inputArtist.val("");
    inputSong.val("");

    //console.log(lyrics, "lyrics of song");
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
    //Add song and Artist to recently searched - local storage.
}

//function to display song name and artist name as heading
function addHeading(song, artist) {
    $("#song").text(" ");
    $("#artist").text(" ");
    $("#song").append(song.toUpperCase());
    $("#artist").append(artist.toUpperCase());
}

//function to copy lyrics to clipboard
function copyFunc() {
    // get the lyric text element
    // iterate through the childrend
    // if its a div, iterate through the words
    // if its a break, skip it and add a new line (\n)
    // sum up the strings into the original song lyric

    // var $childDiv = $(".lyric-text").children();
    // // var $grandchild = $(".lyric-text").find("span").text();
    // console.log($childDiv, "child div");
    // // console.log($grandchild, "grand child");
    // var $childSpan = $(".lyric-text>div>span");
    // console.log($childSpan);
    // for (var i = 0; i < $childDiv.length; i++) {
    //     console.log($childDiv[i]);
    // }
    // var $lyricText = $(".lyric-text");
    // console.log($lyricText.children().length, "lyric text");

    var $lyricText = $(".lyric-text");
    var copyText = " ";
    for (var i = 0; i < $lyricText.children().length; i++) {
        var $lyricLine = $lyricText.children().eq(i).children();

        for (var j = 0; j < $lyricLine.length; j++) {
            copyText += $lyricLine.eq(j).text();
            if (j < $lyricLine.length - 1) {
                copyText += " ";
            }
        }
        copyText += "\n";
    }
    console.log(copyText);

    var text = copyText;

    var $temp = $("<textarea>");
    $("body").append($temp);
    $temp.text(text).select();

    document.execCommand("copy");
    $temp.remove();
    if (copyText !== " ") {
        modal.style.display = "block";
    } else {
        console.log("Nothing to copy");
    }
}

function messageDisplay() {}
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
            printRhyming(data.rhymes.all, true);
        })
        .catch((err) => {
            console.log(err);
            printRhyming(["No Rhymes Found"], false);
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
            if (!data.synonyms || data.synonyms.length === 0) {
                throw new Error("No synonyms Found");
            }
            printSynonyms(data.synonyms, true);
        })
        .catch((err) => {
            console.log("Synmon Error : ", err);
            printSynonyms(["No synonyms Found"], false);
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
            printAntonyms(data.antonyms, true);
        })
        .catch((err) => {
            console.log(err);
            printAntonyms(["No antonyms Found"], false);
        });
}

// Print rhymes to screen
function printRhyming(wordArr, useMe) {
    $("#rhymingWords").text(""); //clear any children
    if (!useMe) {
        for (var i = 0; i < wordArr.length; i++) {
            rhymeEl = $("<li>").text(wordArr[0]).attr({ "data-use": useMe });
            $("#rhymingWords").append(rhymeEl);
        }
    } else {
        for (var i = 0; i < wordArr.length; i++) {
            rhymeEl = $("<li>").text(wordArr[i]).attr({ "data-use": useMe });
            $("#rhymingWords").append(rhymeEl);
        }
    }
}
// Print Synonyms to screen
function printSynonyms(wordArr, useMe) {
    $("#synonyms").text(""); //clear any children
    if (!useMe) {
        rhymeEl = $("<li>").text(wordArr[0]).attr({ "data-use": useMe });
        $("#synonyms").append(rhymeEl);
    } else {
        for (var i = 0; i < wordArr.length; i++) {
            rhymeEl = $("<li>").text(wordArr[i]).attr({ "data-use": useMe });
            $("#synonyms").append(rhymeEl);
        }
    }
}
//Print Antonyms to screen
function printAntonyms(wordArr, useMe) {
    $("#antonyms").text(""); //clear any children
    if (!useMe) {
        rhymeEl = $("<li>").text(wordArr[0]).attr({ "data-use": useMe });
        $("#antonyms").append(rhymeEl);
    } else {
        for (var i = 0; i < wordArr.length; i++) {
            rhymeEl = $("<li>").text(wordArr[i]).attr({ "data-use": useMe });
            $("#antonyms").append(rhymeEl);
        }
    }
}

// event delegation - click on lyric word.
$lyricText.on("click", "span", function (event) {
    if ($lyricClick) {
        $lyricClick.removeClass("highLightColor");
        if (toggleHltTxt) {
            //$lyricClick.addClass("changedColor");
            console.log("Me");
        }
    }
    $lyricClick = $(event.target);
    //$lyricClick.addClass("highLightColor");
    getWordRhymes($lyricClick.text());
    getWordSynonyms($lyricClick.text());
    getWordAntonyms($lyricClick.text());
});

// Event delegation
$wordsBoxEl.on("click", "li", function (event) {
    if ($(event.target).data("use")) {
        changedLyric.push({
            target: $lyricClick,
            origional: $lyricClick.text(),
            new: $(event.target).text(),
        });
        if (toggleCngTxt) {
            $lyricClick.text("(" + $lyricClick.text() + ") " + $(event.target).text());
        } else {
            $lyricClick.text($(event.target).text());
        }
        if (toggleHltTxt) {
            $lyricClick.addClass("changedColor");
        }
    }
});

// Get the modal
var modal = document.getElementById("copyModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
function getRecent() {
    recentSearch = null;
    $("#recentSrchEl").text("");
    $("#recentSrchEl").append($("<option>").text("Select Recent Searches"));
    $("#recentSrchEl").prop("disabled", true);

    recentSearch = JSON.parse(localStorage.getItem("searches")) || [];
    for (var i = 0; i < recentSearch.length; i++) {
        var $optionEl = $("<option>").text(recentSearch[i].song + " - " + recentSearch[i].artist);
        $("#recentSrchEl").append($optionEl);
        $("#recentSrchEl").prop("disabled", false);
    }
}

function saveRecent() {
    localStorage.setItem("searches", JSON.stringify(recentSearch));
}

function init() {
    getRecent();
}

// search here for a chnage in the recent search list
$("#recentSrchEl").on("change", function (event) {
    songtoSearch = recentSearch[event.target.options.selectedIndex - 1].song;
    artisttoSearch = recentSearch[event.target.options.selectedIndex - 1].artist;
    searchSong(songtoSearch, artisttoSearch);
    addHeading(songtoSearch, artisttoSearch);
    $("#recentSrchEl").get(0).selectedIndex = 0;
});

$toggleHlt.on("change", function (event) {
    toggleHltTxt = event.target.checked;
    for (var i = 0; i < changedLyric.length; i++) {
        if (toggleHltTxt) {
            changedLyric[i].target.addClass("changedColor");
        } else {
            changedLyric[i].target.removeClass("changedColor");
        }
    }
});

$toggleCng.on("change", function (event) {
    toggleCngTxt = event.target.checked;
    for (var i = 0; i < changedLyric.length; i++) {
        if (event.target.checked) {
            changedLyric[i].target.text("(" + changedLyric[i].origional + ") " + changedLyric[i].new);
        } else {
            changedLyric[i].target.text(changedLyric[i].new);
        }
    }
});
// function startPlay() {
//     $("#gameDiv").show();
//     $(".result-container").hide();
//     var word = "";
//     var wordGuess = [];
//     var wrongGuess = [];
//     var guessNo = 0;
//     var winCount = 1;
//     var guess = "";
//     var dif = 0;
//     $("#easyBtn").on("click", chooseDif1);
//     $("#normalBtn").on("click", chooseDif2);
//     $("#hardBtn").on("click", chooseDif3);
//     $(" .restartBtn").on("click", restart);
//     $("#startBtn").on("click", start);

//     //if  opt easy
//     function chooseDif1() {
//         dif = 1;
//         document.getElementById("startDiv").style.display = "block";
//         document.getElementById("chooseDifficulty").style.display = "none";
//     }
//     //if opt normal
//     function chooseDif2() {
//         dif = 2;
//         document.getElementById("startDiv").style.display = "block";
//         document.getElementById("chooseDifficulty").style.display = "none";
//     }

//     //if opt difficult
//     function chooseDif3() {
//         dif = 3;
//         document.getElementById("startDiv").style.display = "block";
//         document.getElementById("chooseDifficulty").style.display = "none";
//     }

//     //function to selct a random word
//     function wordw() {
//         var randomWords = [
//             "humor",
//             "miniature",
//             "amusing",
//             "creepy",
//             "fact",
//             "risk",
//             "verse",
//             "land",
//             "lumpy",
//             "holiday",
//             "glorious",
//             "weigh",
//             "brake",
//             "pretty",
//             "grin",
//             "capricious",
//             "bite-sized",
//             "misty",
//             "ignore",
//             "certain",
//             "sloppy",
//             "dress",
//             "true",
//             "zonked",
//             "observation",
//             "action",
//             "various",
//             "want",
//             "direful",
//             "suck",
//             "dress",
//             "scarecrow",
//             "judge",
//             "madly",
//             "quizzical",
//             "consist",
//             "fierce",
//             "love",
//             "arrest",
//             "serve",
//             "fit",
//             "hug",
//             "tan",
//             "curve",
//             "eatable",
//             "tub",
//             "race",
//             "innocent",
//             "open",
//             "preach",
//             "steady",
//             "acoustics",
//             "lock",
//             "field",
//             "arrange",
//             "rifle",
//             "learned",
//             "toe",
//             "flow",
//             "competition",
//             "ill-fated",
//             "oatmeal",
//             "match",
//             "male",
//             "measure",
//             "loaf",
//             "smile",
//             "wrestle",
//             "dull",
//             "food",
//             "locket",
//             "bell",
//             "beg",
//             "strengthen",
//             "responsible",
//             "enchanting",
//             "loutish",
//             "switch",
//             "idea",
//             "nine",
//             "squeamish",
//             "pig",
//             "bat",
//             "dear",
//             "trains",
//             "owe",
//             "frogs",
//             "assorted",
//             "lonely",
//             "hurry",
//             "natural",
//             "sun",
//             "snow",
//             "obnoxious",
//             "broken",
//             "friend",
//             "bright",
//             "cake",
//             "sour",
//             "permit",
//             "economic",
//             "lovely",
//             "quick",
//             "van",
//             "tempt",
//             "apparel",
//             "decay",
//             "business",
//             "adjustment",
//             "blushing",
//             "makeshift",
//             "slippery",
//             "load",
//             "winter",
//             "exist",
//             "tongue",
//             "country",
//             "roll",
//             "fast",
//             "moor",
//             "possess",
//             "pat",
//             "pass",
//             "books",
//             "impartial",
//             "hospitable",
//             "dust",
//             "naughty",
//             "extra-large",
//             "tacky",
//             "produce",
//             "committee",
//             "fuzzy",
//             "judicious",
//             "nebulous",
//             "stick",
//             "ear",
//             "copy",
//             "friendly",
//             "press",
//             "distinct",
//             "vegetable",
//             "upset",
//             "venomous",
//             "statement",
//             "sulky",
//             "spell",
//             "x-ray",
//             "square",
//             "taste",
//             "great",
//             "thumb",
//             "adjoining",
//             "chilly",
//             "test",
//             "ancient",
//             "green",
//             "badge",
//             "work",
//             "repeat",
//             "free",
//             "elderly",
//             "doctor",
//             "difficult",
//             "grubby",
//             "approval",
//             "turn",
//             "vivacious",
//             "thundering",
//             "cherries",
//             "rest",
//             "plan",
//             "crime",
//             "sticks",
//             "wealthy",
//             "phone",
//             "suspend",
//             "gullible",
//             "fence",
//             "note",
//             "wall",
//             "interest",
//             "coil",
//             "jump",
//             "enchanted",
//             "funny",
//             "racial",
//             "greasy",
//             "polish",
//             "elbow",
//             "smart",
//             "bore",
//             "crowd",
//             "glistening",
//             "oval",
//             "eggs",
//             "nauseating",
//             "detailed",
//             "veil",
//             "coal",
//         ];
//         var raNum = Math.floor(Math.random() * 70);
//         console.log(raNum, "random Number"); //gives a random position in array
//         return randomWords[raNum]; //returns word to search
//     }

//     //function to display - according to wordlength
//     function wordStart() {
//         var wordLength = word.length;
//         var wordL_ = "";
//         var count = wordLength;

//         while (count > 0) {
//             wordGuess.push(" _ ");
//             count -= 1;
//         }
//     }

//     //
//     function winCountFunc() {
//         var num = 0;
//         var lettUsed = "";
//         var count = word.length;

//         while (count > 0) {
//             if (lettUsed.includes(word[count - 1])) {
//             } else {
//                 num += 1;
//                 lettUsed += word[count - 1];
//             }

//             count -= 1;
//         }

//         return num;
//     }

//     //function to start game;
//     function start() {
//         word = wordw();
//         // console.log(word, "word");
//         winCount = winCountFunc();

//         if (dif == 1) {
//             //if we choose easy option we can do wordlength+5 wrong guess
//             guessNo = word.length + 5;
//         } else if (dif == 2) {
//             // if we choose normal option we can do wrong guess same as word length
//             guessNo = word.length;
//         } else if (dif == 3) {
//             //if we choose difficult option wrong guess is half of word length.
//             if (word.length % 2 == 0) {
//                 guessNo = word.length / 2;
//             } else {
//                 guessNo = (word.length - 1) / 2;
//             }
//         }

//         console.log(word);
//         //    $("#guessBtn").on("click", enterGuess);
//         document.getElementById("mainGame").style.display = "block";
//         document.getElementById("startDiv").style.display = "none";
//         document.getElementById("question").innerHTML = "Enter your guess";

//         wordStart(); //calling functon wordStart

//         $("#guessBtn").on("click", enterGuess);

//         document.getElementById("RRguess").style.display = "block";
//         document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
//         document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
//         document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessNo;

//         // var x = document.getElementById("guess").maxLength;
//         // console.log(x, "guesslength");
//     }
//     //function to enter guesses
//     function enterGuess() {
//         var lett = document.getElementById("guess").value; //inputbox value
//         document.getElementById("guess").value = "";

//         if (lett.length === 1) {
//             var rightOnot = isRightOnot(lett); //calling function
//             if (rightOnot == true) {
//                 NewCW(lett); //if true calls function
//             } else {
//                 if (!wrongGuess.includes(lett)) {
//                     console.log("wrong guess!!");
//                     wrongGuess.push(lett); //pushes to wrong guess
//                 }
//                 guessNo -= 1; //lost one guessNo
//             }
//         } else if (lett.length < 1) {
//         } else {
//             guessNo -= 1; //if nothing in input box
//         }

//         if (guessNo <= 0) {
//             //guess chance over
//             gameLose();
//         }

//         if (winCount <= 0) {
//             gameWin();
//         }
//         document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
//         document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
//         document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessNo;
//     }
//     //function to check wheather guess we enter includes in word
//     function isRightOnot(a) {
//         var n = word.includes(a);
//         // console.log(n);
//         return n; //returns a true or false value
//     }

//     //function for enter the letter /guess in correct index/position
//     function NewCW(letter) {
//         var count = 0;
//         winCount -= 1;

//         while (count <= word.length - 1) {
//             if (letter === word[count]) {
//                 if (wordGuess[count] === letter) {
//                 } else {
//                 }

//                 wordGuess[count] = letter;
//                 count += 1;
//             } else {
//                 count += 1;
//             }
//         }
//     }
//     //function when lose game
//     function gameLose() {
//         document.getElementById("mainGame").style.display = "none";
//         document.getElementById("RRguess").style.display = "none";
//         document.getElementById("youLose").style.display = "block";
//         document.getElementById("correctWordWas").innerHTML = "The correct word was " + word;
//     }
//     //function when game win
//     function gameWin() {
//         document.getElementById("mainGame").style.display = "none";
//         document.getElementById("RRguess").style.display = "none";
//         document.getElementById("youWin").style.display = "block";
//     }
//     //function at restart
//     function restart() {
//         document.getElementById("mainGame").style.display = "none";
//         document.getElementById("RRguess").style.display = "none";
//         document.getElementById("youLose").style.display = "none";
//         document.getElementById("youWin").style.display = "none";
//         document.getElementById("chooseDifficulty").style.display = "block";

//         word = "";
//         wordGuess = [];
//         wrongGuess = [];
//         guessNo = 0;
//         winCount = 1;
//         guess = "";
//         dif = 0;
//     }
// }
init(); //Initialise

// function TestsFunction() {
//     var T = document.getElementById("TestsDiv"),
//         displayValue = "";
//     if (T.style.display == "")
//         displayValue = "none";

//     T.style.display = displayValue;
