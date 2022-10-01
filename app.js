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

function playRound(playerSelection, computerSelection) {
	let playerChoice;
	try {
		playerChoice = playerSelection.toLowerCase().trim();
	} catch (err) {
		console.log(err);
	}

	if (playerChoice === 'rock') {
		if (computerSelection === 'paper') {
			return 'You Lose! Paper beats Rock!';
		} else if (computerSelection === 'scissors') {
			return 'You Win! Rock beats Scissors!';
		} else if (computerSelection === 'rock') {
			return 'Draw! Computer chose Rock too!';
		}
	} else if (playerChoice === 'paper') {
		if (computerSelection === 'paper') {
			return 'Draw! Computer chose Paper too!';
		} else if (computerSelection === 'scissors') {
			return 'You Lose! Scissors beats Paper!';
		} else if (computerSelection === 'rock') {
			return 'You win! Paper beats rock!';
		}
	} else if (playerChoice === 'scissors') {
		if (computerSelection === 'paper') {
			return 'You win! Scissors beats paper!';
		} else if (computerSelection === 'scissors') {
			return 'Draw! Computer chose Scissors too!';
		} else if (computerSelection === 'rock') {
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
// console.log(playRound(playerSelection, computerSelection));

function game() {
	for (let i = 1; i < 6; i++) {
		let playerSelection = prompt('Rock, paper or scissors?');
		let computerSelection = getComputerChoice();
		console.log(playRound(playerSelection, computerSelection));
	}
}

game();
