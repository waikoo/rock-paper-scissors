import getRandomNumberUntil from './utils/randomNumberGenerator.js';
import { $, $$ } from './utils/selectors.js';
import { makeInvisible, makeVisible } from './ui/toggleUIDisplay.js';
import { animateEndgame } from './ui/main.js';
import { darkenPlayArea } from './ui/main.js';

export function handleRPS({
	target: {
		dataset: { playerChoice }
	}
}, game) {
	new Round(playerChoice).play(game);
}

function getComputerChoice() {
	const numberToChoiceObj = {
		1: 'rock',
		2: 'paper',
		3: 'scissors'
	};
	return numberToChoiceObj[`${getRandomNumberUntil(3)}`];
}

function showSettings() {
	// if (game.isFirstGame) game.isFirstGame = false;
	if (!$('.play-page').contains($('.endgame-con'))) createEndgameContainer();
	$('.endgame-con').removeAttribute('style');
	makeVisible($('.endgame-settings'));
	// console.log($('.endgame-settings').style.animation)
	animateEndgame('in');
	// setTimeout(() => $('.endgame-settings').removeAttribute('style'), 100)
	// removeAttribute?
	displayWinner();
	endGameUI();
}

function endGameUI() {
	darkenPlayArea();
	$('.endgame-con').style.display = 'flex';
	// animateEndgame('in')
	$('.endgame-settings').style.animation = `100ms come-in forwards`;
	// $('.endgame-settings').style.animation = `100ms come-${inOrOut} forwards`
}

function displayWinner() {
	const playerScore = Number($('.player-score').textContent);
	const computerScore = Number($('.computer-score').textContent);

	if (playerScore === computerScore) {
		$('.endgame-message').textContent = "IT'S A TIE";
	} else if (playerScore > computerScore) {
		$('.endgame-message').textContent = 'YOU WIN';
	} else {
		$('.endgame-message').textContent = 'YOU LOSE';
	}
}

function createEndgameContainer() {
	const endgameCon = document.createElement('div');
	endgameCon.className = 'endgame-con';
	endgameCon.append($('.endgame-settings'));
	$('.play-page').append(endgameCon);
}

export function incrementScoreFor(game, aPlayer = 'both') {
	if (aPlayer === 'both') {
		incrementScoreFor(game, 'computer');
		incrementScoreFor(game, 'player');
	} else {
		game[`${aPlayer}ScoreValue`] += 1;
		$(`.${aPlayer}-score`).textContent = game[`${aPlayer}ScoreValue`];
	}
}

export default function Round(playerChoice) {
	this.playerChoice = playerChoice;
	this.computerChoice = getComputerChoice();
	this.round = 1;

	this.play = function (game) {
		// ! rock
		if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
			incrementScoreFor(game, 'computer');
			this.showWinner('computer', 'paper', game);
			this.showLoser('player', 'rock', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
			incrementScoreFor(game, 'player');
			this.showWinner('player', 'rock', game);
			this.showLoser('computer', 'scissors', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
			incrementScoreFor(game);
			this.showWinner('computer', 'rock', game);
			this.showWinner('player', 'rock', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! paper
		if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
			incrementScoreFor(game, 'computer');
			this.showWinner('computer', 'scissors', game);
			this.showLoser('player', 'paper', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
			incrementScoreFor(game, 'player');
			this.showWinner('player', 'paper', game);
			this.showLoser('computer', 'rock', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
			incrementScoreFor(game);
			this.showWinner('computer', 'paper', game);
			this.showWinner('player', 'paper', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! scissors
		if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
			incrementScoreFor(game, 'player');
			this.showWinner('player', 'scissors', game);
			this.showLoser('computer', 'paper', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
			incrementScoreFor(game, 'computer');
			this.showWinner('computer', 'rock', game);
			this.showLoser('player', 'scissors', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
			incrementScoreFor(game);
			this.showWinner('computer', 'scissors', game);
			this.showWinner('player', 'scissors', game);
			game.round++;
			if (game.round === 6) showSettings();
		}
	};

	this.showWinner = function (player, rps, game) {
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
	};
	this.showLoser = function (player, rps, game) {
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
	};
	// this.play = function () {
	// 	if (this.playerChoice === 'rock') this.computerChoice === 'paper' ? incrementScoreFor('computer') : this.computerChoice === 'scissors' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'paper') this.computerChoice === 'scissors' ? incrementScoreFor('computer') : this.computerChoice === 'rock' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'scissors') this.computerChoice === 'paper' ? incrementScoreFor('player') : this.computerChoice === 'rock' ? incrementScoreFor('computer') : incrementScoreFor();
	// };
}