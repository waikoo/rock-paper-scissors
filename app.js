import { $, $$ } from './utils/selectors.js';

function getComputerChoice() {
	let randomAnswer = Math.floor(Math.random() * 3) + 1;

	switch (randomAnswer) {
		case 1:
			return 'rock';

		case 2:
			return 'paper';

		case 3:
			return 'scissors';

		default:
			throw new Error("Computer couldn't make a choice");
	}
}
function incrementScoreFor(aPlayer, player) {
	// let { computerScoreValue, playerScoreValue } = player;
	const playerScore = $('.player-score');
	const computerScore = $('.computer-score');
	console.dir(playerScore);
	console.dir(computerScore);

	switch (aPlayer) {
		case 'computer':
			player.computerScoreValue++;
			computerScore.textContent = player.computerScoreValue;
			break;

		case 'player':
			player.playerScoreValue++;
			playerScore.textContent = player.playerScoreValue;
			break;

		default:
			player.computerScoreValue++;
			player.playerScoreValue++;

			computerScore.textContent = player.computerScoreValue;
			playerScore.textContent = player.playerScoreValue;
			break;
	}
}
function playRound(playerSelection, computerSelection, player) {
	let playerChoice;
	try {
		playerChoice = playerSelection.toLowerCase().trim();
	} catch (err) {
		console.log(err);
	}
	console.log('playerSelection: ' + playerSelection);

	console.log('computerSelection: ' + computerSelection);

	if (playerChoice === 'rock') {
		if (computerSelection === 'paper') {
			incrementScoreFor('computer', player);
			// return 'You lose!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('player', player);
			// return 'You win!';
		} else if ((computerSelection === 'rock', player)) {
			incrementScoreFor('both', player);
			// return 'Draw!';
		}
	} else if (playerChoice === 'paper') {
		if (computerSelection === 'paper') {
			incrementScoreFor('both', player);
			// return 'Draw!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('computer', player);
			// return 'You lose!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('player', player);
			// return 'You win!';
		}
	} else if (playerChoice === 'scissors') {
		if (computerSelection === 'paper') {
			incrementScoreFor('player', player);
			// return 'You win!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('both', player);
			// return 'Draw!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('computer', player);
			// return 'You lose!';
		}
	} else {
		try {
			return `"${playerChoice.trim()}" isn't Rock, nor Paper, nor Scissors from what I can tell. Try again.`;
		} catch (err) {
			console.log(err);
			console.log('no value to trim');
		}
	}
}

// ? playOutcome is not defined ln 105
function clickHandler(e) {
	console.log(e.target);
	if (e.target.classList.contains('rock-img')) {
		playRound('rock', getComputerChoice(), player);
		// console.log('playoutcome textcontent: ' + playOutcome.textContent);
	}
	if (e.target.classList.contains('paper-img')) {
		playRound('paper', getComputerChoice(), player);
		// console.log('playoutcome textcontent: ' + playOutcome.textContent);
	}
	if (e.target.classList.contains('scissors-img')) {
		playRound('scissors', getComputerChoice(), player);
		// console.log('playoutcome textcontent: ' + playOutcome.textContent);
	}
}
function checkEndGame() {
	console.log('endGame ran');
	if (playerScore.textContent === '5') {
		playOutcome.textContent = 'Congratulations! You won!';
		playOutcome.style.fontSize = '2rem';
		playOutcome.style.fontWeight = '800';
		playOutcome.style.color = 'green';
		playerScoreValue = 0;
		computerScoreValue = 0;
		playerScore.textContent = 0;
		computerScore.textContent = 0;
		clearInterval(intervalId);
		playNewGame.style.display = 'block';
		playNewGame.addEventListener('click', () => {
			startGame();
			playerScore.textContent = 0;
			computerScore.textContent = 0;
			playerScoreValue = 0;
			computerScoreValue = 0;
			playOutcome.textContent = '';
			playOutcome.style.color = 'black';
		});
	} else if (computerScore.textContent === '5') {
		playOutcome.textContent = 'You lose! Try again.';
		playOutcome.style.color = 'red';
		clearInterval(intervalId);
		playNewGame.style.display = 'block';
		playNewGame.addEventListener('click', () => {
			startGame();
			playerScore.textContent = 0;
			computerScore.textContent = 0;
			playerScoreValue = 0;
			computerScoreValue = 0;
			playOutcome.textContent = '';
			playOutcome.style.color = 'black';
		});
	}
}

const rockEl = $('.rock-img');
const paperEl = $('.paper-img');
const scissorsEl = $('.scissors-img');

const colors = [...$('.color-con').children];

const player = {
	name: null,
	color: null,
	computerScoreValue: 0,
	playerScoreValue: 0
};

// $('#form-color').style.display = 'none';

function handleNameSubmission(e) {
	e.preventDefault();
	player.name = getName();
	$('.player-name').textContent = player.name;
	$('#form-name').style.display = 'none';
	$('#form-color').classList.remove('invisible');
	$('#paper').style.display = 'block';
	$('#form-color').style.display = 'block';
	// player.name = $('#name').value.trim();
	// $('#form-name').classList.add('invisible');
	// $('#form-name').className = 'invisible';
	// console.log($('#form-name').classList);
}

function getName(name = 'PLAYER') {
	const playerName = $('#name').value;
	return playerName ? formatName(playerName) : name;
}

function formatName(name) {
	const isNameCapitalized = /[A-Z]/g.test(name.trim().charAt(0));
	const alreadyCapitalizedName = name.charAt(0) + name.slice(1).toLowerCase();
	const newlyCapitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	return isNameCapitalized ? alreadyCapitalizedName : newlyCapitalizedName;
}

function handleColorSubmission(e) {
	e.preventDefault();
	!player.color ? selectColor() : ($('#form-color').style.display = 'none');
	$('#scissors').style.display = 'block';
	$('main').style.display = 'none';
}

function handleColorSelection(e) {
	colors.forEach(color => {
		if (color === e.target) {
			color.classList.add('selected');
			selectColor(color.dataset.color);
		} else {
			color.classList.remove('selected');
		}
	});
}

function selectColor(color = 'red') {
	// default color is red if start is pressed and there's no color
	// otherwise it's what the player selects, handled by handleColorSelection()
	player.color = color;
}

function handleRefresh() {
	location.reload();
}
function addLogoGlow(e) {
	const rps = [...$('.refresh').children];

	if (e.currentTarget === $('.refresh')) {
		$('#rock').classList.add('logo-hover');
		$('#paper').classList.add('logo-hover');
		$('#scissors').classList.add('logo-hover');
	}

	// if (e.target === $('.refresh')) {
	// 	// console.log(el);
	// 	rps.forEach(el => {
	// 		// el.style.textShadow = textShadowValue;
	// 		el.classList.add('logo-hover');
	// 		el.addEventListener('mouseleave', () => {
	// 			el.classList.remove('logo-hover');
	// 		});
	// 	});
	// }
}
function removeLogoGlow(e) {
	const rps = [...$('.refresh').children];
	if (e.target !== $('.refresh')) {
		$('#rock').classList.remove('logo-hover');
		$('#paper').classList.remove('logo-hover');
		$('#scissors').classList.remove('logo-hover');
	}
}

$('.refresh').addEventListener('click', handleRefresh);
$('#form-name').addEventListener('submit', handleNameSubmission);
$('#form-color').addEventListener('submit', handleColorSubmission);
colors.forEach(color => color.addEventListener('click', handleColorSelection));
$('.refresh').addEventListener('mouseenter', addLogoGlow, true);
$('.refresh').addEventListener('mouseleave', removeLogoGlow, true);

rockEl.addEventListener('click', clickHandler);
paperEl.addEventListener('click', clickHandler);
scissorsEl.addEventListener('click', clickHandler);

// (function () {
// 	$('#form-name').style.display = 'none';
// 	$('#form-color').style.display = 'none';
// 	$('main').style.display = 'none';
// })();

/*
rock - img;
paper - img;
scissors - img;
koss ra eventlistenereket clickre
*/

// TODO: make fn to select color randomly for player & computer
