import { $, $$ } from './src/utils/selectors.js';
import { handleNameSubmission } from './src/settings/handleName.js';
import { addLogoGlow, removeLogoGlow } from './src/ui/logo.js';
import { handleColorSubmission } from './src/settings/handleColor.js';
import { handleColorSelection } from './src/settings/handleColor.js'
import { handlePlayAgain } from './src/ui/reset.js';
import { handleChangeColor, handleChangeName } from './src/ui/reset.js';
import { handleGoBack } from './src/ui/reset.js';
import { handleRefresh } from './src/ui/main.js';
import { handleRPS } from './src/Round.js';

const game: Game = {
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
($('.refresh') as HTMLElement).addEventListener('click', handleRefresh);
($('.refresh') as HTMLElement).addEventListener('mouseenter', addLogoGlow, true);
($('.refresh') as HTMLElement).addEventListener('mouseleave', removeLogoGlow, true);


($('#form-name') as HTMLElement).addEventListener('submit', function(e: SubmitEvent) {
  handleNameSubmission(e, game)
});
($('#form-color') as HTMLFormElement).addEventListener('submit', function(e: SubmitEvent) {
  handleColorSubmission(e, game)

});
$$('.color-item-first').forEach(color => (color as HTMLElement).addEventListener('click', function(e: MouseEvent) {
  handleColorSelection(e, game)
}));

$$('.rps-el').forEach(rpsEl => (rpsEl as HTMLImageElement).addEventListener('click', function(e: MouseEvent) {
  handleRPS(e, game)
}));

($('.play-again') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
  handlePlayAgain(e, game)
});
($('.change-name') as HTMLElement).addEventListener('click', handleChangeName);
($('.change-color') as HTMLElement).addEventListener('click', function() {
  handleChangeColor(game)
});

export function generateNameChangeHTML() {
  const nameDiv = document.createElement('div');
  nameDiv.className = 'change-name-con';

  ($('.play-page') as HTMLElement).append(nameDiv);
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
  ($('.back-btn-name') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
    handleGoBack(e, game)
  });
  ($('.play-btn-name') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
    handlePlayAgain(e, game)
  });
}

export function generateColorChangeHTML() {
  const nameDiv = document.createElement('div');
  nameDiv.className = 'change-color-con';

  ($('.play-page') as HTMLElement).append(nameDiv);
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

  ($('.back-btn-color') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
    handleGoBack(e, game)
  });
  ($('.play-btn-color') as HTMLElement).addEventListener('click', function(e: MouseEvent) {
    handlePlayAgain(e, game)
  });
}
