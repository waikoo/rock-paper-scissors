import { lightUpLogo, animate } from "../ui/logo.js";
import { $ } from '../utils/selectors.js';
import { makeInvisible, makeVisible } from "../ui/toggleUIDisplay.js";
export function handleNameSubmission(e, game) {
    e.preventDefault();
    lightUpLogo('paper');
    animate('out', 'name');
    setPlayerName(game);
    setTimeout(() => {
        makeInvisible(($('#form-name')));
        makeVisible($('#form-color'));
        animate('in', 'color');
    }, 100);
}
export function setPlayerName(game, name = 'Player') {
    $('#name').value ? (game.name = $('#name').value.trim()) : (game.name = name);
    $('.player-name').textContent = game.name;
}
