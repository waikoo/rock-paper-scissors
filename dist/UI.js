import { $, $$ } from "./selectors.js";
export default class UI {
    animate(inOrOut, nameOrColor) {
        let form = $(`#form-${nameOrColor}`);
        if (inOrOut === 'in')
            form.style.animation = '100ms come-in none';
        if (inOrOut === 'out')
            form.style.animation = '100ms go-out none';
    }
    makeInvisible(element) {
        element.classList.add('invisible');
    }
    makeVisible(element) {
        element.classList.remove('invisible');
    }
    setPlayerName(game, name = 'Player') {
        $('#name').value ? (game.name = $('#name').value.trim()) : (game.name = name);
        $('.player-name').textContent = game.name;
    }
    lightenPlayArea() {
        $('.mid-con').classList.remove('low-opacity');
        $$('.block').forEach(item => item.classList.remove('low-opacity'));
    }
    darkenPlayArea() {
        $('.mid-con').classList.add('low-opacity');
        $$('.block').forEach(item => item.classList.add('low-opacity'));
    }
    animateChange(inOrOut, nameOrColor) {
        let con = $(`.change-${nameOrColor}-con`);
        if (inOrOut === 'in') {
            con.style.animation = '100ms come-in none';
            $('.change-name-con').style.animation = '100ms go-out none';
        }
        if (inOrOut === 'out')
            con.style.animation = '100ms go-out none 1';
    }
    animateEndgame(inOrOut) {
        if (inOrOut === 'out')
            $('.endgame-settings').style.animation = `100ms go-out none 1`;
        if (inOrOut === 'in')
            $('.endgame-settings').style.animation = `100ms come-in none 1`;
        if (inOrOut === 'in-left') {
            $('.endgame-settings').style.animation = `100ms come-in-left none 1`;
        }
    }
    showWinner(player, rps, game) {
        $(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
    }
    showLoser(player, rps, game) {
        $(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
    }
    ;
}