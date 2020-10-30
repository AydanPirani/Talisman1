x_cells = Math.round(screen.width / 25)
y_cells = Math.round(screen.height / 25)
document.getElementById("choose").style.display = "block";
randomize();
x = 1;
y = Math.round(y_cells / 2);
color = ""
while(color != ""){
  setTimeout(function() {console.log("waiting") }, 500);
}

var a1 = new Audio('buzz.wav');
var a2 = new Audio('fail.wav')

move(x, y)
document.getElementById("start").style.display = "block"
document.onkeydown = check_key;

function chose() {
  color = document.getElementById("color").value
  document.getElementById("choose").style.display = "none"
  document.querySelector(".user").style.backgroundColor = color
}

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
  } else {
    return
  }

  if (is_wall(n_x, n_y)) {
    //hit wall
    t.className = "shake-hard shake-constant";
    a1.currentTime = 1;
    a1.play();
    setTimeout(function() {
      t.className = "none";
    }, 500);
  } else {
    change_to_empty(x, y)
    move(n_x, n_y)
    x = n_x;
    y = n_y;
  }

  if (is_wall(x,y-1)&&is_wall(x,y+1)&&is_wall(x-1,y)&&is_wall(x+1,y)){
    a2.currentTime = 0
    a2.play();
    document.getElementById("lost").style.display = "block"
  }

}

function randomize() {
  document.getElementById("start").style.display = "none"
  document.getElementById("won").style.display = "none"
  document.getElementById("lost").style.display = "none"

  x = 1;
  y = Math.round(y_cells / 2);
  move(x, y)
}

function generate_table(x, y) {
  var temp = "<table>";
  for (var i = 1; i < y + 1; i++) {
    temp += "<tr>"
    for (var j = 1; j < x + 1; j++) {
      temp += '<td id=' + j + "," + i + '><div class="empty"></div></td>'
    }
    temp += "</tr>"
  }
  document.getElementById("table").innerHTML = temp + "</table>"
}

function generate_borders(x, y) {

  //Changes a whole row to a wall
  for (var i = 1; i <= x; i++) {
    change_to_wall(i, 1)
    change_to_wall(i, y)
  }

  //Changes a whole column to a wall
  for (var i = 1; i <= y; i++) {
    change_to_wall(1, i)
    change_to_wall(x, i)
  }

}


function generate_walls(LL, UR) {
  // generate_table(x_cells, y_cells)
  // console.log(LL + "\n" + UR)
  x_l = Math.abs(LL[0] - UR[0])
  y_l = Math.abs(LL[1] - UR[1])

  x_coord = Math.round(x_l * Math.random()) + LL[0]
  y_coord = Math.round(y_l * Math.random()) + UR[1]

  x_c=(x_coord>2&&Math.abs(x_coord-LL[0])>2&&Math.abs(x_coord-UR[0])>2)
  y_c=(y_coord!=16&&Math.abs(y_coord-LL[1])>2&&Math.abs(y_coord-UR [1])>2)

  //Changes a whole row to a wall
  if (x_c) {
    for (var i = UR[1]; i < LL[1]; i++) {
      change_to_wall(x_coord, i)
    }
    temp = Math.round(Math.abs(UR[1]-LL[1])*Math.random())+1
    change_to_empty(x_coord, temp)
  }

  //Changes a whole column to a wall
  if (y_c) {
    for (var i = LL[0]; i < UR[0]; i++) {
      change_to_wall(i, y_coord)
    }
    temp = Math.round(Math.abs(UR[0]-LL[0])*Math.random())+1
    change_to_empty(temp, y_coord)
  }

  if (x_c && y_c) {
    generate_walls([LL[0], y_coord],[x_coord,UR[1]])
    generate_walls(LL,[x_coord, y_coord])
    generate_walls([x_coord, y_coord],UR)
    generate_walls([x_coord, LL[1]],[UR[0], y_coord])
  } else if (x_c) {
    generate_walls(LL,[x_coord, UR[1]])
    generate_walls([x_coord, LL[1]],UR)
  } else if (y_c) {
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

// TODO: COLOR CHOICE
function move(x, y) {
  generate_table(x_cells,y_cells)
  generate_walls([1, y_cells], [x_cells, 1])
  generate_borders(x_cells,y_cells)
  document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>';
  document.getElementById(x_cells + "," + Math.round(y_cells / 2)).innerHTML = '<div class="empty" style="background-color:#1db331"></div>'
  // style.backgroundColor = "#1db331";
  if(x==x_cells && y==Math.round(y_cells/2)) {
    document.getElementById("won").style.display = "block"
  }
  document.querySelector(".user").style.backgroundColor = color
}
