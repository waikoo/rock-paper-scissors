import { $, $$ } from './selectors.js';
import Logo from './Logo.js';
import Menu from './Menu.js';
import GameController from './GameController.js';
const game = {
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
const logoEl = $('.refresh');
logoEl.addEventListener('click', logo.handleRefresh);
logoEl.addEventListener('mouseenter', logo.handleAddGlow, true);
logoEl.addEventListener('mouseleave', logo.handleRemoveGlow, true);
const menu = new Menu();
$('#form-name').addEventListener('submit', function (e) {
    menu.handleInitialNameSubmission(e, game);
});
$('#form-color').addEventListener('submit', function (e) {
    menu.handleColorSubmission(e, game);
});
$$('.color-item-first').forEach(color => color.addEventListener('click', function (e) {
    menu.handleColorSelection(e, game);
}));
$$('.rps-el').forEach(rpsEl => rpsEl.addEventListener('click', function (e) {
    new GameController().handleStartNewGame(e, game);
}));
$('.play-again').addEventListener('click', function (e) {
    menu.handlePlayAgain(e, game);
});
$('.change-name').addEventListener('click', () => menu.handleChangeName(game));
$('.change-color').addEventListener('click', function () {
    menu.handleChangeColor(game);
});
