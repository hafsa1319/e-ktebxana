    

      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left">\
               '+PageTitle()+'\
            </div>\
            <div class="Right">\
               '+TableSearch()+'\
               <a class="Btn" onclick="popAdd()"> '+pageLang(1936)+' </a>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th>'+pageLang(1937)+'</th>\
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
      var directorateId = Qstring.get('directorateId')
      if(directorateId==undefined){ directorateId = 0 }

      var userDataId = 0
      if(systemUser.user.departmentId==1003 || systemUser.user.departmentId==1004){ userDataId = systemUser.user.regionId }
      if(systemUser.user.departmentId==1005 || systemUser.user.departmentId==1006){ userDataId = systemUser.user.cityId }
      if(systemUser.user.departmentId==1007 || systemUser.user.departmentId==1008){ userDataId = systemUser.user.ministryId }
      if(systemUser.user.departmentId==1009 || systemUser.user.departmentId==1010){ userDataId = systemUser.user.directorateId }
      if(systemUser.user.departmentId==1011 || systemUser.user.departmentId==1012){ userDataId = systemUser.user.companyId }
      List()



      function List(){
         $.ajax({
         type: "post",
         url: systemApp+"system/company",
         dataType: "json",
         data : "directorateId="+directorateId+"&userDepartmentId="+systemUser.user.departmentId+"&userDataId="+userDataId+"",
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
                     <a href="/school-view?schoolId='+data_ID+'" class="twoRow">\
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
                           <li role="presentation"><a role="menuitem" tabindex="-1" href="/school-view?schoolId='+data_ID+'"> '+pageLang(1938)+' </a></li>\
                           <li role="presentation" class="divider"></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="dataEdit('+data_ID+')">'+pageLang(1939)+'</a></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="dataDelete('+data_ID+')">'+pageLang(1941)+'</a></li>\
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
         var TITLE 		=	pageLang(1940)
         var SUBTITLE	=	pageLang(1942)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1943)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1944)+' </label>\
                  <div class="List"></div>\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $.ajax({
         type: "post",
         url: systemApp+"library/education",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Center").find(".List").append('<div class="EducationItem" D="'+itemx.id+'">'+itemx.name+'</div>')
            });

            $(".EducationItem").click(function(){
               var T = $(this).val()
               $(".EducationItem").removeClass("Active")
               $(this).addClass("Active")
            })
         }
         })
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1945)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1946)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error      =  0
            var Name       =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            var Education  =  $(".Popup_v2.B"+BOX+"").find(".EducationItem.Active").attr("D")
            if(Education==undefined){ Education = 0 }
            
            if(Education==0){ $(".Popup_v2.B"+BOX+"").find("[name='Education']").parent().addClass("Error"); Error = 1 }
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"system/companyAdd",
               dataType: "json",
               data : "directorateId="+directorateId+"&educationId="+encodeURIComponent(Education)+"&name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1947),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1947),data.message)
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
         var TITLE 		=	pageLang(1948)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1949)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(1950)+' </label>\
                  <div class="List"></div>\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $.ajax({
         type: "post",
         url: systemApp+"library/education",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Center").find(".List").append('<div class="EducationItem" D="'+itemx.id+'">'+itemx.name+'</div>')
            });

            $(".EducationItem").click(function(){
               var T = $(this).val()
               $(".EducationItem").removeClass("Active")
               $(this).addClass("Active")
            })

            $.ajax({
            type: "post",
            url: systemApp+"system/company",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {
               var data_NAME        =  data.name
               var data_EDUCATION   =  data.educationId
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='Name']").val(data_NAME)
               $(".Popup_v2.B"+BOX+"").find(".EducationItem[D='"+data_EDUCATION+"']").addClass("Active")
            }
            });
         }
         })
            

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1951)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1952)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error      =  0
            var Name       =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            var Education  =  $(".Popup_v2.B"+BOX+"").find(".EducationItem.Active").attr("D")
            if(Education==undefined){ Education = 0 }
            
            if(Education==0){ $(".Popup_v2.B"+BOX+"").find("[name='Education']").parent().addClass("Error"); Error = 1 }
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"system/companyEdit",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"&name="+encodeURIComponent(NAME)+"&educationId="+encodeURIComponent(Education)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1953),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1953),data.message)
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
         var TITLE 		=	pageLang(1954)
         var SUBTITLE	=	pageLang(1955)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $(".Popup_v2.B"+BOX+"").find(".Center").remove()

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1956)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1957)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               $.ajax({
               type: "post",
               url: systemApp+"system/companyDelete",
               dataType: "json",
               data : "id="+encodeURIComponent(DATA_ID)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(1958),data.message)
                  }else{
                     notificationModal(data.status,pageLang(1958),data.message)
                     List()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               });
         });
      }
