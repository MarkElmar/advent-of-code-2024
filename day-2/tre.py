def getList(file_path):
    with open(file_path, 'r') as bestand:
        return [list(map(int, line.split())) for line in bestand]


def is_strictly_increasing(line):
    return all(line[i] < line[i + 1] for i in range(len(line) - 1))


def is_strictly_decreasing(line):
    return all(line[i] > line[i + 1] for i in range(len(line) - 1))


def has_valid_steps(line):
    return all(1 <= abs(line[i] - line[i + 1]) <= 3 for i in range(len(line) - 1))


def is_safe_sequence(line):
    return (is_strictly_increasing(line) or is_strictly_decreasing(line)) and has_valid_steps(line)


def try_remove_and_check(seq):
    # Try removing each element and check if it becomes safe
    for i in range(len(seq)):
        modified_seq = seq[:i] + seq[i + 1:]  # Remove element at index i
        if is_safe_sequence(modified_seq):
            return True
    return False


def second_change(line):
    print("Processing line:", line)
    if is_safe_sequence(line):
        return True  # Already safe, no need to modify

    # Try removing one element and check if the sequence becomes safe
    if try_remove_and_check(line):
        print("Sequence can be made safe by removing one level.")
        return True

    return False


if __name__ == "__main__":
    file_path = 'input.txt'
    data_list = getList(file_path)

    valid_lines = []
    invalid_lines = []
    invalid_valid_lines = []

    for line in data_list:
        print("Processing next line:")
        # Check if the sequence is already valid
        if is_safe_sequence(line):
            valid_lines.append(line)
        else:
            invalid_lines.append(line)
            # Check if removing one element can make the sequence valid
            if second_change(line):
                invalid_valid_lines.append(line)

    print(f"Valid lines count: {len(valid_lines)}")
    print(f"Invalid lines count: {len(invalid_lines)}")
    print(f"Invalid valid lines count: {len(invalid_valid_lines)}")
    print(f'Answer = {len(valid_lines) + len(invalid_valid_lines)}')
    print(f"Total lines processed: {len(valid_lines) + len(invalid_lines)}")