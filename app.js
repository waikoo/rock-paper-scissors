import { $, $$ } from './utils/selectors.js';

function getRandomNumberUntil(number) {
	return Math.floor(Math.random() * number) + 1;
}
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
function playRoundWithIf(playerChose, computerChose) {
	if (playerChose === 'rock' && computerChose === 'paper') incrementScoreFor('computer');
	if (playerChose === 'rock' && computerChose === 'scissors') incrementScoreFor('player');
	if (playerChose === 'rock' && computerChose === 'rock') incrementScoreFor();

	if (playerChose === 'paper' && computerChose === 'paper') incrementScoreFor();
	if (playerChose === 'paper' && computerChose === 'scissors') incrementScoreFor('computer');
	if (playerChose === 'paper' && computerChose === 'rock') incrementScoreFor('player');

	if (playerChose === 'scissors' && computerChose === 'paper') incrementScoreFor('player');
	if (playerChose === 'scissors' && computerChose === 'scissors') incrementScoreFor();
	if (playerChose === 'scissors' && computerChose === 'rock') incrementScoreFor('computer');
}
function handleRPS({
	target: {
		dataset: { playerChoice }
	}
}) {
	playRoundWithIf(playerChoice, getComputerChoice());
	// if (playerChoice ==='rock') {
	// 	playRoundWithMap('rock', getComputerChoice());
	// }
	// if (playerChoice ==='paper') {
	// 	playRoundWithMap('paper', getComputerChoice());
	// }
	// if (playerChoice ==='scissors') {
	// 	playRoundWithMap('scissors', getComputerChoice());
	// }
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

const game = {
	name: null,
	color: null,
	computerScoreValue: 0,
	playerScoreValue: 0
};

function handleNameSubmission(e) {
	e.preventDefault();
	game.name = getName();
	$('.player-name').textContent = game.name;
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
	!game.color ? selectColor() : ($('#form-color').style.display = 'none');
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
	game.color = color;
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

rockEl.addEventListener('click', handleRPS);
paperEl.addEventListener('click', handleRPS);
scissorsEl.addEventListener('click', handleRPS);

// TODO: make fn to select color randomly for player & computer
