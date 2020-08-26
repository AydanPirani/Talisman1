import keyboard, time
import numpy as np
from collections import deque

def find_direction():
    key = keyboard.read_key()
    if key in ["up", "w"]:
        return "up"
    elif key in ["down", "s"]:
        return "down"
    elif key in ["left", "a"]:
        return "left"
    elif key in ["right", "d"]:
        return "right"
    else:
        return

def generate_n_moves(n):
    order = deque()
    for i in range(0,n):
        direction = find_direction()
        if direction != "None":
            order.append(direction)
    return order

def move(arr, current_pos, dir):
    temp = arr[current_pos[0]][current_pos[1]]
    if dir == "up":
        arr[current_pos[0]][current_pos[1]] = arr[current_pos[0]-1][current_pos[1]]
        arr[current_pos[0]-1][current_pos[1]] = temp
    elif dir == "down":
        arr[current_pos[0]][current_pos[1]] = arr[current_pos[0]+1][current_pos[1]]
        arr[current_pos[0]+1][current_pos[1]] = temp
    elif dir == "left":
        arr[current_pos[0]][current_pos[1]] = arr[current_pos[0]][current_pos[1]-1]
        arr[current_pos[0]][current_pos[1]-1] = temp
    else:
        arr[current_pos[0]][current_pos[1]] = arr[current_pos[0]][current_pos[1]+1]
        arr[current_pos[0]][current_pos[1]+1] = temp
    return arr

def print_arr(arr):
    print(" " + str(arr)[1:-1])
    print()

arr = np.zeros((7,15))
start_pos = [3,0]
arr[start_pos[0]][start_pos[1]] = 1
print_arr(arr)
move(arr, [3, 0], "right")
print_arr(arr)
