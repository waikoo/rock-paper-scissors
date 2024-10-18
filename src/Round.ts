import getRandomNumberUntil from './utils/randomNumberGenerator.js';
import { $, $$ } from './utils/selectors.js';
import { makeInvisible, makeVisible } from './ui/toggleUIDisplay.js';
import { animateEndgame } from './ui/main.js';
import { darkenPlayArea } from './ui/main.js';

export function handleRPS(e: MouseEvent, game: Game) {
  if (e.target) {
    const playerChoice = (e.target as HTMLImageElement).dataset.playerChoice
    if (playerChoice) {
      new Round(playerChoice as RPS).play(game);
    }
  }
}

function getComputerChoice() {
  type NumberToChoiceObj = {
    [key: string]: RPS
  }
  const numberToChoiceObj: NumberToChoiceObj = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
  };
  return numberToChoiceObj[getRandomNumberUntil(3).toString()];
}

function showSettings() {
  // if (game.isFirstGame) game.isFirstGame = false;
  if (($('.play-page') as HTMLElement).contains($('.endgame-con'))) createEndgameContainer();
  if (!($('.endgame-con') as HTMLElement)) {
    console.error('no endgame container');
  }
  ($('.endgame-con') as HTMLElement).removeAttribute('style');
  // ($('.endgame-con') as HTMLElement).style.display = 'block';
  makeVisible($('.endgame-settings') as HTMLElement);
  // console.log($('.endgame-settings').style.animation)
  animateEndgame('in');
  // setTimeout(() => $('.endgame-settings').removeAttribute('style'), 100)
  // removeAttribute?
  displayWinner();
  endGameUI();
}

function endGameUI() {
  darkenPlayArea();
  ($('.endgame-con') as HTMLElement).style.display = 'flex';
  // animateEndgame('in')
  ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in forwards`;
  // $('.endgame-settings').style.animation = `100ms come-${inOrOut} forwards`
}

function displayWinner() {
  const playerScore = Number(($('.player-score') as HTMLElement).textContent);
  const computerScore = Number(($('.computer-score') as HTMLElement).textContent);

  if (playerScore === computerScore) {
    ($('.endgame-message') as HTMLElement).textContent = "IT'S A TIE";
  } else if (playerScore > computerScore) {
    ($('.endgame-message') as HTMLElement).textContent = 'YOU WIN';
  } else {
    ($('.endgame-message') as HTMLElement).textContent = 'YOU LOSE';
  }
}

function createEndgameContainer() {
  const endgameCon = document.createElement('div');
  endgameCon.className = 'endgame-con';
  endgameCon.append(($('.endgame-settings') as HTMLElement));
  ($('.play-page') as HTMLElement).append(endgameCon);
}

export function incrementScoreFor(game: Game, aPlayer = 'both') {
  if (game) {
    if (aPlayer === 'both') {
      incrementScoreFor(game, 'computer');
      incrementScoreFor(game, 'player');
    } else {
      const playerScoreValue = game[`${aPlayer}ScoreValue`];
      if (typeof playerScoreValue === 'number') {
        (game[`${aPlayer}ScoreValue`] as number)++;
        const aPlayerScoreValue = game[`${aPlayer}ScoreValue`];
        if (aPlayerScoreValue) {
          ($(`.${aPlayer}-score`) as HTMLElement).textContent = aPlayerScoreValue.toString();
        }
      }
    }
  }
}

export class Round {
  public playerChoice: RPS;
  public computerChoice: RPS;
  public round: number;

  constructor(playerChoice: RPS) {
    this.playerChoice = playerChoice;
    this.computerChoice = getComputerChoice();
    this.round = 1;
  }

  public play(game: Game): void {
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

  public showWinner(player: string, rps: RPS, game: Game): void {

    ($(`.${player}-history-item-${game.round} img`) as HTMLImageElement).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
  }
  public showLoser(player: string, rps: RPS, game: Game): void {
    ($(`.${player}-history-item-${game.round} img`) as HTMLImageElement).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
  };
};
