
         
      $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageTitle">\
               <div class="Left">\
               '+PageTitle()+'\
               </div>\
               <div class="Right">\
               </div>\
            </div>\
            <div class="col-12 ">\
               <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
                  <table class="table">\
                     <thead>\
                        <tr>\
                           <th style="width:220px">#</th>\
                           <th>'+pageLang(2213)+'</th>\
                           <th style="width:120px">'+pageLang(2214)+'</th>\
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


      function navList(){
         $.ajax({
         type: "post",
         url: systemApp+"system/department",
         dataType: "json",
         data : "",
         success: function(data) {


            if(data!=""){
               $("[CD='[[pageSystemNav]]']").show()
            }else{
               $("[CD='[[pageSystemNav]]']").hide()
            }
            $("[CD='[[pageSystemNavTable]]']").html("")
            $.each( data, function( i, itemx ) {
               var data_ID              =  itemx.id
               var data_DASHBOARD      =  itemx.dashboard
               var data_DESC           =  itemx.desc
               var data_NAME           =  itemx.name
               var data_NAV            =  itemx.nav
               var data_PERMISSION     =  itemx.permission
               var data_TYPE           =  itemx.type

               var data_STATUS_TEXT = ""
               var NAI = data_NAV.split(",")
               var NavTotal = NAI.length
               if(data_NAV==""){ NavTotal = 0 }
               if(NavTotal=="0"){ data_STATUS_TEXT = "<span class='badge badge-grey permissionPage'> --- </span>" }
               if(NavTotal>0){ data_STATUS_TEXT = "<span class='badge badge-green permissionPage'>"+NavTotal+" "+pageLang(2215)+"</span>" }

               $("[CD='[[pageSystemNavTable]]']").append('\
               <tr departmentId="'+data_ID+'">\
                  <td scope="row">'+data_ID+'</td>\
                  <td>\
                     <div class="twoRow">\
                        <span>'+data_NAME+'</span>\
                        <span>'+data_DESC+'</span>\
                     </div>\
                     <div class="ContentLang" onclick="contentLanguage('+data_ID+')">'+pageLang(2216)+'</div>\
                  </td>\
                  <td>'+data_STATUS_TEXT+'</td>\
                  <td>\
                     <div class="dropdown">\
                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                        <span class="caret"></span></button>\
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="departmentPermission('+data_ID+')"> '+pageLang(2217)+' </a></li>\
                           <li role="presentation" class="divider"></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="departmentEdit('+data_ID+')">'+pageLang(2218)+'</a></li>\
                        </ul>\
                     </div>\
                  </td>\
               </tr>\
               ')
            });
         }
         });
      }
      $(".dropdown-toggle").dropdown();



      function departmentPermission(DATA_ID){
            var WIDTH      =  "center-30"
            var BOX 		   =	1
            var TITLE 		=	pageLang(2219)
            var SUBTITLE	=	""
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)


            $('\
            <div class="row row-xs align-items-center mg-b-20">\
            <div id="m_tree_3"></div>\
            </div>\
            ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

            $.ajax({
            type: "post",
            url: systemApp+"system/navPermission",
            dataType: "json",
            data : "langauge="+userLang+"",
            success: function(data) {


               $.ajax({
               type: "post",
               url: systemApp+"system/department",
               dataType: "json",
               data : "id="+DATA_ID+"",
               success: function(mms) {

                  var Treeview = function () {
                  $('#m_tree_3').jstree({
                     'plugins': ["wholerow", "checkbox", "types"],
                     'core': {
                        "themes" : {
                              "responsive": false
                        },    
                     
                        'data' :data
                     },
                     "types" : {
                        "default" : {
                              "icon" : ""
                        },
                        "file" : {
                              "icon" : ""
                        }
                     },
                  }).bind("loaded.jstree", function (e, data) {
                     var NN = mms[0].nav.split(",")
                     for(i=0;i<NN.length;i++){
                        $('#m_tree_3').jstree('select_node', NN[i]);
                     }
                  }) 
                  }();
               }
               });
            }
            });



            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2220)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2221)+'</div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               $(".Popup_v2.B"+BOX+"").remove();
               $("Body").css({"overflow":"visible"});
            });

            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               var selectedElmsIds = $('#m_tree_3').jstree("get_selected");
               $.ajax({
               type: "post",
               url: systemApp+"system/departmentNavUpdate",
               dataType: "json",
               data : "departmentId="+DATA_ID+"&list="+selectedElmsIds+"",
               success: function(data) {
                  if(data.total==0){
                     $("tr[departmentId='"+DATA_ID+"']").find(".permissionPage").removeClass("badge-green").addClass("badge-grey").html("---")
                  }else{
                     $("tr[departmentId='"+DATA_ID+"']").find(".permissionPage").removeClass("badge-grey").addClass("badge-green").html(data.total+ ' '+pageLang(2215)+'')
                  }

                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               });
            });
         }

      function departmentEdit(DATA_ID){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2222)
         var SUBTITLE	=	""
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)



         $('\
         <div class="row row-xs align-items-center mg-b-20">\
         <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2223)+'</label> </div>\
         <div class="col-md-8 mg-t-5 mg-md-t-0">\
            <input class="form-control" name="NAME" placeholder="" type="text">\
         </div>\
         </div>\
         <div class="row row-xs align-items-center mg-b-20">\
         <div class="col-md-4"> <label class="mg-b-0">'+pageLang(2224)+'</label> </div>\
         <div class="col-md-8 mg-t-5 mg-md-t-0">\
            <input class="form-control" name="DESC" placeholder="" type="text">\
         </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $.ajax({
         type: "post",
         url: systemApp+"system/department",
         dataType: "json",
         data : "id="+encodeURIComponent(DATA_ID)+"",
         success: function(data) {

            var data_NAME        =  data.name
            var data_DESC        =  data.desc
         

            $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val(data_NAME)
            $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='DESC']").val(data_DESC)
         }
         });
            

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2225)+'</div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2226)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var NAME          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
            var DESC          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='DESC']").val()
            var PATH          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='PATH']").val()
            var ICON          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='ICON']").val()
            var STATUS        =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='STATUS']:checked").val()
            var VIEW          =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='VIEW']:checked").val()
            var Error         =  0

            if(STATUS==undefined){ STATUS = 0 }
            if(VIEW==undefined){ VIEW = 0 }
            
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
