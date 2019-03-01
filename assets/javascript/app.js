//========VARIABLES========//

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {

	correct: "Are you Beyonce always?? You got it right!",
	incorrect: "Try Again! You miss 100 percent of the chances you don't take.",
	endTime: "No! GOD PLEASE NO! You're out of time!",
	finished: "EVERYBODY STAY CALM! Let's see how ya did!!"
}

//=====Trivia Questions, Answer list and Answer=====// 

var triviaQuestions = [{

    question: "What box of girl scout cookies does Darryl randomly put Andy down for?",
    answerList:["a.) Thin Mints", "b.) Tag-a-Longs", "c.) Shortbread", "d.) Coconut"],
    answer: 2
},{
    question:"According to Dwight, people who can’t farm, farm ____. ",
    answerList: ["a.) Potatoes", "b.) Tomatoes", "c.) Beets", "d.) Celery"],
    answer: 3
},{
    question: "Which is the first prank that Jim ever pulled on Dwight?",
    answerList: ["a.) Jim dresses up as Dwight, mocking him.", "b.) He wrapped his entire desk in wrapping paper", "c.) He blocked his desk drawers so they would only open 2 inches", "d.) He put his stapler in jello"],
    answer: 3
}, {
    question: "What movie did Michael do a parody of on Jim’s first day?",
    answerList: ["a.) Slumdog Millionaire","b.) The Godfather","c.) The Blair Witch Project","d.) Rocky"],
    answer: 2
}, {
    question: "What was the name of the Cat that Dwight got as a replacement for Angela’s dead cat?",
    answerList: ["a.) Sprinkles II", "b.) Bob","c.) Garbage","d.) Trash"],
    answer: 2
},{
    question: "What does Michael order while out with the Insurance selling 'mafia' man?",
    answerList: ["a.) Linguini", "b.) A ham sandwich", "c.) Spaghetti with a side salad", "d.) Gabagool"],
    answer:3
}, {
    question:"Which one of the following is not one of Michael's role models?",
    answerList:["a.) God", "b.) Bono", "c.) Abraham Lincoln", "d.) Bill Gates"],
    answer: 3
},{
    question:"Who is the HR representative ?",
    answerList: ["a.) Toby","b.) Pam", "c.) Angela", "d.) Jim"],
    answer:0
}, {
    question:"Where does Michael think 'Times Square' gets it's name ?",
    answerList:["a.) Time magazine","b.) All the good times we've had there", "c.) The New York Times", "d.) A huge clock"],
    answer: 1
},{
    question:"Which American Idol contestant do people think Todd Packer really likes?",
    answerList:["a.) Chris Daughtry","b.) William Hung","c.) Fantasia","d.) Kelly Pickler"],
    answer:1
}];


//==== ALL FUNCTIONS =====//

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
    
    // ==== NEW QUESTIONS & ANSWERLISTS ===== // 
	
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
    countdown();


    // ==== ANSWERING WILL PAUSE TIME & SETUP ANSWERPAGE ==== // 

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    
	//SETS TIMER TO GO DOWN// 
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
    
	//CHECKS TO SEE CORRECT, INCORRECT OR UNASWERED// 
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}