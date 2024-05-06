import { $, $$ } from "../utils/selectors.js";
import { lightenPlayArea } from "./main.js";
import { makeInvisible, makeVisible } from "./toggleUIDisplay.js";
import { getRandomColor } from "../settings/handleColor.js";
import { loadColoredRPS } from "../settings/handleColor.js";
import { animateEndgame, animateChange } from "./main.js";
import { generateColorChangeHTML, generateNameChangeHTML } from "../../app.js";

export function handlePlayAgain(e, game) {
	e.preventDefault();
	if (e.target === $('.play-btn-name')) resetPlayerName(game);
	if (e.target === $('.play-btn-color')) resetPlayerColor();
	game.isFirstGame = false;
	resetUI(game);
}

export function handleChangeName() {
	animateEndgame('out');
	setTimeout(() => {
		makeInvisible($('main'));
		makeInvisible($('.endgame-settings'));
		$('.endgame-con').style.display = 'none';
		$('.endgame-settings').style.animation = '';
	}, 100);

	if (!checkParent($('.play-page'), $('.change-name-con'))) {
		generateNameChangeHTML();
	} else {
		$('.change-name-con').style.display = 'flex';
		makeVisible($('.change-name-con'));
	}

	if ($('.play-page').lastChild !== $('.change-name-con')) {
		$('.play-page').append($('.change-name-con'));
	}
	animateChange('in', 'name');
	animateEndgame('out');
}

export function handleChangeColor(game) {
	animateEndgame('out');
	setTimeout(() => {
		makeInvisible($('main'));
		makeInvisible($('.endgame-settings'));
		$('.endgame-con').style.display = 'none';
	});

	game.isColorChanged = true;

	if (!checkParent($('.play-page'), $('.change-color-con'))) {
		generateColorChangeHTML();
	} else {
		$('.change-color-con').style.display = 'flex';
		makeVisible($('.change-color-con'));
	}

	[...$$('.change-color-item')].forEach(item => {
		item.addEventListener('click', function(e) {
            duplicateHandleColorSelection(e, game)
        });
	});

	loadColoredRPS(game);
	animateChange('in', 'name');
}
export function resetUI(game) {
	resetParts();
	resetScore(game);
	resetHistory();
	resetComputerColor(game);
}


function getNewComputerColor(game) {
	const oldColor = game.computerColor;
	let newColor = getRandomColor();
	while (newColor === oldColor) {
		newColor = getRandomColor();
	}
	game.computerColor = newColor;
}

function resetComputerColor(game) {
	getNewComputerColor(game);
	loadColoredRPS(game);
}

export function resetPlayerName(game) {
	let newName = $('#name-change').value;
	game.name = newName ? newName : 'PLAYER';
	$('.player-name').textContent = game.name;
}

export function resetPlayerColor() {
	makeInvisible($('.change-color-con'));
	$('.change-color-con').style.display = 'none';
}

function resetParts() {
	// $('.play-page').classList.remove('play-page-end');
	document.body.classList.remove('body-end');
	$('main').classList.remove('main-end');
	$('.endgame-settings').classList.remove('endgame-settings-end');

	lightenPlayArea();
	makeInvisible($('main'));
	makeInvisible($('.endgame-settings'));
	if ($('.change-name-con')) {
		makeInvisible($('.change-name-con'));
		$('.change-name-con').style.display = 'none';
	}
	$('.endgame-con').style.display = 'none';
	makeInvisible($('.endgame-con'));
	$('.endgame-con').style.zIndex = '-5';
}

function resetScore(game) {
	$('.player-score').textContent = 0;
	$('.computer-score').textContent = 0;

	game.playerScoreValue = 0;
	game.computerScoreValue = 0;

	game.round = 1;
}

function resetHistory() {
	for (let n = 1; n < 6; n++) {
		$(`.player-history-item-${n} img`).removeAttribute('src');
		$(`.computer-history-item-${n} img`).removeAttribute('src');
	}
}

export function handleGoBack(e, game) {
	e.preventDefault();

	game.isColorChanged = false;

	if (checkParent($('.play-page'), $('.change-name-con'))) {
		animateChange('out', 'name');
		animateEndgame('in-left');
		// ($('.change-name-con').style.display = 'none')
	}
	if (checkParent($('.play-page'), $('.change-color-con'))) {
		$('.change-color-con').style.display = 'none';
	}

	setTimeout(() => {
		handleGoBackUI();
	}, 100);
	// animateEndgame('in', 'reverse')
}

function handleGoBackUI() {
	makeVisible($('.endgame-con'));
	$('.endgame-con').style.display = 'flex';

	makeVisible($('.endgame-settings')); // no work
	$('.endgame-settings').style.animation = '';
	$('.endgame-settings').style.display = 'block';
	$('.change-name-con').style.animation = '100ms come-in-left forwards 1';
	// $('.endgame-settings').style.animation = '100ms come-in-left forwards 1'
	setTimeout(() => {
		$('.change-name-con').style.display = 'none';
	}, 100);
}


function checkParent(parent, child) {
	if (parent.contains(child)) return true;
	return false;
}

function duplicateHandleColorSelection(e, game) {
	$$('.change-color-item').forEach(color => {
		if (color === e.target) {
			color.classList.add('selected');
			game.playerColor = e.target.dataset.color;
			game.computerColor = getRandomColor();
		} else {
			color.classList.remove('selected');
		}
	});
}

