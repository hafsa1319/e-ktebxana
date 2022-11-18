

$('[CD="[[LoadView]]"]').html('\
<article class="PageArea">\
   <div class="Container">\
   <div class="row">\
      <div class="col-12 pageTitle">\
         <div class="Left"></div>\
         <div class="Right">\
            '+TableSearch()+'\
            <a class="Btn" onclick="popAdd()">  '+pageLang(1872)+' </a>\
         </div>\
      </div>\
      <div class="col-12 ">\
         <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
            <table class="table">\
               <thead>\
                  <tr>\
                     <th>'+pageLang(1873)+'</th>\
                     <th style="width:40px"></th>\
                  </tr>\
               </thead>\
               <tbody CD="[[pageSystemNavTable]]">\
               </tbody>\
            </table>\
         </div>\
      </div>\
   </div>\
   </div>\
</article>\
')