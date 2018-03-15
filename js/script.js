// creating first grid when DOM is ready one time only
$(window).on("load", function() {
    makeGrid();
});

// listening to any clicks of td elements
$(document).ready(function() {
    $("#pixel_canvas td").on("click", function() {
        value = $(this).css("background-color");
        if (colorArray.length) {
            var corectColor = hexToRgb(gameColor);
            if (value == corectColor) {
                score += 1;
                game();
                colorArray.splice(selectedColorElement, 1);
                $(this).css('background-color', 'rgb(255,255,255)');
            }
        }
    });
});

// select and store color input
var colorPicker = $('#colorPicker');
var selectedColor = colorPicker.val();
var randomColorSave = "";
var colorArray = [];
var selectedColorElement = 0;

// select imput submit_grid
var imputGrid = $('#submit_grid');

// rows and columns html code
var row = '<tr></tr>';
var column = '<td></td>';

// make grid function
function makeGrid() {
    resetTable(); // reset table
    $('#erorr').remove(); // remove any old errors
    pixelCanvas.children().remove();
    var gridRows = height.val(); // get grid rows value
    var gridColumns = wigth.val(); // get grid culumns value
    // append to table if input is 50 or less
    if (gridRows <= 50 && gridColumns <= 50) {
        // Create rows
        for (r = 1; r <= gridRows; r++) {
            pixelCanvas.append(row);
        }
        // Create columns
        for (c = 1; c <= gridColumns; c++) {
            pixelCanvas.children().append(column);
        }
    } else if (gridRows > 50 && gridColumns > 50) {
        $('h1').first().after('<p id="erorr" style="color:red;">Max row & column value is <= 50</p>');
    } else if (gridRows > 50) {
        $('h1').first().after('<p id="erorr" style="color:red;">Max row value is <= 50</p>');
    } else if (gridColumns > 50) {
        $('h1').first().after('<p id="erorr" style="color:red;">Max column value is <= 50</p>');
    }
}

// event listener make new grid on click
imputGrid.click(function(event) {
    event.preventDefault(); // required to avoid submit and page reload
    makeGrid();
});

//--- COLORING THE GRID ---//
// geting changed color on imput
colorPicker.change(function() {
    selectedColor = $(this).val();
});

// draw and erase function
function draw() {
    var tableClick = $(this).data('tableClick');
    if (!tableClick) {
        // changing the background color of the cell
        $(this).css('background-color', selectedColor);
    } else {
        // on second click reseting color of the cell to original
        $(this).css('background-color', 'rgb(255,255,255)');
    }
    $(this).data('tableClick', !tableClick);
}

// function to draw or erase by clicking and draging
function dragDrawAndErase() {
    var mouseIsDown = true;
    var tableClick = $(this).data('tableClick');
    $('td')
        .on('mouseleave', function() {
            if (mouseIsDown) {
                if (!tableClick) {
                    // changing the background color of the cell
                    $(this).css('backgroundColor', selectedColor);
                } else {
                    // on second click reseting color of the cell to original
                    $(this).css('background-color', 'rgb(255,255,255)');
                }
                $(this).data('tableClick', !tableClick);
            }
        })
        .on('mousedown', function() {
            event.preventDefault();
            mouseIsDown = true;
        })
        .on('mouseup', function() {
            mouseIsDown = false;
        });
    pixelCanvas.on('mouseleave', function() {
        mouseIsDown = false;
    });
}

// listen for cell clicks
pixelCanvas.on("click", "td", draw)
    .on('mousedown', 'td', dragDrawAndErase);
