import GameController from './GameController.js';
import Menu from './Menu.js';
import { Game } from './types/gameType.js';
import { RPS } from './types/rps.js';
import UI from './UI.js';

export class Round {
  public playerChoice: RPS;
  public computerChoice: RPS;
  public round: number;
  public gameController: GameController
  public menu: Menu
  public ui: UI

  constructor(playerChoice: RPS) {
    this.ui = new UI();
    this.menu = new Menu()
    this.gameController = new GameController()
    this.playerChoice = playerChoice;
    this.computerChoice = this.gameController.getComputerChoice();
    this.round = 1;
  }

  public play(game: Game): void {
    // ! rock

    if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
      this.gameController.incrementScoreFor(game, 'computer');
      this.ui.showWinner('computer', 'paper', game);
      this.ui.showLoser('player', 'rock', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
      this.gameController.incrementScoreFor(game, 'player');
      this.ui.showWinner('player', 'rock', game);
      this.ui.showLoser('computer', 'scissors', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
      this.gameController.incrementScoreFor(game);
      this.ui.showWinner('computer', 'rock', game);
      this.ui.showWinner('player', 'rock', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    // ! paper
    if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
      this.gameController.incrementScoreFor(game, 'computer');
      this.ui.showWinner('computer', 'scissors', game);
      this.ui.showLoser('player', 'paper', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
      this.gameController.incrementScoreFor(game, 'player');
      this.ui.showWinner('player', 'paper', game);
      this.ui.showLoser('computer', 'rock', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
      this.gameController.incrementScoreFor(game);
      this.ui.showWinner('computer', 'paper', game);
      this.ui.showWinner('player', 'paper', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    // ! scissors
    if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
      this.gameController.incrementScoreFor(game, 'player');
      this.ui.showWinner('player', 'scissors', game);
      this.ui.showLoser('computer', 'paper', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
      this.gameController.incrementScoreFor(game, 'computer');
      this.ui.showWinner('computer', 'rock', game);
      this.ui.showLoser('player', 'scissors', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
    if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
      this.gameController.incrementScoreFor(game);
      this.ui.showWinner('computer', 'scissors', game);
      this.ui.showWinner('player', 'scissors', game);
      game.round++;
      if (game.round === 6) this.menu.showSettings();
    }
  };

};
