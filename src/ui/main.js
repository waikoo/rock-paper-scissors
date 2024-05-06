import { $, $$ } from "../utils/selectors.js";
import { resetUI, resetPlayerColor, resetPlayerName } from "./reset.js";


export function animateChange(inOrOut, nameOrColor) {
	console.log('goback triggered name to go right');
	let con = $(`.change-${nameOrColor}-con`);
	if (inOrOut === 'in') {
		con.style.animation = '100ms come-in none';
		$('.change-name-con').style.animation = '100ms go-out none';
	}
	if (inOrOut === 'out') con.style.animation = '100ms go-out none 1';
}

export function animateEndgame(inOrOut) {
	// const endgame = $('.endgame-settings').style
	// inOrOut === 'in'
	//         ? endgame.animation = `100ms come-in ${reverse} 1`
	//        : endgame.animation = `100ms go-out ${reverse} 1`;
	if (inOrOut === 'out') $('.endgame-settings').style.animation = `100ms go-out none 1`;
	if (inOrOut === 'in') $('.endgame-settings').style.animation = `100ms come-in none 1`;
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
