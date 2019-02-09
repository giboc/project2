var axios = require("axios");

var currentQuestionBank = [];
var correctAnswerArray = [];
var formattedQuestionBank = [];

axios
  .get("https://opentdb.com/api.php?amount=10&type=multiple")
  .then(function(response) {
    // log the actual response
    console.log(response.data.results);

    //assign current question bank into its own variable
    currentQuestionBank = response.data.results;

    createCorrectAnswersArray(currentQuestionBank);

    console.log(correctAnswerArray);

    // questionReformat(currentQuestionBank);
  });

//found knuth shuffle algorithm here https://github.com/coolaj86/knuth-shuffle

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function newQuestionArray(incorrect_answers, correct_answer) {
  for (i = 0; i < incorrect_answers.length; i++) {
    formattedQuestionBank.push(incorrect_answers[i]);
  }
  formattedQuestionBank.push(correct_answer[0]);
}
function questionReformat(currentQuestionBank) {
  for (i = 0; i < currentQuestionBank.length; i++) {
    newQuestionArray(
      currentQuestionBank[i].incorrect_answers,
      currentQuestionBank[i].correct_answer
    );
  }
}

function createCorrectAnswersArray(currentQuestionBank) {
  for (i = 0; i < currentQuestionBank.length; i++) {
    correctAnswerArray.push(currentQuestionBank[i].correct_answer);
  }

  //   console.log(correctAnswerArray);
}

// createCorrectAnswersArray(currentQuestionBank);
// console.log(currentQuestionBank);

// questionReformat(currentQuestionBank);
// console.log(formattedQuestionBank + "formatted");

// pull current bank of question

//for each question place correct answer in array with corresponding index

//place questions in array with both correct and incorrect answers and randomize them

//map trivia categories

axios.get("https://opentdb.com/api_category.php").then(function(response) {
  //   console.log(response.data.trivia_categories);
  var categories = response.data.trivia_categories;

  for (i = 0; i < categories.length; i++) {
    console.log(
      `ID IS ${categories[i].id} category name is ${categories[i].name} \n`
    );
  }
});
