import { Game } from './types/gameType.js';
import Logo from './Logo.js';
import Menu from './Menu.js';
import GameController from './GameController.js';
import UI from './UI.js';

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

const logo = new Logo('.refresh');
const menu = new Menu('#form-name', '#form-color', '.color-item-first', logo, game);
const ui = new UI()
new GameController('.rps-el', '.play-again', '.change-name', '.change-color', menu, ui, game);

