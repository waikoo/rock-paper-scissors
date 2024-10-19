import Logo from "./Logo.js";
import UI from "./UI.js";
import Utils from "./Utils.js";
import { $, $$ } from "./selectors.js";
export default class Menu {
    constructor() {
        this.utils = new Utils();
        this.logo = new Logo();
        this.ui = new UI();
    }
    handleInitialNameSubmission(e, game) {
        e.preventDefault();
        this.logo.lightUp('paper');
        this.ui.animate('out', 'name');
        this.ui.setPlayerName(game);
        setTimeout(() => {
            this.ui.makeInvisible(($('#form-name')));
            this.ui.makeVisible($('#form-color'));
            this.ui.animate('in', 'color');
        }, 100);
    }
    loadColoredRPS(game) {
        // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO REFACTOR
        if (game.playerColor) {
            game.computerColor = this.utils.getRandomColor();
        }
        else {
            game.playerColor = this.utils.getRandomColor();
        }
        // make sure computer and player colors are different
        if (!game.computerColor)
            game.computerColor = this.utils.getRandomColor();
        while (game.playerColor === game.computerColor)
            game.computerColor = this.utils.getRandomColor();
        $('.computer-rock').src = `./images/colored/rock-${game.computerColor}.png`;
        $('.computer-paper').src = `./images/colored/paper-${game.computerColor}.png`;
        $('.computer-scissors').src = `./images/colored/scissors-${game.computerColor}.png`;
        $('.rock-img').src = `./images/colored/rock-${game.playerColor}.png`;
        $('.paper-img').src = `./images/colored/paper-${game.playerColor}.png`;
        $('.scissors-img').src = `./images/colored/scissors-${game.playerColor}.png`;
    }
    handleColorSelection(e, game) {
        $$('.color-item-first').forEach(color => {
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
    handleColorSubmission(e, game) {
        e.preventDefault();
        this.ui.animate('out', 'color');
        this.loadColoredRPS(game);
        this.logo.lightUp('scissors');
        setTimeout(() => {
            this.ui.makeVisible($('.play-page'));
            this.ui.makeInvisible($('main'));
        }, 100);
        setTimeout(() => {
            $('#form-color').removeEventListener('submit', function (e) {
                this.handleColorSubmission(e, game);
            });
            $('#form-color').style.zIndex = '-100';
        }, 3000);
    }
    resetPlayerName(game) {
        let newName = $('#name-change').value;
        game.name = newName ? newName : 'PLAYER';
        $('.player-name').textContent = game.name;
    }
    resetPlayerColor() {
        this.ui.makeInvisible($('.change-color-con'));
        $('.change-color-con').style.display = 'none';
    }
    getNewComputerColor(game) {
        const oldColor = game.computerColor;
        let newColor = this.utils.getRandomColor();
        while (newColor === oldColor) {
            newColor = this.utils.getRandomColor();
        }
        game.computerColor = newColor;
    }
    resetComputerColor(game) {
        this.getNewComputerColor(game);
        this.loadColoredRPS(game);
    }
    resetParts() {
        // $('.play-page').classList.remove('play-page-end');
        document.body.classList.remove('body-end');
        $('main').classList.remove('main-end');
        $('.endgame-settings').classList.remove('endgame-settings-end');
        this.ui.lightenPlayArea();
        this.ui.makeInvisible($('main'));
        this.ui.makeInvisible(($('.endgame-settings')));
        if ($('.change-name-con')) {
            this.ui.makeInvisible($('.change-name-con'));
            $('.change-name-con').style.display = 'none';
        }
        $('.endgame-con').style.display = 'none';
        this.ui.makeInvisible($('.endgame-con'));
        $('.endgame-con').style.zIndex = '-5';
    }
    resetScore(game) {
        $('.player-score').textContent = '0';
        $('.computer-score').textContent = '0';
        game.playerScoreValue = 0;
        game.computerScoreValue = 0;
        game.round = 1;
    }
    resetHistory() {
        for (let n = 1; n < 6; n++) {
            $(`.player-history-item-${n} img`).removeAttribute('src');
            $(`.computer-history-item-${n} img`).removeAttribute('src');
        }
    }
    resetUI(game) {
        this.resetParts();
        this.resetScore(game);
        this.resetHistory();
        this.resetComputerColor(game);
    }
    handlePlayAgain(e, game) {
        e.preventDefault();
        if (e.target === $('.play-btn-name'))
            this.resetPlayerName(game);
        if (e.target === $('.play-btn-color'))
            this.resetPlayerColor();
        game.isFirstGame = false;
        this.resetUI(game);
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
            this.handleGoBack(e, game);
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
            this.handleGoBack(e, game);
        });
        $('.play-btn-color').addEventListener('click', (e) => {
            this.handlePlayAgain(e, game);
        });
    }
    handleGoBack(e, game) {
        e.preventDefault();
        game.isColorChanged = false;
        if (this.utils.checkParent($('.play-page'), $('.change-name-con'))) {
            this.ui.animateChange('out', 'name');
            this.ui.animateEndgame('in-left');
            // ($('.change-name-con').style.display = 'none')
        }
        if (this.utils.checkParent($('.play-page'), $('.change-color-con'))) {
            $('.change-color-con').style.display = 'none';
        }
        setTimeout(() => {
            this.handleGoBackUI();
        }, 100);
        // animateEndgame('in', 'reverse')
    }
    handleGoBackUI() {
        this.ui.makeVisible($('.endgame-con'));
        $('.endgame-con').style.display = 'flex';
        this.ui.makeVisible($('.endgame-settings')); // no work
        $('.endgame-settings').style.animation = '';
        $('.endgame-settings').style.display = 'block';
        $('.change-name-con').style.animation = '100ms come-in-left forwards 1';
        // $('.endgame-settings').style.animation = '100ms come-in-left forwards 1'
        setTimeout(() => {
            $('.change-name-con').style.display = 'none';
        }, 100);
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
        this.loadColoredRPS(game);
        this.ui.animateChange('in', 'name');
    }
    createEndgameContainer() {
        const endgameCon = document.createElement('div');
        endgameCon.className = 'endgame-con';
        endgameCon.append($('.endgame-settings'));
        $('.play-page').append(endgameCon);
    }
    showSettings() {
        // if (game.isFirstGame) game.isFirstGame = false;
        if (!$('.play-page').contains($('.endgame-con')))
            this.createEndgameContainer();
        $('.endgame-con').removeAttribute('style');
        // ($('.endgame-con') as HTMLElement).style.display = 'block';
        this.ui.makeVisible($('.endgame-settings'));
        // console.log($('.endgame-settings').style.animation)
        this.ui.animateEndgame('in');
        // setTimeout(() => $('.endgame-settings').removeAttribute('style'), 100)
        // removeAttribute?
        this.displayWinner();
        this.endGameUI();
    }
    displayWinner() {
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
    endGameUI() {
        this.ui.darkenPlayArea();
        $('.endgame-con').style.display = 'flex';
        // animateEndgame('in')
        $('.endgame-settings').style.animation = `100ms come-in forwards`;
        // $('.endgame-settings').style.animation = `100ms come-${inOrOut} forwards`
    }
}
