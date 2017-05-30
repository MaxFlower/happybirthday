(function( $ ){
	var mymodal = document.getElementById('myModal'),
		gameType1 = document.getElementById('game1'),
		gameType2 = document.getElementById('game2'),
		gameType3 = document.getElementById('game3'),
		progressBar = document.getElementsByClassName('progress-bar')[0],
		gameField = document.getElementsByClassName('game-field')[0],
		catFoods = document.getElementsByClassName('foods')[0]
		foods = document.getElementsByClassName('media');

	var currentGameType = void 0,
		timer = void 0,
		timeout = void 0,
		hungryLevel = 100;

	gameType1.onclick = function() {
		console.log('>>>>>>>>>>1');
		setGameType(1);
	};

	gameType2.onclick = function() {
		console.log('>>>>>>>>>>2');
		setGameType(2);
	};

	gameType3.onclick = function() {
		console.log('>>>>>>>>>>3');
		setGameType(3);
	};

	function refreshData() {
		var initValues = [3, 7, 4, 5, 3, 5, 2, 2, 1];

		currentGameType = void 0;
		gameField.classList.remove('hide');
		catFoods.classList.add('hide');
		timer = void 0,
		timeout = void 0,
		hungryLevel = 100;
		for (var i = 0, len = foods.length; i < len; i++) {
			foods.item(i).setAttribute('data-value', initValues[i]);
			foods.item(i).getElementsByClassName('food-level')[0].innerText = initValues[i];
		}
	}

	function foodClickHandler() {
		var nextValue = Number(this.getAttribute('data-value')) - 1;
		var cost = this.getAttribute('data-cost');

		console.log('nextValue: ', nextValue);
		console.log('cost: ', cost);

		if (nextValue >= 0) {		
			this.getElementsByClassName('food-level')[0].innerText = nextValue;
			this.setAttribute('data-value', nextValue);
			hungryLevel += Number(cost);
			checkHungry();
		}
	}

	setGameType = function(type) {
		console.log('set type: ', type);
		currentGameType = type;
		gameField.classList.add('hide');
		catFoods.classList.remove('hide');
		startGame(currentGameType);		
	};

	startGame = function(type) {
		console.log('start game: ', type);
		var period;			
		
		timer = void 0;
		hungryLevel = 100;
		oneMinute = 60 * 1000; 

		switch (type) {
			case 1:
				period = 2000;
				break;
			case 2:
				period = 1000;
				break;
			case 3:
				period = 1000;
				break;
			default:				
				return console.log('wrong game type');
		}

		timer = setInterval(function() {
			hungryLevel -= 5;
			progressBar.style = 'width:' + hungryLevel + '%';
			checkHungry();			
		}, period);

		timeout = setTimeout(function() {
			if (currentGameType === 1 || currentGameType === 2) {
				endGame(true);
			}
		}, oneMinute);				
	};

	endGame = function(result) {
		console.log('game over');
		clearInterval(timer);
		clearTimeout(timeout);

		if (result) {
			mymodal.getElementsByClassName('modal-title')[0].innerText = 'Поздравляю!!! Это было великолепно :)';
			mymodal.getElementsByClassName('cat-status')[0].src = 'img/goodcat.jpg';
		} else {
			mymodal.getElementsByClassName('modal-title')[0].innerText = 'Это провал. Попробуйте еще!';
			mymodal.getElementsByClassName('cat-status')[0].src = 'img/badcat.jpg';
		}		

		$('#myModal').modal('show');

		refreshData();	
	};

	checkHungry = function() {
		console.log('hungryLevel', hungryLevel);

		if (hungryLevel > 74 && hungryLevel <= 100) {
			progressBar.classList.add('progress-bar-success');
			progressBar.classList.remove('progress-bar-warning');
			progressBar.classList.remove('progress-bar-danger');
		}

		if (hungryLevel > 24 && hungryLevel < 75) {
			progressBar.classList.remove('progress-bar-success');
			progressBar.classList.add('progress-bar-warning');
			progressBar.classList.remove('progress-bar-danger');
		}

		if (hungryLevel < 25) {
			progressBar.classList.remove('progress-bar-success');
			progressBar.classList.remove('progress-bar-warning');
			progressBar.classList.add('progress-bar-danger');
		}

		
		//for gameType 1 and 2 
		if (hungryLevel < 0 || hungryLevel > 100) {
			endGame(false);
		}

		//for gameType 3 
		if (currentGameType === 3) {
			var goodsSum = 0;

			for (var i = 0, len = foods.length; i < len; i++) {
				sum += foods.item(i).getAttribute('data-value');				
			}

			if (!goodsSum) {
				endGame(true);
			}			
		}
	};

	function init() {
		for (var i = 0, len = foods.length; i < len; i++) {
			foods.item(i).getElementsByClassName('food-level')[0].innerText = foods.item(i).getAttribute('data-value');
			foods.item(i).onclick = foodClickHandler;
		}		
	}

	init(); 
	
})( jQuery );