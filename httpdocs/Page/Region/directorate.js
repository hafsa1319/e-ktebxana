

      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left">\
               '+PageTitle()+'\
            </div>\
            <div class="Right">\
               '+TableSearch()+'\
               <a class="Btn" onclick="popAdd()"> '+pageLang(1915)+' </a>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th>'+pageLang(1916)+'</th>\
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
      ').appendTo(".PageContentArea")


      let  Qpathname = window.location.pathname
      let  Qstring   = new URLSearchParams(window.location.search);
      var ministryId = Qstring.get('ministryId')
      if(ministryId==undefined){ ministryId = 0 }
      List()


      function List(){
         $.ajax({
         type: "post",
         url: systemApp+"system/directorate",
         dataType: "json",
         data : "ministryId="+ministryId+"",
         success: function(data) {


            if(data!=""){
               $("[CD='[[pageSystemNav]]']").show()
            }else{
               $("[CD='[[pageSystemNav]]']").hide()
            }
            $("[CD='[[pageSystemNavTable]]']").html("")
            $.each( data, function( i, itemx ) {
               var data_ID              =  itemx.id
               var data_NAME           =  itemx.name

               $("[CD='[[pageSystemNavTable]]']").append('\
               <tr departmentId="'+data_ID+'">\
                  <td>\
                     <a href="/school?directorateId='+data_ID+'" class="twoRow">\
                        <span>'+data_NAME+'</span>\
                        <span>'+data_ID+'</span>\
                     </a>\
                  </td>\
                  <td>\
                  <div style="display:flex;justify-content: flex-end;">\
                     <div class="TableHideBtnList">\
                     <div class="Btn BtnGreen" onclick="dataEdit('+data_ID+')"> <i class="fa fa-pencil"></i> </div>\
                     <div class="Btn BtnRed" onclick="dataDelete('+data_ID+')"> <i class="fa fa-trash"></i> </div>\
                     </div>\
                     <div class="dropdown">\
                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                        <span class="caret"></span></button>\
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                           <li role="presentation"><a role="menuitem" tabindex="-1" href="/school?directorateId='+data_ID+'"> '+pageLang(1917)+' </a></li>\
                           <li role="presentation" class="divider"></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="dataEdit('+data_ID+')">'+pageLang(1918)+'</a></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="dataDelete('+data_ID+')">'+pageLang(1919)+'</a></li>\
                        </ul>\
                     </div>\
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
         var BOX 		   =	2
         var TITLE 		=	pageLang(1920)
         var SUBTITLE	=	pageLang(1921)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1922)+'</label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1923)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1924)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  0
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"system/directorateAdd",
               dataType: "json",
               data : "ministryId="+ministryId+"&name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1925),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1925),data.message)
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }

      function dataEdit(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(1926)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1927)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $.ajax({
         type: "post",
         url: systemApp+"system/directorate",
         dataType: "json",
         data : "id="+encodeURIComponent(DATA_ID)+"",
         success: function(data) {
            var data_NAME        =  data.name
            $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='Name']").val(data_NAME)
         }
         });
            

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1928)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1929)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='Name']").val()
            var Error         =  0

            if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='Name']").addClass("error") }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"system/directorateEdit",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"&name="+encodeURIComponent(NAME)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1930),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1930),data.message)
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               });
            }
         });
      }

      function dataDelete(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(1931)
         var SUBTITLE	=	pageLang(1932)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $(".Popup_v2.B"+BOX+"").find(".Center").remove()

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1933)+'</div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1934)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               $.ajax({
               type: "post",
               url: systemApp+"system/directorateDelete",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1935),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1935),data.message)
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               });
         });
      }
