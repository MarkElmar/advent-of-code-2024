import fs from "fs";
import readline from "node:readline";

const file = fs.createReadStream('./input.txt', 'utf8');
const lines = readline.createInterface({
    input: file,
    crlfDelay: Infinity,
});

const trail = [];
for await (const line of lines) {
    trail.push(line.split('').map(Number));
}

const trailheads = [];

const searchNextNumber = (trail, [x, y], peaks = []) => {
    const current = trail[x][y];
    let count = 0;
    if (trail[x][y] === 9 && !peaks.some(([xItem, yItem]) => x === xItem && y === yItem)) {
        console.log('found peak');
        peaks.push([x, y]);
        return [1, peaks]
    }

    if (trail?.[x + 1]?.[y] === current + 1) {
        console.log('found item downwards', current, peaks);
        const [found, foundPeaks] = searchNextNumber(trail, [x + 1, y], peaks);
        count += found;
        peaks = foundPeaks;
    }

    if (trail?.[x - 1]?.[y] === current + 1) {
        console.log('found item upwards', current, peaks)
        const [found, foundPeaks] = searchNextNumber(trail, [x - 1, y], peaks);
        count += found;
        peaks = foundPeaks;

    }

    if (trail?.[x]?.[y + 1] === current + 1) {
        console.log('found item rightwards', current, peaks)
        const [found, foundPeaks] = searchNextNumber(trail, [x, y + 1], peaks);
        count += found;
        peaks = foundPeaks;

    }

    if (trail?.[x]?.[y - 1] === current + 1) {
        console.log('found item leftwards', current, peaks)
        const [found, foundPeaks] = searchNextNumber(trail, [x, y - 1], peaks);
        count += found;
        peaks = foundPeaks;

    }

    return [count, peaks];
}

trail.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
        if (cell === 0) {
            trailheads.push([rowIndex, cellIndex]);
        }
    });
});

let count = 0;
console.log("Trailheads:", trailheads.length);
trailheads.forEach(([x, y]) => {
    const [value, peaks] = searchNextNumber(trail, [x, y])
    count += value;
});

console.log("result is:", count);

