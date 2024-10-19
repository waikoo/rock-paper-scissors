import Logo from "./Logo.js";
import { Game } from "./types/gameType.js";
import UI from "./UI.js";
import Utils from "./Utils.js";
import { $, $$ } from "./selectors.js";

export default class Menu {

  private utils: Utils
  private logo: Logo
  private ui: UI
  constructor() {
    this.utils = new Utils()
    this.logo = new Logo()
    this.ui = new UI()
  }

  public handleInitialNameSubmission(e: SubmitEvent, game: Game) {
    e.preventDefault();
    this.logo.lightUp('paper');
    this.ui.animate('out', 'name');

    this.ui.setPlayerName(game);

    setTimeout(() => {
      this.ui.makeInvisible(($('#form-name')) as HTMLFormElement);
      this.ui.makeVisible($('#form-color') as HTMLFormElement);
      this.ui.animate('in', 'color');
    }, 100);
  }

  public loadColoredRPS(game: Game) {
    // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO REFACTOR
    if (game.playerColor) {
      game.computerColor = this.utils.getRandomColor();
    } else {
      game.playerColor = this.utils.getRandomColor();
    }

    // make sure computer and player colors are different
    if (!game.computerColor) game.computerColor = this.utils.getRandomColor();
    while (game.playerColor === game.computerColor) game.computerColor = this.utils.getRandomColor();

    ($('.computer-rock') as HTMLImageElement).src = `./images/colored/rock-${game.computerColor}.png`;
    ($('.computer-paper') as HTMLImageElement).src = `./images/colored/paper-${game.computerColor}.png`;
    ($('.computer-scissors') as HTMLImageElement).src = `./images/colored/scissors-${game.computerColor}.png`;

    ($('.rock-img') as HTMLImageElement).src = `./images/colored/rock-${game.playerColor}.png`;
    ($('.paper-img') as HTMLImageElement).src = `./images/colored/paper-${game.playerColor}.png`;
    ($('.scissors-img') as HTMLImageElement).src = `./images/colored/scissors-${game.playerColor}.png`;
  }

  public handleColorSelection(e: MouseEvent, game: Game) {
    $$('.color-item-first').forEach(color => {
      if (color === e.target) {
        color.classList.add('selected');
        const target = e.target as HTMLElement
        if (target.dataset.color) {
          game.playerColor = target.dataset.color;
        }
        game.computerColor = this.utils.getRandomColor();
      } else {
        color.classList.remove('selected');
      }
    });
  }

  public handleColorSubmission(e: SubmitEvent, game: Game) {
    e.preventDefault();

    this.ui.animate('out', 'color');
    this.loadColoredRPS(game);
    this.logo.lightUp('scissors');

    setTimeout(() => {
      this.ui.makeVisible($('.play-page') as HTMLElement);
      this.ui.makeInvisible($('main') as HTMLElement);
    }, 100);

    setTimeout(() => {
      ($('#form-color') as HTMLFormElement).removeEventListener('submit', function(e: SubmitEvent) {
        this.handleColorSubmission(e, game)
      });
      ($('#form-color') as HTMLFormElement).style.zIndex = '-100';
    }, 3000);
  }

  public resetPlayerName(game: Game) {
    let newName = ($('#name-change') as HTMLInputElement).value;
    game.name = newName ? newName : 'PLAYER';
    ($('.player-name') as HTMLElement).textContent = game.name;
  }

  public resetPlayerColor() {
    this.ui.makeInvisible(($('.change-color-con') as HTMLElement));
    ($('.change-color-con') as HTMLElement).style.display = 'none';
  }

  public getNewComputerColor(game: Game) {
    const oldColor = game.computerColor;
    let newColor = this.utils.getRandomColor();
    while (newColor === oldColor) {
      newColor = this.utils.getRandomColor();
    }
    game.computerColor = newColor;
  }

  public resetComputerColor(game: Game) {
    this.getNewComputerColor(game);
    this.loadColoredRPS(game);
  }


  public resetParts() {
    // $('.play-page').classList.remove('play-page-end');
    document.body.classList.remove('body-end');
    ($('main') as HTMLElement).classList.remove('main-end');
    ($('.endgame-settings') as HTMLElement).classList.remove('endgame-settings-end');

    this.ui.lightenPlayArea();
    this.ui.makeInvisible(($('main') as HTMLElement));
    this.ui.makeInvisible(($('.endgame-settings')) as HTMLElement);
    if ($('.change-name-con')) {
      this.ui.makeInvisible(($('.change-name-con') as HTMLElement));
      ($('.change-name-con') as HTMLElement).style.display = 'none';
    }
    ($('.endgame-con') as HTMLElement).style.display = 'none';
    this.ui.makeInvisible(($('.endgame-con') as HTMLElement));
    ($('.endgame-con') as HTMLElement).style.zIndex = '-5';
  }

  public resetScore(game: Game) {
    ($('.player-score') as HTMLElement).textContent = '0';
    ($('.computer-score') as HTMLElement).textContent = '0';

    game.playerScoreValue = 0;
    game.computerScoreValue = 0;

    game.round = 1;
  }

  public resetHistory() {
    for (let n = 1; n < 6; n++) {
      ($(`.player-history-item-${n} img`) as HTMLElement).removeAttribute('src');
      ($(`.computer-history-item-${n} img`) as HTMLElement).removeAttribute('src');
    }
  }

  public resetUI(game: Game) {
    this.resetParts();
    this.resetScore(game);
    this.resetHistory();
    this.resetComputerColor(game);
  }

  public handlePlayAgain(e: MouseEvent, game: Game) {
    e.preventDefault();
    if (e.target === $('.play-btn-name')) this.resetPlayerName(game);
    if (e.target === $('.play-btn-color')) this.resetPlayerColor();
    game.isFirstGame = false;
    this.resetUI(game);
  }

  public handleChangeName(game: Game) {
    this.ui.animateEndgame('out');
    setTimeout(() => {
      this.ui.makeInvisible(($('main') as HTMLElement));
      this.ui.makeInvisible(($('.endgame-settings') as HTMLElement));
      ($('.endgame-con') as HTMLElement).style.display = 'none';
      ($('.endgame-settings') as HTMLElement).style.animation = '';
    }, 100);

    if (!this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
      this.generateNameChangeHTML(game);
    } else {
      ($('.change-name-con') as HTMLElement).style.display = 'flex';
      this.ui.makeVisible(($('.change-name-con') as HTMLElement));
    }

    if (($('.play-page') as HTMLElement).lastChild !== $('.change-name-con')) {
      ($('.play-page') as HTMLElement).append(($('.change-name-con') as HTMLElement));
    }
    this.ui.animateChange('in', 'name');
    this.ui.animateEndgame('out');
  }
  public generateNameChangeHTML(game: Game) {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'change-name-con';

    ($('.play-page') as HTMLElement).append(nameDiv);
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
    ($('.back-btn-name') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
      this.handleGoBack(e, game)
    });
    ($('.play-btn-name') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
      this.handlePlayAgain(e, game)
    });
  }
  public generateColorChangeHTML(game: Game) {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'change-color-con';

    ($('.play-page') as HTMLElement).append(nameDiv);
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

    ($('.back-btn-color') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
      this.handleGoBack(e, game)
    });
    ($('.play-btn-color') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
      this.handlePlayAgain(e, game)
    });
  }
  public handleGoBack(e: MouseEvent, game: Game) {
    e.preventDefault();

    game.isColorChanged = false;

    if (this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
      this.ui.animateChange('out', 'name');
      this.ui.animateEndgame('in-left');
      // ($('.change-name-con').style.display = 'none')
    }
    if (this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
      ($('.change-color-con') as HTMLElement).style.display = 'none';
    }

    setTimeout(() => {
      this.handleGoBackUI();
    }, 100);
    // animateEndgame('in', 'reverse')
  }
  public handleGoBackUI() {
    this.ui.makeVisible(($('.endgame-con') as HTMLElement));
    ($('.endgame-con') as HTMLElement).style.display = 'flex';

    this.ui.makeVisible(($('.endgame-settings') as HTMLElement)); // no work
    ($('.endgame-settings') as HTMLElement).style.animation = '';
    ($('.endgame-settings') as HTMLElement).style.display = 'block';
    ($('.change-name-con') as HTMLElement).style.animation = '100ms come-in-left forwards 1';
    // $('.endgame-settings').style.animation = '100ms come-in-left forwards 1'
    setTimeout(() => {
      ($('.change-name-con') as HTMLElement).style.display = 'none';
    }, 100);
  }
  public duplicateHandleColorSelection(e: MouseEvent, game: Game) {
    $$('.change-color-item').forEach(color => {
      if (color === e.target) {
        color.classList.add('selected');
        const target = e.target as HTMLElement
        if (target.dataset.color) {
          game.playerColor = target.dataset.color;
        }
        game.computerColor = this.utils.getRandomColor();
      } else {
        color.classList.remove('selected');
      }
    });
  }
  public handleChangeColor(game: Game) {
    this.ui.animateEndgame('out');
    setTimeout(() => {
      this.ui.makeInvisible(($('main') as HTMLElement));
      this.ui.makeInvisible(($('.endgame-settings') as HTMLElement));
      ($('.endgame-con') as HTMLElement).style.display = 'none';
    });

    game.isColorChanged = true;

    if (!this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
      this.generateColorChangeHTML(game);
    } else {
      ($('.change-color-con') as HTMLElement).style.display = 'flex';
      this.ui.makeVisible(($('.change-color-con') as HTMLElement));
    }

    [...$$('.change-color-item')].forEach(item => {
      (item as HTMLElement).addEventListener('click', (e: MouseEvent) => {
        this.duplicateHandleColorSelection(e, game)
      });
    });

    this.loadColoredRPS(game);
    this.ui.animateChange('in', 'name');
  }

  public createEndgameContainer() {
    const endgameCon = document.createElement('div');
    endgameCon.className = 'endgame-con';
    endgameCon.append(($('.endgame-settings') as HTMLElement));
    ($('.play-page') as HTMLElement).append(endgameCon);
  }
  public showSettings() {
    // if (game.isFirstGame) game.isFirstGame = false;
    if (!($('.play-page') as HTMLElement).contains($('.endgame-con'))) this.createEndgameContainer();
    ($('.endgame-con') as HTMLElement).removeAttribute('style');
    // ($('.endgame-con') as HTMLElement).style.display = 'block';
    this.ui.makeVisible($('.endgame-settings') as HTMLElement);
    // console.log($('.endgame-settings').style.animation)
    this.ui.animateEndgame('in');
    // setTimeout(() => $('.endgame-settings').removeAttribute('style'), 100)
    // removeAttribute?
    this.displayWinner();
    this.endGameUI();
  }

  public displayWinner() {
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

  public endGameUI() {
    this.ui.darkenPlayArea();
    ($('.endgame-con') as HTMLElement).style.display = 'flex';
    // animateEndgame('in')
    ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in forwards`;
    // $('.endgame-settings').style.animation = `100ms come-${inOrOut} forwards`
  }
}
