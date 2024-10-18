import { $, $$ } from "../utils/selectors.js";
import { resetUI, resetPlayerColor, resetPlayerName } from "./reset.js";

export function animateChange(inOrOut: InOrOut, nameOrColor: NameOrColor) {
  let con = $(`.change-${nameOrColor}-con`) as HTMLElement;
  if (inOrOut === 'in') {
    con.style.animation = '100ms come-in none';
    ($('.change-name-con') as HTMLElement).style.animation = '100ms go-out none';
  }
  if (inOrOut === 'out') con.style.animation = '100ms go-out none 1';
}

export function animateEndgame(inOrOut: InOrOut) {
  if (inOrOut === 'out') ($('.endgame-settings') as HTMLElement).style.animation = `100ms go-out none 1`;
  if (inOrOut === 'in') ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in none 1`;
  if (inOrOut === 'in-left') {
    ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in-left none 1`;
  }
}

export function darkenPlayArea() {
  ($('.mid-con') as HTMLElement).classList.add('low-opacity');
  $$('.block').forEach(item => item.classList.add('low-opacity'));
}
export function lightenPlayArea() {
  ($('.mid-con') as HTMLElement).classList.remove('low-opacity');
  $$('.block').forEach(item => item.classList.remove('low-opacity'));
}

export function handleRefresh() {
  location.reload();
}
