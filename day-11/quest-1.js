const input = [8793800, 1629, 65, 5, 960, 0, 138983, 85629];

/**
 * @param row number[]
 */
const singleBlink = (row) => {
    if (!row.length) return [];

    /** @var output number[] */
    let output = [];
    const item = row.shift()

    if (item === 0) {
        output.push(1);
    } else if (item.toString().length % 2 === 0) {
        output.push(Number(item.toString().substring(0, item.toString().length / 2)));
        output.push(Number(item.toString().substring(item.toString().length / 2, item.toString().length)));
    } else {
        output.push(item * 2024);
    }

    return [...output].concat(singleBlink(row));
}

/**
 * Blink
 *
 * @param row number[]
 * @param count number
 */
const blink = (row, count) => {
    console.log("Blinkt:", Math.abs(count - 25))
    if (count === 0) return row;

    row = singleBlink(row);

    return blink(row, count - 1);
};

const result = blink(input, 25);

console.log(result.length);