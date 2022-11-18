
         $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageTitle">\
               <div class="Left">\
               '+PageTitle()+'\
               </div>\
               <div class="Right">\
                  <a class="Btn" T="Save"> '+pageLang(2008)+' </a>\
               </div>\
            </div>\
            <div class="col-12 ">\
               <div class="AddBook">\
                  <div class="row">\
                     <div class="col-12 " style="display: flex;gap:14px">\
                        <div class="Left">\
                           <div class="Photo">\
                              <span> '+pageLang(2009)+' </span>\
                              <div class="dropzone OneViewItem" T="Single"></div>\
                           </div>\
                        </div>\
                        <div class="Right">\
                           <div class="row">\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span>'+pageLang(2010)+'</span>\
                                    <input name="name">\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span> '+pageLang(2090)+' </span>\
                                    <textarea name="desc"></textarea>\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="row">\
                                    <div class="col-3">\
                                       <div class="FormElement">\
                                          <span> '+pageLang(2091)+' </span>\
                                          <select name="level">\
                                             <option value="">'+pageLang(2092)+'</option>\
                                          </select>\
                                       </div>\
                                    </div>\
                                    <div class="col-3">\
                                       <div class="FormElement">\
                                          <span> '+pageLang(2093)+' </span>\
                                          <select name="publisher">\
                                          </select>\
                                       </div>\
                                    </div>\
                                    <div class="col-3">\
                                       <div class="FormElement">\
                                          <span> '+pageLang(2094)+' </span>\
                                          <input name="publishedDate" type="number" min="1800" max="2023">\
                                       </div>\
                                    </div>\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span> '+pageLang(2095)+' <div class="Btn" onclick="popAddAuthors(0)">'+pageLang(2096)+'</div> </span>\
                                    <div class="List Authors"></div>\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span> '+pageLang(2097)+' <div class="Btn" onclick="popAddCategorys(0)">'+pageLang(2096)+'</div> </span>\
                                    <div class="List Categorys"></div>\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span> '+pageLang(2098)+' <div class="Btn" onclick="popAddSubjects(0)">'+pageLang(2096)+'</div> </span>\
                                    <div class="List Subjects"></div>\
                                 </div>\
                              </div>\
                              <div class="col-12 ">\
                                 <div class="FormElement">\
                                    <span> '+pageLang(2099)+' <div class="Btn" onclick="popAddLanguages(0)">'+pageLang(2096)+'</div> </span>\
                                    <div class="List Languages"></div>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                     <div class="col-12 ">\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
         </div>\
      </article>\
      ').appendTo(".PageContentArea")

      $("[name='publisher']").change(function(){
         var publisher = $(this).val()
         if(publisher==0){
            popNewPublisherAdd()
            $("[name='publisher']>option[value='']").prop("selected",true)
         }
      })


      $(".Btn[T='Save']").click(function(){
         var name          =  $("[name='name']").val()
         var desc          =  $("[name='desc']").val()
         var level         =  $("[name='level']").val()
         var publisher     =  $("[name='publisher']").val()
         var publishedDate =  $("[name='publishedDate']").val()
         var img           =  $(".dropzone.OneViewItem .Item").attr("alt")
         var author        =  ""
         var category      =  ""
         var subject       =  ""
         var language      =  ""

         $(".List.Authors>div").each(function(){
            author = author + $(this).attr("D") +","
         })
         $(".List.Categorys>div").each(function(){
            category = category + $(this).attr("D") +","
         })
         $(".List.Subjects>div").each(function(){
            subject = subject + $(this).attr("D") +","
         })
         $(".List.Languages>div").each(function(){
            var Status = $(this).find("[name='STATUS']:checked").val()
            if(Status==undefined){ Status = 0 }
            language = language + $(this).attr("D") +"|"+ Status +","
         })


         author = author.slice(0,-1)
         category = category.slice(0,-1)
         subject = subject.slice(0,-1)
         language = language.slice(0,-1)

         var Error = 0
         if(name==""){ Error = 1; }
         if(level=="" || level==0){ Error = 1; }
         if(author==""){ Error = 1; }
         if(category==""){ Error = 1; }
         if(subject==""){ Error = 1; }
         if(language==""){ Error = 1; }

         if(Error==0){
            $(".Btn[T='Save']").addClass("Loading")
            $.ajax({
            type: "post",
            url: systemApp+"book/bookAddOnline",
            dataType: "json",
            data : "name="+encodeURIComponent(name)+"&desc="+encodeURIComponent(desc)+"&category="+encodeURIComponent(category)+"&publisher="+publisher+"&publishedDate="+publishedDate+"&author="+encodeURIComponent(author)+"&subject="+encodeURIComponent(subject)+"&img="+encodeURIComponent(img)+"&level="+encodeURIComponent(level)+"&language="+encodeURIComponent(language)+"",
            success: function(data) {
               if(data.status=="success"){
                  bookComplete(data.dataId)
                  notificationModal(data.status,pageLang(2100),pageLang(2428))
               }else{
                  notificationModal(data.status,pageLang(2100),data.message)
               }
               $(".Btn[T='Save']").removeClass("Loading")
            }
            })
         }
      })

      function bookComplete(BookId){
            var WIDTH      =  "center-30"
            var BOX 		   =	1
            var TITLE 		=	pageLang(2100)
            var SUBTITLE	=	pageLang(2101)
            var nonTITLE   =  1
            var nonCLOSE   =  1
            popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
         
            $(".Popup_v2.B"+BOX+"").find(".Center").remove()
            $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2102)+' </div>\
            <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2103)+' </div>\
            ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
            
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
               window.location.href="/book-add-page?bookId="+BookId
            });
         
            $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
               window.location.reload()
            });
      }

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


   function dropzoneItemDelete(ITEM){
      $(ITEM).parent().parent().removeClass("dz-started")
      $(ITEM).parent().remove()
   }

   function dropzoneItemPreview(ITEM){
      var IMG = $(ITEM).parent().attr("src")
      var WIDTH      =  "center-30"
      var BOX 		   =	1
      var TITLE 		=	pageLang(27763)
      var SUBTITLE	=	""
      var nonTITLE   =  1
      var nonCLOSE   =  1
      popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

      
      $('<div style="display: flex;justify-content: center;"><img src="'+IMG+'"></div>').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
   }


      $.ajax({
      type: "post",
      url: systemApp+"library/level",
      dataType: "json",
      data : "",
      success: function(data) {
         $.each( data.content, function( i, itemx ) {
            $('[name="level"]').append("<option value='"+itemx.id+"'>"+itemx.name+"</option>")
         });
      }
      })

      publisherList()
      function publisherList(){
         $('[name="publisher"]').html('')
         $('[name="publisher"]').append("<option value=''>"+pageLang(2092)+"</option>")
         $('[name="publisher"]').append("<option value='0'>"+pageLang(2104)+"</option>")

         $.ajax({
         type: "post",
         url: systemApp+"library/publisher",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $('[name="publisher"]').append("<option value='"+itemx.id+"'>"+itemx.name+"</option>")
            });
         }
         })
      }


      function popNewPublisherAdd(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	2
         var TITLE 		=	pageLang(2096)
         var SUBTITLE	=	pageLang(2105)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(2106)+'</label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  ""
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"library/publisherAdd",
               dataType: "json",
               data : "name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(2100),data.message)
                  }else{
                     notificationModal(data.status,pageLang(2100),data.message)
                     publisherList()
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }

      function popAddAuthors(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2109)
         var SUBTITLE	=	pageLang(2110)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12"><div class="SearchBox"><span>'+pageLang(2111)+'</span><input name="Search"/></div></div>\
         </div>\
         <div class="row">\
            <div class="col-md-12">\
               <div class="Library">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $('[name="Search"]').on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".Library>.Item").filter(function() {
               $(this).closest(".Item").toggle($(this).html().toLowerCase().indexOf(value) > -1);
            });
         });

         $('\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2112)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $('<div class="Text"></div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")
         
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.btnCancel").click(function(){
            popNewAuthorAdd(TYPE)
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
               if($('.List.Authors>div[D="'+$(this).attr("D")+'"]').html()==undefined){
                  $('.List.Authors').append("<div D='"+$(this).attr("D")+"'><span>"+$(this).attr("N")+"</span><span class='Remove fa fa-trash'></span></div>")
               }
            })
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $.ajax({
         type: "post",
         url: systemApp+"library/author",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Library").append("<div class='Item' S='0' D='"+itemx.id+"' N='"+itemx.name+"'><span>"+itemx.name+"</span><span>"+itemx.id+"</span></div>")
            });
            $(".List.Authors>div").each(function(){
               $(".Popup_v2.B"+BOX+" .Library>.Item[D='"+$(this).attr("D")+"']").addClass("Selected").attr("S",1)
            })

            if(TYPE==1){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  $(".Popup_v2.B"+BOX+" .Library>.Item").removeClass("Selected").attr("S",0)
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
            if(TYPE==0){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  if(S==1){
                     $(this).removeClass("Selected").attr("S",0)
                  }
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
         }
         });
      }
      function popNewAuthorAdd(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	2
         var TITLE 		=	pageLang(2096)
         var SUBTITLE	=	pageLang(2110)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(2114)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  ""
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"library/authorAdd",
               dataType: "json",
               data : "name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(2100),data.message)
                  }else{
                     notificationModal(data.status,pageLang(2100),data.message)
                     popAddAuthors(TYPE)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }


      function popAddCategorys(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2109)
         var SUBTITLE	=	pageLang(2115)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12"><div class="SearchBox"><span>'+pageLang(2111)+'</span><input name="Search"/></div></div>\
         </div>\
         <div class="row">\
            <div class="col-md-12">\
               <div class="Library">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $('[name="Search"]').on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".Library>.Item").filter(function() {
               $(this).closest(".Item").toggle($(this).html().toLowerCase().indexOf(value) > -1);
            });
         });

         $('\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2112)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $('<div class="Text"></div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.btnCancel").click(function(){
            popAddCategorysAdd(TYPE)
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
               if($('.List.Categorys>div[D="'+$(this).attr("D")+'"]').html()==undefined){
                  $('.List.Categorys').append("<div D='"+$(this).attr("D")+"'><span>"+$(this).attr("N")+"</span><span class='Remove fa fa-trash'></span></div>")
               }
            })
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $.ajax({
         type: "post",
         url: systemApp+"library/category",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Library").append("<div class='Item' S='0' D='"+itemx.id+"' N='"+itemx.name+"'><span>"+itemx.name+"</span><span>"+itemx.id+"</span></div>")
            });
            $(".List.Categorys>div").each(function(){
               $(".Popup_v2.B"+BOX+" .Library>.Item[D='"+$(this).attr("D")+"']").addClass("Selected").attr("S",1)
            })

            if(TYPE==1){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  $(".Popup_v2.B"+BOX+" .Library>.Item").removeClass("Selected").attr("S",0)
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
            if(TYPE==0){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  if(S==1){
                     $(this).removeClass("Selected").attr("S",0)
                  }
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
         }
         });
      }
      function popAddCategorysAdd(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	2
         var TITLE 		=	pageLang(2096)
         var SUBTITLE	=	pageLang(2115)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(2116)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  ""
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"library/categoryAdd",
               dataType: "json",
               data : "name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(2100),data.message)
                  }else{
                     notificationModal(data.status,pageLang(2100),data.message)
                     popAddCategorys(TYPE)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }

      function popAddSubjects(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2109)
         var SUBTITLE	=	pageLang(2117)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12"><div class="SearchBox"><span>'+pageLang(2111)+'</span><input name="Search"/></div></div>\
         </div>\
         <div class="row">\
            <div class="col-md-12">\
               <div class="Library">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         $('[name="Search"]').on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".Library>.Item").filter(function() {
               $(this).closest(".Item").toggle($(this).html().toLowerCase().indexOf(value) > -1);
            });
         });


         $('\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2112)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $('<div class="Text"></div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.btnCancel").click(function(){
            popAddSubjectsAdd(TYPE)
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
               if($('.List.Subjects>div[D="'+$(this).attr("D")+'"]').html()==undefined){
                  $('.List.Subjects').append("<div D='"+$(this).attr("D")+"'><span>"+$(this).attr("N")+"</span><span class='Remove fa fa-trash'></span></div>")
               }
            })
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $.ajax({
         type: "post",
         url: systemApp+"library/subject",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Library").append("<div class='Item' S='0' D='"+itemx.id+"' N='"+itemx.name+"'><span>"+itemx.name+"</span><span>"+itemx.id+"</span></div>")
            });
            $(".List.Subjects>div").each(function(){
               $(".Popup_v2.B"+BOX+" .Library>.Item[D='"+$(this).attr("D")+"']").addClass("Selected").attr("S",1)
            })

            if(TYPE==1){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  $(".Popup_v2.B"+BOX+" .Library>.Item").removeClass("Selected").attr("S",0)
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
            if(TYPE==0){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  if(S==1){
                     $(this).removeClass("Selected").attr("S",0)
                  }
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
         }
         });
      }
      function popAddSubjectsAdd(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	2
         var TITLE 		=	pageLang(2096)
         var SUBTITLE	=	pageLang(2117)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(2118)+'</label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  ""
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"library/subjectAdd",
               dataType: "json",
               data : "name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(2100),data.message)
                  }else{
                     notificationModal(data.status,pageLang(2100),data.message)
                     popAddSubjects(TYPE)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }

      function popAddLanguages(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	1
         var TITLE 		=	pageLang(2109)
         var SUBTITLE	=	pageLang(2119)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-12"><div class="SearchBox"><span>'+pageLang(2111)+'</span><input name="Search"/></div></div>\
         </div>\
         <div class="row">\
            <div class="col-md-12">\
               <div class="Library">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))

         
         $('[name="Search"]').on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".Library>.Item").filter(function() {
               $(this).closest(".Item").toggle($(this).html().toLowerCase().indexOf(value) > -1);
            });
         });

         $('\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2112)+' </div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")

         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $('<div class="Text"></div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left")
         
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.btnCancel").click(function(){
            popAddLanguagesAdd(TYPE)
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
               if($('.List.Languages>div[D="'+$(this).attr("D")+'"]').html()==undefined){
                  $('.List.Languages').append("\
                  <div D='"+$(this).attr("D")+"' style='display: flex;justify-content: flex-start;padding: 6px 0px;position:relative'>\
                     <div class='Photo' style='display: flex;align-items: center;justify-content: center;padding: 0 6px;'>"+$(this).find(".Photo").html()+"</div>\
                     <div class='Info' style='width:120px;display: flex;flex-direction: column;justify-content: center;border: 1px solid #d2d2d2;border-radius: 4px;padding: 0px 10px;margin-right: 10px;'>\
                        <span style='font-size: 12px;color: #7b7b7b;line-height: 12px;'>"+pageLang(2120)+"</span>\
                        <span style='font-size: 12px;font-weight: 600;line-height: 13px;'>"+$(this).attr("N")+"</span>\
                     </div>\
                     <div class='Info' style='width:70px;display: flex;flex-direction: column;justify-content: center;border: 1px solid #d2d2d2;border-radius: 4px;padding: 0px 10px;margin-right: 10px;'>\
                        <span style='font-size: 12px;color: #7b7b7b;line-height: 12px;'>"+pageLang(2121)+"</span>\
                        <span style='font-size: 12px;font-weight: 600;line-height: 13px;'>0</span>\
                     </div>\
                     <div class='Info' style='display: flex;flex-direction: row;justify-content: center;border: 1px solid #d2d2d2;border-radius: 4px;margin-right: 10px;align-items: center;'>\
                        <div class='Text' style='width:90px;display: flex;flex-direction: column;margin-right: 10px;border-right: 1px solid #ccc;padding: 4px 9px;'>\
                           <span style='font-size: 12px;color: #7b7b7b;line-height: 12px;'>"+pageLang(2122)+"</span>\
                           <span style='font-size: 12px;font-weight: 600;line-height: 13px;'>0</span>\
                        </div>\
                        <label class='ckbox' style='padding-right: 7px;'>\
                           <input name='STATUS' value='1' type='checkbox'>\
                           <span class='tx-13'> "+pageLang(2123)+" </span>\
                        </label>\
                     </div>\
                     <span class='Remove fa fa-trash' style='position: absolute;right: 7px;top: 14px;font-size: 18px;color: #7c7c7c;'></span>\
                  </div>")
               }
            })
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $.ajax({
         type: "post",
         url: systemApp+"library/language",
         dataType: "json",
         data : "",
         success: function(data) {
            $.each( data, function( i, itemx ) {
               $(".Popup_v2.B"+BOX+"").find(".Library").append("\
               <div class='Item Photo' S='0' D='"+itemx.code+"' N='"+itemx.name+"'>\
                  <div class='Photo'>"+itemx.flag+"</div>\
                  <div class='Info'>\
                     <span>"+itemx.name+"</span>\
                     <span>"+itemx.code+"</span>\
                  </div>\
               </div>")
            });
            $(".List.Languages>div").each(function(){
               $(".Popup_v2.B"+BOX+" .Library>.Item[D='"+$(this).attr("D")+"']").addClass("Selected").attr("S",1)
            })

            if(TYPE==1){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  $(".Popup_v2.B"+BOX+" .Library>.Item").removeClass("Selected").attr("S",0)
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
            if(TYPE==0){
               $(".Popup_v2.B"+BOX+" .Library>.Item").click(function(){
                  var S = $(this).attr("S")
                  var D = $(this).attr("D")
                  if(S==0){
                     $(this).addClass("Selected").attr("S",1)
                  }
                  if(S==1){
                     $(this).removeClass("Selected").attr("S",0)
                  }
                  var Counter = 0
                  $(".Popup_v2.B"+BOX+" .Library>.Item.Selected").each(function(){
                     Counter = Counter + 1
                  })
                  if(Counter==0){
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html("")
                  }else{
                     $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Left>.Text").html(Counter+" "+pageLang(2113))
                  }
               })
            }
         }
         });
      }
      function popAddLanguagesAdd(TYPE){
         var WIDTH      =  "center-30"
         var BOX 		   =	2
         var TITLE 		=	pageLang(2096)
         var SUBTITLE	=	pageLang(2120)
         var nonTITLE   =  1
         var nonCLOSE   =  1
         popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)

         $('\
         <div class="row">\
            <div class="col-md-4">\
               <div class="FormElements">\
                  <label> '+pageLang(2124)+' </label>\
                  <input name="Code">\
               </div>\
            </div>\
            <div class="col-md-12">\
               <div class="FormElements">\
                  <label> '+pageLang(2125)+' </label>\
                  <input name="Name">\
               </div>\
            </div>\
         </div>\
         ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
         $('<div class="theme-button success-btn btnSuccess"><span class="iwo-293"></span> '+pageLang(2107)+' </div>\
         <div class="theme-button default-btn btnCancel"><span class="ifa-58"></span> '+pageLang(2108)+'</div>\
         ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
         });

         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
            var Error   =  ""
            var Code    =  $(".Popup_v2.B"+BOX+"").find("[name='Code']").val()
            var Name    =  $(".Popup_v2.B"+BOX+"").find("[name='Name']").val()
            
            if(Code==""){ $(".Popup_v2.B"+BOX+"").find("[name='Code']").parent().addClass("Error"); Error = 1 }
            if(Name==""){ $(".Popup_v2.B"+BOX+"").find("[name='Name']").parent().addClass("Error"); Error = 1 }
            if(Error==0){
               $.ajax({
               type: "post",
               url: systemApp+"library/languageAdd",
               dataType: "json",
               data : "code="+encodeURIComponent(Code)+"&name="+encodeURIComponent(Name)+"",
               success: function(data) {
                  if(data.status=="error"){
                     notificationModal(data.status,pageLang(2100),data.message)
                  }else{
                     notificationModal(data.status,pageLang(2100),data.message)
                     popAddLanguages(TYPE)
                     $(".Popup_v2.B"+BOX+"").remove();
                     $("Body").css({"overflow":"visible"});
                  }
               }
               })
            }
         });
      }

      $(document).on("click",'.List>div>.fa-trash',function(){
         $(this).parent().remove()
      })
