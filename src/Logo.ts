import { RPS } from "./types/rps.js";
import { $ } from "./utils/selectors.js";

export default class Logo {
  private logoEl: HTMLAnchorElement;

  constructor(logoElSelector: string) {
    this.logoEl = $(logoElSelector) as HTMLAnchorElement
    this.attachEventListeners()
  }

  private attachEventListeners() {
    this.logoEl.addEventListener('click', this.handleRefresh);
    this.logoEl.addEventListener('mouseenter', this.handleAddGlow.bind(this), true);
    this.logoEl.addEventListener('mouseleave', this.handleRemoveGlow.bind(this), true);
  }

  private handleRefresh() {
    location.reload();
  }

  private handleAddGlow(e: MouseEvent) {
    const logoRPSChildren = [...this.logoEl.children];

    if (e.currentTarget === this.logoEl) {
      logoRPSChildren.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
    }
  }
  private handleRemoveGlow(e: MouseEvent) {
    const logoRPSChildren = [...this.logoEl.children];

    if (e.target !== this.logoEl) {
      logoRPSChildren.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
    }
  }

  public lightUp(rps: RPS) {
    const rpsEl = $(`#${rps}`) as HTMLElement
    rpsEl.classList.add('rps-animation');
    rpsEl.classList.remove('unlit');
  }

}
