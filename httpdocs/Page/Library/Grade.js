

            

      $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageTitle">\
               <div class="Left">\
               '+PageTitle()+'\
               </div>\
               <div class="Right">\
                  <div class="Btn" onclick="popAdd()"> '+pageLang(2382)+' </div>\
               </div>\
            </div>\
            <div class="col-12 ">\
               <div class="PageBox" CD="[[pageList]]" style="display:none">\
                  <table class="table">\
                     <thead>\
                        <tr>\
                           <th>'+pageLang(2383)+'</th>\
                           <th style="width:40px"></th>\
                        </tr>\
                     </thead>\
                     <tbody CD="[[List]]">\
                     </tbody>\
                  </table>\
               </div>\
            </div>\
         </div>\
         </div>\
      </article>\
      ').appendTo(".PageContentArea")


      List()
      function List(){
         $.ajax({
         type: "post",
         url: systemApp+"library/grade",
         dataType: "json",
         data : "",
         success: function(data) {


            if(data!=""){
               $("[CD='[[pageList]]']").show()
            }else{
               $("[CD='[[pageList]]']").hide()
            }
            $("[CD='[[List]]']").html("")
            $.each( data, function( i, itemx ) {
               var data_ID    =  itemx.id
               var data_NAME  =  itemx.name

               $("[CD='[[List]]']").append('\
               <tr departmentId="'+data_ID+'">\
                  <td>\
                     <div class="twoRow">\
                        <span>'+data_NAME+'</span>\
                        <span>'+data_ID+'</span>\
                     </div>\
                     <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2384)+'</div>\
                  </td>\
                  <td>\
                     <div class="dropdown">\
                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                        <span class="caret"></span></button>\
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="popEdit('+data_ID+')">'+pageLang(2385)+'</a></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="popDelete('+data_ID+')">'+pageLang(2386)+'</a></li>\
                        </ul>\
                     </div>\
                  </td>\
               </tr>\
               ')
            });
         }
         });
      }
      $(".dropdown-toggle").dropdown();


      function popAdd(){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2382)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $('\
         <div class="row row-xs align-items-center mg-b-20">\
         <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2383)+'</label> </div>\
         <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
            <input class="form-control" name="NAME" placeholder="" type="text">\
         </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2387)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2388)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
            var Error         =  0

            if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
            
            if(Error==0){
               $(".Popup_v2.B"+BOX+"").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"library/gradeAdd",
               dataType: "json",
               data : "name="+encodeURIComponent(NAME)+"",
               success: function(data) {
                  if(data.status!="error"){
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal(data.status,pageLang(2389),data.message)
               },error: function() {
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal("error",pageLang(2389),pageLang(2390))
               }
               });
            }
         });
      }


      function popEdit(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2385)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $('\
         <div class="row row-xs align-items-center mg-b-20">\
         <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2383)+'</label> </div>\
         <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
            <input class="form-control" name="NAME" placeholder="" type="text">\
         </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))


         $(".Popup_v2.B"+BOX+"").addClass("Loading")
         $.ajax({
         type: "post",
         url: systemApp+"library/grade",
         dataType: "json",
         data : "id="+encodeURIComponent(DATA_ID)+"",
         success: function(data) {

            var data_NAME        =  data[0].name
            $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val(data_NAME)
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         }
         });
            

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2387)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2388)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
            var Error         =  0
            
            if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
            
            if(Error==0){
               $(".Popup_v2.B"+BOX+"").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"library/gradeEdit",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"&name="+encodeURIComponent(NAME)+"",
               success: function(data) {
                  if(data.status!="error"){
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal(data.status,pageLang(2389),data.message)
               },error: function() {
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal("error",pageLang(2389),pageLang(2390))
               }
               });
            }
         });
      }

      function popDelete(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2386)
         var SUBTITLE	=	pageLang(2391)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
         $(".Popup_v2.B"+BOX+"").find(".Center").remove()
   
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2387)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2388)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });
   
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               $(".Popup_v2.B"+BOX+"").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"library/gradeDelete",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"",
               success: function(data) {
                  if(data.status!="error"){
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal(data.status,pageLang(2389),data.message)
               },error: function() {
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal("error",pageLang(2389),pageLang(2390))
               }
               });
         });
      }
