
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
               <a class="Btn" onclick="popAdd()">  '+pageLang(2287)+' </a>\
               <div class="DropDown">\
                  <i class="fa fa-bars"></i>\
                  <div class="Wind">\
                     <div class="Item"> '+pageLang(2288)+' </div>\
                     <div class="Item"> '+pageLang(2289)+' </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div CD="[[pageSystemNav]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th colspan="3">'+pageLang(2290)+'</th>\
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
      url: systemApp+"system/companyStudent",
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
            var data_firstName      =  itemx.firstName
            var data_middleName     =  itemx.middleName
            var data_lastName       =  itemx.lastName
            var data_gender         =  itemx.gender
            var data_phone          =  itemx.phone
            var data_phoneCode      =  itemx.phoneCode
            var data_phoneCountry   =  itemx.phoneCountry
            var data_studentId      =  itemx.studentId
            var data_schoolroomId   =  itemx.schoolroomId
            var data_schoolroom     =  itemx.schoolroom
            var data_avatar         =  itemx.avatar
   
            $("[CD='[[pageSystemNavTable]]']").append('\
            <tr departmentId="'+data_id+'">\
            <td style="width:60px">'+data_id+'</td>\
            <td style="width:120px"><span class="BoxArea">'+data_schoolroom+'</span></td>\
            <td>\
                  <div class="photoRow">\
                     <div class="Photo"><img src="'+data_avatar+'"></div>\
                     <div class="Info">\
                        <span>'+data_firstName+' '+data_middleName+' '+data_lastName+'</span>\
                        <span><i>'+pageLang(2291)+'</i> '+data_studentId+'</span>\
                     </div>\
                  </div>\
               </td>\
               <td>\
               <div style="display:flex;justify-content: flex-end;">\
                  <div class="TableHideBtnList">\
                  <div class="Btn BtnGreen" onclick="dataEdit('+data_id+')"> <i class="fa fa-pencil"></i> </div>\
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
   
   
   function dataEdit(DATA_ID){
      var WIDTH      =  "center-50"
      var BOX 		   =	2
      var TITLE 		=	pageLang(2292)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
      $('\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2293)+' </label>\
               <input name="FirstName" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2294)+' </label>\
               <input name="MiddleName" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2295)+' </label>\
               <input name="LastName" autocomplete="off">\
            </div>\
         </div>\
      </div>\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2296)+' </label>\
               <div style="display: flex;width: 100%;flex-direction: row;justify-content: flex-start;">\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="Gender" value="1" type="radio">\
                     <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2297)+' </span>\
                  </label>\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="Gender" value="2" type="radio">\
                     <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2298)+' </span>\
                  </label>\
               </div>\
            </div>\
         </div>\
      </div>\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2299)+' </label>\
               <input name="StudentId" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-8 Schoolroom">\
            <div class="FormElements">\
               <label> '+pageLang(2300)+' </label>\
               <select name="SchoolroomId"><option value="0"> '+pageLang(2301)+' </option></select>\
            </div>\
            <div class="Info" style="display: none;flex-direction: row;width: 100%;align-items: center;font-size: 12px;">\
               <i class="fa fa-info" style="color: #ff5722;margin-right: 5px;"></i>\
               <span style="color: #888;">  <strong style="color: #000;cursor:pointer" onclick="LoadView(1966)">'+pageLang(2302)+'</strong>  </span>\
            </div>\
         </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
      
      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $.ajax({
      type: "post",
      url: systemApp+"system/companyStudent",
      dataType: "json",
      data : "id="+DATA_ID+"",
      success: function(data) {
   
         $.each( data.list, function( i, itemx ) {
            var data_id             =  itemx.id
            var data_firstName      =  itemx.firstName
            var data_middleName     =  itemx.middleName
            var data_lastName       =  itemx.lastName
            var data_gender         =  itemx.gender
            var data_phone          =  itemx.phone
            var data_phoneCode      =  itemx.phoneCode
            var data_phoneCountry   =  itemx.phoneCountry
            var data_studentId      =  itemx.studentId
            var data_schoolroomId   =  itemx.schoolroomId
            var data_schoolroom     =  itemx.schoolroom
            var data_avatar         =  itemx.avatar
            
           
            $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").val(data_firstName)
            $(".Popup_v2.B"+BOX+"").find("[name='MiddleName']").val(data_middleName)
            $(".Popup_v2.B"+BOX+"").find("[name='LastName']").val(data_lastName)
            $(".Popup_v2.B"+BOX+"").find("[name='Gender'][value='"+data_gender+"']").prop("checked",true)
            $(".Popup_v2.B"+BOX+"").find("[name='StudentId']").val(data_studentId)
            
            $.ajax({
            type: "post",
            url: systemApp+"system/companySchoolroom",
            dataType: "json",
            data : "companyId="+schoolId+"",
            success: function(data) {
               if(data.status!="error"){
                  if(data.total==0){
                     $(".Schoolroom>.Info").css({"display":"flex"})
                  }
                  $.each( data.list, function( i, itemx ) {
                  $("[name='SchoolroomId']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
                  $(".Popup_v2.B"+BOX+"").find("[name='SchoolroomId']>option[value='"+data_schoolroomId+"']").prop("selected",true)
                  })
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2303),pageLang(2304))
            }
            })
         });
      }
      })
   
      
   
      
      
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2305)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2306)+' </div>\
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
         
         var FirstName        =  $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").val()
         var MiddleName       =  $(".Popup_v2.B"+BOX+"").find("[name='MiddleName']").val()
         var LastName         =  $(".Popup_v2.B"+BOX+"").find("[name='LastName']").val()
         var StudentId        =  $(".Popup_v2.B"+BOX+"").find("[name='StudentId']").val()
         var SchoolroomId     =  $(".Popup_v2.B"+BOX+"").find("[name='SchoolroomId']").val()
         var Gender           =  $(".Popup_v2.B"+BOX+"").find("[name='Gender']:checked").val()
         
         if(Gender==undefined){ Gender = 0 }
         if(Gender==0){ 
            $(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent().parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent())
         }
         if(FirstName==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='FirstName']"))
         }
         if(LastName==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='LastName']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='LastName']"))
         }
         if(StudentId==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='StudentId']").parent().parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Phone']"))
         }
         if(SchoolroomId==0){ 
            $(".Popup_v2.B"+BOX+"").find("[name='SchoolroomId']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Mail']"))
         }
     
   
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"system/companyStudentAdd",
            dataType: "json",
            data : "id="+DATA_ID+"&firstName="+encodeURIComponent(FirstName)+"&middleName="+encodeURIComponent(MiddleName)+"&lastName="+encodeURIComponent(LastName)+"&gender="+encodeURIComponent(Gender)+"&companyNumber="+encodeURIComponent(StudentId)+"&schoolroomId="+encodeURIComponent(SchoolroomId)+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,pageLang(2303),data.message)
               }else{
                  notificationModal(data.status,pageLang(2303),data.message)
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2303),pageLang(2304))
            }
            })
         }
      });
   }
   
   function popAdd(){
      var WIDTH      =  "center-50"
      var BOX 		   =	2
      var TITLE 		=	pageLang(2308)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
      $('\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2293)+' </label>\
               <input name="FirstName" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2294)+' </label>\
               <input name="MiddleName" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2295)+' </label>\
               <input name="LastName" autocomplete="off">\
            </div>\
         </div>\
      </div>\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2296)+' </label>\
               <div style="display: flex;width: 100%;flex-direction: row;justify-content: flex-start;">\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="Gender" value="1" type="radio">\
                     <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2297)+' </span>\
                  </label>\
                  <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                     <input name="Gender" value="2" type="radio">\
                     <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2298)+' </span>\
                  </label>\
               </div>\
            </div>\
         </div>\
      </div>\
      <div class="row">\
         <div class="col-md-4">\
            <div class="FormElements">\
               <label> '+pageLang(2299)+' </label>\
               <input name="StudentId" autocomplete="off">\
            </div>\
         </div>\
         <div class="col-md-8 Schoolroom">\
            <div class="FormElements">\
               <label> '+pageLang(2300)+' </label>\
               <select name="SchoolroomId"><option value="0"> '+pageLang(2301)+' </option></select>\
            </div>\
            <div class="Info" style="display: none;flex-direction: row;width: 100%;align-items: center;font-size: 12px;">\
               <i class="fa fa-info" style="color: #ff5722;margin-right: 5px;"></i>\
               <span style="color: #888;">  <strong style="color: #000;cursor:pointer" onclick="LoadView(1966)">'+pageLang(2302)+'</strong>  </span>\
            </div>\
         </div>\
      </div>\
      ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
      
      $(".Popup_v2.B"+BOX+"").addClass("Loading")
      $.ajax({
      type: "post",
      url: systemApp+"system/companySchoolroom",
      dataType: "json",
      data : "companyId="+schoolId+"",
      success: function(data) {
         if(data.status!="error"){
            if(data.total==0){
               $(".Schoolroom>.Info").css({"display":"flex"})
            }
            $.each( data.list, function( i, itemx ) {
            $("[name='SchoolroomId']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
            })
         }
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      },error: function() {
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         notificationModal("error",pageLang(2303),pageLang(2304))
      }
      })
   
      
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2305)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2306)+' </div>\
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
         
         var FirstName        =  $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").val()
         var MiddleName       =  $(".Popup_v2.B"+BOX+"").find("[name='MiddleName']").val()
         var LastName         =  $(".Popup_v2.B"+BOX+"").find("[name='LastName']").val()
         var StudentId        =  $(".Popup_v2.B"+BOX+"").find("[name='StudentId']").val()
         var SchoolroomId     =  $(".Popup_v2.B"+BOX+"").find("[name='SchoolroomId']").val()
         var Gender           =  $(".Popup_v2.B"+BOX+"").find("[name='Gender']:checked").val()
         
         if(Gender==undefined){ Gender = 0 }
         if(Gender==0){ 
            $(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent().parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent())
         }
         if(FirstName==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='FirstName']"))
         }
         if(LastName==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='LastName']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='LastName']"))
         }
         if(StudentId==""){ 
            $(".Popup_v2.B"+BOX+"").find("[name='StudentId']").parent().parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Phone']"))
         }
         if(SchoolroomId==0){ 
            $(".Popup_v2.B"+BOX+"").find("[name='SchoolroomId']").parent().addClass("Error"); 
            Error = 1 
            $("<div class='ErrorText'> * "+pageLang(2307)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Mail']"))
         }
     
   
         if(Error==0){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"system/companyStudentAdd",
            dataType: "json",
            data : "companyId="+schoolId+"&firstName="+encodeURIComponent(FirstName)+"&middleName="+encodeURIComponent(MiddleName)+"&lastName="+encodeURIComponent(LastName)+"&gender="+encodeURIComponent(Gender)+"&companyNumber="+encodeURIComponent(StudentId)+"&schoolroomId="+encodeURIComponent(SchoolroomId)+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,pageLang(2303),data.message)
               }else{
                  notificationModal(data.status,pageLang(2303),data.message)
                  List()
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2303),pageLang(2304))
            }
            })
         }
      });
   }
   
   
   function creatPassword(){
      var Num = Math.random().toString(36).slice(-6);
      $("[name='Password']").val(Num)
   }
   
   
   function dataDelete(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2309)
      var SUBTITLE	=	pageLang(2310)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
   
   
      $(".Popup_v2.B"+BOX+"").find(".Center").remove()
   
      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2305)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2306)+' </div>\
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
               notificationModal(data.status,pageLang(2303),data.message)
            }else{
               notificationModal(data.status,pageLang(2303),data.message)
               List()
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            }
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         },error: function() {
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            notificationModal("error",pageLang(2303),pageLang(2304))
         }
         });
      });
   }