//Welcome to my Pixel Art Project!

const table = $('#pixel_canvas');
const colorPicker = $('#colorPicker');
const tableHeight = $('#input_height');
const tableWidth = $('#input_width');

function makeGrid() {
  for (let y = 0; y < tableHeight.val(); y++){
    table.append("<tr></tr>");
    for (let x = 0; x < tableWidth.val(); x++) {
      table.children().last().append("<td></td>");
    }
  }
}

table.on("click" , "td" , function(){
  $(this).css("background-color" , colorPicker.val());
});

table.on("contextmenu", "td", function() {
  $(this).css("background-color", "#C0C0C0");
  return false;
});

let mouseIsHold = false;
table.on("mousedown", "td", function() {
  mouseIsHold = true;
  $(this).css("background-color", colorPicker.val());
});

table.on("mouseenter", "td", function() {
  if (mouseIsHold) {
    $(this).css("background-color", colorPicker.val());
  }
});

$('body').on("mouseup", function() {
  mouseIsHold = false;
});

$('#reset').click(function() {
  table.empty();
  colorPicker.val("#000000");
  tableHeight.val(15);
  tableWidth.val(15);
});

$('#submit').submit(function(e) {
  table.empty();
  e.preventDefault();
  makeGrid();
});
