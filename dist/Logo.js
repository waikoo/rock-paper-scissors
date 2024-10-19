import { $ } from "./utils/selectors.js";
export default class Logo {
    constructor(logoElSelector) {
        this.logoEl = $(logoElSelector);
        this.attachEventListeners();
    }
    attachEventListeners() {
        this.logoEl.addEventListener('click', this.handleRefresh);
        this.logoEl.addEventListener('mouseenter', this.handleAddGlow.bind(this), true);
        this.logoEl.addEventListener('mouseleave', this.handleRemoveGlow.bind(this), true);
    }
    handleRefresh() {
        location.reload();
    }
    handleAddGlow(e) {
        const logoRPSChildren = [...this.logoEl.children];
        if (e.currentTarget === this.logoEl) {
            logoRPSChildren.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
        }
    }
    handleRemoveGlow(e) {
        const logoRPSChildren = [...this.logoEl.children];
        if (e.target !== this.logoEl) {
            logoRPSChildren.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
        }
    }
    lightUp(rps) {
        const rpsEl = $(`#${rps}`);
        rpsEl.classList.add('rps-animation');
        rpsEl.classList.remove('unlit');
    }
}
