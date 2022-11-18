

         

      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left">\
            '+PageTitle()+'\
            </div>\
            <div class="Right">\
               <div class="Btn" onclick="popAdd()"> '+pageLang(2321)+' </div>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[pageList]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th>'+pageLang(2322)+'</th>\
                        <th style="width:140px"></th>\
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
      url: systemApp+"library/schoolroom",
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
            var data_ID       =  itemx.id
            var data_NAME     =  itemx.name
            var data_GRADE    =  itemx.grade

            var data_STATUS_TEXT = ""
            if(data_GRADE==""){
               data_STATUS_TEXT = "<span class='badge badge-grey'>---</span>"
            }else{
               data_STATUS_TEXT = "<span class='badge badge-green'>"+data_GRADE+"</span>"
            }

            $("[CD='[[List]]']").append('\
            <tr departmentId="'+data_ID+'">\
               <td>\
                  <div class="twoRow">\
                     <span>'+data_NAME+'</span>\
                     <span>'+data_ID+'</span>\
                  </div>\
                  <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2323)+'</div>\
               </td>\
               <td>'+data_STATUS_TEXT+'</td>\
               <td>\
                  <div class="dropdown">\
                     <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                     <span class="caret"></span></button>\
                     <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                        <li role="presentation"><a role="menuitem" tabindex="-1" onclick="popEdit('+data_ID+')">'+pageLang(2324)+'</a></li>\
                        <li role="presentation"><a role="menuitem" tabindex="-1" onclick="popDelete('+data_ID+')">'+pageLang(2325)+'</a></li>\
                     </ul>\
                  </div>\
               </td>\
            </tr>\
            ')
         });
      }
      });
   }


   function popAdd(){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2321)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



      $('\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0"> '+pageLang(2326)+' </label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <select class="form-control" name="GRADE_ID"><option value="0"> Seç </option></select>\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0"> '+pageLang(2322)+' </label> </div>\
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
      data : "",
      success: function(data) {
         $.each( data, function( i, itemx ) {
            var data_ID    =  itemx.id
            var data_NAME  =  itemx.name
            $(".Popup_v2.B"+BOX+" .Center [name='GRADE_ID']").append("<option value='"+data_ID+"'>"+data_NAME+"</option>")
         });
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      }
      });

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2328)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2329)+'</div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var GRADE_ID      =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='GRADE_ID']").val()
         var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
         var Error         =  0

         if(GRADE_ID==0){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='GRADE_ID']").addClass("error") }
         if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
         
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/schoolroomAdd",
            dataType: "json",
            data : "name="+encodeURIComponent(NAME)+"&gradeId="+encodeURIComponent(GRADE_ID)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2330),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2330),pageLang(2331))
            }
            });
         }
      });
   }


   function popEdit(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2324)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

      $('\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2326)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
      <select class="form-control" name="GRADE_ID"><option value="0"> Seç </option></select>\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2322)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <input class="form-control" name="NAME" placeholder="" type="text">\
      </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
      
      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $.ajax({
      type: "post",
      url: systemApp+"library/schoolroom",
      dataType: "json",
      data : "id="+encodeURIComponent(DATA_ID)+"",
      success: function(data) {
         var data_NAME        =  data[0].name
         var data_GRADE_ID    =  data[0].gradeId
         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val(data_NAME)

         $.ajax({
         type: "post",
         url: systemApp+"library/grade",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               var data_ID    =  itemx.id
               var data_NAME  =  itemx.name
               $(".Popup_v2.B"+BOX+" .Center [name='GRADE_ID']").append("<option value='"+data_ID+"'>"+data_NAME+"</option>")
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='GRADE_ID']>option[value='"+data_GRADE_ID+"']").prop("selected",true)
            });
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         }
         });
      }
      });
         

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2328)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2329)+'</div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var GRADE_ID      =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='GRADE_ID']").val()
         var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
         var Error         =  0

         if(GRADE_ID==0){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='GRADE_ID']").addClass("error") }
         if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
         
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/schoolroomEdit",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"&name="+encodeURIComponent(NAME)+"&gradeId="+encodeURIComponent(GRADE_ID)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2330),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2330),pageLang(2331))
            }
            });
         }
      });
   }

   function popDelete(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2325)
      var SUBTITLE	=	pageLang(2332)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

      $(".Popup_v2.B"+BOX+"").find(".Center").remove()

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2328)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2329)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/schoolroomDelete",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2330),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2330),pageLang(2331))
            }
            });
      });
   }