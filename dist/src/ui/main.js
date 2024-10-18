import { $, $$ } from "../utils/selectors.js";
export function animateChange(inOrOut, nameOrColor) {
    let con = $(`.change-${nameOrColor}-con`);
    if (inOrOut === 'in') {
        con.style.animation = '100ms come-in none';
        $('.change-name-con').style.animation = '100ms go-out none';
    }
    if (inOrOut === 'out')
        con.style.animation = '100ms go-out none 1';
}
export function animateEndgame(inOrOut) {
    if (inOrOut === 'out')
        $('.endgame-settings').style.animation = `100ms go-out none 1`;
    if (inOrOut === 'in')
        $('.endgame-settings').style.animation = `100ms come-in none 1`;
    if (inOrOut === 'in-left') {
        $('.endgame-settings').style.animation = `100ms come-in-left none 1`;
    }
}
export function darkenPlayArea() {
    $('.mid-con').classList.add('low-opacity');
    $$('.block').forEach(item => item.classList.add('low-opacity'));
}
export function lightenPlayArea() {
    $('.mid-con').classList.remove('low-opacity');
    $$('.block').forEach(item => item.classList.remove('low-opacity'));
}
export function handleRefresh() {
    location.reload();
}
