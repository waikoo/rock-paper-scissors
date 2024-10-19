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

  public setPlayerColors(game: Game) {
    if (game.playerColor) {
      game.computerColor = this.utils.getRandomColor();
    } else {
      game.playerColor = this.utils.getRandomColor();
    }

    // make sure computer and player colors are different
    if (!game.computerColor) game.computerColor = this.utils.getRandomColor();
    while (game.playerColor === game.computerColor) {
      game.computerColor = this.utils.getRandomColor();
    }
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
    this.setPlayerColors(game);
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

  public resetPlayerColor() {
    this.ui.makeInvisible(($('.change-color-con') as HTMLElement));
    ($('.change-color-con') as HTMLElement).style.display = 'none';
  }

  public resetParts() {
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

  public handleGoBack(e: MouseEvent, game: Game) {
    e.preventDefault();

    game.isColorChanged = false;

    if (this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
      this.ui.animateChange('out', 'name');
      this.ui.animateEndgame('in-left');
    }
    if (this.utils.checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
      ($('.change-color-con') as HTMLElement).style.display = 'none';
    }

    setTimeout(() => {
      this.handleGoBackUI();
    }, 100);
  }
  public handleGoBackUI() {
    this.ui.makeVisible(($('.endgame-con') as HTMLElement));
    ($('.endgame-con') as HTMLElement).style.display = 'flex';

    this.ui.makeVisible(($('.endgame-settings') as HTMLElement));
    ($('.endgame-settings') as HTMLElement).style.animation = '';
    ($('.endgame-settings') as HTMLElement).style.display = 'block';
    ($('.change-name-con') as HTMLElement).style.animation = '100ms come-in-left forwards 1';

    setTimeout(() => {
      ($('.change-name-con') as HTMLElement).style.display = 'none';
    }, 100);
  }

  public createEndgameContainer() {
    const endgameCon = document.createElement('div');
    endgameCon.className = 'endgame-con';
    endgameCon.append(($('.endgame-settings') as HTMLElement));
    ($('.play-page') as HTMLElement).append(endgameCon);
  }
  public showSettings() {
    if (!($('.play-page') as HTMLElement).contains($('.endgame-con'))) this.createEndgameContainer();
    ($('.endgame-con') as HTMLElement).removeAttribute('style');
    this.ui.makeVisible($('.endgame-settings') as HTMLElement);
    this.ui.animateEndgame('in');
    this.displayWinner();
    this.endGameUI();
  }

  public displayWinner() {
    const playerScore = Number(($('.player-score') as HTMLElement).textContent);
    const computerScore = Number(($('.computer-score') as HTMLElement).textContent);

    const endgameMessage = ($('.endgame-message') as HTMLElement);
    if (playerScore === computerScore) {
      endgameMessage.textContent = "IT'S A TIE";
    } else if (playerScore > computerScore) {
      endgameMessage.textContent = 'YOU WIN';
    } else {
      endgameMessage.textContent = 'YOU LOSE';
    }
  }

  public endGameUI() {
    this.ui.darkenPlayArea();
    ($('.endgame-con') as HTMLElement).style.display = 'flex';
    ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in forwards`;
  }
}
