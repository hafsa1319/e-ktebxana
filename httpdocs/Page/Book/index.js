

      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
         <div class="col-12 pageTitle">\
            <div class="Left">\
            '+PageTitle()+'\
            </div>\
            <div class="Right">\
               <div>\
                  <select name="Level">\
                     <option value=""> '+pageLang(2000)+' </option>\
                  </select>\
               </div>\
               <a class="Btn" href="/book-add" > '+pageLang(2001)+' </a>\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[pageSystemNav]]" style="display:none">\
               <table class="table">\
                  <thead>\
                     <tr>\
                        <th colspan="3">'+pageLang(2002)+'</th>\
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
      var level = Qstring.get('level')
      if(level==undefined){ level = "" }

      var page       = 0
      var pageSize   = 30


      $.ajax({
      type: "post",
      url: systemApp+"library/level",
      dataType: "json",
      data : "",
      success: function(data) {
         $.each( data.content, function( i, itemx ) {
            $('[name="Level"]').append("<option value='"+itemx.id+"'>"+itemx.name+"</option>")
            $("[name='Level']>option[value='"+level+"']").prop("selected",true)
         });
      }
      })





      navList(level,page,pageSize)

      $("[name='Level']").change(function(){
         var level = $("[name='Level']").val()
         window.history.replaceState(0,"",Qpathname+"?level="+level+"");
         navList(level,page,pageSize)
      })



      function navList(level,page,pageSize){
         var Qlevel = ""
         if(level!=""){ Qlevel = "&levelId="+level+"" }

         $.ajax({
         type: "post",
         url: systemApp+"book/list",
         dataType: "json",
         data : "type=2"+Qlevel+"&page="+page+"&pageSize="+pageSize+"",
         success: function(data) {


            if(data!=""){
               $("[CD='[[pageSystemNav]]']").show()
            }else{
               $("[CD='[[pageSystemNav]]']").hide()
            }
            $("[CD='[[pageSystemNavTable]]']").html("")
            $.each( data.list, function( i, itemx ) {
               var data_ID          =  itemx.id
               var data_AUTHOR      =  itemx.author
               var data_AUTHORS     =  itemx.authors
               var data_CATEGORY    =  itemx.category
               var data_CATEGORYS   =  itemx.categorys
               var data_NAME        =  itemx.name
               var data_DESC        =  itemx.desc
               var data_IMG         =  itemx.img
               var data_LANGUAGE    =  itemx.languages
               var data_LEVEL       =  itemx.levelName
               var data_PAPER       =  itemx.paper
               var data_SUBJECT     =  itemx.subject
               var data_SUBJECT     =  itemx.subjects
               
               var AuthorsList      =  ""
               var AuthorsCount     =  0
               if(data_AUTHOR!=""){
                  $.each( data_AUTHORS, function( i, itemx ) {
                     if(i==0){
                     AuthorsList = "<span>"+itemx.name+"</span>"
                     }
                     AuthorsCount = AuthorsCount + 1
                  });
               }
               if(AuthorsList==""){ AuthorsList = "--" }else{ 
                  if((parseInt(AuthorsCount)-1)>0){
                     AuthorsList = AuthorsList + "<span class='Count'>+"+(parseInt(AuthorsCount)-1)+"</span>"
                  }
               }

               var Languages      =  ""
               $.each( data_LANGUAGE, function( i, itemx ) {
                  Languages = Languages + "<div class='LangItem'><span class='Flag'>"+itemx.flag+"</span><div class='Info'><span><i class='fa fa-paper'></i>"+itemx.page+" "+pageLang(2003)+"</span> <span><i class='fa fa-clock'></i>"+secondsTimeSpanToHMS(itemx.time)+"</span></div></div>"
               });
               

               $("[CD='[[pageSystemNavTable]]']").append('\
               <tr bookId="'+data_ID+'">\
                  <td class="Level">'+data_LEVEL+'</td>\
                  <td>\
                     <div class="Book">\
                        <div class="Img"><img src="'+cdnDefaultUrl+data_IMG+'"></div>\
                        <div class="Info">\
                           <div class="Name">'+data_NAME+'</div>\
                           <div class="Authors">'+AuthorsList+'</div>\
                        </div>\
                     </div>\
                  </td>\
                  <td><div class="LangMultipleList">'+Languages+'</div></td>\
                  <td>\
                     <div class="dropdown">\
                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">\
                        <span class="caret"></span></button>\
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="/book-add-page?bookId='+data_ID+'"> '+pageLang(2004)+' </a></li>\
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="/book-add-listen?bookId='+data_ID+'"> '+pageLang(2431)+' </a></li>\
                        <li role="presentation" class="divider"></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" href="/book-edit?bookId='+data_ID+'">'+pageLang(2005)+'</a></li>\
                           <li role="presentation"><a role="menuitem" tabindex="-1" onclick="dataDelete('+data_ID+')">'+pageLang(2006)+'</a></li>\
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

      $("[CD='[[pageSystemNavTable]]']").sortable({
         opacity: 0.6,
         cursor: 'move',
         update: function(event, ui) {
            var List = ""
            $("[CD='[[pageSystemNavTable]]']>tr").each(function(){
               List = List + $(this).attr("bookId") +","
            })
            List = List.slice(0,-1)

            $.ajax({
            type: "post",
            url: systemApp+"book/bookSort",
            dataType: "json",
            data : "list="+encodeURIComponent(List)+"",
            success: function(data) {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2435),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2435),pageLang(2436))
            }
            });
         }
      });

   function dataDelete(DATA_ID){
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(2006)
      var SUBTITLE	=	pageLang(2432)
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

      $(".Popup_v2.B"+BOX+"").find(".Center").remove()

      $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2433)+'</div>\
      <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2434)+' </div>\
      ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
      
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
         $(".Popup_v2.B"+BOX+"").remove();
         $("Body").css({"overflow":"visible"});
      });

      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+"").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"book/delete",
            dataType: "json",
            data : "bookId="+encodeURIComponent(DATA_ID)+"",
            success: function(data) {
               if(data.status!="error"){
                  navList(level,page,pageSize)
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               }
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal(data.status,pageLang(2435),data.message)
            },error: function() {
               $(".Popup_v2.B"+BOX+"").removeClass("Loading")
               notificationModal("error",pageLang(2435),pageLang(2436))
            }
            });
      });
   }
