import { $, $$ } from './selectors.js';
import { Game } from './types/gameType.js';
import Logo from './Logo.js';
import Menu from './Menu.js';
import GameController from './GameController.js';

const game: Game = {
  name: null,
  playerColor: null,
  computerColor: null,
  computerScoreValue: 0,
  playerScoreValue: 0,
  round: 1,
  isFirstGame: true,
  isColorChanged: false
};

// rps logo handlers
const logo = new Logo();
const logoEl = $('.refresh') as HTMLAnchorElement
logoEl.addEventListener('click', logo.handleRefresh);
logoEl.addEventListener('mouseenter', logo.handleAddGlow, true);
logoEl.addEventListener('mouseleave', logo.handleRemoveGlow, true);

const menu = new Menu();
const gameController = new GameController();
($('#form-name') as HTMLElement).addEventListener('submit', function(e: SubmitEvent) {
  menu.handleInitialNameSubmission(e, game)
});
($('#form-color') as HTMLFormElement).addEventListener('submit', function(e: SubmitEvent) {
  menu.handleColorSubmission(e, game)

});
$$('.color-item-first').forEach(color => (color as HTMLElement).addEventListener('click', function(e: MouseEvent) {
  menu.handleColorSelection(e, game)
}));

$$('.rps-el').forEach(rpsEl => (rpsEl as HTMLImageElement).addEventListener('click', function(e: MouseEvent) {
  gameController.handleStartNewGame(e, game)
}));

($('.play-again') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
  gameController.handlePlayAgain(e, game)
});
($('.change-name') as HTMLElement).addEventListener('click', () => gameController.handleChangeName(game));
($('.change-color') as HTMLElement).addEventListener('click', function() {
  gameController.handleChangeColor(game)
});


