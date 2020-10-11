x = 1
y = 1

document.onkeydown = check_key;

//Event Listeners to check which keys were presseed
function check_key(event) {
  event = event || window.event;
  if (event.keyCode == '38') {
    y -= 1;
    // console.log("up")
  } else if (event.keyCode == '40') {
    y += 1;
    // console.log("down")
  } else if (event.keyCode == '37') {
    x -= 1
    // console.log("left")
  } else if (event.keyCode == '39') {
    x += 1
    // console.log("right")
  }
  console.log(x+","+y)
}

function randomize() {
  console.log("to be randomized")
  change_to_wall(1, 1)
}

function change_to_wall(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="wall">Wall</div>';
}

function change_to_empty(x, y) {
  document.getElementById(x + "." + y).innerHTML = '<div class="empty">Empty</div>';
}
