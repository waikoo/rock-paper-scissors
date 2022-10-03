let playerScoreValue = 0;
let computerScoreValue = 0;
let intervalId;

function startGame() {
	intervalId = setInterval(checkEndGame, 500);
	if (computerScore.textContent === '0' || playerScore.textContent === '0') {
		playNewGame.display = 'none';
	}
}

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
			break;
	}
}
function incrementScoreFor(player) {
	switch (player) {
		case 'computer':
			computerScoreValue++;
			computerScore.textContent = computerScoreValue;
			break;
		case 'player':
			playerScoreValue++;
			playerScore.textContent = playerScoreValue;
			break;

		default:
			computerScoreValue++;
			playerScoreValue++;
			computerScore.textContent = computerScoreValue;
			playerScore.textContent = playerScoreValue;
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
			return 'You Lose! Paper beats Rock!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('player');
			return 'You Win! Rock beats Scissors!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor();
			return 'Draw! Computer chose Rock too!';
		}
	} else if (playerChoice === 'paper') {
		if (computerSelection === 'paper') {
			incrementScoreFor();
			return 'Draw! Computer chose Paper too!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor('computer');
			return 'You Lose! Scissors beats Paper!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('player');
			return 'You win! Paper beats Rock!';
		}
	} else if (playerChoice === 'scissors') {
		if (computerSelection === 'paper') {
			incrementScoreFor('player');
			return 'You win! Scissors beats paper!';
		} else if (computerSelection === 'scissors') {
			incrementScoreFor();
			return 'Draw! Computer chose Scissors too!';
		} else if (computerSelection === 'rock') {
			incrementScoreFor('computer');
			return 'You lose! Rock beats Scissors!';
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
function game() {
	// for (let i = 1; i < 6; i++) {
	// 	let playerSelection = prompt('Rock, paper or scissors?');
	// 	let computerSelection = getComputerChoice();
	// 	console.log(playRound(playerSelection, computerSelection));
	// }
}
function createEl(tag) {
	return document.createElement(tag);
}
const main = createEl('main');

const btnCon = createEl('div');
const rockBtn = createEl('button');
const paperBtn = createEl('button');
const scissorsBtn = createEl('button');

const resultsCon = createEl('div');
const computerCon = createEl('div');
const playerCon = createEl('div');
const computerScore = createEl('span');
const playerScore = createEl('span');
const computerName = createEl('span');
const playerName = createEl('span');
const resultsText = createEl('span');
const playOutcome = createEl('div');
const playNewGame = createEl('button');
const title = createEl('h1');
const desc = createEl('p');

rockBtn.classList.add('trio');
rockBtn.classList.add('rock');
paperBtn.classList.add('trio');
paperBtn.classList.add('paper');
scissorsBtn.classList.add('scissors');
scissorsBtn.classList.add('trio');
btnCon.className = 'btn-con';
resultsCon.className = 'results-con';
computerCon.className = 'computer-con';
playerCon.className = 'player-con';
computerScore.className = 'computer-score';
playerScore.className = 'player-score';
playerScore.classList.add('score');
computerScore.classList.add('score');
playOutcome.classList.add('play-outcome');

document.body.appendChild(main);
main.appendChild(title);
btnCon.appendChild(rockBtn);
btnCon.appendChild(paperBtn);
btnCon.appendChild(scissorsBtn);
main.appendChild(btnCon);
main.appendChild(desc);
main.appendChild(playOutcome);
main.appendChild(resultsText);
main.appendChild(resultsCon);
main.insertBefore(playNewGame, resultsText);

playerCon.appendChild(playerName);
computerCon.appendChild(computerName);
playerCon.appendChild(playerScore);
computerCon.appendChild(computerScore);
resultsCon.appendChild(playerCon);
resultsCon.appendChild(computerCon);

rockBtn.textContent = 'Rock';
paperBtn.textContent = 'Paper';
scissorsBtn.textContent = 'Scissors';
computerScore.textContent = 0;
playerScore.textContent = 0;
computerName.textContent = 'Computer';
// playerName.textContent = prompt(`What's your name?`);
playerName.textContent = 'You';
resultsText.textContent = 'Results';
title.textContent = 'New game:';
desc.textContent = 'Win 5 to win the game!';
playNewGame.textContent = 'Play Again';

title.style.textAlign = 'center';
title.style.background = '#d3d3d3';
title.style.borderBottom = '3px solid lightgrey';
title.style.fontSize = '1.2rem';

desc.style.textAlign = 'center';
desc.style.margin = '.5rem 0';
desc.style.fontSize = '.9rem';

playNewGame.style.display = 'none';
playNewGame.style.margin = '0 auto 1rem';
// playNewGame.style.margin = '0 auto';
main.style.margin = '0 auto';
main.style.width = '300px';
resultsCon.style.display = 'flex';
resultsCon.style.justifyContent = 'space-around';
resultsText.style.margin = '0 auto';
resultsText.style.width = '100%';
resultsText.style.textAlign = 'center';
resultsText.style.padding = '.5rem';
resultsText.style.fontWeight = '800';
resultsText.style.borderTop = '2px dashed black';
resultsText.style.borderBottom = '2px dashed black';
playOutcome.style.border = '3px ridge black';
// playOutcome.style.background = 'lightgrey';
playOutcome.style.width = '100%';
playOutcome.style.minHeight = '50px';
playOutcome.style.margin = '1rem auto';
playOutcome.style.textAlign = 'center';
playOutcome.style.display = 'flex';
playOutcome.style.justifyContent = 'center';
playOutcome.style.alignItems = 'center';

document.body.style.fontFamily = 'sans-serif';
btnCon.style.margin = '0 auto';
btnCon.style.width = 'max-content';
btnCon.style.display = 'flex';
btnCon.style.gap = '1rem';
playerCon.style.margin = '.5rem';
playerCon.style.fontSize = '1.2rem';
computerCon.style.fontSize = '1.2rem';
computerCon.style.textAlign = 'center';
playerCon.style.textAlign = 'center';

computerCon.style.margin = '.5rem';

function spanToDisplayBlock(el) {
	el.style.display = 'block';
}

spanToDisplayBlock(resultsText);
spanToDisplayBlock(computerScore);
spanToDisplayBlock(playerScore);
spanToDisplayBlock(computerName);
spanToDisplayBlock(playerName);

function clickHandler(e) {
	if (e.target.classList.contains('rock')) {
		playOutcome.textContent = playRound('rock', getComputerChoice());
	}
	if (e.target.classList.contains('paper')) {
		playOutcome.textContent = playRound('paper', getComputerChoice());
	}
	if (e.target.classList.contains('scissors')) {
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
rockBtn.addEventListener('click', clickHandler);
paperBtn.addEventListener('click', clickHandler);
scissorsBtn.addEventListener('click', clickHandler);

startGame();
