
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
            <a class="Btn" onclick="popAdd()">  '+pageLang(1967)+' </a>\
            <div class="DropDown">\
               <i class="fa fa-bars"></i>\
               <div class="Wind">\
                  <div class="Item"> '+pageLang(2244)+' </div>\
                  <div class="Item"> '+pageLang(2245)+' </div>\
               </div>\
            </div>\
         </div>\
      </div>\
      <div class="col-12 ">\
         <div CD="[[pageSystemNav]]" style="display:none">\
            <table class="table">\
               <thead>\
                  <tr>\
                     <th colspan="2">'+pageLang(2246)+'</th>\
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
   url: systemApp+"system/companyPersonal",
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
         var data_mail           =  itemx.mail
         var data_departmentId   =  itemx.departmentId

         $("[CD='[[pageSystemNavTable]]']").append('\
         <tr departmentId="'+data_id+'">\
            <td style="width:160px"><span class="BoxArea Box'+departmentColor(data_departmentId)+'">'+departmentName(data_departmentId)+'</span></td>\
            <td>\
               <div class="twoRow">\
                  <span>'+data_firstName+' '+data_middleName+' '+data_lastName+'</span>\
                  <span><i class="fa fa-envelope"></i> '+data_mail+'</span>\
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
   var TITLE 		=	pageLang(2247)
   var SUBTITLE	=	""
   var nonTITLE   =  1
   var nonCLOSE   =  1
   popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

   $('\
   <div class="row">\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2248)+' </label>\
            <input name="FirstName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2249)+' </label>\
            <input name="MiddleName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label>'+pageLang(2250)+' </label>\
            <input name="LastName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2251)+' </label>\
            <div style="display: flex;width: 100%;flex-direction: row;justify-content: flex-start;">\
               <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                  <input name="Gender" value="1" type="radio">\
                  <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2252)+' </span>\
               </label>\
               <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                  <input name="Gender" value="2" type="radio">\
                  <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2253)+' </span>\
               </label>\
            </div>\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2254)+' </label>\
            <input name="Mail" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2255)+' </label>\
            <input name="Phone" id="phone" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2256)+' </label>\
            <select name="Department"><option value="0"> '+pageLang(2257)+' </option></select>\
         </div>\
      </div>\
   </div>\
   ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

   $(".Popup_v2.B"+BOX+"").addClass("Loading")
   $.ajax({
   type: "post",
   url: systemApp+"system/companyPersonal",
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
         var data_mail           =  itemx.mail
         var data_departmentId   =  itemx.departmentId
         
         
         var input = document.querySelector("#phone");
         window.intlTelInput(input, {
         preferredCountries: [""+data_phoneCountry.toLowerCase()+""],
         utilsScript: "/Librarys/Js/telInputUtlis.js",
         });
         
        
         $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").val(data_firstName)
         $(".Popup_v2.B"+BOX+"").find("[name='MiddleName']").val(data_middleName)
         $(".Popup_v2.B"+BOX+"").find("[name='LastName']").val(data_lastName)
         $(".Popup_v2.B"+BOX+"").find("[name='Phone']").val(data_phone)
         $(".Popup_v2.B"+BOX+"").find("[name='Mail']").val(data_mail)
         $(".Popup_v2.B"+BOX+"").find("[name='Gender'][value='"+data_gender+"']").prop("checked",true)

         $.ajax({
         type: "post",
         url: systemApp+"system/department",
         dataType: "json",
         data : "type=6",
         success: function(data) {
            if(data.status!="error"){
               $.each( data, function( i, itemx ) {
                  $("[name='Department']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
                  $(".Popup_v2.B"+BOX+"").find("[name='Department']>option[value='"+data_departmentId+"']").prop("selected",true)
               })
            }
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         },error: function() {
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            notificationModal("error",pageLang(2258),pageLang(2259))
         }
         })
      });
      
      
   }
   })

   

   
   
   $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2260)+' </div>\
   <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2261)+' </div>\
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
      var Phone            =  $(".Popup_v2.B"+BOX+"").find("[name='Phone']").val()
      var Mail             =  $(".Popup_v2.B"+BOX+"").find("[name='Mail']").val()
      var Gender           =  $(".Popup_v2.B"+BOX+"").find("[name='Gender']:checked").val()
      var Department       =  $(".Popup_v2.B"+BOX+"").find("[name='Department']").val()
      var PhoneCountryCode =  $(".iti__country.iti__active .iti__dial-code").attr("data-country-code")
      var PhoneCode        =  $(".iti__country.iti__active .iti__dial-code").html()
      
      if(Gender==undefined){ Gender = 0 }

      if(Gender==0){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent().parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent())
      }
      if(FirstName==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='FirstName']"))
      }
      if(LastName==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='LastName']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='LastName']"))
      }
      if(Phone==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Phone']").parent().parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Phone']"))
      }
      if(Mail==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Mail']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Mail']"))
      }
      if(Department==0){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Department']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Department']"))
      }

      if(Error==0){
         $(".Popup_v2.B"+BOX+"").addClass("Loading")
         $.ajax({
         type: "post",
         url: systemApp+"system/companyPersonalEdit",
         dataType: "json",
         data : "id="+DATA_ID+"&firstName="+encodeURIComponent(FirstName)+"&middleName="+encodeURIComponent(MiddleName)+"&lastName="+encodeURIComponent(LastName)+"&gender="+encodeURIComponent(Gender)+"&mail="+encodeURIComponent(Mail)+"&phone="+encodeURIComponent(Phone)+"&phoneCode="+encodeURIComponent(PhoneCode)+"&phoneCountry="+encodeURIComponent(PhoneCountryCode)+"&departmentId="+encodeURIComponent(Department)+"",
         success: function(data) {
            if(data.status=="error"){
               notificationModal(data.status,pageLang(2258),data.message)
            }else{
               notificationModal(data.status,pageLang(2258),data.message)
               List()
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            }
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         },error: function() {
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            notificationModal("error",pageLang(2258),pageLang(2259))
         }
         })
      }
   });
}

function popAdd(){
   var WIDTH      =  "center-50"
   var BOX 		   =	2
   var TITLE 		=	pageLang(2263)
   var SUBTITLE	=	""
   var nonTITLE   =  1
   var nonCLOSE   =  1
   popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

   $('\
   <div class="row">\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2248)+' </label>\
            <input name="FirstName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2249)+' </label>\
            <input name="MiddleName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2250)+' </label>\
            <input name="LastName" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-4">\
         <div class="FormElements">\
            <label> '+pageLang(2251)+' </label>\
            <div style="display: flex;width: 100%;flex-direction: row;justify-content: flex-start;">\
               <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                  <input name="Gender" value="1" type="radio">\
                  <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2252)+' </span>\
               </label>\
               <label class="ckbox" style="display: flex;align-items: center;margin-right: 20px;">\
                  <input name="Gender" value="2" type="radio">\
                  <span class="tx-13" style="margin-left: 5px;"> '+pageLang(2253)+' </span>\
               </label>\
            </div>\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2254)+' </label>\
            <input name="Mail" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2255)+' </label>\
            <input name="Phone" id="phone" autocomplete="off">\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2264)+'</label>\
            <input name="Password" autocomplete="off">\
            <div class="BtnFixed" onclick="creatPassword()"> '+pageLang(2265)+' </div>\
         </div>\
      </div>\
      <div class="col-md-12">\
         <div class="FormElements">\
            <label> '+pageLang(2256)+'</label>\
            <select name="Department"><option value="0"> '+pageLang(2257)+' </option></select>\
         </div>\
      </div>\
   </div>\
   ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

   $(".Popup_v2.B"+BOX+"").addClass("Loading")
   $.ajax({
   type: "post",
   url: systemApp+"system/department",
   dataType: "json",
   data : "type=6",
   success: function(data) {
      $.each( data, function( i, itemx ) {
      $("[name='Department']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
      })
      $(".Popup_v2.B"+BOX+"").removeClass("Loading")
   }
   })

   var input = document.querySelector("#phone");
   window.intlTelInput(input, {
   utilsScript: "/Librarys/Js/telInputUtlis.js",
   });
   
   $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2260)+' </div>\
   <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2261)+' </div>\
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
      var Phone            =  $(".Popup_v2.B"+BOX+"").find("[name='Phone']").val()
      var Mail             =  $(".Popup_v2.B"+BOX+"").find("[name='Mail']").val()
      var Gender           =  $(".Popup_v2.B"+BOX+"").find("[name='Gender']:checked").val()
      var Password         =  $(".Popup_v2.B"+BOX+"").find("[name='Password']").val()
      var Department       =  $(".Popup_v2.B"+BOX+"").find("[name='Department']").val()
      var PhoneCountryCode =  $(".iti__country.iti__active .iti__dial-code").attr("data-country-code")
      var PhoneCode        =  $(".iti__country.iti__active .iti__dial-code").html()
      
      if(Gender==undefined){ Gender = 0 }

      if(Gender==0){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent().parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Gender']").parent().parent())
      }
      if(FirstName==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='FirstName']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='FirstName']"))
      }
      if(LastName==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='LastName']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='LastName']"))
      }
      if(Phone==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Phone']").parent().parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Phone']"))
      }
      if(Mail==""){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Mail']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Mail']"))
      }
      if(Department==0){ 
         $(".Popup_v2.B"+BOX+"").find("[name='Department']").parent().addClass("Error"); 
         Error = 1 
         $("<div class='ErrorText'> * "+pageLang(2262)+" </div>").insertAfter($(".Popup_v2.B"+BOX+"").find("[name='Department']"))
      }

      if(Error==0){
         $(".Popup_v2.B"+BOX+"").addClass("Loading")
         $.ajax({
         type: "post",
         url: systemApp+"system/companyPersonalAdd",
         dataType: "json",
         data : "companyId="+schoolId+"&firstName="+encodeURIComponent(FirstName)+"&middleName="+encodeURIComponent(MiddleName)+"&lastName="+encodeURIComponent(LastName)+"&gender="+encodeURIComponent(Gender)+"&mail="+encodeURIComponent(Mail)+"&password="+encodeURIComponent(Password)+"&phone="+encodeURIComponent(Phone)+"&phoneCode="+encodeURIComponent(PhoneCode)+"&phoneCountry="+encodeURIComponent(PhoneCountryCode)+"&departmentId="+encodeURIComponent(Department)+"",
         success: function(data) {
            if(data.status=="error"){
               notificationModal(data.status,pageLang(2258),data.message)
            }else{
               notificationModal(data.status,pageLang(2258),data.message)
               List()
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            }
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         },error: function() {
            $(".Popup_v2.B"+BOX+"").removeClass("Loading")
            notificationModal("error",pageLang(2258),pageLang(2259))
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
   var TITLE 		=	pageLang(1889)
   var SUBTITLE	=	pageLang(1890)
   var nonTITLE   =  1
   var nonCLOSE   =  1
   popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



   $(".Popup_v2.B"+BOX+"").find(".Center").remove()

   $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(1891)+' </div>\
   <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(1892)+'</div>\
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
            notificationModal(data.status,pageLang(1893),data.message)
         }else{
            notificationModal(data.status,pageLang(1893),data.message)
            List()
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         }
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
      },error: function() {
         $(".Popup_v2.B"+BOX+"").removeClass("Loading")
         notificationModal("error",pageLang(2258),pageLang(2259))
      }
      });
   });
}