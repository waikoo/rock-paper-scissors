import { Round } from "./Round.js";
import { $ } from "./selectors.js";
import Utils from "./Utils.js";
export default class GameController {
    constructor() {
        this.utils = new Utils();
    }
    handleStartNewGame(e, game) {
        if (e.target) {
            const playerChoice = e.target.dataset.playerChoice;
            if (playerChoice) {
                new Round(playerChoice).play(game);
            }
        }
    }
    getComputerChoice() {
        const numberToChoiceObj = {
            1: 'rock',
            2: 'paper',
            3: 'scissors'
        };
        return numberToChoiceObj[this.utils.getRandomNumberUntil(3).toString()];
    }
    incrementScoreFor(game, aPlayer = 'both') {
        if (game) {
            if (aPlayer === 'both') {
                this.incrementScoreFor(game, 'computer');
                this.incrementScoreFor(game, 'player');
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
}
