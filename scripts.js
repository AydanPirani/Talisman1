x_cells = screen.width/30
y_cells = screen.height/30
generate_table(x_cells, y_cells)

x = 1;
y = Math.round(y_cells/2);
document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>'

document.onkeydown = check_key;


function generate_table(x,y) {
  var temp = "<table>";
  for (var i=1; i < y+1; i++) {
    temp += "<tr>"
    for (var j=1; j < x+1; j++) {
      temp += '<td id='+j+","+i+'> <div class="empty"></div> </td>'
    }
    temp += "</tr>"
  }
  document.getElementById("table").innerHTML = temp + "</table>"
  console.log(temp)
}

//Event Listeners to check which keys were presseed
function check_key(event) {
  document.getElementById(x + "," + y).innerHTML = '<div class="empty"></div>'
  event = event || window.event;
  if (event.keyCode == '38') {
    //up
    y -= 1
    if (document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>') {
      //hit wall
      console.log("wall!")
    }

  } else if (event.keyCode == '40') {
    //down
    y += 1
    if (document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>') {
      //hit wall
      console.log("wall!")
    }

  } else if (event.keyCode == '37') {
    //left
    x -= 1
    if (document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>') {
      //hit wall
      console.log("wall!")
    }

  } else if (event.keyCode == '39') {
    //right
    x += 1
    if (document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>') {
      //hit wall
      console.log("wall!")
    }

  }
  document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>'
  console.log(x+","+y)
}

function randomize() {
  console.log("to be randomized")
  change_to_wall(1, 1)
}

function change_to_wall(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="wall"></div>';
}

function change_to_empty(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="empty"></div>';
}
