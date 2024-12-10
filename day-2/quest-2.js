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

let isAscending = null;

const ascending = (input, matcher) => {
    return matcher < input;
}


const matchesRules = (row) => {
    const previous = row[0];
    const current = row[1];

    if (previous === current) {
        return false;
    }
    if (isAscending === null) {
        isAscending = ascending(current, previous);
    }

    if (isAscending && !ascending(current, previous)) {
        return false
    }
    if (!isAscending && ascending(current, previous)) {
        return false
    }

    return !(Math.abs(current - previous) > 3);
}

const isSafe = (row, failed = false) => {
    console.log(row);

    if (row.length <= 1) return true;
    if (failed && !matchesRules([...row])) {
        return false;
    }

    const isMatching = matchesRules(row);

    if (!isMatching) {
        row = row.filter((item, index) => index !== 1);
        console.log('didnt', row);
        if (!matchesRules(row)) {
            console.log('failed after second chance')
            return false;
        }
    }

    const item = [...row];
    return isSafe(item.slice(1, item.length), !failed ?? matchesRules(row));
}

const safe = [];
for (const row of input) {
    isAscending = null;
    isSafe(row) ? safe.push(row) : console.log('failed', row);
}

console.log(safe.length);