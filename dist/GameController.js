import Menu from "./Menu.js";
import { Round } from "./Round.js";
import { $, $$ } from "./selectors.js";
import UI from "./UI.js";
import Utils from "./Utils.js";
export default class GameController {
    constructor() {
        this.ui = new UI();
        this.utils = new Utils();
        this.menu = new Menu();
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
        if (!game)
            return;
        if (aPlayer === 'both') {
            this.incrementScoreFor(game, 'computer');
            this.incrementScoreFor(game, 'player');
            return;
        }
        const playerScoreValue = game[`${aPlayer}ScoreValue`];
        if (typeof playerScoreValue === 'number') {
            game[`${aPlayer}ScoreValue`]++;
            const updatedScoreValue = game[`${aPlayer}ScoreValue`];
            if (updatedScoreValue) {
                this.ui.updateTextContent($(`.${aPlayer}-score`), updatedScoreValue.toString());
            }
        }
    }
    resetPlayerName(game) {
        let newName = $('#name-change').value;
        game.name = newName ? newName : 'PLAYER';
        this.ui.updateTextContent($('.player-name'), game.name);
    }
    getNewComputerColor(game) {
        const oldColor = game.computerColor;
        let newColor = this.utils.getRandomColor();
        while (newColor === oldColor) {
            newColor = this.utils.getRandomColor();
        }
        game.computerColor = newColor;
    }
    resetScore(game) {
        game.playerScoreValue = 0;
        game.computerScoreValue = 0;
        game.round = 1;
        this.ui.updateTextContent($('.player-score'), '0');
        this.ui.updateTextContent($('.computer-score'), '0');
        this.menu.resetParts();
        this.ui.resetHistory();
        this.getNewComputerColor(game);
        this.menu.setPlayerColors(game);
    }
    handlePlayAgain(e, game) {
        e.preventDefault();
        if (e.target === $('.play-btn-name'))
            this.resetPlayerName(game);
        if (e.target === $('.play-btn-color'))
            this.menu.resetPlayerColor();
        game.isFirstGame = false;
        this.resetScore(game);
    }
    generateNameChangeHTML(game) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'change-name-con';
        $('.play-page').append(nameDiv);
        nameDiv.innerHTML = /*html*/ `
  <form
    class="input-form"
  >
    <label
      for="name-change"
      class="input-label"
    >Enter your name
    </label>
    <div class="name-input-text">
      <div class="input-small-con">
        <input
          type="text"
          name="name-change"
          id="name-change"
          maxlength="8"
          placeholder="PLAYER"
          spellcheck="false"
        >
        <small>Maximum 8 Characters</small>
      </div>
      <div class="change-btn-con">
        <button class="back-btn-name btn">Back</button>
        <button
          class="btn play-btn-name">
          Play
        </button>
      </div>
    </div>
  </form>`;
        $('.back-btn-name').addEventListener('click', (e) => {
            this.menu.handleGoBack(e, game);
        });
        $('.play-btn-name').addEventListener('click', (e) => {
            this.handlePlayAgain(e, game);
        });
    }
    generateColorChangeHTML(game) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'change-color-con';
        $('.play-page').append(nameDiv);
        nameDiv.innerHTML = /*html*/ `
  <form
      id="color-change"
      class="input-form"
    >
      <label
        for="color"
        class="input-label"
      >Choose Your Color</label>
      <div class="color-btn-con">
        <div class="color-con">
          <img
            src="images/player-color/red.png"
            alt="red"
            data-color="red"
            class="change-color-item"
          >
          <img
            src="images/player-color/yellow.png"
            alt="yellow"
            data-color="yellow"
            class="change-color-item"
          >
          <img
            src="images/player-color/purple.png"
            alt="purple"
            data-color="purple"
            class="change-color-item"
          >
          <img
            src="images/player-color/green.png"
            alt="green"
            data-color="green"
            class="change-color-item"
          >
          <img
            src="images/player-color/blue.png"
            alt="blue"
            data-color="blue"
            class="change-color-item"
          >
        </div>
        <div class="change-btn-con">
          <button class="back-btn-color btn">Back</button>
          <button
            id="color-btn"
            class="btn play-btn-color"
          >Play</button>
      </div>
    </form>
  `;
        $('.back-btn-color').addEventListener('click', (e) => {
            this.menu.handleGoBack(e, game);
        });
        $('.play-btn-color').addEventListener('click', (e) => {
            this.handlePlayAgain(e, game);
        });
    }
    handleChangeName(game) {
        this.ui.animateEndgame('out');
        setTimeout(() => {
            this.ui.makeInvisible($('main'));
            this.ui.makeInvisible($('.endgame-settings'));
            $('.endgame-con').style.display = 'none';
            $('.endgame-settings').style.animation = '';
        }, 100);
        if (!this.utils.checkParent($('.play-page'), $('.change-name-con'))) {
            this.generateNameChangeHTML(game);
        }
        else {
            $('.change-name-con').style.display = 'flex';
            this.ui.makeVisible($('.change-name-con'));
        }
        if ($('.play-page').lastChild !== $('.change-name-con')) {
            $('.play-page').append($('.change-name-con'));
        }
        this.ui.animateChange('in', 'name');
        this.ui.animateEndgame('out');
    }
    handleChangeColor(game) {
        this.ui.animateEndgame('out');
        setTimeout(() => {
            this.ui.makeInvisible($('main'));
            this.ui.makeInvisible($('.endgame-settings'));
            $('.endgame-con').style.display = 'none';
        });
        game.isColorChanged = true;
        if (!this.utils.checkParent($('.play-page'), $('.change-color-con'))) {
            this.generateColorChangeHTML(game);
        }
        else {
            $('.change-color-con').style.display = 'flex';
            this.ui.makeVisible($('.change-color-con'));
        }
        [...$$('.change-color-item')].forEach(item => {
            item.addEventListener('click', (e) => {
                this.duplicateHandleColorSelection(e, game);
            });
        });
        this.menu.setPlayerColors(game);
        this.ui.animateChange('in', 'name');
    }
    duplicateHandleColorSelection(e, game) {
        $$('.change-color-item').forEach(color => {
            if (color === e.target) {
                color.classList.add('selected');
                const target = e.target;
                if (target.dataset.color) {
                    game.playerColor = target.dataset.color;
                }
                game.computerColor = this.utils.getRandomColor();
            }
            else {
                color.classList.remove('selected');
            }
        });
    }
}
