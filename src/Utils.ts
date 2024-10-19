export default class Utils {

  public getRandomNumberUntil(number: number) {
    return Math.floor(Math.random() * number) + 1;
  }

  public getRandomColor() {
    type RandomColorObj = {
      [key: string]: string
    }

    const randomColorObj: RandomColorObj = {
      1: 'red',
      2: 'yellow',
      4: 'purple',
      3: 'green',
      5: 'blue'
    };
    return randomColorObj[`${this.getRandomNumberUntil(5)}`];
  }

  public checkParent(parent: HTMLElement, child: HTMLElement) {
    if (parent.contains(child)) return true;
    return false;
  }
}
