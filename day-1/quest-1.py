list_1 = []
list_2 = []

with open('input.txt') as f:
    for line in f.read().splitlines():
        split_lines = line.split('   ')
        list_1.append(int(split_lines[0]))
        list_2.append(int(split_lines[1]))

sorted_1 = sorted(list_1)
sorted_2 = sorted(list_2)

distance = 0

for index in range(len(sorted_1)):
    distance += abs(sorted_1[index] - sorted_2[index])

print(distance)
