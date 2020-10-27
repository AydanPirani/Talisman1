x_cells = Math.round(screen.width / 30)
y_cells = Math.round(screen.height / 30)
randomize();

x = 1;
y = Math.round(y_cells / 2);
move(x, y)

document.onkeydown = check_key;

//Event Listeners to check which keys were pressed
function check_key(event) {
  t = document.getElementById("change")
  n_x = x
  n_y = y

  event = event || window.event;
  if (event.keyCode == '38') { //up
    n_y -= 1
  } else if (event.keyCode == '40') { //down
    n_y += 1
  } else if (event.keyCode == '37') { //left
    n_x -= 1
  } else if (event.keyCode == '39') { //right
    n_x += 1
  }

  if (document.getElementById(n_x + "," + n_y).innerHTML == '<div class="wall"></div>') {
    //hit wall
    t.className = "shake-hard shake-constant";
    setTimeout(function() {
      t.className = "none";
    }, 500);
  } else {
    change_to_empty(x, y)
    move(n_x, n_y)
    x = n_x;
    y = n_y;
  }

}

function randomize() {
  x = 1;
  y = Math.round(y_cells / 2);
  generate_table(x_cells, y_cells)
  generate_walls([1, y_cells], [x_cells, 1])
}

function generate_table(x, y) {
  var temp = "<table>";
  var c = "empty"
  for (var i = 1; i < y + 1; i++) {
    temp += "<tr>"
    for (var j = 1; j < x + 1; j++) {
      if (j == 1 || j == x || i == 1 || i == y) {
        c = "wall"
      } else {
        c = "empty"
      }
      temp += '<td id=' + j + "," + i + '><div class="' + c + '"></div></td>'
    }
    temp += "</tr>"
  }
  document.getElementById("table").innerHTML = temp + "</table>"
}

function generate_walls(LL, UR) {
  // console.log(LL + "\n" + UR)
  x_l = Math.abs(LL[0] - UR[0])
  y_l = Math.abs(LL[1] - UR[1])

  x_coord = Math.round(x_l * Math.random()) + LL[0]
  y_coord = Math.round(y_l * Math.random()) + UR[1]

  x_c = x_coord>2&&Math.abs(x_coord - LL[0]) > 2 && Math.abs(x_coord - UR[0]) > 2
  y_c = y_coord!=13&&Math.abs(y_coord - LL[1]) > 2 && Math.abs(y_coord - UR[1]) > 2

  //Changes a whole row to a wall
  if (x_c) {
    for (var i = UR[1]; i < LL[1]; i++) {
      change_to_wall(x_coord, i)
    }
  }

  //Changes a whole column to a wall
  if (y_c) {
    for (var i = LL[0]; i < UR[0]; i++) {
      change_to_wall(i, y_coord)
    }
  }

  if (x_c && y_c) {
    console.log("A")
    generate_walls([LL[0], y_coord],[x_coord,UR[1]])
    generate_walls(LL,[x_coord, y_coord])
    generate_walls([x_coord, y_coord],UR)
    generate_walls([x_coord, LL[1]],[UR[0], y_coord])
  } else if (x_c) {
    console.log("B")
    generate_walls(LL,[x_coord, UR[1]])
    generate_walls([x_coord, LL[1]],UR)
  } else if (y_c) {
    console.log("C")
    generate_walls([LL[0],y_coord],UR)
    generate_walls(LL,[UR[0],y_coord])
  }


  // console.log(x_coord + "," + y_coord)
}


function is_wall(x, y) {
  console.log(x + "," + y)
  return document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>';
}


function change_to_wall(x, y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="wall"></div>';
}

function change_to_empty(x, y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="empty"></div>';
}

function move(x, y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>';
}
