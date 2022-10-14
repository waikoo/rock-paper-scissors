import { $, $$ } from './utils/selectors.js';
import { makeInvisible, makeVisible } from './utils/toggleUIDisplay.js';
import getRandomNumberUntil from './utils/randomNumberGenerator.js';

// ! name
function handleNameSubmission(e) {
	e.preventDefault();
	const playerName = $('#name').value;
	playerName ? setPlayerName(playerName) : setPlayerName();

	$('#form-name').classList.add('go-out');
	setTimeout(() => {
		makeInvisible($('#form-name'));
		makeVisible($('#form-color'));
	}, 300);

	$('#paper').classList.add('rps-animation');
	$('#paper').classList.remove('unlit');
}
function setPlayerName(name = 'Player') {
	game.name = name.trim();
	$('.player-name').textContent = game.name;
}
// ! color
function handleColorSubmission(e) {
	e.preventDefault();
	if (game.playerColor) {
		game.computerColor = getRandomColor();
	} else {
		game.playerColor = getRandomColor();
	}

	animateUIAtColorStage();
	loadColoredRPS();
}
function handleColorSelection(e) {
	colors.forEach(color => {
		if (color === e.target) {
			color.classList.add('selected');
			game.playerColor = e.target.dataset.color;
		} else {
			color.classList.remove('selected');
		}
	});
}
function getRandomColor() {
	const randomColorObj = {
		1: 'red',
		2: 'yellow',
		4: 'purple',
		3: 'green',
		5: 'blue'
	};
	return randomColorObj[`${getRandomNumberUntil(5)}`];
}
function loadColoredRPS() {
	if (!game.computerColor) game.computerColor = getRandomColor();
	if (game.playerColor === game.computerColor) game.computerColor = getRandomColor();
	// TODO: avoid same color being used. here.

	$('.computer-rock').src = `./images/colored/rock-${game.computerColor}.png`;
	$('.computer-paper').src = `./images/colored/paper-${game.computerColor}.png`;
	$('.computer-scissors').src = `./images/colored/scissors-${game.computerColor}.png`;

	$('.rock-img').src = `./images/colored/rock-${game.playerColor}.png`;
	$('.paper-img').src = `./images/colored/paper-${game.playerColor}.png`;
	$('.scissors-img').src = `./images/colored/scissors-${game.playerColor}.png`;
}
function animateUIAtColorStage() {
	$('#scissors').classList.add('rps-animation');
	$('#scissors').classList.remove('unlit');

	$('#form-color').classList.add('go-out');
	setTimeout(() => {
		makeInvisible($('#form-color'));
		makeInvisible($('main'));
		makeVisible($('.play-page'));
	}, 300);
}
// ! play
function getComputerChoice() {
	const numberToChoiceObj = {
		1: 'rock',
		2: 'paper',
		3: 'scissors'
	};
	return numberToChoiceObj[`${getRandomNumberUntil(3)}`];
}

function incrementScoreFor(aPlayer = 'both') {
	if (aPlayer === 'both') {
		incrementScoreFor('computer');
		incrementScoreFor('player');
	} else {
		game[`${aPlayer}ScoreValue`] += 1;
		$(`.${aPlayer}-score`).textContent = game[`${aPlayer}ScoreValue`];
	}
}

function endGameUI() {
	// $('.play-page').style.opacity = '.2';
	// $('.endgame-settings').style.opacity = '1';
	$('.endgame-settings').classList.add('endgame-settings-end');
	$('.play-page').classList.add('play-page-end');
	document.body.classList.add('body-end');
	$('main').classList.add('main-end');
	// document.body.style.display = 'relative';
	// $('main').style.position = 'absolute';
	// $('main').style.top = 0;
	// $('main').style.bottom = 0;
	// $('main').style.left = 0;
	// $('main').style.right = 0;
	// $('main').style.height = '100vh';
}

function displayMessage() {
	Number($('.player-score').textContent) > Number($('.computer-score').textContent) ? ($('.endgame-message').textContent = 'YOU WIN') : ($('.endgame-message').textContent = 'YOU LOSE');
	if (Number($('.player-score').textContent) === Number($('.computer-score').textContent)) {
		$('.endgame-message').textContent = "IT'S A TIE";
	}
}

function showSettings() {
	makeVisible($('.endgame-settings'));
	makeVisible($('main'));
	displayMessage();

	endGameUI();
}

function Round(playerChoice) {
	this.playerChoice = playerChoice;
	this.computerChoice = getComputerChoice();
	this.round = 1;

	this.play = function () {
		// ! rock
		if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'paper');
			this.showLoser('player', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
			incrementScoreFor('player');
			this.showWinner('player', 'rock');
			this.showLoser('computer', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
			incrementScoreFor();
			this.showWinner('computer', 'rock');
			this.showWinner('player', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! paper
		if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'scissors');
			this.showLoser('player', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
			incrementScoreFor('player');
			this.showWinner('player', 'paper');
			this.showLoser('computer', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
			incrementScoreFor();
			this.showWinner('computer', 'paper');
			this.showWinner('player', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! scissors
		if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
			incrementScoreFor('player');
			this.showWinner('player', 'scissors');
			this.showLoser('computer', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'rock');
			this.showLoser('player', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
			incrementScoreFor();
			this.showWinner('computer', 'scissors');
			this.showWinner('player', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
	};

	this.showWinner = function (player, rps) {
		console.warn('before:');
		console.log($('.player-history-item-1'));
		console.log($('.player-history-item-1 img').src);
		console.log(game.round);
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);

		console.warn('after');
		console.log($('.player-history-item-1 img').src);
	};
	this.showLoser = function (player, rps) {
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
	};
	// this.play = function () {
	// 	if (this.playerChoice === 'rock') this.computerChoice === 'paper' ? incrementScoreFor('computer') : this.computerChoice === 'scissors' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'paper') this.computerChoice === 'scissors' ? incrementScoreFor('computer') : this.computerChoice === 'rock' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'scissors') this.computerChoice === 'paper' ? incrementScoreFor('player') : this.computerChoice === 'rock' ? incrementScoreFor('computer') : incrementScoreFor();
	// };
}

function handleRPS({
	target: {
		dataset: { playerChoice }
	}
}) {
	new Round(playerChoice).play();
}

function handleRefresh() {
	location.reload();
}
function addLogoGlow(e) {
	const rps = [...$('.refresh').children];

	if (e.currentTarget === $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
	}
}
function removeLogoGlow(e) {
	const rps = [...$('.refresh').children];
	if (e.target !== $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
	}
}

const game = {
	name: null,
	playerColor: null,
	computerColor: null,
	computerScoreValue: 0,
	playerScoreValue: 0,
	round: 1
};

const colors = [...$('.color-con').children];

$('.refresh').addEventListener('click', handleRefresh);
$('#form-name').addEventListener('submit', handleNameSubmission);
$('#form-color').addEventListener('submit', handleColorSubmission);
colors.forEach(color => color.addEventListener('click', handleColorSelection));
$('.refresh').addEventListener('mouseenter', addLogoGlow, true);
$('.refresh').addEventListener('mouseleave', removeLogoGlow, true);

$$('.rps-el').forEach(rpsEl => rpsEl.addEventListener('click', handleRPS));

$('.play-again').addEventListener('click', handlePlayAgain);
$('.change-name').addEventListener('click', handleChangeName);
$('.change-color').addEventListener('click', handleChangeColor);

function handlePlayAgain() {
	makeInvisible($('main'));
	makeInvisible($('.endgame-settings'));
	resetUI();
	resetScore();
	resetHistory();
	resetComputerColor();
}

function resetUI() {
	$('.play-page').classList.remove('play-page-end');
	document.body.classList.remove('body-end');
	$('main').classList.remove('main-end');
	$('.endgame-settings').classList.remove('endgame-settings-end');
}

function resetScore() {
	$('.player-score').textContent = 0;
	$('.computer-score').textContent = 0;

	game.playerScoreValue = 0;
	game.computerScoreValue = 0;

	game.round = 1;
}

function resetHistory() {
	for (let n = 1; n < 6; n++) {
		// $(`.player-history-item-${n} img`).src = '';
		// $(`.computer-history-item-${n} img`).src = '';
		$(`.player-history-item-${n} img`).removeAttribute('src');
		$(`.computer-history-item-${n} img`).removeAttribute('src');
	}
}

function resetComputerColor() {
	// TODO: refactor into getNewComputerColor()
	const oldColor = game.computerColor;
	let newColor = getRandomColor();
	while (newColor === oldColor) {
		newColor = getRandomColor();
	}
	game.computerColor = newColor;
	// TODO: ^
	loadColoredRPS();
}

function handleChangeName() {
	const playWithNewNameButton = createPlayButton();
	$('#form-name button').replaceWith(playWithNewNameButton);

	animateChoose('name');
}
function handleChangeColor() {
	const playWithNewColorButton = createPlayButton();
	$('#form-color button').replaceWith(playWithNewColorButton);

	animateChoose('color');
}

function createPlayButton() {
	const playButton = document.createElement('button');
	playButton.classList.add('btn');
	playButton.addEventListener('click', handlePlayAgain);
	playButton.textContent = 'Play';
	return playButton;
}

function animateChoose(nameOrColor) {
	makeInvisible($('.endgame-settings'));
	$('.play-page').style.zIndex = '-1';

	$(`#form-${nameOrColor}`).classList.remove('go-out');
	$(`#form-${nameOrColor}`).style.position = 'relative';
	$(`#form-${nameOrColor}`).style.zIndex = '200';
	makeVisible($(`#form-${nameOrColor}`));
}

// function checkEndGame() {
// 	// playRoundWithIf(playerChoice, getComputerChoice());
// 	console.log('endGame ran');
// 	if (playerScore.textContent === '5') {
// 		playOutcome.textContent = 'Congratulations! You won!';
// 		playOutcome.style.fontSize = '2rem';
// 		playOutcome.style.fontWeight = '800';
// 		playOutcome.style.color = 'green';
// 		playerScoreValue = 0;
// 		computerScoreValue = 0;
// 		playerScore.textContent = 0;
// 		computerScore.textContent = 0;
// 		clearInterval(intervalId);
// 		playNewGame.style.display = 'block';
// 		playNewGame.addEventListener('click', () => {
// 			startGame();
// 			playerScore.textContent = 0;
// 			computerScore.textContent = 0;
// 			playerScoreValue = 0;
// 			computerScoreValue = 0;
// 			playOutcome.textContent = '';
// 			playOutcome.style.color = 'black';
// 		});
// 	} else if (computerScore.textContent === '5') {
// 		playOutcome.textContent = 'You lose! Try again.';
// 		playOutcome.style.color = 'red';
// 		clearInterval(intervalId);
// 		playNewGame.style.display = 'block';
// 		playNewGame.addEventListener('click', () => {
// 			startGame();
// 			playerScore.textContent = 0;
// 			computerScore.textContent = 0;
// 			playerScoreValue = 0;
// 			computerScoreValue = 0;
// 			playOutcome.textContent = '';
// 			playOutcome.style.color = 'black';
// 		});
// 	}
// }
