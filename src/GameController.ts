import { Round } from "./Round.js";
import { $ } from "./selectors.js";
import { Game } from "./types/gameType.js";
import { RPS } from "./types/rps.js";
import Utils from "./Utils.js";

export default class GameController {
  private utils: Utils
  constructor() {
    this.utils = new Utils()
  }

  public handleStartNewGame(e: MouseEvent, game: Game) {
    if (e.target) {
      const playerChoice = (e.target as HTMLImageElement).dataset.playerChoice
      if (playerChoice) {
        new Round(playerChoice as RPS).play(game);
      }
    }
  }

  public getComputerChoice() {
    type NumberToChoiceObj = {
      [key: string]: RPS
    }
    const numberToChoiceObj: NumberToChoiceObj = {
      1: 'rock',
      2: 'paper',
      3: 'scissors'
    };
    return numberToChoiceObj[this.utils.getRandomNumberUntil(3).toString()];
  }

  public incrementScoreFor(game: Game, aPlayer = 'both') {
    if (game) {
      if (aPlayer === 'both') {
        this.incrementScoreFor(game, 'computer');
        this.incrementScoreFor(game, 'player');
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
}
