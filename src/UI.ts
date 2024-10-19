import { Game } from "./types/gameType.js";
import { $, $$ } from "./selectors.js";
import { InOrOut, NameOrColor } from "./types/thisOrThat.js";

export default class UI {
  public animate(inOrOut: InOrOut, nameOrColor: NameOrColor) {
    let form = $(`#form-${nameOrColor}`) as HTMLFormElement;
    if (inOrOut === 'in') form.style.animation = '100ms come-in none';
    if (inOrOut === 'out') form.style.animation = '100ms go-out none';
  }

  public makeInvisible(element: HTMLElement) {
    element.classList.add('invisible');
  }

  public makeVisible(element: HTMLElement) {
    element.classList.remove('invisible');
  }

  public setPlayerName(game: Game, name = 'Player') {
    ($('#name') as HTMLInputElement).value ? (game.name = ($('#name') as HTMLInputElement).value.trim()) : (game.name = name);

    ($('.player-name') as HTMLElement).textContent = game.name;
  }

  public lightenPlayArea() {
    ($('.mid-con') as HTMLElement).classList.remove('low-opacity');
    $$('.block').forEach(item => item.classList.remove('low-opacity'));
  }


  public darkenPlayArea() {
    ($('.mid-con') as HTMLElement).classList.add('low-opacity');
    $$('.block').forEach(item => item.classList.add('low-opacity'));
  }

  public animateChange(inOrOut: InOrOut, nameOrColor: NameOrColor) {
    let con = $(`.change-${nameOrColor}-con`) as HTMLElement;
    if (inOrOut === 'in') {
      con.style.animation = '100ms come-in none';
      ($('.change-name-con') as HTMLElement).style.animation = '100ms go-out none';
    }
    if (inOrOut === 'out') con.style.animation = '100ms go-out none 1';
  }

  public animateEndgame(inOrOut: InOrOut) {
    if (inOrOut === 'out') ($('.endgame-settings') as HTMLElement).style.animation = `100ms go-out none 1`;
    if (inOrOut === 'in') ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in none 1`;
    if (inOrOut === 'in-left') {
      ($('.endgame-settings') as HTMLElement).style.animation = `100ms come-in-left none 1`;
    }
  }

  public showWinner(player: string, rps: RPS, game: Game): void {

    ($(`.${player}-history-item-${game.round} img`) as HTMLImageElement).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
  }
  public showLoser(player: string, rps: RPS, game: Game): void {
    ($(`.${player}-history-item-${game.round} img`) as HTMLImageElement).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
  };
}
import { RPS } from "./types/rps.js";

