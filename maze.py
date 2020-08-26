import keyboard, time
from multiprocessing import Pool

key = keyboard.read_key()

if key in ["up", "w"]:
    print("move up")
elif key in ["down", "s"]:
    print("move down")
elif key in ["left", "a"]:
    print("move left")
elif key in ["right", "d"]:
    print("move right")
