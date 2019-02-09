var axios = require("axios");

var questionBank;
var correctAnswerArray = [];
var formattedQuestionBank = [];

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
  for (i = 0; i < questionBank.length; i++) {
    console.log(
      "\n" + formattedQuestionBank + "\n HERE IS THE FORMATTED QUESTION BANK \n"
    );
    for (x = 0; x < questionBank[i].incorrect_answers.length; x++) {
      formattedQuestionBank[i].push(questionbank[i].incorrect_answers[x]);
    }
    formattedQuestionBank[i].push(questionbank[i].correct_answer);
  }
}
function questionReformat(questionBank) {
  for (i = 0; i < questionBank.length; i++) {
    newQuestionArray(
      questionBank[i].incorrect_answers,
      questionBank[i].correct_answer
    );
  }
}

function createCorrectAnswersArray(currentQuestionBank) {
  for (i = 0; i < currentQuestionBank.length; i++) {
    correctAnswerArray.push(currentQuestionBank[i].correct_answer);
  }

  //   console.log(correctAnswerArray);
}

axios
  .get("https://opentdb.com/api.php?amount=10&type=multiple")
  .then(function(response) {
    // log the actual response
    console.log(response.data.results);

    //assign current question bank into its own variable
    questionBank = response.data.results;

    createCorrectAnswersArray(questionBank);

    console.log(correctAnswerArray);

    questionReformat(questionBank);
  })
  .catch(function(err) {
    console.log(err);
  });

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
  var category_url = " ";

  for (i = 0; i < categories.length; i++) {
    category_url = `https://opentdb.com/api.php?amount=10&category=${
      categories[i].id
    }`;
    console.log(
      `
      CURRENT CATEGORY OBJECT INDEX IS: ${i}
      ID IS ${categories[i].id} category name is ${categories[i].name}
      THE API FOR 10 QUESTIONS WITH ${categories[i].name} AS A CATEGORY IS:
     ${category_url} `
    );
  }
});
