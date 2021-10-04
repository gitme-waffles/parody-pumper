var form = $(".form");
var searchBtn = $("#search");
var resultArea = $(".result-container");
var inputSong = $("#songName");
var inputArtist = $("#artistName");
var $lyricText = $(".lyric-text");
var $wordsBoxEl = $(".words-box");
var $lyricClick, songtoSearch, artisttoSearch;
var recentSearch = [];

searchBtn.on("click", enterSong);
function enterSong(event) {
  event.preventDefault();
  songtoSearch = inputSong.val().trim();
  artisttoSearch = inputArtist.val().trim();
  if (songtoSearch && artisttoSearch) {
    //  searchSong("ACDC", "Highway to hell");
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
    renderModal()
  }
}

function modalError(eMessage) {
  // clears all previous info
  $('#modalField').html('')
  console.log(eMessage)
  // create El
  var errorEl =  $("<p>")
  var songVal = inputSong.val()
  var artistVal = inputArtist.val()

  // set innerHTML with a value =>> error
  if (eMessage == 404) {
    errorEl.html(`Error ${eMessage} <br /> Could not find '${songVal}' by '${artistVal}'`)
  } else {
    errorEl.html(`Error ${eMessage}`)
  }

  $('#modalField').append(errorEl)

  // run modal remove $(".hide")
  $('#modal').removeClass("hide")
  $('#modal').modal({
  fadeDuration: 100
  });
}

function renderModal() {
  $('#modalField').html('')
  var errorEl =  $("<p>")
  errorEl.html(`Song and Artist is required`)
  $('#modalField').append(errorEl)
  $('#modal').removeClass("hide")
  $('#modal').modal({
  fadeDuration: 100
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
  //     convertText();
  //   }).catch(function(e) {
  //     console.log(e);
  //     // modalError(e.message);
  // });

  var mockedResponse = new Promise(function (res) {
    res({
      lyrics:
        "Paroles de la chanson Adventure Of A Lifetime par Coldplay\r\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nWe are legends\nEvery day\nThat's what she told him!\n\nTurn your magic on\nTo me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\nWe are diamonds\n\nI feel my heart beating\nI feel my heart beneath my skin\nI feel my heart beating\n\n\nOhhh, you make me feel\nLike I'm alive again\nAlive again\nOhhh, you make me feel\nLike I'm alive again\n\nSaid I can't go on, not in this way\nI'm a dream, I die by light of day\nGonna hold up half the sky and say\nOhhh, we are omen\n\nI feel my heart beating\nI feel my heart beneath my skin\nOhhh, I can feel my heart beating\nCause you make me feel\nLike I'm alive again\nAlive again...\n\nOhhh, you make me feel\nLike I'm alive again\n\nTurn your magic on, to me she'd say\nEverything you want's a dream away\nUnder this pressure, under this weight\n\nWe are diamonds taking shape!\nWe are diamonds taking shape!\n\nIf we've only got this life\nThen this adventure, more than I\nAnd if we've only got this life\nYou'll get me through alive\nAnd if we've only got this life\nThen this adventure, more than I\nWanna share with you\nWith you, with you\n\nI said, oh, say oh\n\nWoo hoo, woo hoo...",
    });
  });

  mockedResponse.then(function (data) {
      console.log(data);
      throw new Error();
    console.log(data, "data");

    var lyrics = data.lyrics.split("\r\n")[1];
    //console.log(lyrics);
    renderLyricsToScreen(lyrics);
    convertText();
  }).catch(function(e) {
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

//function to dispaly song name and artist name as heading
function addHeading(song, artist) {
  $("#song").text(" ");
  $("#artist").text(" ");
  $("#song").append(song.toUpperCase());
  $("#artist").append(artist.toUpperCase());
}

//fetch rhymes from wordAPI
function getWordRhymes(searchWord) {
  var searchUrl =
    "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/rhymes";
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
  var searchUrl =
    "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/synonyms";
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
  var searchUrl =
    "https://wordsapiv1.p.rapidapi.com/words/" + searchWord + "/antonyms";
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

function getRecent() {
  recentSearch = null;
  $("#recentSrchEl").text("");
  $("#recentSrchEl").append($("<option>").text("Select Recent Searches"));
  $("#recentSrchEl").prop("disabled", true);

  recentSearch = JSON.parse(localStorage.getItem("searches"));
  if (recentSearch === null) {
    return;
  }
  for (var i = 0; i < recentSearch.length; i++) {
    var $optionEl = $("<option>").text(
      recentSearch[i].song + " - " + recentSearch[i].artist
    );
    $("#recentSrchEl").append($optionEl);
  }
  $("#recentSrchEl").prop("disabled", false);
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

init(); //Initialise
