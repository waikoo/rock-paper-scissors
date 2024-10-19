export default class Utils {
    getRandomNumberUntil(number) {
        return Math.floor(Math.random() * number) + 1;
    }
    getRandomColor() {
        const randomColorObj = {
            1: 'red',
            2: 'yellow',
            4: 'purple',
            3: 'green',
            5: 'blue'
        };
        return randomColorObj[`${this.getRandomNumberUntil(5)}`];
    }
    checkParent(parent, child) {
        if (parent.contains(child))
            return true;
        return false;
    }
}
