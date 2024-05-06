import { $ } from "../utils/selectors.js";

export function lightUpLogo(rps) {
	$(`#${rps}`).classList.add('rps-animation');
	$(`#${rps}`).classList.remove('unlit');
}

export function animate(inOrOut, nameOrColor) {
	let form = $(`#form-${nameOrColor}`);
	if (inOrOut === 'in') form.style.animation = '100ms come-in none';
	if (inOrOut === 'out') form.style.animation = '100ms go-out none';
}


export function addLogoGlow(e) {
	const rps = [...$('.refresh').children];

	if (e.currentTarget === $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
	}
}
export function removeLogoGlow(e) {
	const rps = [...$('.refresh').children];
	if (e.target !== $('.refresh')) {
		rps.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
	}
}