function auto(){
  var devicewidth = document.documentElement.clientWidth;
  if (devicewidth > 750){
    devicewidth = 750;
  }
  if (devicewidth < 320){
    devicewidth = 320;
  }
  var fs = (devicewidth / 750) * 100;
  document.documentElement.style.fontSize = fs+"px";
}
auto();
window.onresize = function (){
  auto();
}