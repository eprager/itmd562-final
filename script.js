document.addEventListener("DOMContentLoaded", function(){
  var d = new Date();
  var date = d.getDate();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[d.getDay()];
  var today = day + ", " + month + " " + date + ", " + year;
  document.getElementById("thedateTitle").innerHTML = today;
  document.getElementById("thedateHeading").innerHTML = today;
});