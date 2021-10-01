searchWord = "capable";

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

function printRhyming(wordArr) {
  $("#rhymingWords").text(""); //clear any children
  for (var i = 0; i < wordArr.length; i++) {
    rhymeEl = $("<li>").text(wordArr[i]);
    $("#rhymingWords").append(rhymeEl);
  }
}
function printSynonyms(wordArr) {
  $("#synonyms").text(""); //clear any children
  for (var i = 0; i < wordArr.length; i++) {
    rhymeEl = $("<li>").text(wordArr[i]);
    $("#synonyms").append(rhymeEl);
  }
}
function printAntonyms(wordArr) {
  $("#antonyms").text(""); //clear any children
  for (var i = 0; i < wordArr.length; i++) {
    rhymeEl = $("<li>").text(wordArr[i]);
    $("#antonyms").append(rhymeEl);
  }
}

//getWordRhymes(searchWord)
//getWordSynonyms(searchWord)
//getWordAntonyms(searchWord)
