import { $, $$ } from "../utils/selectors.js";
import { lightenPlayArea } from "./main.js";
import { makeInvisible, makeVisible } from "./toggleUIDisplay.js";
import { getRandomColor } from "../settings/handleColor.js";
import { loadColoredRPS } from "../settings/handleColor.js";
import { animateEndgame, animateChange } from "./main.js";
import { generateColorChangeHTML, generateNameChangeHTML } from "../../app.js";

export function handlePlayAgain(e: MouseEvent, game: Game) {
  e.preventDefault();
  if (e.target === $('.play-btn-name')) resetPlayerName(game);
  if (e.target === $('.play-btn-color')) resetPlayerColor();
  game.isFirstGame = false;
  resetUI(game);
}

export function handleChangeName() {
  animateEndgame('out');
  setTimeout(() => {
    makeInvisible(($('main') as HTMLElement));
    makeInvisible(($('.endgame-settings') as HTMLElement));
    ($('.endgame-con') as HTMLElement).style.display = 'none';
    ($('.endgame-settings') as HTMLElement).style.animation = '';
  }, 100);

  if (!checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
    generateNameChangeHTML();
  } else {
    ($('.change-name-con') as HTMLElement).style.display = 'flex';
    makeVisible(($('.change-name-con') as HTMLElement));
  }

  if (($('.play-page') as HTMLElement).lastChild !== $('.change-name-con')) {
    ($('.play-page') as HTMLElement).append(($('.change-name-con') as HTMLElement));
  }
  animateChange('in', 'name');
  animateEndgame('out');
}

export function handleChangeColor(game: Game) {
  animateEndgame('out');
  setTimeout(() => {
    makeInvisible(($('main') as HTMLElement));
    makeInvisible(($('.endgame-settings') as HTMLElement));
    ($('.endgame-con') as HTMLElement).style.display = 'none';
  });

  game.isColorChanged = true;

  if (!checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
    generateColorChangeHTML();
  } else {
    ($('.change-color-con') as HTMLElement).style.display = 'flex';
    makeVisible(($('.change-color-con') as HTMLElement));
  }

  [...$$('.change-color-item')].forEach(item => {
    (item as HTMLElement).addEventListener('click', function(e: MouseEvent) {
      duplicateHandleColorSelection(e, game)
    });
  });

  loadColoredRPS(game);
  animateChange('in', 'name');
}
export function resetUI(game: Game) {
  resetParts();
  resetScore(game);
  resetHistory();
  resetComputerColor(game);
}


function getNewComputerColor(game: Game) {
  const oldColor = game.computerColor;
  let newColor = getRandomColor();
  while (newColor === oldColor) {
    newColor = getRandomColor();
  }
  game.computerColor = newColor;
}

function resetComputerColor(game: Game) {
  getNewComputerColor(game);
  loadColoredRPS(game);
}

export function resetPlayerName(game: Game) {
  let newName = ($('#name-change') as HTMLInputElement).value;
  game.name = newName ? newName : 'PLAYER';
  ($('.player-name') as HTMLElement).textContent = game.name;
}

export function resetPlayerColor() {
  makeInvisible(($('.change-color-con') as HTMLElement));
  ($('.change-color-con') as HTMLElement).style.display = 'none';
}

function resetParts() {
  // $('.play-page').classList.remove('play-page-end');
  document.body.classList.remove('body-end');
  ($('main') as HTMLElement).classList.remove('main-end');
  ($('.endgame-settings') as HTMLElement).classList.remove('endgame-settings-end');

  lightenPlayArea();
  makeInvisible(($('main') as HTMLElement));
  makeInvisible(($('.endgame-settings')) as HTMLElement);
  if ($('.change-name-con')) {
    makeInvisible(($('.change-name-con') as HTMLElement));
    ($('.change-name-con') as HTMLElement).style.display = 'none';
  }
  ($('.endgame-con') as HTMLElement).style.display = 'none';
  makeInvisible(($('.endgame-con') as HTMLElement));
  ($('.endgame-con') as HTMLElement).style.zIndex = '-5';
}

function resetScore(game: Game) {
  ($('.player-score') as HTMLElement).textContent = '0';
  ($('.computer-score') as HTMLElement).textContent = '0';

  game.playerScoreValue = 0;
  game.computerScoreValue = 0;

  game.round = 1;
}

function resetHistory() {
  for (let n = 1; n < 6; n++) {
    ($(`.player-history-item-${n} img`) as HTMLElement).removeAttribute('src');
    ($(`.computer-history-item-${n} img`) as HTMLElement).removeAttribute('src');
  }
}

export function handleGoBack(e: MouseEvent, game: Game) {
  e.preventDefault();

  game.isColorChanged = false;

  if (checkParent(($('.play-page') as HTMLElement), ($('.change-name-con') as HTMLElement))) {
    animateChange('out', 'name');
    animateEndgame('in-left');
    // ($('.change-name-con').style.display = 'none')
  }
  if (checkParent(($('.play-page') as HTMLElement), ($('.change-color-con') as HTMLElement))) {
    ($('.change-color-con') as HTMLElement).style.display = 'none';
  }

  setTimeout(() => {
    handleGoBackUI();
  }, 100);
  // animateEndgame('in', 'reverse')
}

function handleGoBackUI() {
  makeVisible(($('.endgame-con') as HTMLElement));
  ($('.endgame-con') as HTMLElement).style.display = 'flex';

  makeVisible(($('.endgame-settings') as HTMLElement)); // no work
  ($('.endgame-settings') as HTMLElement).style.animation = '';
  ($('.endgame-settings') as HTMLElement).style.display = 'block';
  ($('.change-name-con') as HTMLElement).style.animation = '100ms come-in-left forwards 1';
  // $('.endgame-settings').style.animation = '100ms come-in-left forwards 1'
  setTimeout(() => {
    ($('.change-name-con') as HTMLElement).style.display = 'none';
  }, 100);
}


function checkParent(parent: HTMLElement, child: HTMLElement) {
  if (parent.contains(child)) return true;
  return false;
}

function duplicateHandleColorSelection(e: MouseEvent, game: Game) {
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

