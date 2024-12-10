import fs from 'fs';
import * as readline from "node:readline";

const file = fs.createReadStream('./input.txt', 'utf8');
const lines = readline.createInterface({
    input: file,
    crlfDelay: Infinity,
});

const array_1 = [];
const array_2 = [];

for await (const line of lines) {
    const split_lines = line.split('   ');
    array_1.push(+split_lines[0]);
    array_2.push(+split_lines[1]);
}

let distance = 0;

for (const item of array_1) {
    const found = array_2.filter(number => number === item);
    distance += item * found.length;
}

console.log(distance);