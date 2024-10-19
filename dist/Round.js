export class Round {
    constructor(playerChoice, gameController, menu, ui) {
        this.ui = ui;
        this.menu = menu;
        this.gameController = gameController;
        this.playerChoice = playerChoice;
        this.computerChoice = this.gameController.getComputerChoice();
        this.round = 1;
    }
    play(game) {
        // ! rock
        if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
            this.gameController.incrementScoreFor(game, 'computer');
            this.ui.showWinner('computer', 'paper', game);
            this.ui.showLoser('player', 'rock', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
            this.gameController.incrementScoreFor(game, 'player');
            this.ui.showWinner('player', 'rock', game);
            this.ui.showLoser('computer', 'scissors', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
            this.gameController.incrementScoreFor(game);
            this.ui.showWinner('computer', 'rock', game);
            this.ui.showWinner('player', 'rock', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        // ! paper
        if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
            this.gameController.incrementScoreFor(game, 'computer');
            this.ui.showWinner('computer', 'scissors', game);
            this.ui.showLoser('player', 'paper', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
            this.gameController.incrementScoreFor(game, 'player');
            this.ui.showWinner('player', 'paper', game);
            this.ui.showLoser('computer', 'rock', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
            this.gameController.incrementScoreFor(game);
            this.ui.showWinner('computer', 'paper', game);
            this.ui.showWinner('player', 'paper', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        // ! scissors
        if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
            this.gameController.incrementScoreFor(game, 'player');
            this.ui.showWinner('player', 'scissors', game);
            this.ui.showLoser('computer', 'paper', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
            this.gameController.incrementScoreFor(game, 'computer');
            this.ui.showWinner('computer', 'rock', game);
            this.ui.showLoser('player', 'scissors', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
        if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
            this.gameController.incrementScoreFor(game);
            this.ui.showWinner('computer', 'scissors', game);
            this.ui.showWinner('player', 'scissors', game);
            game.round++;
            if (game.round === 6)
                this.menu.showSettings();
        }
    }
    ;
}
;
