var questions = [
	"When were the Roaring Twenties?",
	"What war ended right before the start of the Roaring Twenties?",
	"What event brought the Roaring Twenties to a grinding halt?",
	"What Constitutional amendment gave women the right to vote?",
	"Who were flappers?",
	"What did prohibition make illegal?",
	"What style of music became popular during the Roaring Twenties?",
	"In 1927, this famous aviator, nicknamed the Lone Eagle, made the first solo non-stop plane trip across the Atlantic.",
	"What infamous gangster was a strong part of the decade and was responsible for the St. Valentines Day Massacre?",
	"What was the wildly popular Ford car that was affordable and easy to make thanks to the assembly line?",	
];

var answers = [
	["1620s", "1720s", "1820s", "1920s",],
	["Civil War", "World War I", "War of 1812", "Revolutionary War",],
	["World War II", "Cold War", "Stock market crash", "Prohibition",],
	["5th", "14th", "19th", "21st",],
	["Politicians who changed sides", "Automobile sales people", "People who supported prohibition", "Young women who listened to jazz",],
	["Stock trading", "Alcoholic drinks", "Jazz music", "Women voting",],
	["Jazz", "Rap", "Hip hop", "Rock and roll",],
	["Alfred Verville", "Howard Hughes", "Charles Lindbergh", "Amelia Earhart",],
	["Scarface Al Capone", "Lester Baby Face Nelson Gills", "John Dillinger", "Bugs Moran",],
	[" Curved Dash", "Town Car", "500 K", "Model T",],
];

var correctAnswers = ["1920s", "World War I", "Stock market crash", "19th", "Young women who listened to jazz", 
	"Alcoholic drinks", "Jazz", "Charles Lindbergh", "Scarface Al Capone", "Model T"]; 
var selectedAnswer;

// Counters 
var correct = 0;      		//correct answers
var incorrect = 0;   	    //incorrect answers
var unanswered = 0;   		//incorrect answers due to timeout 
var triviaCounter = 0;      //question counter
var timer = 10;		  		//timer, 20 sec	
var countdown;				//the countdown for the timer 

// Main screen for the game 
var mainScreen;

// The first screen that appears on the page with the button to begin the quiz
var startScreen;

function firstScreen() {
	startScreen = "<p class='buttons'><a class='btn start-button'>Begin Quiz</a></p>";
	$("#screen").html(startScreen);
}

firstScreen();

// The click event to start the game 
	$("#screen").on("click", ".start-button", function(event){
		startGame();
	}); 

// Start the game
function startGame() {
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	triviaCounter = 0;
	timer = 10;

	mainBody();
	clock()
};

// Create questions on the main page
function mainBody() {
	$('.start-button').hide();

	mainScreen = "<p class='time'>Time Remaining: <div class='timer'>10</div></p>" + 
	"<p class='question'>" + questions[triviaCounter] + 
	"</p><p class='answer'>" + answers[triviaCounter][0] + 
	"</p><p class='answer'>" + answers[triviaCounter][1] +
	"</p><p class='answer'>" + answers[triviaCounter][2] + 
	"</p><p class='answer'>" + answers[triviaCounter][3];"</p>";
	$("#screen").html(mainScreen);
};

// Set timer function
function clock() {
	countdown = setInterval(timePerQuestion, 1000);
	
	function timePerQuestion() {
		if (timer > 0) {    
			timer--;
		}

		if (timer === 0) {
			clearInterval(countdown);
			timeOut();
		}
		
		$(".timer").html(timer); 
	}
};

// Check if the selested answer matches the correct answer
$("#screen").on("click", ".answer", function(){
	selectedAnswer = $(this).html();
	if (selectedAnswer === correctAnswers[triviaCounter]) {

		clearInterval(countdown);
		rightAnswer();
	}
	else {
		clearInterval(countdown);
		wrongAnswer();
	}
});

// Go to the next question until the array ends 
function nextQuestion() {
	if (triviaCounter < 9) {
	triviaCounter++;
	timer = 10;
	
	mainBody();
	clock();
	
	} 
	else {
		results();
	}
};

// Player ran out of time to answer
function timeOut() {
	// mainScreen = "<p> Time ran out! The correct answer is: " + correctAnswers[triviaCounter]; "</p>" ;
	unanswered++;
	$("#screen").html(mainScreen);
	setTimeout(nextQuestion); 
};

// Player got an answer wrong
function wrongAnswer() {
	// mainScreen = "<p>The correct answer is: " + correctAnswers[triviaCounter]; "</p>" ;
	incorrect++;
	$("#screen").html(mainScreen);
	setTimeout(nextQuestion); 
};

// Player got an answer right 
function rightAnswer() {
	// mainScreen = "<p> The correct answer is: " + correctAnswers[triviaCounter]; "</p>" ;
	correct++;
	$("#screen").html(mainScreen);
	setTimeout(nextQuestion); 
};

// Screen with the results
function results() {
	mainScreen = "<p>Your results:</p>" + 
	"<p>Correct: " + correct + "</p>" + 
	"<p>Incorrect: " + incorrect + "</p>" + 
	"<p>Unanswered: " + unanswered + "</p>" + 
	"<p class='buttons'><a class='btn start-button'>Restart</a></p>";
    $("#screen").html(mainScreen);}
    




    // function displayImages() {
    //     var queryURL = "https://opentdb.com/api.php?amount=10&type=multiple";
      
    //           $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //           }).then(function(response) {
    //             console.log(response)
    //             var results = response.data;
      
    //               // Display gifs and ratings on the page 
    //               for (var i = 0; i < results.length; i++) {
    //                 var heroesDiv = $("<div class='heroes'>");
      
    //                   // Rating:
    //                   var pOne = $("<p>").text("Rating: " + results[i].rating);
    //                     heroesDiv.append(pOne);
      
    //                   // Image:
    //                   var pTwo = $("<img>").attr({ "src":results[i].images.fixed_height_still.url, 
    //                       "data-still":results[i].images.fixed_height_still.url, 
    //                       "data-animate":results[i].images.fixed_height.url, 
    //                       "data-state":"still", 
    //                       "class":"gif", });
    //                     heroesDiv.append(pTwo);
                  
    //                     $("#gifs-appear-here").prepend(heroesDiv);
      
    //               };