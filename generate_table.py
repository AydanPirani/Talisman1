cells = [10,10]
f = open("table.html", "w")
f.write("<table>")
for x in range (1,+cells[0]):
    f.write("<tr>")
    for y in range (1,1+cells[0]):
        temp = '<td id='+str(x)+","+str(y)+'> <div class="empty"></div> </td>'
        f.write(temp)
    f.write("</tr>")
f.write("</table>")
