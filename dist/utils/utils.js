export function getRandomColor() {
    const randomColorObj = {
        1: 'red',
        2: 'yellow',
        4: 'purple',
        3: 'green',
        5: 'blue'
    };
    return randomColorObj[`${getRandomNumberUntil(5)}`];
}
export function getRandomNumberUntil(number) {
    return Math.floor(Math.random() * number) + 1;
}
export function checkParent(parent, child) {
    if (parent.contains(child))
        return true;
    return false;
}
