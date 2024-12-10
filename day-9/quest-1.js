import fs from "fs";
import readline from "node:readline";

let input = '2333133121414131402';

const file = fs.createReadStream('./input.txt', 'utf8');
const lines = readline.createInterface({
    input: file,
    crlfDelay: Infinity,
});


/**
 * @param denseDisk string
 * @return Array<number>
 */
const formatDiskMap = (denseDisk) => {
    let current = 0;
    const splitDisk = denseDisk.split('');
    const result = [];
    splitDisk.map(Number).forEach((disk, index) => {
        if (index % 2 === 0) {
            for (let i = 0; i < disk; i++) {
                result.push(current);
            }
            current++
        } else {
            for (let i = 0; i < disk; i++) {
                result.push('.');
            }
        }
    });

    return result;
}

/**
 * @param input number[]
 * @return number[]
 */
const hardClearEmptySpace = (input) => {
    while (true) {
        const index = input.indexOf('.');
        if (index === -1) return input;
        const test = [...input]
        if (test.splice(index, test.length).every((value) => value === '.')) return test;
        input[index] = input.pop();
    }
};

const softClearEmptySpace = (input) => {
    let current = input[input.length - 1];
    while (current > 0) {
        const start = input.indexOf(current);
        const end = input.lastIndexOf(current);

        const length = end - start + 1;

        const spot = findSpot(input, length);

        if (spot !== -1 && spot < start) {
            for (let i = 0; i < length; i++) {
                input[spot + i] = current;
            }
            input.splice(start, length, ...Array(length).fill('.'));
        }

        current--;
    }

    return input
}

const findSpot = (map, length) => {
    let position = -1;
    let foundLength = 0;

    for (const [index, item] of map.entries()) {
        if (foundLength === length) return position;
        if (item !== '.') {
            position = -1;
            foundLength = 0;
            continue;
        }

        if (position === -1) {
            position = index;
        }
        foundLength++;
    }

    return -1;
}


/**
 * @param input number[]
 * @return number
 */
const calcResult = (input) => {
    return input.reduce(
        (acc, current, index) => current === '.' ? acc : acc + current * index, 0
    );
}


for await (const line of lines) {
    input = line;
}

const map = formatDiskMap(input);
const hardClearOutput = hardClearEmptySpace([...map]);
const softClearOutput = softClearEmptySpace([...map]);
const resultHardFill = calcResult(hardClearOutput);
const resultSoftFill = calcResult(softClearOutput);
console.log("Hard fill: ", resultHardFill);
console.log("Soft fill: ", resultSoftFill);