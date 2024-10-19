import { $ } from "./selectors.js";
export default class Logo {
    handleRefresh() {
        location.reload();
    }
    handleAddGlow(e) {
        const logoRPSChildren = [...$('.refresh').children];
        if (e.currentTarget === $('.refresh')) {
            logoRPSChildren.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
        }
    }
    handleRemoveGlow(e) {
        const logoRPSChildren = [...$('.refresh').children];
        if (e.target !== $('.refresh')) {
            logoRPSChildren.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
        }
    }
    lightUp(rps) {
        $(`#${rps}`).classList.add('rps-animation');
        $(`#${rps}`).classList.remove('unlit');
    }
}
