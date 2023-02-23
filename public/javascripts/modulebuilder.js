// add row
function addRow() {
  var table = document.getElementById("myTable");
  var tbody = table.getElementsByTagName("tbody")[0];

  var row = document.createElement("tr");
  var cell1 = document.createElement("td");
  var cell2 = document.createElement("td");

  row.appendChild(cell1);
  row.appendChild(cell2);
  tbody.appendChild(row);
}


function addLayout(x){
  var laymenu = document.getElementById("addlayout");
   x.classList.toggle("change");
  if (laymenu.style.display === "flex") {
  laymenu.style.display = "none";
} else {
  laymenu.style.display = "flex";
}
}
function addComponent(x){
  var compmenu = document.getElementById("componentselector");
  var right = document.getElementById("right");
  var pbutton = document.getElementById("pbuttonr");
   x.classList.toggle("change");
  if (compmenu.style.display === "block") {
  compmenu.style.display = "none";
  pbutton.style.display = "block";
  right.style.width = "100px";
  pbutton.style.marginRight = "65px";
} else {
  compmenu.style.display = "block";
  right.style.width = "300px";
  pbutton.style.display = "none";
}
}
function resizeLeft(x){
  var leftmenu = document.getElementById("left");
  var pbutton = document.getElementById("pbuttonl");
  x.classList.toggle("change");
  if (leftmenu.style.width === "300px") {
  leftmenu.style.width = "100px";
  pbutton.style.marginLeft = "65px";
} else {
  leftmenu.style.width = "300px";
  pbutton.style.marginLeft = "265px";
}
}
function resizeRight(x){
  var rightmenu = document.getElementById("right");
  var pbutton = document.getElementById("pbuttonr");
  x.classList.toggle("change");
  if (rightmenu.style.width === "300px") {
  rightmenu.style.width = "100px";
  pbutton.style.marginRight = "65px";
} else {
  rightmenu.style.width = "300px";
  pbutton.style.marginRight = "265px";
}
}