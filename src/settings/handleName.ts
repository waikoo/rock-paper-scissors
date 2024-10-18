import { lightUpLogo, animate } from "../ui/logo.js";
import { $, $$ } from '../utils/selectors.js';
import { makeInvisible, makeVisible } from "../ui/toggleUIDisplay.js";

export function handleNameSubmission(e: SubmitEvent, game: Game) {
  e.preventDefault();
  lightUpLogo('paper');
  animate('out', 'name');

  setPlayerName(game);

  setTimeout(() => {
    makeInvisible(($('#form-name')) as HTMLFormElement);
    makeVisible($('#form-color') as HTMLFormElement);
    animate('in', 'color');
  }, 100);
}

export function setPlayerName(game: Game, name = 'Player') {
  ($('#name') as HTMLInputElement).value ? (game.name = ($('#name') as HTMLInputElement).value.trim()) : (game.name = name);
  ($('.player-name') as HTMLElement).textContent = game.name;
}
