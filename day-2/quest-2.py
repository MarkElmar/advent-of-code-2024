rows = []

with open('text.txt') as f:
    for line in f.read().splitlines():
        split_lines = line.split(' ')
        rows.append(list(map(int, split_lines)))


def meets_criteria(number_row: list, is_ascending: bool | None = None) -> (bool, bool):
    if is_ascending is None:
        is_ascending = number_row[0] < number_row[1]

    if (is_ascending and number_row[0] > number_row[1]
            or not is_ascending and number_row[0] < number_row[1]):
        return False, is_ascending

    if abs(number_row[0] - number_row[1]) > 3:
        return False, is_ascending

    if number_row[0] == number_row[1]:
        return False, is_ascending

    return True, is_ascending


def is_safe(number_row: list, initial: bool, is_ascending: bool | None = None, failed: bool = False) -> bool:
    if len(number_row) == 1:
        return True

    is_correct, is_ascending = meets_criteria(number_row, is_ascending)

    if failed and not is_correct:
        return False

    if not is_correct:
        failed = True

    temp = number_row.copy()
    temp.pop(0)

    if len(temp) > 2:
        print('first incorrect', temp, number_row)
        is_correct, is_ascending = meets_criteria(temp, is_ascending)

        if not is_correct:
            number_row.pop(1)
            is_valid, is_ascending = meets_criteria(number_row, is_ascending)

            if not is_valid and initial:
                is_ascending = None
            elif not is_valid:
                return False
            temp = number_row

    return is_safe(temp, is_ascending=is_ascending, failed=failed, initial=False)


safes = []
for row in rows:
    result = is_safe(row.copy(), True)
    if result:
        safes.append(row)
    print("is_safe:", result, row)

print(len(safes))
print(safes)
