
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
                           <option value="1"> '+pageLang(2177)+' </option>\
                           <option value="2"> '+pageLang(2178)+' </option>\
                           <option value="3"> '+pageLang(2179)+' </option>\
                           <option value="4"> '+pageLang(2180)+' </option>\
                           <option value="5"> '+pageLang(2181)+' </option>\
                           <option value="6"> '+pageLang(2182)+' </option>\
                        </select>\
                     </div>\
                     <div class="Btn" onclick="systemNavAddNav()"> '+pageLang(2183)+' </div>\
                  </div>\
               </div>\
               <div class="col-12 ">\
                  <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
                     <table class="table">\
                        <thead>\
                           <tr>\
                              <th style="width:90px">#</th>\
                              <th>'+pageLang(2184)+'</th>\
                              <th style="width:120px">'+pageLang(2185)+'</th>\
                              <th style="width:120px">'+pageLang(2186)+'</th>\
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
   
         var  Qpathname = window.location.pathname
         var  Qstring   = new URLSearchParams(window.location.search);
         var navId = Qstring.get('navId')
         if(navId==undefined){ navId = 0 }
         var navType = Qstring.get('navType')
         if(navType==undefined){ navType = "" }
   
         if(navType==""){
            navType = $("[name='TYPE']").val()
         }
         $("[name='TYPE']>option[value='"+navType+"']").prop("selected",true)
         navList(navType,navId)
   
         $("[name='TYPE']").change(function(){
            var navType = $("[name='TYPE']").val()
            window.history.replaceState(0,"",Qpathname+"?navType="+navType+"");
            navList(navType,navId)
         })
   
   
         function navList(navType,navId){
            var QnavId = "topId="+navId+" " 
            var QnavType = "type="+navType+" " 
   
            if(navId>0){ QnavType = "" }else{ QnavType = QnavType; QnavId = "" } 
            $.ajax({
            type: "post",
            url: systemApp+"system/nav",
            dataType: "json",
            data : QnavType+QnavId,
            success: function(data) {
   
   
               if(data!=""){
                  $("[CD='[[pageSystemNav]]']").show()
               }else{
                  $("[CD='[[pageSystemNav]]']").hide()
               }
               $("[CD='[[pageSystemNavTable]]']").html("")
               $.each( data, function( i, itemx ) {
                  var data_ID          =  itemx.id
                  var data_NAME        =  itemx.name
                  var data_TOP_ID      =  itemx.topId
                  var data_SUB_NAV     =  itemx.subNav
                  var data_URL         =  itemx.url
                  var data_PATH        =  itemx.path
                  var data_STATUS      =  itemx.status
                  var data_USER_NAV    =  itemx.view
                  var data_ICON        =  itemx.icon
   
                  var data_SUB_NAV_TEXT = ""
                  if(data_SUB_NAV==0){ data_SUB_NAV_TEXT = pageLang(2207) }else{ data_SUB_NAV_TEXT = pageLang(2206) }
                  if(data_URL==""){ data_URL = "---" }
   
                  if(data_STATUS=="0"){ data_STATUS_TEXT = "<span class='badge badge-grey'>"+pageLang(2187)+"</span>" }
                  if(data_STATUS=="1"){ data_STATUS_TEXT = "<span class='badge badge-green'>"+pageLang(2188)+"</span>" }
   
                  if(data_USER_NAV=="0"){ data_USER_NAV_TEXT = "<span class='badge badge-grey'>"+pageLang(2187)+"</span>" }
                  if(data_USER_NAV=="1"){ data_USER_NAV_TEXT = "<span class='badge badge-green'>"+pageLang(2188)+"</span>" }
   
                  $("[CD='[[pageSystemNavTable]]']").append('\
                  <tr navId="'+data_ID+'">\
                     <td scope="row">\
                        <div class="twoRow">\
                           <span>'+data_ID+'</span>\
                           <span>'+data_SUB_NAV_TEXT+'</span>\
                        </div>\
                     </td>\
                     <td>\
                        <div class="photoRow">\
                           <div class="Photo"><img src="'+data_ICON+'"></div>\
                           <div class="Info">\
                              <span>'+data_NAME+'</span>\
                              <span>'+data_URL+'</span>\
                           </div>\
                        </div>\
                        <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2189)+'</div>\
                     </td>\
                     <td>'+data_STATUS_TEXT+'</td>\
                     <td>'+data_USER_NAV_TEXT+'</td>\
                     <td>\
                        <div class="dropdown">\
                           <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                           <span class="caret"></span></button>\
                           <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                              <li role="presentation"><a role="menuitem" tabindex="-1" href="/settings-nav?navId='+data_ID+'">'+pageLang(2190)+'</a></li>\
                              <li role="presentation" class="divider"></li>\
                              <li role="presentation"><a role="menuitem" tabindex="-1" onclick="navEdit('+data_ID+')">'+pageLang(2191)+'</a></li>\
                              <li role="presentation"><a role="menuitem" tabindex="-1" onclick="navDelete('+data_ID+')">'+pageLang(2192)+'</a></li>\
                              <li role="presentation" class="divider"></li>\
                              <li role="presentation"><a role="menuitem" tabindex="-1" onclick="systemNavLanguage('+data_ID+')">'+pageLang(2193)+'</a></li>\
                           </ul>\
                        </div>\
                     </td>\
                  </tr>\
                  ')
               });
   
               $( '[CD="[[pageSystemNavTable]]"]' ).sortable({
                  opacity: 0.6,
                  cursor: 'move',
                  update: function( event, ui ) {
                     var List = "";
                     $( '[CD="[[pageSystemNavTable]]"]>tr').each(function(){
                        List = List + $(this).attr("navId") +","
                     })
                     $.ajax({
                     type: "post",
                     url: systemApp+"system/nav-Sort",
                     dataType: "json",
                     data : "list="+encodeURIComponent(List)+"&type=lesson",
                     success: function(data) {}});
                  }
               });
            }
            });
         }
         $(".dropdown-toggle").dropdown();
   
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
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2194)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="NAME" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2195)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="URL" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2196)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="PATH" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2197)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <div class="dropzone OneViewItem" T="Single"></div>\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"></div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <label class="ckbox">\
                  <input checked="" name="STATUS" value="1" type="checkbox">\
                  <span class="tx-13"> '+pageLang(2198)+' </span>\
               </label>\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"></div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <label class="ckbox">\
                  <input checked="" name="VIEW" value="1" type="checkbox">\
                  <span class="tx-13"> '+pageLang(2199)+' </span>\
               </label>\
            </div>\
            </div>\
            ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
   
   
            Dropzone.autoDiscover = false;
            var dropzone = new Dropzone('.OneViewItem[T="Single"]', {
               previewTemplate: '<div class="Item" data-id=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#72e15b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>',
               url: "https://dev.runsia.com/zfc/"+cdnDefaultPath,
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
   
            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2200)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2201)+'</div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });
   
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
               var URL           =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='URL']").val()
               var PATH          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='PATH']").val()
               var ICON          =  $(".Popup_v2.B"+BOX+"").find(".Center").find(".dropzone.OneViewItem .Item .File>img").attr("src")
               var STATUS        =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS']:checked").val()
               var VIEW          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='VIEW']:checked").val()
               var Error         =  0
   
               if(STATUS==undefined){ STATUS = 0 }
               if(VIEW==undefined){ VIEW = 0 }
               if(ICON==undefined){ ICON = 0 }
               
               if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
               
               var navType =  $("[name='TYPE']").val()
               
               if(Error==0){
                  $.ajax({
                  type: "post",
                  url: systemApp+"system/navAdd",
                  dataType: "json",
                  data : "type="+encodeURIComponent(navType)+"&topId="+encodeURIComponent(navId)+"&name="+encodeURIComponent(NAME)+"&url="+encodeURIComponent(URL)+"&path="+encodeURIComponent(PATH)+"&icon="+encodeURIComponent(ICON)+"&status="+encodeURIComponent(STATUS)+"&view="+encodeURIComponent(VIEW)+"&language=TR",
                  success: function(data) {
                     
                     navList(navType,navId)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
   
                  }
                  });
               }
            });
         }
   
         function navEdit(DATA_ID){
            var WIDTH      =  "center-30"
            var BOX 		   =	1
            var TITLE 		=	pageLang(2191)
            var SUBTITLE	=	""
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
   
   
            $('\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2194)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="NAME" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2195)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="URL" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2196)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <input class="form-control" name="PATH" placeholder="" type="text">\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2197)+'</label> </div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <div class="dropzone OneViewItem" T="Single"></div>\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"></div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <label class="ckbox">\
                  <input name="STATUS" value="1" type="checkbox">\
                  <span class="tx-13"> '+pageLang(2198)+' </span>\
               </label>\
            </div>\
            </div>\
            <div class="row row-xs align-items-center mg-b-20">\
            <div class="col-md-4"></div>\
            <div class="col-md-8 mg-t-5 mg-md-t-0">\
               <label class="ckbox">\
                  <input name="VIEW" value="1" type="checkbox">\
                  <span class="tx-13"> '+pageLang(2199)+' </span>\
               </label>\
            </div>\
            </div>\
            ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
   
            Dropzone.autoDiscover = false;
            var dropzone = new Dropzone('.OneViewItem[T="Single"]', {
               previewTemplate: '<div class="Item" data-id=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#72e15b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>',
               url: "https://dev.runsia.com/zfc/"+cdnDefaultPath,
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
   
            $.ajax({
            type: "post",
            url: systemApp+"system/nav",
            dataType: "json",
            data : "id="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {
   
               var data_NAME        =  data.name
               var data_TOP_ID      =  data.topId
               var data_SUB_NAV     =  data.subNav
               var data_URL         =  data.url
               var data_PATH        =  data.path
               var data_ICON        =  data.icon
               var data_STATUS      =  data.status
               var data_VIEW        =  data.view
   
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val(data_NAME)
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='URL']").val(data_URL)
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='PATH']").val(data_PATH)
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='ICON']").val(data_ICON)
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS'][value='"+data_STATUS+"']").prop("checked",true)
               $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='VIEW'][value='"+data_VIEW+"']").prop("checked",true)
   
               if(data_ICON!=""){
                  $(".dropzone.OneViewItem").addClass("dz-started")
   
                  $(".dropzone.OneViewItem").html('<div class="Item" data-id=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#72e15b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>')
                  $(".dropzone.OneViewItem").find(".Item").html("\
                  <div class='File'>\
                     <img src='"+data_ICON+"'\>\
                  </div>\
                  <div class='Delete y' onclick='dropzoneItemDelete(this)'>\
                     <i class='fa fa-trash'></i>\
                  </div>\
                  ").attr("alt",data_ICON).attr("src",data_ICON)
               }
            }
            });
               
   
            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2200)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2201)+'</div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });
   
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
               var URL           =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='URL']").val()
               var PATH          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='PATH']").val()
               var ICON          =  $(".Popup_v2.B"+BOX+"").find(".Center").find(".dropzone.OneViewItem .Item .File>img").attr("src")
               var STATUS        =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS']:checked").val()
               var VIEW          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='VIEW']:checked").val()
               var Error         =  0
   
               if(STATUS==undefined){ STATUS = 0 }
               if(VIEW==undefined){ VIEW = 0 }
               if(ICON==undefined){ ICON = 0 }
               
               if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
               
               if(Error==0){
                  $.ajax({
                  type: "post",
                  url: systemApp+"system/navEdit",
                  dataType: "json",
                  data : "id="+encodeURIComponent(DATA_ID)+"&&name="+encodeURIComponent(NAME)+"&url="+encodeURIComponent(URL)+"&path="+encodeURIComponent(PATH)+"&icon="+encodeURIComponent(ICON)+"&status="+encodeURIComponent(STATUS)+"&view="+encodeURIComponent(VIEW)+"",
                  success: function(data) {
                     navList(navType,navId)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
                  });
               }
            });
         }
   
   
         function navDelete(DATA_ID){
            var WIDTH      =  "center-30"
            var BOX 		   =	1
            var TITLE 		=	pageLang(2192)
            var SUBTITLE	=	pageLang(2202)
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
   
            $(".Popup_v2.B"+BOX+"").find(".Center").remove()
   
            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2200)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2201)+'</div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });
   
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
                  $.ajax({
                  type: "post",
                  url: systemApp+"system/navDelete",
                  dataType: "json",
                  data : "id="+encodeURIComponent(DATA_ID)+"",
                  success: function(data) {
   
                     navList(navType,navId)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
   
                  }
                  });
            });
         }
   
   
   
            var pageID     = sessionStorage.getItem("pageID")
            var pageTOP_ID = sessionStorage.getItem("pageTOP_ID")
   
            var systemUser = JSON.parse(localStorage.getItem("systemUser"))
            var userType   = systemUser.type
   
            $.each( systemUser.nav, function( i, itemx ) {
               var xx_ID      =  itemx.id
               var xx_TOPID   =  itemx.topId
               var xx_NAME    =  itemx.name
               var xx_DESC    =  itemx.name
               var xx_ICON    =  itemx.icon
               var xx_URL     =  itemx.url
               var xx_VIEW    =  itemx.view
   
               if(xx_ID==pageID){
                  $('.Breadcrumb>.pageName').html(xx_NAME)
               }
            });
   
   
   
   
            function systemNavLanguage(NAV_ID){
               var WIDTH      =  "center-50"
               var BOX 		   =	1
               var TITLE 		=	pageLang(2208)
               var SUBTITLE	=	""
               var nonTITLE   =  1
               var nonCLOSE   =  1
               popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
               $(".Popup_v2.B"+BOX+"").find(".Center").html('\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th>'+pageLang(2203)+'</th>\
                        <th style="text-align:right">'+pageLang(2204)+'</th>\
                        <th style="width:60px;text-align:right"></th>\
                     </tr>\
                  </thead>\
                  <tbody CD="[[pageSystemTable]]">\
                  </tbody>\
               </table>')
   
   
               $('<div class="theme-button success-btn" onclick="systemNavLanguageItemAdd('+NAV_ID+')"><span class="iwo-293"></span> '+pageLang(2183)+' </div>\
               ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")
               
               $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               });
               
               CreateJson(NAV_ID)
               $.ajax({
               type: "post",
               url: systemApp+"system/navLanguage",
               dataType: "json",
               data : "navId="+encodeURIComponent(NAV_ID)+"",
               success: function(data) {
   
                  $.each( data.list, function( i, itemx ) {
                     var data_ID          =  itemx.id
                     var data_TEXT        =  itemx.text
                     var data_LIST        =  itemx.langList
   
                     if(data_LIST==""){
                        langList = ""
                     }else{
                        var LAI        =  data_LIST.split(",")
                        var langList   =  ""
                        for(ii=0;ii<LAI.length-1;ii++){
                           langList = langList + "<span>"+sessionStorage.getItem("lang_"+LAI[ii]+"")+"</span>"
                        }
                     }
            
                     $(".Popup_v2.B"+BOX+"").find("[CD='[[pageSystemTable]]']").append('\
                     <tr dataId="'+data_ID+'">\
                        <td scope="row">\
                           <div class="twoRow">\
                              <span>'+data_TEXT+'</span>\
                              <span>pageLang('+data_ID+')</span>\
                           </div>\
                        </td>\
                        <td><div class="LangList">'+langList+'</div></td>\
                        <td><div class="btn btn-success" onclick="systemNavItemLanguage('+NAV_ID+','+data_ID+')"> '+pageLang(2189)+' </div></td>\
                     </tr>\
                     ')
                  });
                  
               }
               });
            }
   
   
            function systemNavLanguageItemAdd(NAV_ID){
               var WIDTH      =  "center-30"
               var BOX 		   =	2
               var TITLE 		=	""
               var SUBTITLE	=	""
               var nonTITLE   =  1
               var nonCLOSE   =  1
               popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   
   
               $('\
               <div class="row row-xs align-items-center mg-b-20">\
               <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2209)+'</label> </div>\
               <div class="col-md-8 mg-t-5 mg-md-t-0">\
                  <input class="form-control" name="TEXT" placeholder="" type="text">\
               </div>\
               </div>\
               ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
               $(".Popup_v2.B"+BOX+"").find('[name="TEXT"]').focus()
   
               $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2200)+' </div>\
               <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2201)+'</div>\
               ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
               
               $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               });
   
               $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
                  var TEXT          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='TEXT']").val()
                  var Error         =  0
   
                  if(TEXT==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='TEXT']").addClass("error") }
                  
                  if(Error==0){
                     $.ajax({
                     type: "post",
                     url: systemApp+"system/navLanguageAdd",
                     dataType: "json",
                     data : "navId="+encodeURIComponent(NAV_ID)+"&text="+encodeURIComponent(TEXT)+"",
                     success: function(data) {
                        
                        var data_ID          =  data.id
                        var data_NAME        =  data.text
                        var data_TOP_ID      =  data.langList
               
                        $(".Popup_v2.B1").find("[CD='[[pageSystemTable]]']").prepend('\
                        <tr navId="'+data_ID+'">\
                           <td scope="row">\
                              <div class="twoRow">\
                                 <span>'+data_NAME+'</span>\
                                 <span>pageLang('+data_ID+')</span>\
                              </div>\
                           </td>\
                           <td>'+data_TOP_ID+'</td>\
                           <td><div class="btn btn-success" onclick="systemNavItemLanguage('+NAV_ID+','+data_ID+')"> '+pageLang(2189)+' </div></td>\
                        </tr>\
                        ')
                        
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
                        <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2210)+'</label> </div>\
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
   
               $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2200)+' </div>\
               <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2201)+'</div>\
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
                        
                        CreateJson(NAV_ID)
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
   
   
   
            function CreateJson(NAV_ID){
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
            
   
            function dropzoneItemDelete(ITEM){
               $(ITEM).parent().remove()
               $(".dropzone").removeClass("dz-started")
            }
            