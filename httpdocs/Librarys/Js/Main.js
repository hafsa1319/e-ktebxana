var closedSystem = 0
var systemApp           =  "https://api.hafsasoftware.eu/library"
var userConnect         =  $.cookie("uConnect")
var cdnDefaultPath      =  "ektebxana"
var cdnDefaultUrl       =  "https://s3.hafsa.de/files/ektebxana/"


var userLang         = localStorage.getItem("systemUserLanguage")
if(userLang==null){ userLang = "EN" }
localStorage.setItem("systemUserLanguage",userLang)
var system_URL       = window.location.pathname
system_URL           = system_URL.replace("/","").replace("/","").replace("/","")

var appPath          = "https://api.hafsasoftware.eu/library"
var versionUpdate    = (new Date()).getTime();  

$('<div class="Loading"><img src="/Librarys/Img/eLoading.gif"></div>').appendTo("body")

function Loading(){
   $('<div class="Loading"><img src="/Librarys/Img/eLoading.gif"></div>').appendTo("body")
}

var TokenControl = new URLSearchParams(window.location.search);
var token = TokenControl.get('token')
if(token==undefined){ token = "" }
if(token!=""){

   var systemUser = JSON.parse(localStorage.getItem("systemUser"))
   if(systemUser==null){ systemUser = ""}

   $.ajax({
   type: "get",
   url: "https://www.e-parwarda.com/api/MOE/GetStudentInfo?token="+token.replace('%20',' ')+"",
   async:false,
   data : "",
   success: function(data) {
      console.log(data)
      console.log(data.Succcess)
      if(data.Succcess==false){
         $.ajax({
         type: "get",
         url: "https://www.e-parwarda.com/api/MOE/GetTeacherInfo?token="+token.replace('%20',' ')+"",
         async:false,
         data : "",
         success: function(data) {
            if(data.Succcess!=false){
               xxx_ID         =  data.Id
               xxx_FULL_NAME  =  data.FullName
               xxx_GENDER     =  data.Gender
               xxx_SCHOOL_ID  =  data.SchoolId
               xxx_SCHOOL_NAME=  data.SchoolName
               xxx_CLASS      =  ""
               $.each( data.Classes, function( i, itemx ) {
                  var xx_ClassId    =  itemx.ClassId
                  var xx_ClassName  =  itemx.ClassName
                  
                  xxx_CLASS = xxx_CLASS + xx_ClassId+"|"+xx_ClassName+"@@"
               });
               xxx_CLASS = xxx_CLASS.slice(0,-2)
               
               $.ajax({
               type: "post",
               url: appPath+"user/token",
               dataType: "json",
               async:false,
               data : "type=teacher&id="+xxx_ID+"&UserLang="+userLang+"&name="+xxx_FULL_NAME+"&classList="+xxx_CLASS+"&schoolId="+xxx_SCHOOL_ID+"&schoolName="+xxx_SCHOOL_NAME+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,defaultLang(2519),data.message)
                  }else{
                     localStorage.setItem("systemUser",JSON.stringify(data))
                     $.cookie("uConnect",true,{expires:90,path:'/'})
                     window.location.href="/"
                  }
               }
               });
            }
         }
         });
      }else{
         xxx_ID         =  data.Id
         xxx_CLASS_ID   =  data.ClassId
         xxx_CLASS_NAME =  data.ClassName
         xxx_FULL_NAME  =  data.FullName
         xxx_GENDER     =  data.Gender
         xxx_SCHOOL_ID  =  data.SchoolId
         xxx_SCHOOL_NAME=  data.SchoolName

            $.ajax({
            type: "post",
            url: appPath+"user/token",
            dataType: "json",
            async:false,
            data : "type=student&id="+xxx_ID+"&UserLang="+userLang+"&name="+xxx_FULL_NAME+"&classId="+xxx_CLASS_ID+"&className="+xxx_CLASS_NAME+"&schoolId="+xxx_SCHOOL_ID+"&schoolName="+xxx_SCHOOL_NAME+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,defaultLang(2519),data.message)
               }else{
                  localStorage.setItem("systemUser",JSON.stringify(data))
                  $.cookie("uConnect",true,{expires:90,path:'/'})
                  window.location.href="/"
               }
            }
            });
      }
   }
   });

   
}

var pageID     =  0
var pageTOP_ID =  0

if(localStorage.getItem("systemUser")!=null){
   var systemUser = JSON.parse(localStorage.getItem("systemUser"))
   var userType   = systemUser.type

   if(userType=="customer"){
      var userId     = systemUser.customerId
   }else{
      var userId     = systemUser.id
   }
   if(userId==null | userId=="" | userId==undefined){ userId = 0 }
   $("body").addClass(userType)
   
}else{
   $.cookie("uConnect",false,{expires:-90,path:'/'})
   localStorage.removeItem("systemUserType")
   localStorage.removeItem("systemHomePage")
   localStorage.removeItem("systemUser")
   localStorage.removeItem("systemNav")
}

   $.when(AllLanguageSet(),CodeResume()).done(function(AllLanguageSet,CodeResume){
   });

   function AllLanguageSet(){
      localStorage.removeItem("allLanguage")
      if(localStorage.getItem("allLanguage")==null){
         return $.ajax({
         type: "post",
         url: "/Librarys/Language/AllLang.json",
         dataType: "json",
         async:false,
         data : "",
         success: function(data) {
            localStorage.setItem("allLanguage",JSON.stringify(data))
         }
         }); 
      }else{
         return "Ok"
      }
   }

   function CodeResume(){
      if(system_URL=="logout"){
         $.cookie("uConnect",false,{expires:-90,path:'/'})
         localStorage.removeItem("systemUserType")
         localStorage.removeItem("systemHomePage")
         localStorage.removeItem("systemUser")
         localStorage.removeItem("systemNav")
         window.location.href="/login"
      }
      if(system_URL!="login"){
         if(userConnect!="true"){
            window.location.href="/login"
         }else{
            var pagePermission = 0
            system_URL = "/"+system_URL
            var toReturn; 
            $.each(systemUser.nav, function( i, itemx,event ) {
               var xx_ID      =  itemx.id
               var xx_TOPID   =  itemx.topId
               var xx_NAME    =  itemx.name
               var xx_ICON    =  itemx.icon
               var xx_URL     =  itemx.url
               var xx_PATH    =  itemx.path.replace("html","js")
               
               if(system_URL==xx_URL){
                  if(xx_ID==1846){ xx_ID = 1802 }
                  sessionStorage.setItem("pageID",xx_ID)
                  sessionStorage.setItem("pageTOP_ID",xx_TOPID)
                  pagePermission = 1
                  
                  var randomnos = Math.ceil(Math.random() * 1000000000);
                  var mysource = xx_PATH+"?"+randomnos+"";

                  if(userType=="student"){
                     $("body").css({"background-image":"url("+systemUser.user.background+")"})
                  }
                  funHead()
                  funNav()
                  pageView(xx_ID)
                  return false
               }
            });
            if(pagePermission==0){
               window.location.href="/non"
            }
         }
      }else{
         Login()
         $(window).scroll(function(){
            var WH = parseInt($(window).height())-1
            $(".PageLogin").css({"height":WH+"px"})
         });
      }
   }

   

   
   function pageView(PAGE_ID){
      var PagePath = ""
      $.each(systemUser.nav, function( i, itemx,event ) {
         var xx_ID      =  itemx.id
         var xx_TOPID   =  itemx.topId
         var xx_NAME    =  itemx.name
         var xx_ICON    =  itemx.icon
         var xx_URL     =  itemx.url
         var xx_PATH    =  itemx.path.replace("html","js")
         
         if(xx_ID==PAGE_ID){
            var randomnos = Math.ceil(Math.random() * 1000000000);
            PagePath = xx_PATH+"?"+randomnos+"";
         }
      });

      $("script#"+PAGE_ID+"").remove()
      $(".PageContentArea").html("")
      $.ajax({
      type: "post",
      url: "/Librarys/Language/navLang_"+PAGE_ID+".json",
      dataType: "json",
      data : "pageId="+sessionStorage.getItem("pageID")+"&language="+localStorage.getItem("systemUserLanguage")+"",
      success: function(data) {
         sessionStorage.setItem("pageLanguage",JSON.stringify(data))
         var script = document.createElement('script');
         script.id = PAGE_ID;
         script.src = PagePath;
         document.head.appendChild(script);
         $(".Loading").fadeOut(1000)
      }
      }); 
   }

   setTimeout(function () {
      var WH = parseInt($(window).height())
      $(".PageContentArea").css({"min-height":WH+"px"})
      $('<div class="Footer">Powered by Stirling Schools - 2022 ©</div>').appendTo("body")
   }, 2000);


   function defaultLang(DATA_ID){
      if(localStorage.getItem("allLanguage")!=null){
         var data = JSON.parse(localStorage.getItem("allLanguage"))
         if(localStorage.getItem("allLanguage").indexOf(""+DATA_ID+"_"+userLang+"")!=-1){
            return data.list[0]["text_"+DATA_ID+"_"+userLang+""]
         }else{
            console.log(localStorage.getItem("allLanguage").indexOf(""+DATA_ID+"_"))
            if(localStorage.getItem("allLanguage").indexOf(""+DATA_ID+"_")!=-1){
               return data.list[0]["text_"+DATA_ID+"_"]
            }else{
               return "---"
            }
         }
      }else{
         return "---"
      }
   }

   function pageLang(DATA_ID){
      if(sessionStorage.getItem("pageLanguage")!=null){
         var data = JSON.parse(sessionStorage.getItem("pageLanguage"))
         if(sessionStorage.getItem("pageLanguage").indexOf(""+DATA_ID+"_"+userLang+"")!=-1){
            return data.list[0]["text_"+DATA_ID+"_"+userLang+""]
         }else{
            if(sessionStorage.getItem("pageLanguage").indexOf(""+DATA_ID+"_")!=-1){
               return data.list[0]["text_"+DATA_ID+"_"]
            }else{
               return "---"
            }
         }
      }else{
         return "---"
      }
   }

   function Login(){
      $("body").attr("Page","login")
      $('<article>\
      <div class="PageLogin">\
         <div class="LoginContainer">\
            <div class="row" style="background: #fff;padding: 20px;border-radius: 8px">\
               <div class="col-12">\
                  <div class="PageTitle">\
                  <div>'+defaultLang(2051)+'</div>\
                  <div class="LanguageBar">\
                     <span>  </span>\
                     <div class="Wind">\
                        <span class="LangItem" T="SO" onclick=userlanguage("SO")>\
                           <div> سۆرانی </div>\
                        </span>\
                        <span class="LangItem" T="BA" onclick=userlanguage("BA")>\
                           <div> بادینی </div>\
                        </span>\
                        <span class="LangItem" T="EN" onclick=userlanguage("EN")>\
                           <div> English</div>\
                        </span>\
                        <span class="LangItem" T="AR" onclick=userlanguage("AR")>\
                           <div> عربي </div>\
                        </span>\
                        <span class="LangItem" T="DE" onclick=userlanguage("DE")>\
                           <div> Deutsch </div>\
                        </span>\
                        <span class="LangItem" T="TR" onclick=userlanguage("TR")>\
                           <div> Türkçe </div>\
                        </span>\
                     </div>\
                  </div>\
                  </div>\
                  <div class="FormElement">\
                     <span>'+defaultLang(2052)+'</span>\
                     <input name="UserName">\
                  </div>\
                  <div class="FormElement">\
                     <span>'+defaultLang(2053)+'</span>\
                     <input name="Password" type="password">\
                  </div>\
               </div>\
               <div class="col-12">\
                  <div class="d-flex">\
                     <div class="FormElement" style="margin:0">\
                        <span>'+defaultLang(2054)+'</span>\
                     </div>\
                     <div class="Btn BtnLogin"> '+defaultLang(2055)+' </div>\
                  </div>\
               </div>\
            </div>\
            <div class="row">\
               <div class="LoginBottom"></div>\
            </div>\
         </div>\
      </div>\
      </article>\
      ').appendTo(".PageContentArea")

      var LanguageName = $(".LanguageBar .LangItem[T='"+localStorage.getItem("systemUserLanguage")+"']").html()
      $(".LanguageBar>span").html(LanguageName)
      $(".Loading").fadeOut(1000)

      $(".Btn.BtnLogin").click(function(){
         var UserName      = $("[name='UserName']").val()
         var Password      = $("[name='Password']").val()
         var Error         = 0

         if(UserName==""){ Error = 1; $("[name='UserName']").addClass("Error") }
         if(Password==""){ Error = 1; $("[name='Password']").addClass("Error") }

         if(Error==0){
            
            $.ajax({
            type: "post",
            url: appPath+"user/login",
            dataType: "json",
            data : "mail="+UserName+"&password="+Password+"&language="+userLang+"",
            success: function(data) {
               if(data.status=="error"){
                  notificationModal(data.status,"Bilgilendirme",data.message)
               }else{
                  localStorage.setItem("systemUser",JSON.stringify(data))
                  $.cookie("uConnect",true,{expires:90,path:'/'})
                  window.location.href="/"
               }
            }
            });
         }
         
      })

   }


   var pagePath         =  ""
   var pageUrl          =  ""
   var setLanguage      =  ""
   var setLanguageList  =  ""
   var setMods          =  ""
   var setLogo          =  ""

   



   if(localStorage.getItem("library")=="null"){
      $.ajax({
      type: "post",
      url: systemApp+"system/library",
      dataType: "json",
      data : "comId="+COM_ID+"&language="+userLang+"",
      success: function(data) {
         localStorage.setItem("library",JSON.stringify(data.library[0]))
      }
      });
   }
   

   function userRehresh(){
      Loading()
      if(userConnect=="true"){
         $.ajax({
         type: "post",
         url: systemApp+"user/login",
         dataType: "json",
         data : "type="+systemUser.type+"&id="+systemUser.user.id+"&language="+localStorage.getItem("systemUserLanguage")+"",
         success: function(data) {
            if(data.status=="error"){
               notificationBox(data.status,data.message)
            }else{
               localStorage.setItem("systemUser",JSON.stringify(data))

               $.ajax({
               type: "post",
               url: "/Librarys/Language/AllLang.json",
               dataType: "json",
               async:false,
               data : "pageId="+sessionStorage.getItem("pageID")+"&language="+localStorage.getItem("systemUserLanguage")+"",
               success: function(data) {
                  localStorage.setItem("allLanguage",JSON.stringify(data))
                  window.location.reload()
                  $(".Loading").fadeOut(1000)
               }
               }); 
               
            }
         }
         });
      }else{
         window.location.reload()
      }
   }

   function userlanguage(LANG){
      Loading()
      localStorage.setItem("systemUserLanguage",LANG)
      userRehresh()
   }
   

   $(document).on("click","input,textarea,select",function(){
      $(this).removeClass("is-invalid")
   })


   function popupRightTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE) {
      if(BOX==undefined){BOX=1}
      if(nonTITLE==undefined){nonTITLE=1}
      if(nonCLOSE==undefined){nonCLOSE=1}
      if(WIDTH==undefined){WIDTH="w40"}
      $(".Popup_v2.B"+BOX+"").remove();
      
      $('\
      <div class="Popup_v2 RightPopup B'+BOX+'">\
      <div class="Modal '+WIDTH+'">\
      <div class="Htm">\
      <div class="Document">\
         <div class="Close fas fa-times" style="display:none"></div>\
         <div class="Title">\
            <div class="Big" style="display:none">'+TITLE+'</div>\
            <div class="S" style="display:none">'+SUBTITLE+'</div>\
         </div>\
         <div class="Center"></div>\
      </div>\
      </div>\
      </div>\
      </div>\
      ').appendTo("body");
      
      if(nonTITLE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Title>.Big").show() }
      if(nonTITLE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Title>.S").show() }
      if(nonCLOSE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Close").show() }


      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Close").click(function(){
      $(".Popup_v2.B"+BOX+"").remove();
      $("Body").css({"overflow":"visible"});
      });

      var WH = parseInt($(window).height())-200
      $(".Popup_v2>.Modal>.Htm>.Document>.Center").css({"max-height":WH+"px"})
   }


   function popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE) {
      if(BOX==undefined){BOX=1}
      if(nonTITLE==undefined){nonTITLE=1}
      if(nonCLOSE==undefined){nonCLOSE=1}
      if(WIDTH==undefined){WIDTH="w40"}
      $(".Popup_v2.B"+BOX+"").remove();
      
      $('\
      <div class="Popup_v2 B'+BOX+'">\
      <div class="Modal '+WIDTH+'">\
      <div class="Htm">\
      <div class="Document">\
         <div class="Close fas fa-times" style="display:none"></div>\
         <div class="Title">\
            <div class="Big" style="display:none">'+TITLE+'</div>\
            <div class="S" style="display:none">'+SUBTITLE+'</div>\
         </div>\
         <div class="Center"></div>\
         <div class="Bottom">\
            <div class="column Left"></div>\
            <div class="column Right"></div>\
         </div>\
      </div>\
      </div>\
      </div>\
      </div>\
      ').appendTo("body");
      
      if(nonTITLE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Title>.Big").show() }
      if(nonTITLE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Title>.S").show() }
      if(nonCLOSE==1){ $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Close").show() }

      var WW = parseInt($(window).width())
      if(WW<780){
      $(".Popup_v2").click(function(event) {
         if (!$(event.target).closest(".Popup_v2 .Modal.Active .Htm .Document").length) {
            $(".Popup_v2.B"+BOX+">.ReadyBook").removeClass("Active").delay(300).queue(function() {
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });
         }
      });
      }

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Close").click(function(){
         if(WW>780){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         }else{
            $(".Popup_v2.B"+BOX+">.ReadyBook").removeClass("Active").delay(300).queue(function() {
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });
         }
      });

      var WH = parseInt($(window).height())-200
      $(".Popup_v2>.Modal>.Htm>.Document>.Center").css({"max-height":WH+"px"})
   }

   function contentLanguage(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	2
      var TITLE 		=	""
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)


      

      $.ajax({
      type: "post",
      url: systemApp+"system/contentLanguageItem",
      dataType: "json",
      data : "id="+encodeURIComponent(DATA_ID)+"",
      success: function(data) {

         $.each( data.list, function( i, itemx ) {
            var data_ID          =  itemx.id
            var data_TEXT        =  itemx.text
            var data_LANGUAGE    =  itemx.language
            var data_FLAG        =  itemx.flag
            
               $('\
               <div class="row row-xs align-items-center mg-b-20">\
               <div class="col-md-12" style="display: flex;align-content: center;align-items: center;">\
                  <label class="mg-b-0" style="width:40px;border-radius: 4px 0px 0px 4px;overflow: hidden;">'+data_LANGUAGE+'</label>\
                  <input class="form-control" name="TEXT" value="'+data_TEXT+'" LANG="'+data_LANGUAGE+'" placeholder="" type="text">\
               </div>\
               </div>\
               ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
               if(i==0){
                  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='TEXT']").focus()
               }
         });
         
      }
      });

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+defaultLang(2174)+' </div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+defaultLang(2175)+'</div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
         var LIST          =  ""
         var Error         =  0

         $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='TEXT']").each(function(){
            if($(this).val()!=""){
               LIST = LIST + $(this).val()+"||"+$(this).attr("LANG")+"@@"
            }
         })

         
         if(Error==0){
            $.ajax({
            type: "post",
            url: systemApp+"system/contentLanguageUpdate",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"&list="+encodeURIComponent(LIST)+"",
            success: function(data) {
               createAllLang()
               if(data.lang!=""){
                  var LAI        =  data.lang.split(",")
                  var langList   =  ""
                  for(ii=0;ii<LAI.length-1;ii++){
                     langList = langList + "<span>"+sessionStorage.getItem("lang_"+LAI[ii]+"")+"</span>"
                  }
                  $("tr[dataId='"+DATA_ID+"']").find(".LangList").html(langList)
               }
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            }
            });
         }
      });
   }

   

      
   function createAllLang(){
      $.ajax({
      type: "post",
      url: systemApp+"system/allLanguage",
      dataType: "json",
      data : "",
      success: function(msg) {
         $.ajax({
         type: "post",
         url: "/Librarys/Language/phpNavLanguage.php",
         dataType: "json",
         data : "Name=AllLang.json&Keyword="+JSON.stringify(msg)+"",
         success: function(msg) {
         }
         });
         notificationModal("success",defaultLang(2519),defaultLang(2520))
      }
      });
   }
   
   // <link rel="stylesheet" href="https://www.jqueryscript.net/demo/voice-audio-recorder/manage-audio.css">



$(document).on("click","input,select,textarea",function(){
   $(this).removeClass("Error")
   $(".Error radio").closest(".Error").removeClass("Error")
   $(".Error input").closest(".Error").removeClass("Error")
   $(".Error select").closest(".Error").removeClass("Error")
   $(".Error textarea").closest(".Error").removeClass("Error")
   $(".ErrorText").remove()
})

function PageTitle(){
   var pageID     = sessionStorage.getItem("pageID")
   var pageTOP_ID = sessionStorage.getItem("pageTOP_ID")

   var systemUser = JSON.parse(localStorage.getItem("systemUser"))
   var userType   = systemUser.type

   var Bredcrumbs = ""
   $.each( systemUser.nav, function( i, itemx ) {
      var xx_ID      =  itemx.id
      var xx_TOPID   =  itemx.topId
      var xx_NAME    =  itemx.name
      var xx_DESC    =  itemx.name
      var xx_ICON    =  itemx.icon
      var xx_URL     =  itemx.url
      var xx_VIEW    =  itemx.view

      if(xx_ID==pageID){
         Bredcrumbs = xx_NAME
      }
   });
   var Html =  '<a onclick="history.back()" class="pageBtnBack">\
      <i class="fa fa-chevron-left"></i>\
      <span> '+defaultLang(1961)+' </span>\
   </a>\
   <div class="Breadcrumb">\
      <span class="Navi">\
         <i class="fa fa-home"></i>\
         <span> '+defaultLang(1828)+' ></span>\
      </span>\
      <span class="pageName">'+Bredcrumbs+'</span>\
   </div>'
   return Html;
}

function TableSearch(){
   return '<a class="BtnSearch" S="0">\
      <div class="SearchArea">\
         <input name="TableSearch">\
      </div>\
      <i class="fa fa-search"></i>\
   </a>'
}

$(document).on("click",".BtnSearch>i",function(){
   var S = $(this).parent().attr("S")
   if(S==0){
      $(this).parent().addClass("Active").attr("S",1)
      $("[name='TableSearch']").focus()
   }else{
      $(this).parent().removeClass("Active").attr("S",0)
   }
})
$(document).click(function(event) {
   if (!$(event.target).is(".BtnSearch>i,.SearchArea>input")) {
       $(".BtnSearch").removeClass("Active").attr("S",0);
   }
});

$(document).on("keyup",'[name="TableSearch"]',function() {
   var value = $(this).val().toLowerCase();
   $("tbody tr").filter(function() {
      $(this).closest("tr").toggle($(this).html().toLowerCase().indexOf(value) > -1);
   });
});

function funDashboard(){
   $.ajax({
   type: "get",
   url: "/Page/dashboard/index.html",
   data : "",
   success: function(data) {
      $("body").attr("Page","Dashboard").html(data)
      funHead()
      funNav()
   }
   });
}
function funHead(){
   var systemUser = JSON.parse(localStorage.getItem("systemUser"))
   var userType   = systemUser.type

   if($('.Header').html()!=undefined){
      $('.Header').html('\
      <div class="Container">\
         <div class="row">\
            <a href="/" class="Logo"><img src="/Librarys/Img/logo.svg?v534"></a>\
            <div class="Left">\
               <div class="MobilNavBar">\
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve"><g><g id="Menu"><path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/><path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/><path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\
               </div>\
            </div>\
            <div class="Right">\
               <div class="LanguageBar">\
                  <span>  </span>\
                  <div class="Wind">\
                     <span class="LangItem" T="SO" onclick=userlanguage("SO")>\
                        <div> سۆرانی </div>\
                     </span>\
                     <span class="LangItem" T="BA" onclick=userlanguage("BA")>\
                        <div> بادینی </div>\
                     </span>\
                     <span class="LangItem" T="EN" onclick=userlanguage("EN")>\
                        <div> English</div>\
                     </span>\
                     <span class="LangItem" T="AR" onclick=userlanguage("AR")>\
                        <div> عربي </div>\
                     </span>\
                     <span class="LangItem" T="DE" onclick=userlanguage("DE")>\
                        <div> Deutsch </div>\
                     </span>\
                     <span class="LangItem" T="TR" onclick=userlanguage("TR")>\
                        <div> Türkçe </div>\
                     </span>\
                  </div>\
               </div>\
               <div class="User">\
                  <a href="/my-account" class="Profil">\
                     <div class="Photo"></div>\
                  </a>\
                  <a href="/logout" class="Logout">\
                     <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384.971 384.971" style="enable-background:new 0 0 384.971 384.971;" xml:space="preserve"><g><g id="Sign_Out"><path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z"/><path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\
                  </a>\
               </div>\
            </div>\
         </div>\
      </div>\
      ')
      $(".Header .Right .User>.Profil>.Photo").css({"background-image":"url("+systemUser.user.avatar+")"})
      
      var LanguageName = $(".LanguageBar .LangItem[T='"+localStorage.getItem("systemUserLanguage")+"']").html()
      $(".LanguageBar>span").html(LanguageName)

      var WW = parseInt($(window).width())
      if(WW<=540){
         $(".Header .Right .LanguageBar").attr("onclick","languageSelectMobil()")
      }
      
   }
}
function funNav(){
   if($('.Nav').html()!=undefined){
      $('.Nav').html('\
      <div class="Container">\
         <div class="row">\
         </div>\
      </div>\
      ')
   }

   var systemUser = JSON.parse(localStorage.getItem("systemUser"))
   var userType   = systemUser.type

   $('.Nav>.Container>.row').html("")
   $.each( systemUser.nav, function( i, itemx ) {
      var xx_ID      =  itemx.id
      var xx_TOPID   =  itemx.topId
      var xx_NAME    =  itemx.name
      var xx_ICON    =  itemx.icon
      var xx_URL     =  itemx.url
      var xx_VIEW    =  itemx.view
      if(xx_TOPID==0 & xx_VIEW==1){
         if($(".NavItem[data-id='"+xx_ID+"']").html()==undefined){
            $('.Nav>.Container>.row').append('\
               <a href="'+xx_URL+'" class="NavItem" data-id="'+xx_ID+'">\
                  <img src="'+xx_ICON+'"/>\
                  <span>'+xx_NAME+'</span>\
               </a>\
            ')
         }
      }
   });

   
}


function languageSelectMobil(){
   var WIDTH      =  "ReadyBook"
   var BOX 		   =	1
   var TITLE 		=	""
   var SUBTITLE	=	""
   var nonTITLE   =  1
   var nonCLOSE   =  1
   popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   $(".ReadyBook").addClass("Active")
   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom").remove()
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center").append('\
         <div class="LangList">\
            <span class="LangItem" T="SO" onclick=userlanguage("SO")>\
               <div> سۆرانی </div>\
            </span>\
            <span class="LangItem" T="BA" onclick=userlanguage("BA")>\
               <div> بادینی </div>\
            </span>\
            <span class="LangItem" T="EN" onclick=userlanguage("EN")>\
               <div> English</div>\
            </span>\
            <span class="LangItem" T="AR" onclick=userlanguage("AR")>\
               <div> عربي </div>\
            </span>\
            <span class="LangItem" T="DE" onclick=userlanguage("DE")>\
               <div> Deutsch </div>\
            </span>\
            <span class="LangItem" T="TR" onclick=userlanguage("TR")>\
               <div> Türkçe </div>\
            </span>\
         </div>\
      ')

      var Language = localStorage.getItem("systemUserLanguage")

      $(".LangList>.LangItem[T='"+Language+"']").addClass("Active")

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .LangItem").click(function(){
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .LangItem").removeClass("Active")
         $(this).addClass("Active")
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .Btn.White").click(function(){
         $(".Popup_v2.B"+BOX+">.ReadyBook").removeClass("Active").delay(300).queue(function() {
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });
         var Language = $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center").find(".LangItem.Active").attr("T")
         userlanguage(Language)
      });
}

function userRefresh(){
   $.ajax({
   type: "post",
   url: appPath+"user/login",
   dataType: "json",
   data : "type="+userType+"&id="+systemUser.user.id+"",
   success: function(data) {
      localStorage.setItem("systemUser",JSON.stringify(data))
   }
   });
}


$(document).on("click","input,select,textarea",function(){
$(this).removeClass("Error")
})

function monthName(DATA){
   if(DATA==1){ xmonthName = defaultLang(2056) }
   if(DATA==2){ xmonthName = defaultLang(2057) }
   if(DATA==3){ xmonthName = defaultLang(2058) }
   if(DATA==4){ xmonthName = defaultLang(2059) }
   if(DATA==5){ xmonthName = defaultLang(2060) }
   if(DATA==6){ xmonthName = defaultLang(2061) }
   if(DATA==7){ xmonthName = defaultLang(2062) }
   if(DATA==8){ xmonthName = defaultLang(2063) }
   if(DATA==9){ xmonthName = defaultLang(2064) }
   if(DATA==10){ xmonthName = defaultLang(2065) }
   if(DATA==11){ xmonthName = defaultLang(2066) }
   if(DATA==12){ xmonthName = defaultLang(2067) }
   return xmonthName
}

function xx(VALUE){
   VALUE = VALUE.toString()
   VALUE = VALUE.replaceAll("0","kkle-")
   VALUE = VALUE.replaceAll("1","xmne-")
   VALUE = VALUE.replaceAll("2","uuhl-")
   VALUE = VALUE.replaceAll("3","aaxe-")
   VALUE = VALUE.replaceAll("4","plrx-")
   VALUE = VALUE.replaceAll("5","nsje-")
   VALUE = VALUE.replaceAll("6","llmi-")
   VALUE = VALUE.replaceAll("7","ervv-")
   VALUE = VALUE.replaceAll("8","ycxw-")
   VALUE = VALUE.replaceAll("9","zdjk-")
   VALUE = VALUE.slice(0,-1)
   return VALUE;
}
function digitNonValue(VALUE){
   VALUE = VALUE.toString()
   VALUE = VALUE.replaceAll("kkle","0")
   VALUE = VALUE.replaceAll("xmne","1")
   VALUE = VALUE.replaceAll("uuhl","2")
   VALUE = VALUE.replaceAll("aaxe","3")
   VALUE = VALUE.replaceAll("plrx","4")
   VALUE = VALUE.replaceAll("nsje","5")
   VALUE = VALUE.replaceAll("llmi","6")
   VALUE = VALUE.replaceAll("ervv","7")
   VALUE = VALUE.replaceAll("ycxw","8")
   VALUE = VALUE.replaceAll("zdjk","9")
   VALUE = VALUE.replaceAll("-","")
   return VALUE;
}

function digitValue(VALUE){
   VALUE = VALUE.toString()
   VALUE = VALUE.replaceAll("0","kkle-")
   VALUE = VALUE.replaceAll("1","xmne-")
   VALUE = VALUE.replaceAll("2","uuhl-")
   VALUE = VALUE.replaceAll("3","aaxe-")
   VALUE = VALUE.replaceAll("4","plrx-")
   VALUE = VALUE.replaceAll("5","nsje-")
   VALUE = VALUE.replaceAll("6","llmi-")
   VALUE = VALUE.replaceAll("7","ervv-")
   VALUE = VALUE.replaceAll("8","ycxw-")
   VALUE = VALUE.replaceAll("9","zdjk-")
   VALUE = VALUE.slice(0,-1)
   return VALUE;
}
function digitNonValue(VALUE){
   VALUE = VALUE.toString()
   VALUE = VALUE.replaceAll("kkle","0")
   VALUE = VALUE.replaceAll("xmne","1")
   VALUE = VALUE.replaceAll("uuhl","2")
   VALUE = VALUE.replaceAll("aaxe","3")
   VALUE = VALUE.replaceAll("plrx","4")
   VALUE = VALUE.replaceAll("nsje","5")
   VALUE = VALUE.replaceAll("llmi","6")
   VALUE = VALUE.replaceAll("ervv","7")
   VALUE = VALUE.replaceAll("ycxw","8")
   VALUE = VALUE.replaceAll("zdjk","9")
   VALUE = VALUE.replaceAll("-","")
   return VALUE;
}


function departmentName(DATA_ID){
   if(DATA_ID==1013){ return "Öğretmen" }
}
function departmentColor(DATA_ID){
   if(DATA_ID==1013){ return "Green" }
}

function time_ago(time) {

   switch (typeof time) {
     case 'number':
       break;
     case 'string':
       time = +new Date(time);
       break;
     case 'object':
       if (time.constructor === Date) time = time.getTime();
       break;
     default:
       time = +new Date();
   }
   var time_formats = [
     [60, 'seconds', 1], // 60
     [120, '1 minute ago', '1 minute from now'], // 60*2
     [3600, 'minutes', 60], // 60*60, 60
     [7200, '1 hour ago', '1 hour from now'], // 60*60*2
     [86400, 'hours', 3600], // 60*60*24, 60*60
     [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
     [604800, 'days', 86400], // 60*60*24*7, 60*60*24
     [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
     [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
     [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
     [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
     [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
     [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
     [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
     [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
   ];
   var seconds = (+new Date() - time) / 1000,
     token = 'ago',
     list_choice = 1;
 
   if (seconds == 0) {
     return 'Just now'
   }
   if (seconds < 0) {
     seconds = Math.abs(seconds);
     token = 'from now';
     list_choice = 2;
   }
   var i = 0,
     format;
   while (format = time_formats[i++])
     if (seconds < format[0]) {
       if (typeof format[2] == 'string')
         return format[list_choice];
       else
         return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
     }
   return time;
 }
 
 var aDay = 24 * 60 * 60 * 1000;


function ConvertMinutes(num){
   x = Math.floor(num/60); // 60*24
   d = Math.floor(x/1440); // 60*24
   h = Math.floor((x-(d*1440))/60);
   m = Math.round(x%60);
      return h+":"+m
}

function secondsTimeSpanToHMS(s) {
   s = parseInt(s)
   var h = Math.floor(s / 3600); //Get whole hours
   s -= h * 3600;
   var m = Math.floor(s / 60); //Get remaining minutes
   s -= m * 60;
   return (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s); //zero padding on minutes and seconds
 }
 