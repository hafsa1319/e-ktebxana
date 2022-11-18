
var randomnos = Math.ceil(Math.random() * 1000000000);
var mysource = "/Librarys/Js/Chart.js";
var script = document.createElement('script');
script.src = mysource;
document.head.appendChild(script);

if(userType=="student"){
   var randomnos = Math.ceil(Math.random() * 1000000000);
   var mysource = "/Page/Dashboard/Student.js"+"?"+randomnos+"";
   var script = document.createElement('script');
   script.src = mysource;
   document.head.appendChild(script);
}
if(userType=="teacher"){
   var randomnos = Math.ceil(Math.random() * 1000000000);
   var mysource = "/Page/Dashboard/Teacher.js"+"?"+randomnos+"";
   var script = document.createElement('script');
   script.src = mysource;
   document.head.appendChild(script);
}