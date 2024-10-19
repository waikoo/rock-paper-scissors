import UI from "./UI.js";
import { $, $$ } from "./utils/selectors.js";
import { checkParent, getRandomColor } from "./utils/utils.js";
export default class Menu {
    constructor(formNameEl, formColorEl, colorItemFirstEls, logo, game) {
        this.formNameEl = $(formNameEl);
        this.formColorEl = $(formColorEl);
        this.colorItemFirstEls = $$(colorItemFirstEls);
        this.game = game;
        this.logo = logo;
        this.ui = new UI();
        this.attachEventListeners();
    }
    attachEventListeners() {
        this.formNameEl.addEventListener('submit', (e) => this.handleInitialNameSubmission(e, this.game));
        this.formColorEl.addEventListener('submit', (e) => this.handleInitialColorSubmission(e, this.game));
        this.colorItemFirstEls.forEach(color => color.addEventListener('click', (e) => this.handleColorSelection(e, this.game)));
    }
    handleInitialNameSubmission(e, game) {
        e.preventDefault();
        this.logo.lightUp('paper');
        this.ui.animate('out', 'name');
        this.ui.setPlayerName(game);
        setTimeout(() => {
            this.ui.makeInvisible(($('#form-name')));
            this.ui.makeVisible($('#form-color'));
            this.ui.animate('in', 'color');
        }, 100);
    }
    setPlayerColors(game) {
        if (game.playerColor) {
            game.computerColor = getRandomColor();
        }
        else {
            game.playerColor = getRandomColor();
        }
        // make sure computer and player colors are different
        if (!game.computerColor)
            game.computerColor = getRandomColor();
        while (game.playerColor === game.computerColor) {
            game.computerColor = getRandomColor();
        }
        $('.computer-rock').src = `./images/colored/rock-${game.computerColor}.png`;
        $('.computer-paper').src = `./images/colored/paper-${game.computerColor}.png`;
        $('.computer-scissors').src = `./images/colored/scissors-${game.computerColor}.png`;
        $('.rock-img').src = `./images/colored/rock-${game.playerColor}.png`;
        $('.paper-img').src = `./images/colored/paper-${game.playerColor}.png`;
        $('.scissors-img').src = `./images/colored/scissors-${game.playerColor}.png`;
    }
    handleColorSelection(e, game) {
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
    handleInitialColorSubmission(e, game) {
        e.preventDefault();
        this.ui.animate('out', 'color');
        this.setPlayerColors(game);
        this.logo.lightUp('scissors');
        setTimeout(() => {
            this.ui.makeVisible($('.play-page'));
            this.ui.makeInvisible($('main'));
        }, 100);
        setTimeout(() => {
            $('#form-color').removeEventListener('submit', function (e) {
                this.handleColorSubmission(e, game);
            });
            $('#form-color').style.zIndex = '-100';
        }, 3000);
    }
    resetPlayerColor() {
        this.ui.makeInvisible($('.change-color-con'));
        $('.change-color-con').style.display = 'none';
    }
    resetParts() {
        document.body.classList.remove('body-end');
        $('main').classList.remove('main-end');
        $('.endgame-settings').classList.remove('endgame-settings-end');
        this.ui.lightenPlayArea();
        this.ui.makeInvisible($('main'));
        this.ui.makeInvisible(($('.endgame-settings')));
        if ($('.change-name-con')) {
            this.ui.makeInvisible($('.change-name-con'));
            $('.change-name-con').style.display = 'none';
        }
        $('.endgame-con').style.display = 'none';
        this.ui.makeInvisible($('.endgame-con'));
        $('.endgame-con').style.zIndex = '-5';
    }
    handleGoBack(e, game) {
        e.preventDefault();
        game.isColorChanged = false;
        if (checkParent($('.play-page'), $('.change-name-con'))) {
            this.ui.animateChange('out', 'name');
            this.ui.animateEndgame('in-left');
        }
        if (checkParent($('.play-page'), $('.change-color-con'))) {
            $('.change-color-con').style.display = 'none';
        }
        setTimeout(() => {
            this.handleGoBackUI();
        }, 100);
    }
    handleGoBackUI() {
        this.ui.makeVisible($('.endgame-con'));
        $('.endgame-con').style.display = 'flex';
        this.ui.makeVisible($('.endgame-settings'));
        $('.endgame-settings').style.animation = '';
        $('.endgame-settings').style.display = 'block';
        $('.change-name-con').style.animation = '100ms come-in-left forwards 1';
        setTimeout(() => {
            $('.change-name-con').style.display = 'none';
        }, 100);
    }
    createEndgameContainer() {
        const endgameCon = document.createElement('div');
        endgameCon.className = 'endgame-con';
        endgameCon.append($('.endgame-settings'));
        $('.play-page').append(endgameCon);
    }
    showSettings() {
        if (!$('.play-page').contains($('.endgame-con')))
            this.createEndgameContainer();
        $('.endgame-con').removeAttribute('style');
        this.ui.makeVisible($('.endgame-settings'));
        this.ui.animateEndgame('in');
        this.displayWinner();
        this.endGameUI();
    }
    displayWinner() {
        const playerScore = Number($('.player-score').textContent);
        const computerScore = Number($('.computer-score').textContent);
        const endgameMessage = $('.endgame-message');
        if (playerScore === computerScore) {
            endgameMessage.textContent = "IT'S A TIE";
        }
        else if (playerScore > computerScore) {
            endgameMessage.textContent = 'YOU WIN';
        }
        else {
            endgameMessage.textContent = 'YOU LOSE';
        }
    }
    endGameUI() {
        this.ui.darkenPlayArea();
        $('.endgame-con').style.display = 'flex';
        $('.endgame-settings').style.animation = `100ms come-in forwards`;
    }
}
