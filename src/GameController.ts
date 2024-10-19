import Menu from "./Menu.js";
import { Round } from "./Round.js";
import { $, $$ } from "./utils/selectors.js";
import { checkParent, getRandomColor, getRandomNumberUntil } from "./utils/utils.js";
import { Game } from "./types/gameType.js";
import { RPS } from "./types/rps.js";
import UI from "./UI.js";

export default class GameController {
  private menu: Menu
  private ui: UI
  private rpsEls: NodeListOf<HTMLImageElement>
  private game: Game
  private playAgainEl: HTMLElement
  private changeName: HTMLElement
  private changeColor: HTMLElement

  constructor(rpsEls: string, playAgainEl: string, changeName: string, changeColor: string, menu: Menu, ui: UI, game: Game) {
    this.ui = ui
    this.menu = menu
    this.rpsEls = $$(rpsEls) as NodeListOf<HTMLImageElement>
    this.game = game
    this.playAgainEl = $(playAgainEl) as HTMLElement
    this.changeName = $(changeName) as HTMLElement
    this.changeColor = $(changeColor) as HTMLElement
    this.attachEventListeners()
  }

  public attachEventListeners() {
    this.rpsEls.forEach(rpsEl => (rpsEl as HTMLImageElement).addEventListener('click', (e) => this.handleStartNewGame(e, this.game)))

    this.playAgainEl.addEventListener('click', (e: MouseEvent) => {
      this.handlePlayAgain(e, this.game)
    });

    this.changeName.addEventListener('click', () => {
      this.handleChangeName(this.game)
    });

    this.changeColor.addEventListener('click', () => {
      this.handleChangeColor(this.game)
    });
  }

  public handleStartNewGame(e: MouseEvent, game: Game) {
    if (e.target) {
      const playerChoice = (e.target as HTMLImageElement).dataset.playerChoice
      if (playerChoice) {
        new Round(playerChoice as RPS, this, this.menu, this.ui).play(game);
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
    return numberToChoiceObj[getRandomNumberUntil(3).toString()];
  }

  public incrementScoreFor(game: Game, aPlayer = 'both') {
    if (!game) return

    if (aPlayer === 'both') {
      this.incrementScoreFor(game, 'computer');
      this.incrementScoreFor(game, 'player');
      return
    }

    const playerScoreValue = game[`${aPlayer}ScoreValue`];
    if (typeof playerScoreValue === 'number') {
      (game[`${aPlayer}ScoreValue`] as number)++;

      const updatedScoreValue = game[`${aPlayer}ScoreValue`];
      if (updatedScoreValue) {
        this.ui.updateTextContent(($(`.${aPlayer}-score`) as HTMLElement), updatedScoreValue.toString())
      }
    }
  }

  public resetPlayerName(game: Game) {
    let newName = ($('#name-change') as HTMLInputElement).value;
    game.name = newName ? newName : 'PLAYER';
    this.ui.updateTextContent(($('.player-name') as HTMLElement), game.name);
  }

  public getNewComputerColor(game: Game) {
    const oldColor = game.computerColor;
    let newColor = getRandomColor();
    while (newColor === oldColor) {
      newColor = getRandomColor();
    }
    game.computerColor = newColor;
  }

  public resetScore(game: Game) {
    game.playerScoreValue = 0;
    game.computerScoreValue = 0;

    game.round = 1;

    this.ui.updateTextContent($('.player-score') as HTMLElement, '0')
    this.ui.updateTextContent($('.computer-score') as HTMLElement, '0')
    this.menu.resetParts()
    this.ui.resetHistory()
    this.getNewComputerColor(game);
    this.menu.setPlayerColors(game);
  }

  public handlePlayAgain(e: MouseEvent, game: Game) {
    e.preventDefault();
    if (e.target === $('.play-btn-name')) this.resetPlayerName(game);
    if (e.target === $('.play-btn-color')) this.menu.resetPlayerColor();
    game.isFirstGame = false;
    this.resetScore(game);
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
      this.menu.handleGoBack(e, game)
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
      this.menu.handleGoBack(e, game)
    });
    ($('.play-btn-color') as HTMLElement).addEventListener('click', (e: MouseEvent) => {
      this.handlePlayAgain(e, game)
    });
  }

  public handleChangeName(game: Game) {
    this.ui.animateEndgame('out');
    setTimeout(() => {
      this.ui.makeInvisible(($('main') as HTMLElement));
      this.ui.makeInvisible(($('.endgame-settings') as HTMLElement));
      ($('.endgame-con') as HTMLElement).style.display = 'none';
      ($('.endgame-settings') as HTMLElement).style.animation = '';
    }, 100);

    if (!checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
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

  public handleChangeColor(game: Game) {
    this.ui.animateEndgame('out');
    setTimeout(() => {
      this.ui.makeInvisible(($('main') as HTMLElement));
      this.ui.makeInvisible(($('.endgame-settings') as HTMLElement));
      ($('.endgame-con') as HTMLElement).style.display = 'none';
    });

    game.isColorChanged = true;

    if (!checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
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

    this.menu.setPlayerColors(game);
    this.ui.animateChange('in', 'name');
  }
  public duplicateHandleColorSelection(e: MouseEvent, game: Game) {
    $$('.change-color-item').forEach(color => {
      if (color === e.target) {
        color.classList.add('selected');
        const target = e.target as HTMLElement
        if (target.dataset.color) {
          game.playerColor = target.dataset.color;
        }
        game.computerColor = getRandomColor();
      } else {
        color.classList.remove('selected');
      }
    });
  }
}
