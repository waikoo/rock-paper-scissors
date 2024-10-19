import { $, $$ } from '../utils/selectors.js';
import getRandomNumberUntil from "../utils/randomNumberGenerator.js";
import { lightUpLogo, animate } from "../ui/logo.js";
import { makeInvisible, makeVisible } from "../ui/toggleUIDisplay.js";
export function handleColorSubmission(e, game) {
    e.preventDefault();
    animateUIAtColorStage(game);
    setTimeout(() => {
        makeVisible($('.play-page'));
        makeInvisible($('main'));
    }, 100);
    setTimeout(() => {
        $('#form-color').removeEventListener('submit', function (e) {
            handleColorSubmission(e, game);
        });
        $('#form-color').style.zIndex = '-100';
    }, 3000);
}
export function handleColorSelection(e, game) {
    $$('.color-item-first').forEach(color => {
        if (color === e.target) {
            color.classList.add('selected');
            const target = e.target;
            if (target.dataset.color) {
                game.playerColor = target.dataset.color;
            }
            game.computerColor = getRandomColor();
        }
        else {
            color.classList.remove('selected');
        }
    });
}
export function getRandomColor() {
    const randomColorObj = {
        1: 'red',
        2: 'yellow',
        4: 'purple',
        3: 'green',
        5: 'blue'
    };
    return randomColorObj[`${getRandomNumberUntil(5)}`];
}
export function loadColoredRPS(game) {
    // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO REFACTOR
    if (game.playerColor) {
        game.computerColor = getRandomColor();
    }
    else {
        game.playerColor = getRandomColor();
    }
    // make sure computer and player colors are different
    if (!game.computerColor)
        game.computerColor = getRandomColor();
    while (game.playerColor === game.computerColor)
        game.computerColor = getRandomColor();
    $('.computer-rock').src = `./images/colored/rock-${game.computerColor}.png`;
    $('.computer-paper').src = `./images/colored/paper-${game.computerColor}.png`;
    $('.computer-scissors').src = `./images/colored/scissors-${game.computerColor}.png`;
    $('.rock-img').src = `./images/colored/rock-${game.playerColor}.png`;
    $('.paper-img').src = `./images/colored/paper-${game.playerColor}.png`;
    $('.scissors-img').src = `./images/colored/scissors-${game.playerColor}.png`;
}
function animateUIAtColorStage(game) {
    animate('out', 'color');
    loadColoredRPS(game);
    lightUpLogo('scissors');
    //
    // !$('.player-history-item-1 img').src ? makeInvisible($('main')) : makeVisible($('main'));
    // if smth breaks, these:
    // $('#form-color').classList.remove('disappear');
    // makeInvisible('#form-color');
}
