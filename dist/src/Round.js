import getRandomNumberUntil from './utils/randomNumberGenerator.js';
import { $ } from './utils/selectors.js';
import { makeVisible } from './ui/toggleUIDisplay.js';
import { animateEndgame } from './ui/main.js';
import { darkenPlayArea } from './ui/main.js';
export function handleRPS(e, game) {
  if (e.target) {
    const playerChoice = e.target.dataset.playerChoice;
    if (playerChoice) {
      new Round(playerChoice).play(game);
    }
  }
}
function getComputerChoice() {
  const numberToChoiceObj = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
  };
  return numberToChoiceObj[getRandomNumberUntil(3).toString()];
}
function showSettings() {
  // if (game.isFirstGame) game.isFirstGame = false;
  if (!$('.play-page').contains($('.endgame-con')))
    createEndgameContainer();
  $('.endgame-con').removeAttribute('style');
  // ($('.endgame-con') as HTMLElement).style.display = 'block';
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
  }
  else if (playerScore > computerScore) {
    $('.endgame-message').textContent = 'YOU WIN';
  }
  else {
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
  if (game) {
    if (aPlayer === 'both') {
      incrementScoreFor(game, 'computer');
      incrementScoreFor(game, 'player');
    }
    else {
      const playerScoreValue = game[`${aPlayer}ScoreValue`];
      if (typeof playerScoreValue === 'number') {
        game[`${aPlayer}ScoreValue`]++;
        const aPlayerScoreValue = game[`${aPlayer}ScoreValue`];
        if (aPlayerScoreValue) {
          $(`.${aPlayer}-score`).textContent = aPlayerScoreValue.toString();
        }
      }
    }
  }
}
export class Round {
  constructor(playerChoice) {
    this.playerChoice = playerChoice;
    this.computerChoice = getComputerChoice();
    this.round = 1;
  }
  play(game) {
    // ! rock
    if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
      incrementScoreFor(game, 'computer');
      this.showWinner('computer', 'paper', game);
      this.showLoser('player', 'rock', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
      incrementScoreFor(game, 'player');
      this.showWinner('player', 'rock', game);
      this.showLoser('computer', 'scissors', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
      incrementScoreFor(game);
      this.showWinner('computer', 'rock', game);
      this.showWinner('player', 'rock', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    // ! paper
    if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
      incrementScoreFor(game, 'computer');
      this.showWinner('computer', 'scissors', game);
      this.showLoser('player', 'paper', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
      incrementScoreFor(game, 'player');
      this.showWinner('player', 'paper', game);
      this.showLoser('computer', 'rock', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
      incrementScoreFor(game);
      this.showWinner('computer', 'paper', game);
      this.showWinner('player', 'paper', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    // ! scissors
    if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
      incrementScoreFor(game, 'player');
      this.showWinner('player', 'scissors', game);
      this.showLoser('computer', 'paper', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
      incrementScoreFor(game, 'computer');
      this.showWinner('computer', 'rock', game);
      this.showLoser('player', 'scissors', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
    if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
      incrementScoreFor(game);
      this.showWinner('computer', 'scissors', game);
      this.showWinner('player', 'scissors', game);
      game.round++;
      if (game.round === 6)
        showSettings();
    }
  }
  ;
  showWinner(player, rps, game) {
    $(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
  }
  showLoser(player, rps, game) {
    $(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
  }
  ;
}
;
