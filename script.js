$(function () {
  // paint in the canvas
  var paint = false;
  var erase = "paint";
  var canvas = document.getElementById("paint");
  var ctx = canvas.getContext("2d");

  // get the canvas container
  var container = $("#container");
  // mouse position
  var mouse = { x: 0, y: 0 };
  // onload load saved work from localstorage
  if (localStorage.getItem("x") != null) {
    // window.alert("x is there and it is equal to" + localStorage.getItem("x"));
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = localStorage.getItem("imgCanvas");
  }
  // set drawing parameters
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // click inside container
  container.mousedown(function () {
    paint = true;
    // window.alert(paint);
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
  });

  // move the mouse while holding the mouse key
  container.mousemove(function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    if (paint == true) {
      if (erase == "paint") {
        // get colour input
        ctx.strokeStyle = $("#paintColor").val();
        // ctx.strokeStyle = "red";
      } else {
        // white colour
        ctx.strokeStyle = "white";
      }
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });

  // mouse up -> not erasing paint anymore
  container.mouseup(function () {
    paint = false;
  });

  // leave container - not erasing anymore
  container.mouseleave(function () {
    paint = false;
  });

  // click on the reset button
  $("#reset").click(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    erase = "paint";
    $("#erase").removeClass("eraseMode");
  });

  // click on the save button
  $("#save").click(function () {
    if (typeof localStorage != null) {
      localStorage.setItem("imgCanvas", canvas.toDataURL());
      window.alert(localStorage.getItem("imgCanvas"));
    } else {
      window.alert("Your browser does not support local storage!");
    }
  });

  // click on the erase button
  $("#erase").click(function () {
    if (erase == "paint") erase = "erase";
    else erase = "paint";
    $(this).toggleClass("eraseMode");
  });

  // change colour input
  $("#paintColor").change(function () {
    $("#circle").css("background-color", $(this).val());
  });

  // change lineWidth using slider
  $("#slider").slider({
    min: 3,
    max: 30,
    slide: function (event, ui) {
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value;
    },
  });

  // // draw on canvas
  // var canvas = document.getElementById("paint");
  // var context = canvas.getContext("2d");

  // // draw a line
  // // declare new path
  // context.beginPath();

  // // set line width
  // context.lineWidth = 40;
  // // set line colour
  // context.strokeStyle = "#42e565";
  // // set cap to the line (round, butt, square)
  // context.lineCap = "round";
  // // set line join style (bevel, round, miter)
  // context.lineJoin = "round";
  // // position the context point
  // context.moveTo(50, 50);
  // // draw straight line from starting point to new position
  // context.lineTo(200, 200);

  // // make line visible
  // context.stroke();
});
