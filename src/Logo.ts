import { RPS } from "./types/rps.js";
import { InOrOut, NameOrColor } from "./types/thisOrThat.js";
import { $ } from "./selectors.js";

export default class Logo {
  public handleRefresh() {
    location.reload();
  }

  public handleAddGlow(e: MouseEvent) {
    const logoRPSChildren = [...($('.refresh') as HTMLElement).children];

    if (e.currentTarget === $('.refresh')) {
      logoRPSChildren.forEach(rpsEl => rpsEl.classList.add('logo-hover'));
    }
  }
  public handleRemoveGlow(e: MouseEvent) {
    const logoRPSChildren = [...($('.refresh') as HTMLElement).children];

    if (e.target !== $('.refresh')) {
      logoRPSChildren.forEach(rpsEl => rpsEl.classList.remove('logo-hover'));
    }
  }

  public lightUp(rps: RPS) {
    ($(`#${rps}`) as HTMLElement).classList.add('rps-animation');
    ($(`#${rps}`) as HTMLElement).classList.remove('unlit');
  }

}
