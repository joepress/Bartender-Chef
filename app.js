var state = {
	questions: [],
	
	prefreneces:[],
	
	
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
				
	
function Question(text,choices,correct){
	this.text = text;
	this.choices = choices;
	this.correct = correct;
	
	}; // create a functiion with the three parameters, text,choices,correct, and assign them to the current text, choices, and correct.
	
	
	var questStrong = new Question('Do ye like yer drinks strong?',['ye', 'na'], 'ya');
	state.questions.push(questStrong);
	
	var questSalty= new Question('Do ye like it with a salty tang?',['ye', 'na'], 'ya' );
	state.questions.push(questSalty);
	
	var questBitter = new Question('Are ye a lubber who likes it bitter?',['ye', 'na'], 'ya');
	state.questions.push(questBitter);
	
	var questSweet = new Question('Would ye like a bit of sweetness with yer poison?',['ye', 'na'], 'ya');
	state.questions.push(questSweet);
	
	var questFruity = new Question('Are ye one for a fruity finish?',['ye', 'na'], 'ya');
	state.questions.push(questFruity);
	
function Ingredient(ingredients){
	this.ingredients = ingredients;
}; 

	var strongIngredients = new Ingredient(['Glug of rum', 'slug of whisky', 'splash of gin']);
	/*state.prefreneces.push(strongIngredients);
	
	var saltyIngredients = new Ingredient(['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
	state.saltyIngredients.push(saltyIngredients);
	
	var bitterIngredients = new Ingredient(['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
	state.bitterIngredients.push(bitterIngredients);
	
	var sweetIngredients = new Ingredient(['Sugar cube', 'spoonful of honey', 'splash of cola']);
	state.sweetIngredients.push(sweetIngredients);
	
	var fruityIngredients = new Ingredient(['Slice of orange', 'dash of cassis', 'cherry on top']);
	state.fruityIngredients.push(fruityIngredients);*/

	
	function advanceQuestion(state){
	if(state.currentQuestionIndex == state.questions.length - 1){
		alert('Congrats on finishing the quiz, lets see what your score is: '+ state.score + '/5');
		resetApp();
	}else{
		renderQuestion(state);
		state.currentQuestionIndex++;
	}
	
}

function thirty() {
  var preferred = '';
	if($('input[name="answer"]:checked').val() === state.questions[state.currentQuestionIndex].correct){
		state.preferences.push(this.ingredients);
	}
		
		console.log(preferred);
};

Ingredient.prototype.createDrink = function(length,state){
    var createDrink = "";
    for (var i=0; i<length; i++) {
         createDrink += this.ingredients[i % this.ingredients.length] + " ";
    }
    console.log(createDrink);
};

strongIngredients.createDrink(3);


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
		alert(state.congrats);
	}else{
		alert(state.failure);
	}
}																					 

			
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