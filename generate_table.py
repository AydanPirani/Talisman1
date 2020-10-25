temp = ""
for i in range(-2,3):
    s = "-"+str(abs(i)) if i < 0 else "+"+str(i)
    temp += "is_wall(y_coord"+s+",2)&&is_wall(y_coord"+s+",3)||"

print(temp)
