import { $ } from "../utils/selectors.js";

export function lightUpLogo(rps: RPS) {
  ($(`#${rps}`) as HTMLElement).classList.add('rps-animation');
  ($(`#${rps}`) as HTMLElement).classList.remove('unlit');
}

export function animate(inOrOut: InOrOut, nameOrColor: NameOrColor) {
  let form = $(`#form-${nameOrColor}`) as HTMLFormElement;
  if (inOrOut === 'in') form.style.animation = '100ms come-in none';
  if (inOrOut === 'out') form.style.animation = '100ms go-out none';
}


export function addLogoGlow(e: MouseEvent) {
  const rps = [...($('.refresh') as HTMLElement).children];

  if (e.currentTarget === $('.refresh')) {
    rps.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
  }
}
export function removeLogoGlow(e: MouseEvent) {
  const rps = [...($('.refresh') as HTMLElement).children];
  if (e.target !== $('.refresh')) {
    rps.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
  }
}
