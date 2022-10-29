import { $, $$ } from './utils/selectors.js';
import { makeInvisible, makeVisible } from './utils/toggleUIDisplay.js';
import getRandomNumberUntil from './utils/randomNumberGenerator.js';

// ! name
function handleNameSubmission(e) {
	e.preventDefault();
	lightUpLogo('paper');
	animate('out', 'name');

	setPlayerName();

	setTimeout(() => {
		makeInvisible($('#form-name'));
		makeVisible($('#form-color'));
		animate('in', 'color');
	}, 100);
}
function setPlayerName(name = 'Player') {
	$('#name').value ? (game.name = $('#name').value.trim()) : (game.name = name);
	$('.player-name').textContent = game.name;
}
// ! color
function handleColorSubmission(e) {
	e.preventDefault();

	animateUIAtColorStage();

	setTimeout(() => {
		makeVisible($('.play-page'));
		makeInvisible($('main'));
	}, 100);

	setTimeout(() => {
		$('#form-color').removeEventListener('submit', handleColorSubmission);
		$('#form-color').style.zIndex = '-100';
	}, 3000);
}
function handleColorSelection(e) {
	$$('.color-item-first').forEach(color => {
		if (color === e.target) {
			color.classList.add('selected');
			game.playerColor = e.target.dataset.color;
			game.computerColor = getRandomColor();
		} else {
			color.classList.remove('selected');
		}
	});
	console.log(game.playerColor);
}
function getRandomColor() {
	const randomColorObj = {
		1: 'red',
		2: 'yellow',
		4: 'purple',
		3: 'green',
		5: 'blue'
	};
	return randomColorObj[`${getRandomNumberUntil(5)}`];
}
function loadColoredRPS() {
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO REFACTOR
	if (game.playerColor) {
		game.computerColor = getRandomColor();
	} else {
		game.playerColor = getRandomColor();
	}

	if (!game.computerColor) game.computerColor = getRandomColor();
	while (game.playerColor === game.computerColor) game.computerColor = getRandomColor();
	// if (game.playerColor === game.computerColor) game.computerColor = getRandomColor();
	// TODO: avoid same color being used. here.

	$('.computer-rock').src = `./images/colored/rock-${game.computerColor}.png`;
	$('.computer-paper').src = `./images/colored/paper-${game.computerColor}.png`;
	$('.computer-scissors').src = `./images/colored/scissors-${game.computerColor}.png`;

	$('.rock-img').src = `./images/colored/rock-${game.playerColor}.png`;
	$('.paper-img').src = `./images/colored/paper-${game.playerColor}.png`;
	$('.scissors-img').src = `./images/colored/scissors-${game.playerColor}.png`;
}
function lightUpLogo(rps) {
	$(`#${rps}`).classList.add('rps-animation');
	$(`#${rps}`).classList.remove('unlit');
}
function animateUIAtColorStage() {
	animate('out', 'color');
	loadColoredRPS();
	lightUpLogo('scissors');
	//
	// !$('.player-history-item-1 img').src ? makeInvisible($('main')) : makeVisible($('main'));
	// if smth breaks, these:
	// $('#form-color').classList.remove('disappear');
	// makeInvisible('#form-color');
}
// ! play
function getComputerChoice() {
	const numberToChoiceObj = {
		1: 'rock',
		2: 'paper',
		3: 'scissors'
	};
	return numberToChoiceObj[`${getRandomNumberUntil(3)}`];
}
function incrementScoreFor(aPlayer = 'both') {
	if (aPlayer === 'both') {
		incrementScoreFor('computer');
		incrementScoreFor('player');
	} else {
		game[`${aPlayer}ScoreValue`] += 1;
		$(`.${aPlayer}-score`).textContent = game[`${aPlayer}ScoreValue`];
	}
}

function darkenPlayArea() {
	$('.mid-con').classList.add('low-opacity');
	$$('.block').forEach(item => item.classList.add('low-opacity'));
}
function lightenPlayArea() {
	$('.mid-con').classList.remove('low-opacity');
	$$('.block').forEach(item => item.classList.remove('low-opacity'));
}
function endGameUI() {
	darkenPlayArea();
	$('.endgame-con').style.display = 'flex';
	// animateEndgame('in')
	$('.endgame-settings').style.animation = `100ms come-in forwards`;
	// $('.endgame-settings').style.animation = `100ms come-${inOrOut} forwards`
}
function displayWinner() {
	const playerScore = Number($('.player-score').textContent);
	const computerScore = Number($('.computer-score').textContent);

	if (playerScore === computerScore) {
		$('.endgame-message').textContent = "IT'S A TIE";
	} else if (playerScore > computerScore) {
		$('.endgame-message').textContent = 'YOU WIN';
	} else {
		$('.endgame-message').textContent = 'YOU LOSE';
	}
}
function createEndgameContainer() {
	const endgameCon = document.createElement('div');
	endgameCon.className = 'endgame-con';
	endgameCon.append($('.endgame-settings'));
	$('.play-page').append(endgameCon);
}
function showSettings() {
	// if (game.isFirstGame) game.isFirstGame = false;
	if (!$('.play-page').contains($('.endgame-con'))) createEndgameContainer();
	$('.endgame-con').removeAttribute('style');
	makeVisible($('.endgame-settings'));
	// console.log($('.endgame-settings').style.animation)
	animateEndgame('in');
	// setTimeout(() => $('.endgame-settings').removeAttribute('style'), 100)
	// removeAttribute?
	displayWinner();
	endGameUI();
}

function Round(playerChoice) {
	this.playerChoice = playerChoice;
	this.computerChoice = getComputerChoice();
	this.round = 1;

	this.play = function () {
		// ! rock
		if (this.playerChoice === 'rock' && this.computerChoice === 'paper') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'paper');
			this.showLoser('player', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'scissors') {
			incrementScoreFor('player');
			this.showWinner('player', 'rock');
			this.showLoser('computer', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'rock' && this.computerChoice === 'rock') {
			incrementScoreFor();
			this.showWinner('computer', 'rock');
			this.showWinner('player', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! paper
		if (this.playerChoice === 'paper' && this.computerChoice === 'scissors') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'scissors');
			this.showLoser('player', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'rock') {
			incrementScoreFor('player');
			this.showWinner('player', 'paper');
			this.showLoser('computer', 'rock');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'paper' && this.computerChoice === 'paper') {
			incrementScoreFor();
			this.showWinner('computer', 'paper');
			this.showWinner('player', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		// ! scissors
		if (this.playerChoice === 'scissors' && this.computerChoice === 'paper') {
			incrementScoreFor('player');
			this.showWinner('player', 'scissors');
			this.showLoser('computer', 'paper');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'rock') {
			incrementScoreFor('computer');
			this.showWinner('computer', 'rock');
			this.showLoser('player', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
		if (this.playerChoice === 'scissors' && this.computerChoice === 'scissors') {
			incrementScoreFor();
			this.showWinner('computer', 'scissors');
			this.showWinner('player', 'scissors');
			game.round++;
			if (game.round === 6) showSettings();
		}
	};

	this.showWinner = function (player, rps) {
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-winner.svg`);
	};
	this.showLoser = function (player, rps) {
		$(`.${player}-history-item-${game.round} img`).setAttribute('src', `./images/rock-paper-scissor/${rps}-loser.svg`);
	};
	// this.play = function () {
	// 	if (this.playerChoice === 'rock') this.computerChoice === 'paper' ? incrementScoreFor('computer') : this.computerChoice === 'scissors' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'paper') this.computerChoice === 'scissors' ? incrementScoreFor('computer') : this.computerChoice === 'rock' ? incrementScoreFor('player') : incrementScoreFor();
	// 	if (this.playerChoice === 'scissors') this.computerChoice === 'paper' ? incrementScoreFor('player') : this.computerChoice === 'rock' ? incrementScoreFor('computer') : incrementScoreFor();
	// };
}

function handleRPS({
	target: {
		dataset: { playerChoice }
	}
}) {
	new Round(playerChoice).play();
}

function handleRefresh() {
	location.reload();
}
function addLogoGlow(e) {
	const rps = [...$('.refresh').children];

	if (e.currentTarget === $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
	}
}
function removeLogoGlow(e) {
	const rps = [...$('.refresh').children];
	if (e.target !== $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
	}
}

const game = {
	name: null,
	playerColor: null,
	computerColor: null,
	computerScoreValue: 0,
	playerScoreValue: 0,
	round: 1,
	isFirstGame: true,
	isColorChanged: false
};

$('.refresh').addEventListener('click', handleRefresh);
$('#form-name').addEventListener('submit', handleNameSubmission);
$('#form-color').addEventListener('submit', handleColorSubmission);
$$('.color-item-first').forEach(color => color.addEventListener('click', handleColorSelection));
$('.refresh').addEventListener('mouseenter', addLogoGlow, true);
$('.refresh').addEventListener('mouseleave', removeLogoGlow, true);

$$('.rps-el').forEach(rpsEl => rpsEl.addEventListener('click', handleRPS));

$('.play-again').addEventListener('click', handlePlayAgain);
$('.change-name').addEventListener('click', handleChangeName);
$('.change-color').addEventListener('click', handleChangeColor);

function resetUI() {
	resetParts();
	resetScore();
	resetHistory();
	resetComputerColor();
}

function resetPlayerName() {
	let newName = $('#name-change').value;
	game.name = newName ? newName : 'PLAYER';
	$('.player-name').textContent = game.name;
}

function resetPlayerColor() {
	makeInvisible($('.change-color-con'));
	$('.change-color-con').style.display = 'none';
}

function handlePlayAgain(e) {
	e.preventDefault();
	if (e.target === $('.play-btn-name')) resetPlayerName();
	if (e.target === $('.play-btn-color')) resetPlayerColor();
	game.isFirstGame = false;
	resetUI();
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

function resetScore() {
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

function resetComputerColor() {
	getNewComputerColor();
	loadColoredRPS();
}

function getNewComputerColor() {
	const oldColor = game.computerColor;
	let newColor = getRandomColor();
	while (newColor === oldColor) {
		newColor = getRandomColor();
	}
	game.computerColor = newColor;
}

function generateNameChangeHTML() {
	const nameDiv = document.createElement('div');
	nameDiv.className = 'change-name-con';

	$('.play-page').append(nameDiv);
	nameDiv.innerHTML = /*html*/ `
  <form
    class="input-form"
  >
    <label
      for="name-change"
      class="input-label"
    >Enter your name
    </label>
    <div class="name-input-text">
      <div class="input-small-con">
        <input
          type="text"
          name="name-change"
          id="name-change"
          maxlength="8"
          placeholder="PLAYER"
          spellcheck="false"
        >
        <small>Maximum 8 Characters</small>
      </div>
      <div class="change-btn-con">
        <button class="back-btn-name btn">Back</button>
        <button
          class="btn play-btn-name">
          Play
        </button>
      </div>
    </div>
  </form>`;
	$('.back-btn-name').addEventListener('click', handleGoBack);
	$('.play-btn-name').addEventListener('click', handlePlayAgain);
}

function handleChangeName() {
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

function handleChangeColor() {
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
		item.addEventListener('click', duplicateHandleColorSelection);
	});

	loadColoredRPS();
	animateChange('in', 'name');
}

function checkParent(parent, child) {
	if (parent.contains(child)) return true;
	return false;
}

function duplicateHandleColorSelection(e) {
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

function generateColorChangeHTML() {
	const nameDiv = document.createElement('div');
	nameDiv.className = 'change-color-con';

	$('.play-page').append(nameDiv);
	nameDiv.innerHTML = /*html*/ `
  <form
      id="color-change"
      class="input-form"
    >
      <label
        for="color"
        class="input-label"
      >Choose Your Color</label>
      <div class="color-btn-con">
        <div class="color-con">
          <img
            src="images/player-color/red.png"
            alt="red"
            data-color="red"
            class="change-color-item"
          >
          <img
            src="images/player-color/yellow.png"
            alt="yellow"
            data-color="yellow"
            class="change-color-item"
          >
          <img
            src="images/player-color/purple.png"
            alt="purple"
            data-color="purple"
            class="change-color-item"
          >
          <img
            src="images/player-color/green.png"
            alt="green"
            data-color="green"
            class="change-color-item"
          >
          <img
            src="images/player-color/blue.png"
            alt="blue"
            data-color="blue"
            class="change-color-item"
          >
        </div>
        <div class="change-btn-con">
          <button class="back-btn-color btn">Back</button>
          <button
            id="color-btn"
            class="btn play-btn-color"
          >Play</button>
      </div>
    </form>
  `;

	$('.back-btn-color').addEventListener('click', handleGoBack);
	$('.play-btn-color').addEventListener('click', handlePlayAgain);
}
function handleGoBack(e) {
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

function animate(inOrOut, nameOrColor) {
	let form = $(`#form-${nameOrColor}`);
	if (inOrOut === 'in') form.style.animation = '100ms come-in none';
	if (inOrOut === 'out') form.style.animation = '100ms go-out none';
}

function animateChange(inOrOut, nameOrColor) {
	console.log('goback triggered name to go right');
	let con = $(`.change-${nameOrColor}-con`);
	if (inOrOut === 'in') {
		con.style.animation = '100ms come-in none';
		$('.change-name-con').style.animation = '100ms go-out none';
	}
	if (inOrOut === 'out') con.style.animation = '100ms go-out none 1';
}

function animateEndgame(inOrOut) {
	// const endgame = $('.endgame-settings').style
	// inOrOut === 'in'
	//         ? endgame.animation = `100ms come-in ${reverse} 1`
	//        : endgame.animation = `100ms go-out ${reverse} 1`;
	if (inOrOut === 'out') $('.endgame-settings').style.animation = `100ms go-out none 1`;
	if (inOrOut === 'in') $('.endgame-settings').style.animation = `100ms come-in none 1`;
	if (inOrOut === 'in-left') {
		$('.endgame-settings').style.animation = `100ms come-in-left none 1`;
	}
	console.log();
}
