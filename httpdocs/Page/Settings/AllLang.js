
$.ajax({
   type: "post",
   url: systemApp+"library/language",
   dataType: "json",
   data : "=",
   success: function(data) {
      $.each( data, function( i, itemx ) {
         if(itemx.flag!=null){
            sessionStorage.setItem("lang_"+itemx.code+"",itemx.flag)
         }else{
            sessionStorage.setItem("lang_"+itemx.code+"","")
         }
      });
   }
   });
      
         $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageTitle">\
               <div class="Left">\
               '+PageTitle()+'\
               </div>\
               <div class="Right">\
                  <div>\
                     <select name="TYPE">\
                        <option value="0"> '+defaultLang(2517)+' </option>\
                        <option value="1"> '+defaultLang(2518)+'</option>\
                     </select>\
                  </div>\
                  <div class="Btn systemNavAddNav" onclick="systemNavAddNav()"> '+pageLang(2169)+' </div>\
               </div>\
            </div>\
            <div class="col-12 ">\
               <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
                  <table class="table">\
                     <thead>\
                        <tr>\
                           <th style="width:80px">#</th>\
                           <th>'+pageLang(2170)+'</th>\
                           <th style="text-align:right">'+pageLang(2176)+'</th>\
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
   
         var  Qpathname = window.location.pathname
         var  Qstring   = new URLSearchParams(window.location.search);
         var type = Qstring.get('type')
         if(type==undefined){ type = "" }
         
         if(type==""){
            type = $("[name='TYPE']").val()
         }
         $("[name='TYPE']>option[value='"+type+"']").prop("selected",true)
         if(type==0){ $(".systemNavAddNav").removeClass("Disabled") }
         if(type==1){ $(".systemNavAddNav").addClass("Disabled") }
         navList(type)
   
         $("[name='TYPE']").change(function(){
            var type = $("[name='TYPE']").val()
            window.history.replaceState(0,"",Qpathname+"?type="+type+"");
            if(type==0){ $(".systemNavAddNav").removeClass("Disabled") }
            if(type==1){ $(".systemNavAddNav").addClass("Disabled") }
            navList(type)
         })
   
         function navList(type){
            if(type==0){
               $.ajax({
               type: "post",
               url: systemApp+"system/allLanguageList",
               dataType: "json",
               data : "language=",
               success: function(data) {
                  if(data!=""){
                     $("[CD='[[pageSystemNav]]']").show()
                  }else{
                     $("[CD='[[pageSystemNav]]']").hide()
                  }
                  $("[CD='[[pageSystemNavTable]]']").html("")
                  $.each( data, function( i, itemx ) {
                     var data_ID    =  itemx.dataId
                     var data_NAME  =  itemx.value
                     var data_LANG  =  itemx.langList
      
                     if(data_LANG==""){
                        langList = ""
                     }else{
                     var LAI        =  data_LANG.split(",")
                     var langList   =  ""
                     for(ii=0;ii<LAI.length-1;ii++){
                        langList = langList + "<span>"+sessionStorage.getItem("lang_"+LAI[ii]+"")+"</span>"
                     }
                     }
      
                     $("[CD='[[pageSystemNavTable]]']").append('\
                     <tr dataId="'+data_ID+'">\
                        <td scope="row">'+data_ID+'</td>\
                        <td scope="row">\
                           <div class="twoRow">\
                              <span>'+data_NAME+'</span>\
                              <span>defaultLang('+data_ID+')</span>\
                           </div>\
                           <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2171)+'</div>\
                        </td>\
                        <td scope="row"><div class="LangList">'+langList+'</div></td>\
                     </tr>\
                     ')
                  });
               }
               });
            }
            if(type==1){
               $.ajax({
               type: "post",
               url: systemApp+"system/navLanguage",
               dataType: "json",
               data : "",
               success: function(data) {
                  if(data!=""){
                     $("[CD='[[pageSystemNav]]']").show()
                  }else{
                     $("[CD='[[pageSystemNav]]']").hide()
                  }
                  $("[CD='[[pageSystemNavTable]]']").html("")
                  $.each( data.list, function( i, itemx ) {
                     var data_NAVID =  itemx.navId
                     var data_ID    =  itemx.id
                     var data_NAME  =  itemx.text
                     var data_LANG  =  itemx.langList
                     
                     console.log(data_LANG)
                     if(data_LANG==""){
                        langList = ""
                     }else{
                     var LAI        =  data_LANG.split(",")
                     var langList   =  ""
                     for(ii=0;ii<LAI.length-1;ii++){
                        langList = langList + "<span>"+sessionStorage.getItem("lang_"+LAI[ii]+"")+"</span>"
                     }
                     }
      
                     $("[CD='[[pageSystemNavTable]]']").append('\
                     <tr dataId="'+data_ID+'">\
                        <td scope="row">'+data_ID+'</td>\
                        <td scope="row">\
                           <div class="twoRow">\
                              <span>'+data_NAME+'</span>\
                              <span>pageLang('+data_ID+')</span>\
                           </div>\
                           <div class="ContentLang" onclick="systemNavItemLanguage('+data_NAVID+','+data_ID+')">'+pageLang(2171)+'</div>\
                        </td>\
                        <td scope="row"><div class="LangList">'+langList+'</div></td>\
                     </tr>\
                     ')
                  });
               }
               });
            }
         }
   
         function systemNavAddNav(){
            var WIDTH      =  "center-30"
            var BOX 		   =	1
            var TITLE 		=	""
            var SUBTITLE	=	""
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
      
      
            $('\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2170)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="NAME" placeholder="" type="text">\
            </div>\
            </div>\
            ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
            $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").focus()
      
            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2172)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2173)+'</div>\
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
                  $.ajax({
                  type: "post",
                  url: systemApp+"system/allLanguageAdd",
                  dataType: "json",
                  data : "text="+encodeURIComponent(NAME)+"",
                  success: function(data) {
      
                     navList()
                     CreateJson()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
      
                  }
                  });
               }
            });
         }


         function systemNavItemLanguage(NAV_ID,DATA_ID){
            var WIDTH      =  "center-30"
            var BOX 		   =	2
            var TITLE 		=	""
            var SUBTITLE	=	""
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)


            

            $.ajax({
            type: "post",
            url: systemApp+"system/navLanguageItem",
            dataType: "json",
            data : "navId="+encodeURIComponent(NAV_ID)+"&id="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {

               $.each( data.list, function( i, itemx ) {
                  var data_ID          =  itemx.id
                  var data_TEXT        =  itemx.text
                  var data_LANGUAGE    =  itemx.language
                  var data_FLAG        =  itemx.flag
                  
                  if(data_LANGUAGE==""){
                     $('\
                     <div class="row row-xs align-items-center mg-b-20">\
                     <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2228)+'</label> </div>\
                     <div class="col-md-8">\
                        <input class="form-control" value="'+data_TEXT+'" readonly placeholder="" type="text">\
                     </div>\
                     </div>\
                     ').prependTo($(".Popup_v2.B"+BOX+"").find(".Center"))
                  }else{
                     $('\
                     <div class="row row-xs align-items-center mg-b-20">\
                     <div class="col-md-12" style="display: flex;align-content: center;align-items: center;">\
                        <label class="mg-b-0" style="width:40px;border-radius: 4px 0px 0px 4px;overflow: hidden;">'+data_LANGUAGE+'</label>\
                        <input class="form-control" name="TEXT" value="'+data_TEXT+'" LANG="'+data_LANGUAGE+'" placeholder="" type="text">\
                     </div>\
                     </div>\
                     ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
                  }
                  if(i==1){
                     $(".Popup_v2.B"+BOX+"").find("input").focus()
                  }
               });
               
            }
            });

            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2172)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2173)+'</div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });

            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               var LIST          =  ""
               var Error         =  0

               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='TEXT']").each(function(){
                     LIST = LIST + $(this).val()+"||"+$(this).attr("LANG")+"@@"
               })

               
               if(Error==0){
                  $.ajax({
                  type: "post",
                  url: systemApp+"system/navLanguageUpdate",
                  dataType: "json",
                  data : "navId="+encodeURIComponent(NAV_ID)+"&id="+encodeURIComponent(DATA_ID)+"&list="+encodeURIComponent(LIST)+"",
                  success: function(data) {
                     
                     CreateNavJson(NAV_ID)
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
         
         function CreateJson(){
            $.ajax({
            type: "post",
            url: appPath+"system/allLanguage",
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
            }
            }); 
         }

         function CreateNavJson(NAV_ID){
            $.ajax({
            type: "post",
            url: systemApp+"system/pageLanguage",
            dataType: "json",
            data : "pageId="+NAV_ID+"",
            success: function(msg) {
               $.ajax({
               type: "post",
               url: "/Librarys/Language/phpNavLanguage.php",
               dataType: "json",
               data : "Name=navLang_"+NAV_ID+".json&Keyword="+JSON.stringify(msg)+"",
               success: function(msg) {
                  notificationModal("success",pageLang(2211),pageLang(2212))
               }
               });
            }
            });
         }