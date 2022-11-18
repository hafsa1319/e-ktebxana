


      $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageTitle">\
               <div class="Left">\
               '+PageTitle()+'\
               </div>\
               <div class="Right">\
                  <div class="Btn" onclick="popAdd()"> '+pageLang(2393)+' </div>\
               </div>\
            </div>\
            <div class="col-12 ">\
               <div class="PageBox" CD="[[pageList]]" style="display:none">\
                  <table class="table">\
                     <thead>\
                        <tr>\
                           <th>'+pageLang(2394)+'</th>\
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
         url: systemApp+"library/background",
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
               var data_FILE  =  itemx.file

               $("[CD='[[List]]']").append('\
               <tr departmentId="'+data_ID+'">\
                  <td>\
                     <div class="photoRow">\
                        <div class="Photo" style="border-radius: 0;width: 100px;height: inherit;"><img src="'+data_FILE+'"/></div>\
                        <div class="Info">\
                           <span>'+data_FILE+'</span>\
                           <span>'+data_ID+'</span>\
                        </div>\
                     </div>\
                  </td>\
                  <td>\
                     <div class="BtnList">\
                        <div class="Btn"><a role="menuitem" tabindex="-1" onclick="popDelete('+data_ID+')">'+pageLang(2395)+'</a></div>\
                     </div>\
                  </td>\
               </tr>\
               ')
            });
         }
         });
      }
      $(".dropdown-toggle").dropdown();


      function popAdd(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2393)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $('\
         <div class="row row-xs align-items-center mg-b-20">\
         <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2396)+'</label> </div>\
         <div class="FormElements col-md-8 mg-t-5 mg-md-t-0">\
            <div class="dropzone OneViewItem" T="Single"></div>\
         </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         Dropzone.autoDiscover = false;
         var dropzone = new Dropzone('.OneViewItem[T="Single"]', {
            previewTemplate: '<div class="Item" data-id=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#72e15b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>',
            url: "https://65.21.229.172:9000/"+cdnDefaultPath,
            method: 'post',
            init: function () {
               this.on("sending", function (file, xhr, formData) {
                  console.log(file)
                  console.log(formData)
               });
            },
            success: function (file, response) {
               file.serverId = (new Date().getTime()).toString(36)
               $(file.previewTemplate).attr('id', "document-" + file.serverId);
               response = response.url;
               var FI = response.split("/")
               var fileName = FI[FI.length-1]
               $(".dropzone.OneViewItem").find(".Item[id='document-"+file.serverId+"']").html("\
                  <div class='File'>\
                     <img src='"+response+"'\>\
                  </div>\
                  <div class='Delete y' onclick='dropzoneItemDelete(this)'>\
                     <i class='fa fa-trash'></i>\
                  </div>\
                  ").attr("alt",fileName).attr("src",response)

            }
            
         });

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2397)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2398)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var FILE    =  $(".Popup_v2.B"+BOX+"").find(".Center").find(".dropzone.OneViewItem .Item .File>img").attr("src")
            var Error   =  0
            if(FILE==undefined){ FILE = "" }
            if(FILE==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='FILE']").addClass("error") }
            
            if(Error==0){
               $(".Popup_v2.B"+BOX+"").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"library/backgroundAdd",
               dataType: "json",
               data : "file="+encodeURIComponent(FILE)+"",
               success: function(data) {
                  if(data.status!="error"){
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal(data.status,pageLang(2399),data.message)
               },error: function() {
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal("error",pageLang(2399),pageLang(2400))
               }
               });
            }
         });
      }


      function popDelete(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2395)
         var SUBTITLE	=	pageLang(2401)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
         $(".Popup_v2.B"+BOX+"").find(".Center").remove()
   
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2397)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2398)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });
   
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               $(".Popup_v2.B"+BOX+"").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"library/backgroundDelete",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"",
               success: function(data) {
                  if(data.status!="error"){
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal(data.status,pageLang(2399),data.message)
               },error: function() {
                  $(".Popup_v2.B"+BOX+"").removeClass("Loading")
                  notificationModal("error",pageLang(2399),pageLang(2400))
               }
               });
         });
      }
