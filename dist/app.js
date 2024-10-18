import { $, $$ } from './src/utils/selectors.js';
import { handleNameSubmission } from './src/settings/handleName.js';
import { addLogoGlow, removeLogoGlow } from './src/ui/logo.js';
import { handleColorSubmission } from './src/settings/handleColor.js';
import { handleColorSelection } from './src/settings/handleColor.js';
import { handlePlayAgain } from './src/ui/reset.js';
import { handleChangeColor, handleChangeName } from './src/ui/reset.js';
import { handleGoBack } from './src/ui/reset.js';
import { handleRefresh } from './src/ui/main.js';
import { handleRPS } from './src/Round.js';
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
// rps logo
$('.refresh').addEventListener('click', handleRefresh);
$('.refresh').addEventListener('mouseenter', addLogoGlow, true);
$('.refresh').addEventListener('mouseleave', removeLogoGlow, true);
$('#form-name').addEventListener('submit', function (e) {
    handleNameSubmission(e, game);
});
$('#form-color').addEventListener('submit', function (e) {
    handleColorSubmission(e, game);
});
$$('.color-item-first').forEach(color => color.addEventListener('click', function (e) {
    handleColorSelection(e, game);
}));
$$('.rps-el').forEach(rpsEl => rpsEl.addEventListener('click', function (e) {
    handleRPS(e, game);
}));
$('.play-again').addEventListener('click', function (e) {
    handlePlayAgain(e, game);
});
$('.change-name').addEventListener('click', handleChangeName);
$('.change-color').addEventListener('click', function () {
    handleChangeColor(game);
});
export function generateNameChangeHTML() {
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
    $('.back-btn-name').addEventListener('click', function (e) {
        handleGoBack(e, game);
    });
    $('.play-btn-name').addEventListener('click', function (e) {
        handlePlayAgain(e, game);
    });
}
export function generateColorChangeHTML() {
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
    $('.back-btn-color').addEventListener('click', function (e) {
        handleGoBack(e, game);
    });
    $('.play-btn-color').addEventListener('click', function (e) {
        handlePlayAgain(e, game);
    });
}
