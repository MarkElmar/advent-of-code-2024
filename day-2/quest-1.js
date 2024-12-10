import fs from "fs";
import readline from "node:readline";

const file = fs.createReadStream('./text.txt', 'utf8');
const lines = readline.createInterface({
    input: file,
    crlfDelay: Infinity,
});

const input = [];
for await (const line of lines) {
    input.push(line.split(" ").map(item => +item));
}

function ascending(input, matcher) {
    return matcher < input;
}

function isSafe(row) {
    console.log(row);
    let isAscending = null;
    let previous = null;

    for (let i = 0; i <= row.length - 1; i++) {
        const item = row[i];
        if (previous !== null) {
            if (item === previous) {
                return i;
            }

            if (isAscending === null) {
                isAscending = ascending(item, previous);
            } else if (isAscending && !ascending(item, previous)) {
                return i;
            } else if (!isAscending && ascending(item, previous)) {
                return i;
            }

            if (Math.abs(item - previous) > 3) {
                return i;
            }
        }

        previous = item;
    }

    return true;
}

const safe = [];

for (const row of input) {
    const position = isSafe(row);
    if (position === true) {
        safe.push(row);
    } else {
        row.splice(position, 1)
        console.log(position, row);
        const success = isSafe(row)
        console.log('second try', success);
        if (success === true) {
            safe.push(row);
        }
    }

    console.log('first try', position);
}

console.log(safe.length);

