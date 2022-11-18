
      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left">\
            '+PageTitle()+'\
            </div>\
            <div class="Right">\
               <div class="Btn" onclick="popAdd()"> '+pageLang(2333)+' </div>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[pageList]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th>'+pageLang(2334)+'</th>\
                        <th style="width:80px">'+pageLang(2335)+'</th>\
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
      url: systemApp+"library/language",
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
            var data_code  =  itemx.code
            var data_flag  =  itemx.flag
            var data_status=  itemx.status
            var data_STATUS_TEXT =  ""
            if(data_status=="0"){ data_STATUS_TEXT = "<span class='badge badge-grey'>"+pageLang(2336)+"</span>" }
            if(data_status=="1"){ data_STATUS_TEXT = "<span class='badge badge-green'>"+pageLang(2337)+"</span>" }

            $("[CD='[[List]]']").append('\
            <tr departmentId="'+data_ID+'">\
               <td>\
                  <div class="photoRow">\
                     <div class="Photo">'+data_flag+'</div>\
                     <div class="Info">\
                        <span>'+data_NAME+'</span>\
                        <span>'+data_code+'</span>\
                     </div>\
                  </div>\
                  <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2338)+'</div>\
               </td>\
               <td>'+data_STATUS_TEXT+'</td>\
               <td>\
                  <div class="dropdown">\
                     <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                     <span class="caret"></span></button>\
                     <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                        <li role="presentation"><a role="menuitem" tabindex="-1" onclick=popEdit("'+data_code+'")>'+pageLang(2339)+'</a></li>\
                        <li role="presentation"><a role="menuitem" tabindex="-1" onclick=popDelete("'+data_code+'")>'+pageLang(2340)+'</a></li>\
                     </ul>\
                  </div>\
               </td>\
            </tr>\
            ')
         });
      }
      });
   }

   function popAdd(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2333)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



      $('\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2341)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <input class="form-control" name="CODE" placeholder="" type="text">\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2334)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <input class="form-control" name="NAME" placeholder="" type="text">\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2342)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <textarea class="form-control" name="FLAG" placeholder="" type="text"></textarea>\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"></div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <label class="ckbox">\
            <input checked="" name="STATUS" value="1" type="checkbox">\
            <span class="tx-13"> '+pageLang(2335)+' </span>\
         </label>\
      </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2344)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2345)+'</div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var CODE          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='CODE']").val()
         var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
         var FLAG          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='FLAG']").val()
         var STATUS        =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS']:checked").val()
         var Error         =  0

         if(CODE==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='CODE']").addClass("error") }
         if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
         if(STATUS==undefined){ STATUS = 0 }
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/languageAdd",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"&name="+encodeURIComponent(NAME)+"&code="+encodeURIComponent(CODE)+"&flag="+encodeURIComponent(FLAG)+"&status="+encodeURIComponent(STATUS)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2346),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2346),pageLang(2347))
            }
            });
         }
      });
   }


   function popEdit(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2339)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)


      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $('\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2341)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <input class="form-control" name="CODE" placeholder="" type="text">\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2334)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <input class="form-control" name="NAME" placeholder="" type="text">\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2342)+'</label> </div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <textarea class="form-control" name="FLAG"></textarea>\
      </div>\
      </div>\
      <div class="row row-xs align-items-center mg-b-20">\
      <div class="col-md-4"></div>\
      <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
         <label class="ckbox">\
            <input  name="STATUS" value="1" type="checkbox">\
            <span class="tx-13"> '+pageLang(2335)+' </span>\
         </label>\
      </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

      $.ajax({
      type: "post",
      url: systemApp+"library/language",
      dataType: "json",
      data : "code="+encodeURIComponent(DATA_ID)+"",
      success: function(data) {

         var data_NAME        =  data.name
         var data_code        =  data.code
         var data_flag        =  data.flag
         var data_status      =  data.status
         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val(data_NAME)
         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='CODE']").val(data_code)
         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='FLAG']").val(data_flag)
         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS'][value='"+data_status+"']").prop("checked",true)
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      },error: function() {
         $(".Popup_v2.B"+BOX+"").remove();
         notificationModal("error",pageLang(2346),pageLang(2347))
      }
      });
         

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2344)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2345)+'</div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var CODE          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='CODE']").val()
         var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
         var FLAG          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='FLAG']").val()
         var STATUS        =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS']:checked").val()
         var Error         =  0

         if(CODE==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='CODE']").addClass("error") }
         if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
         if(STATUS==undefined){ STATUS = 0 }
         
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/languageEdit",
            dataType: "json",
            data : "code="+encodeURIComponent(CODE)+"&name="+encodeURIComponent(NAME)+"&flag="+encodeURIComponent(FLAG)+"&status="+encodeURIComponent(STATUS)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2346),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2346),pageLang(2347))
            }
            });
         }
      });
   }


   function popDelete(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2340)
      var SUBTITLE	=	pageLang(2348)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

      $(".Popup_v2.B"+BOX+"").find(".Center").remove()

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2344)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2345)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"library/languageDelete",
            dataType: "json",
            data : "code="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {
               if(data.status!="error"){
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2346),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2346),pageLang(2347))
            }
            });
      });
   }