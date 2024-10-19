export function getRandomColor() {
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
  return randomColorObj[`${getRandomNumberUntil(5)}`];
}

export function getRandomNumberUntil(number: number) {
  return Math.floor(Math.random() * number) + 1;
}

export function checkParent(parent: HTMLElement, child: HTMLElement) {
  if (parent.contains(child)) return true;
  return false;
}
