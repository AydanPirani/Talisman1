x_cells = Math.round(screen.width / 30)
y_cells = Math.round(screen.height / 30)
randomize();

x = 1;
y = Math.round(y_cells / 2);
document.getElementById(x + "," + y).innerHTML = '<div class="user"></div>'

document.onkeydown = check_key;


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
  console.log(temp)
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
  }

  if (document.getElementById(n_x + "," + n_y).innerHTML == '<div class="wall"></div>') {
    //hit wall
    console.log("wall!")
    t.className = "shake-hard shake-constant";
    setTimeout(function(){ t.className = "none"; }, 500);
  } else {
    document.getElementById(x + "," + y).innerHTML = '<div class="empty"></div>'
    document.getElementById(n_x + "," + n_y).innerHTML = '<div class="user"></div>'
    console.log(x + "," + y)
    x = n_x;
    y = n_y;
  }







}

function randomize(){
  x = 1;
  y = Math.round(y_cells / 2);
  generate_table(x_cells, y_cells)
}

function change_to_wall(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="wall"></div>';
}

function change_to_empty(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="empty"></div>';
}
