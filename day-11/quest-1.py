values = {8793800: 1, 1629: 1, 65: 1, 5: 1, 960: 1, 0: 1, 138983: 1, 85629: 1}
# values = {125: 1, 17: 1}


def get_blink_value(value: int, amount: int) -> list[int]:
    if value == 0:
        return [1]
    if len(str(value)) % 2 == 0:
        full_string_value = str(value)
        return [
            int(full_string_value[0:int(len(full_string_value) / 2)]),
            int(full_string_value[int(len(full_string_value) / 2):len(full_string_value)]),
        ]
    return [value * 2024]


def main():
    row = values.copy()
    for i in range(75):
        new_rows = row.copy()
        for value, amount in row.items():
            results = get_blink_value(value, amount)
            for item in results:
                if new_rows.get(item):
                    new_rows[item] += amount
                else:
                    new_rows[item] = amount
            new_rows[value] -= amount
        row = new_rows.copy()

    total = 0
    for amount in row.values():
        total += amount
    print(total)


if __name__ == '__main__':
    main()
