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