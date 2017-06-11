var state = {
	questions: [],
	
	preferences:[],
	
	drink:[],
	
	currentQuestionIndex:0,
	score:0
	}; // create a object called state and give it a few keys one with an array and two with strings and two with numbers.
	
var questionTemplate = 
	    "<div class='question'>"+
				"<h1 class='questionNumber'></h1>"+
				"<span class='questionText'></span>"+				
				"<form class='radioChoices'>"+
					"<input id='choiceOne'  name='answer' type='radio' required><label class='choiceOne'></label><br>"+
					"<input id='choiceTwo' name='answer' type='radio' required><label class='choiceTwo'></label><br>"+
					"<button class='submission' type ='submit'>Submit</button>"+
					"<button class='startOver'>Start Over</button>"+
				"</form>"+
			"</div>";	//template for the question i will build
				
	
function Question(text,choices,ingredients,correct){
	this.text = text;
	this.choices = choices;
	this.ingredients = ingredients;
	this.correct = correct;
	
	}; // create a functiion with the three parameters, text,choices,correct, and assign them to the current text, choices, and correct.
	
	
var questStrong = new Question('Do ye like yer drinks strong?', ['ye', 'na'], ['Glug of rum', 'slug of whisky', 'splash of gin'], 'ye');
state.questions.push(questStrong); 
	
var questSalty= new Question('Do ye like it with a salty tang?',['ye', 'na'], ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon'], 'ye');
state.questions.push(questSalty);
	
var questBitter = new Question('Are ye a lubber who likes it bitter?',['ye', 'na'], ['Shake of bitters', 'splash of tonic', 'twist of lemon peel'], 'ye');
state.questions.push(questBitter);
	
var questSweet = new Question('Would ye like a bit of sweetness with yer poison?',['ye', 'na'], ['Sugar cube', 'spoonful of honey', 'splash of cola'], 'ye');
state.questions.push(questSweet);
	
var questFruity = new Question('Are ye one for a fruity finish?',['ye', 'na'], ['Slice of orange', 'dash of cassis', 'cherry on top'], 'ye');
state.questions.push(questFruity);
	
	
function advanceQuestion(state){
	if(state.currentQuestionIndex == state.questions.length - 1){
		alert('Your drink has been served. It has a '+state.drink.join(', ')+'. Enjoy!');
		resetApp();
	}else{
		renderQuestion(state);
		state.currentQuestionIndex++;
	}
	
}

var barTender = function(drinks){
	this.drinks = drinks;
};
var newDrink = new barTender(state.preferences);

barTender.prototype.createDrink = function(){
	state.drink = [];
  var createDrink = "";
  this.drinks.map(function(key){
		if ($("input[name='answer']:checked").val() === state.questions[state.currentQuestionIndex].correct){
		state.drink.push(key[Math.floor(Math.random()* 3) + 0]);
		}else{
			state.drink.push(key[Math.floor(Math.random()* 3) + 0]);
		}
});
	
}
function randomElement(elements){
	return elements[Math.floor(Math.random()*elements.length)];
}

function renderQuestion (state){
	var element = $(questionTemplate);
	var quest = state.questions[state.currentQuestionIndex];
	element.find('.questionNumber').text(state.currentQuestionIndex + 1 +'/5');
	element.find('.questionText').text(quest.text);
	element.find('.choiceOne').text(quest.choices[0]);
	element.find('#choiceOne').val(quest.choices[0]);
	element.find('.choiceTwo').text(quest.choices[1]);
	element.find('#choiceTwo').val(quest.choices[1]);
	element.find('.choiceThree').text(quest.choices[2]);
	element.find('#choiceThree').val(quest.choices[2]);
	element.find('.choiceFour').text(quest.choices[3]);
	element.find('#choiceFour').val(quest.choices[3]);
	
	$('#questionContainer').html(element);
}

function score(){
	if ($("input[name='answer']:checked").val() === state.questions[state.currentQuestionIndex].correct){
		state.score++;
	}
}																					 



function thirty() {
	if($("input[name='answer']:checked").val() === state.questions[state.currentQuestionIndex].correct){
		state.preferences.push(state.questions[state.currentQuestionIndex].ingredients);
	}
};
			
function resetApp(){
	$('#questionContainer').hide();
	$('.openingPage').show();
	state.score = 0;
	state.currentQuestionIndex = 0;
}			

$(document).ready(function(){
	$('.startButton').click(function(event){
		event.preventDefault();
		$('.openingPage').hide();
		$('#questionContainer').show();
		renderQuestion(state);
	})	
																	//event listener for when the start button is clicked prevent default than hide the opening page and render the question.	
	$(document).on('submit','.radioChoices',function(e){
		e.preventDefault();
		score();
		thirty();
		newDrink.createDrink();
		barTender(state.preferences);
		advanceQuestion(state);
		renderQuestion(state);	
	});
})

$(document).on('click','.startOver',function(e){
	e.preventDefault();
	e.stopPropagation();
	$('#questionContainer').hide();
	$('.openingPage').show();
})