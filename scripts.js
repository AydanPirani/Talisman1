x_cells = Math.round(screen.width / 30)
y_cells = Math.round(screen.height / 30)
randomize();

x = 1;
y = Math.round(y_cells / 2);
move(x,y)

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
    setTimeout(function(){ t.className = "none"; }, 500);
  } else {
    change_to_empty(x,y)
    move(n_x,n_y)
    x = n_x;
    y = n_y;
  }

}

function randomize(){
  x = 1;
  y = Math.round(y_cells / 2);
  generate_table(x_cells, y_cells)
  generate_walls([0,y_cells],[x_cells,0])
}

function generate_table(x, y) {
  var temp = "<table>";
  var c = "empty"
  for (var i = 1; i < y + 1; i++) {
    temp += "<tr>"
    for (var j = 1; j < x + 1; j++) {
      if (j == 1 || j == x || i == 1 || i == y){
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
  x_l = Math.abs(LL[0]-UR[0])
  y_l = Math.abs(LL[1]-UR[1])

  x_coord = Math.round(x_l * Math.random())
  while (x_coord<3||x_coord>x_cells-3||is_wall(x_coord-2,2)&&is_wall(x_coord-2,3)||is_wall(x_coord-1,2)&&is_wall(x_coord-1,3)||is_wall(x_coord+0,2)&&is_wall(x_coord+0,3)||is_wall(x_coord+1,2)&&is_wall(x_coord+1,3)||is_wall(x_coord+2,2)&&is_wall(x_coord+2,3)) {
    x_coord = Math.round(x_l * Math.random())
  }
  x_coord += LL[0]

  y_coord = Math.round(y_l * Math.random())
  while (y_coord<3||y_coord>y_cells-3||is_wall(y_coord-2,2)&&is_wall(y_coord-2,3)||is_wall(y_coord-1,2)&&is_wall(y_coord-1,3)||is_wall(y_coord+0,2)&&is_wall(y_coord+0,3)||is_wall(y_coord+1,2)&&is_wall(y_coord+1,3)||is_wall(y_coord+2,2)&&is_wall(y_coord+2,3)) {
    y_coord = Math.round(y_l * Math.random())
  }
  y_coord += LL[0]


  //Changes a whole column to a wall
  for (var i = 1; i < y_cells; i++) {
    change_to_wall(x_coord,i)
  }

  //Changes a whole row to a wall
  for (var i = 1; i < x_cells; i++) {
    change_to_wall(i,y_coord)
  }

}

function is_wall(x, y) {
  return document.getElementById(x + "," + y).innerHTML == '<div class="wall"></div>';
}


function change_to_wall(x, y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="wall"></div>';
}

function change_to_empty(x, y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="empty"></div>';
}

function move(x,y) {
  document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>';
}
