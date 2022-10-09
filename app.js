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
function incrementScoreFor(aPlayer) {
	switch (aPlayer) {
		case 'computer':
			// computerScoreValue++;
			// computerScore.textContent = computerScoreValue;
			break;
		case 'player':
			// playerScoreValue++;
			// playerScore.textContent = playerScoreValue;
			break;

		default:
			// computerScoreValue++;
			// playerScoreValue++;
			// computerScore.textContent = computerScoreValue;
			// playerScore.textContent = playerScoreValue;
			break;
	}
}
function playRound(playerSelection, computerSelection) {
	let playerChoice;
	try {
		playerChoice = playerSelection.toLowerCase().trim();
	} catch (err) {
		console.log(err);
	}

	if (playerChoice === 'rock') {
		if (computerSelection === 'paper') {
			incrementScoreFor('computer');
			return 'You lose!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('player');
			return 'You win!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor();
			return 'Draw!';
		}
	} else if (playerChoice === 'paper') {
		if (computerSelection === 'paper') {
			incrementScoreFor();
			return 'Draw!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('computer');
			return 'You lose!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('player');
			return 'You win!';
		}
	} else if (playerChoice === 'scissors') {
		if (computerSelection === 'paper') {
			incrementScoreFor('player');
			return 'You win!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor();
			return 'Draw!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('computer');
			return 'You lose!';
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
function clickHandler({ target: { classList } }) {
	if (classList.contains('rock')) {
		playOutcome.textContent = playRound('rock', getComputerChoice());
	}
	if (classList.contains('paper')) {
		playOutcome.textContent = playRound('paper', getComputerChoice());
	}
	if (classList.contains('scissors')) {
		playOutcome.textContent = playRound('scissors', getComputerChoice());
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

// rockBtn.addEventListener('click', clickHandler);
// paperBtn.addEventListener('click', clickHandler);
// scissorsBtn.addEventListener('click', clickHandler);

const colors = [...$('.color-con').children];

const player = {
	name: null,
	color: null
};

$('#form-color').style.display = 'none';

function handleNameSubmission(e) {
	e.preventDefault();
	player.name = getName();
	$('#form-name').style.display = 'none';
	$('#form-color').classList.remove('invisible');
	$('#paper').style.display = 'block';
	$('#form-color').style.display = 'block';
	console.log(player.name);
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
	!player.color ? selectColor() : $('#form-color').classList.toggle('invisible');
	console.log(player.color);
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
	$('#form-color').style.display = 'none';
	// TODO: mukodik ugy h meg se kell nyomni a handleColorSelectiont triggerelo gombot
}

$('#form-name').addEventListener('submit', handleNameSubmission);
$('#form-color').addEventListener('submit', handleColorSubmission);

colors.forEach(color => color.addEventListener('click', handleColorSelection));

// TODO: make fn to select color randomly for player & computer
