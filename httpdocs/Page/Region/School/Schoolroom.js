
$.ajax({
   type: "post",
   url: appPath+"system/pageLanguage",
   dataType: "json",
   data : "pageId="+localStorage.getItem("schoolTabItem")+"&language="+localStorage.getItem("systemUserLanguage")+"",
   success: function(data) {
      sessionStorage.setItem("pageLanguage",JSON.stringify(data))
   
   
      $('[CD="[[LoadView]]"]').html('\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left"></div>\
            <div class="Right">\
               '+TableSearch()+'\
               <a class="Btn" onclick="popAdd()">  '+pageLang(2274)+' </a>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div CD="[[pageSystemNav]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th colspan="2">'+pageLang(2275)+'</th>\
                        <th style="width:320px"></th>\
                        <th style="width:120px"></th>\
                     </tr>\
                  </thead>\
                  <tbody CD="[[pageSystemNavTable]]">\
                  </tbody>\
               </table>\
            </div>\
         </div>\
      </div>\
      ')
      List()
   }
   }); 
   
   
   
   function List(){
      $.ajax({
      type: "post",
      url: systemApp+"system/companySchoolroom",
      dataType: "json",
      data : "companyId="+schoolId+"",
      success: function(data) {
   
   
         if(data.total>0){
            $("[CD='[[pageSystemNav]]']").show()
         }else{
            $("[CD='[[pageSystemNav]]']").hide()
         }
         $("[CD='[[pageSystemNavTable]]']").html("")
   
   
         $.each( data.list, function( i, itemx ) {
            var data_id             =  itemx.id
            var data_gradeId        =  itemx.gradeId
            var data_gradeName      =  itemx.gradeName
            var data_name           =  itemx.name
            var data_teacherId      =  itemx.teacherId
            var data_teacherName    =  itemx.teacherName
            
            var Teacher = ""
            if(data_teacherId==0){
               Teacher = '<div class="TeacherSelected" onclick="TeacherSelected('+data_id+','+data_teacherId+')"><div> '+pageLang(2276)+' </div></div>'
            }else{
               Teacher = '<div class="TeacherSelected Active" onclick="TeacherSelected('+data_id+','+data_teacherId+')"><div> '+data_teacherName+' </div></div>'
            }
   
            $("[CD='[[pageSystemNavTable]]']").append('\
            <tr schoolroomId="'+data_id+'">\
               <td style="width:160px"><span class="BoxArea BoxGrey">'+data_gradeName+'</span></td>\
               <td>\
                  <div class="twoRow">\
                     <span>'+data_name+'</span>\
                     <span>'+data_id+'</span>\
                  </div>\
               </td>\
               <td>'+Teacher+'</td>\
               <td>\
               <div style="display:flex;justify-content: flex-end;">\
                  <div class="TableHideBtnList">\
                  <div class="Btn BtnRed" onclick="dataDelete('+data_id+')"> <i class="fa fa-trash"></i> </div>\
                  </div>\
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
      var BOX 		   =	2
      var TITLE 		=	pageLang(2277)
      var SUBTITLE	=	pageLang(2278)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
      $('\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2279)+' </label>\
               <select name="Grade" autocomplete="off"></select>\
            </div>\
         </div>\
         <div class="col-md-12">\
            <div class="LibraryList">\
            </div>\
         </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

      $("[name='Grade']").change(function(){
         var GradeId = $(this).val()
         gradeView(GradeId)
      })
      
      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $.ajax({
      type: "post",
      url: systemApp+"library/grade",
      dataType: "json",
      data : "companyId="+schoolId+"",
      success: function(data) {
         $.each( data, function( i, itemx ) {
            $("[name='Grade']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
            if(i==0){
               gradeView(itemx.id)
            }
         })
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      },error: function() {
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         notificationModal("error",pageLang(2280),pageLang(2281))
      }
      })
      
      
   
      
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2282)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2283)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var Error   =  0
         $(".Error>input").parent().removeClass("Error")
         $(".Error>input").parent().parent().removeClass("Error")
         $(".Error>select").parent().removeClass("Error")
         $(".Error>textarea").parent().removeClass("Error")
         $(".ErrorText").remove()
         
         var List             =  ""
         $(".Popup_v2.B"+BOX+"").find("[name='LibraryItem']:checked").each(function(){
            List = List + $(this).val() +","
         })
         List = List.slice(0,-1)
         
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"system/companySchoolroomAdd",
            dataType: "json",
            data : "companyId="+schoolId+"&schoolroomList="+encodeURIComponent(List)+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,pageLang(2280),data.message)
               }else{
                  notificationModal(data.status,pageLang(2280),data.message)
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2280),pageLang(2281))
            }
            })
         }
      });
   }
   
   
   function gradeView(GRADE_ID){
      $(".Popup_v2 .Center .LibraryList").html("")
      
      $.ajax({
      type: "post",
      url: systemApp+"library/schoolroom",
      dataType: "json",
      data : "companyId="+schoolId+"",
      success: function(data) {
         $.each( data, function( i, itemx ) {
            var data_id          =  itemx.id
            var data_gradeId     =  itemx.gradeId
            var data_name        =  itemx.name
            
            if(GRADE_ID==itemx.gradeId){
               $($(".Popup_v2 .Center .LibraryList")).append('\
               <div class="LibItem">\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="LibraryItem" value="'+data_id+'" type="checkbox">\
                     <span class="tx-13" style="margin-left: 5px;"> '+data_name+' </span>\
                  </label>\
               </div>\
               ')

               $("[CD='[[pageSystemNavTable]]']>tr").each(function(){
                  var SchoolroomId = $(this).attr("schoolroomId")
                  $('[name="LibraryItem"][value="'+SchoolroomId+'"]').prop("checked",true)
               })
            }
         });
      }
      })
   }
   
   function dataDelete(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2284)
      var SUBTITLE	=	pageLang(2285)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
   
   
      $(".Popup_v2.B"+BOX+"").find(".Center").remove()
   
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2282)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2283)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         $(".Popup_v2.B"+BOX+"").addClass("Loading")
         $.ajax({
         type: "post",
         url: systemApp+"system/cityDelete",
         dataType: "json",
         data : "id="+encodeURIComponent(DATA_ID)+"",
         success: function(data) {
            if(data.status=="error"){
               notificationModal(data.status,pageLang(2280),data.message)
            }else{
               notificationModal(data.status,pageLang(2280),data.message)
               List()
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            }
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         },error: function() {
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            notificationModal("error",pageLang(2280),pageLang(2281))
         }
         });
      });
   }


   function TeacherSelected(DATA_ID,TEACHER_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	2
      var TITLE 		=	pageLang(2286)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
      $('\
      <div class="row">\
         <div class="col-md-12">\
            <div class="LibraryList">\
            </div>\
         </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $.ajax({
      type: "post",
      url: systemApp+"system/companyPersonal",
      dataType: "json",
      data : "companyId="+schoolId+"",
      success: function(data) {

         $.each( data.list, function( i, itemx ) {

            var data_id             =  itemx.id
            var data_firstName      =  itemx.firstName
            var data_middleName     =  itemx.middleName
            var data_lastName       =  itemx.lastName
            var data_departmentId   =  itemx.departmentId
            if(data_departmentId==1013){
               $($(".Popup_v2 .Center .LibraryList")).append('\
               <div class="LibItem">\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="LibraryItem" value="'+data_id+'" type="checkbox">\
                     <div class="Info">\
                        <span> '+data_firstName+' '+data_middleName+' '+data_lastName+' </span>\
                        <span> '+data_id+' </span>\
                     </div>\
                  </label>\
               </div>\
               ')

               if(TEACHER_ID>0){
                  $('[name="LibraryItem"][value="'+TEACHER_ID+'"]').prop("checked",true)
               }
            }
         })
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      },error: function() {
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         notificationModal("error",pageLang(2280),pageLang(2281))
      }
      })
      
      
   
      
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2282)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2283)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var Error   =  0
         $(".Error>input").parent().removeClass("Error")
         $(".Error>input").parent().parent().removeClass("Error")
         $(".Error>select").parent().removeClass("Error")
         $(".Error>textarea").parent().removeClass("Error")
         $(".ErrorText").remove()
         
         var TEACHER_ID    =  $('[name="LibraryItem"]:checked').val()
         if(TEACHER_ID==undefined){ TEACHER_ID = 0; Error = 0 }
         
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"system/companySchoolroomSelectTeacher",
            dataType: "json",
            data : "companyId="+schoolId+"&schoolroomId="+encodeURIComponent(DATA_ID)+"&teacherId="+encodeURIComponent(TEACHER_ID)+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,pageLang(2280),data.message)
               }else{
                  notificationModal(data.status,pageLang(2280),data.message)
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2280),pageLang(2281))
            }
            })
         }
      });
   }