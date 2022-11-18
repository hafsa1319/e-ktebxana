
         $('<article class="PageArea">\
            <div class="Container">\
            <div class="row">\
               <div class="col-12 pageTitle">\
                  <div class="Left">\
                  '+PageTitle()+'\
                  </div>\
                  <div class="Right">\
                     <div>\
                        <select name="Language" style="display:none">\
                        </select>\
                     </div>\
                     <a class="Btn Disabled" T="Save"> '+pageLang(2007)+' </a>\
                  </div>\
               </div>\
               <div class="col-12 ">\
                  <div class="Blank" style="background: #ffdcdc;color: #9c0e0e;padding: 14px;border-radius: 4px;border: 1px dashed #f00;display: none;">\
                     <div class="row">\
                        <div class="col-12 " style="display: flex;flex-direction: column;">\
                           <div class="Text">'+pageLang(2084)+'</div>\
                           <div class="Text">'+pageLang(2429)+'</div>\
                        </div>\
                     </div>\
                  </div>\
                  <div class="AddBook" style="display:none">\
                     <div class="row">\
                        <div class="col-12 " style="display: flex;gap:14px">\
                           <div class="dropzone oneFullItem" T="Single"></div>\
                        </div>\
                        <div class="col-12 " style="display: flex;gap:14px">\
                           <div class="PageList"></div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
            </div>\
         </article>\
         ').appendTo(".PageContentArea")


         let  Qpathname = window.location.pathname
         let  Qstring   = new URLSearchParams(window.location.search);
         var bookId = Qstring.get('bookId')
         if(bookId==undefined){ bookId = 0 }

         $.ajax({
         type: "post",
         url: systemApp+"book/view",
         dataType: "json",
         data : "id="+encodeURIComponent(bookId)+"&language="+userLang+"",
         success: function(data) {
            var Language   = ""
            $.each(data.book[0].languages, function( i, itemx ) {
               if(i==0){ Language = itemx.code }
               $("<option value='"+itemx.code+"'>"+itemx.name+"</option>").appendTo("[name='Language']")
            });
            
            if(Language==""){
               $(".Blank").show()
            }else{
               $(".AddBook").show()
               $("[name='Language']").show()
               $(".Btn[T='Save']").removeClass("Disabled")
               $.ajax({
               type: "post",
               url: systemApp+"book/view",
               dataType: "json",
               data : "id="+encodeURIComponent(bookId)+"&language="+Language+"",
               success: function(data) {
                  $.each(data.page, function( i, itemx ) {
                     $("<div class='dz-preview LoadImg addedImg dz-file-preview'>\
                        \n<div class='PageNumber' style='width: 19px;background: #e5e5e5;color: #000;display: flex;align-items: center;justify-content: center;border-radius: 4px;margin-right: 10px;'></div>\
                        \n<div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\
                        \n<img data-dz-thumbnail alt='"+itemx.file+"' src='"+cdnDefaultUrl+itemx.file+"'/>\
                        \n<div class='removeImg' onclick='dropzoneItemDelete(this)'>"+pageLang(2086)+"</div>\
                        <div id='"+itemx.code+"' style='padding-left: 16px;'>\
                           <div class='Id' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2087)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.code+"</span> </div>\
                           <div class='Name' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2088)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.file+"</span> </div>\
                           <div class='Timer' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2089)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.size+"</span> </div>\
                        </div>\
                     </div>").appendTo(".PageList")
                  });
                  numbers()
               }
               })
            }
         }
         })
         $("[name='Language']").change(function(){
            var Language      =  $(this).val()
            $(".PageList").html("")
            $.ajax({
            type: "post",
            url: systemApp+"book/view",
            dataType: "json",
            data : "id="+encodeURIComponent(bookId)+"&language="+Language+"",
            success: function(data) {
               $.each(data.page, function( i, itemx ) {
                  $("<div class='dz-preview LoadImg addedImg dz-file-preview'>\
                     \n<div class='PageNumber' style='width: 19px;background: #e5e5e5;color: #000;display: flex;align-items: center;justify-content: center;border-radius: 4px;margin-right: 10px;'></div>\
                     \n<div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\
                     \n<img data-dz-thumbnail alt='"+itemx.file+"' src='"+cdnDefaultUrl+itemx.file+"'/>\
                     \n<div class='removeImg' onclick='dropzoneItemDelete(this)'>"+pageLang(2086)+"</div>\
                     <div id='"+itemx.code+"' style='padding-left: 16px;'>\
                        <div class='Id' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2087)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.code+"</span> </div>\
                        <div class='Name' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2088)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.file+"</span> </div>\
                        <div class='Timer' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2089)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+itemx.size+"</span> </div>\
                     </div>\
                  </div>").appendTo(".PageList")
               });
               numbers()
            }
            })
         })
         $(".Btn[T='Save']").click(function(){
            var language      =  $("[name='Language']").val()
            var file          =  ""

            $(".PageList>.dz-preview").each(function(){
               var Code    =  $(this).find(".Id>span:last").html()
               var Time    =  $(this).find(".Timer>span:last").html()
               file = file + $(this).find("img").attr("alt") +"|"+ Time +"|"+ Code +","
            })
               file = file.slice(0,-1)

               $(".Btn[T='Save']").addClass("Loading")
               $.ajax({
               type: "post",
               url: systemApp+"book/bookAddPage",
               dataType: "json",
               data : "bookId="+encodeURIComponent(bookId)+"&language="+encodeURIComponent(language)+"&file="+encodeURIComponent(file)+"",
               success: function(data) {
                  notificationModal(data.status,pageLang(2084),data.message)
                  $(".Btn[T='Save']").removeClass("Loading")
               }
               })
         })

      
      Dropzone.autoDiscover = false;
      var dropzone = new Dropzone('.oneFullItem[T="Single"]', {
         previewsContainer: ".PageList",
         previewTemplate: "<div class='dz-preview LoadImg addedImg dz-file-preview'>\
            \n<div class='PageNumber' style='width: 19px;background: #e5e5e5;color: #000;display: flex;align-items: center;justify-content: center;border-radius: 4px;margin-right: 10px;'></div>\
            \n<div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\
            \n<img data-dz-thumbnail />\
            \n<div class='removeImg' onclick='dropzoneItemDelete(this)'>"+pageLang(2086)+"</div>\
         </div>",
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
            console.log(response)
            console.log(file)
            var FI         = response.split("/")
            var fileName   = FI[FI.length-1]
            if(response.indexOf(".jpg")!=-1 || response.indexOf(".jpeg")!=-1){
               $(".PageList").find(".dz-preview[id='document-"+file.serverId+"'] img").attr("alt",fileName).attr("src",response)
               $("\
               <div id='"+file.serverId+"' style='padding-left: 16px;'>\
                  <div class='Id' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2087)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+file.serverId+"</span> </div>\
                  <div class='Name' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2088)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+fileName+"</span> </div>\
                  <div class='Timer' style='display: flex;flex-direction: column;'> <span style='font-size: 12px;color: #9a9a9a;'> "+pageLang(2089)+" </span> <span style='font-size: 12px;font-weight: 600;'>"+file.width+"x"+file.height+" / "+formatBytes(file.size, decimals = 1)+"</span> </div>\
               </div>\
               ").insertAfter($(".PageList").find(".dz-preview[id='document-"+file.serverId+"'] .removeImg"))
            }else{
               notificationModal("error",pageLang(2084),pageLang(2085))
            }
            numbers()
         }
      });

      function formatBytes(bytes, decimals = 2) {
         if (!+bytes) return '0 Bytes'
     
         const k = 1024
         const dm = decimals < 0 ? 0 : decimals
         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
     
         const i = Math.floor(Math.log(bytes) / Math.log(k))
     
         return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
     }
     
      $( '.PageList' ).sortable({
         opacity: 0.6,
         cursor: 'move',
         update: function(event, ui) {
            numbers()
         }
      });

      function dropzoneItemDelete(ITEM){
         $(ITEM).parent().parent().removeClass("dz-started")
         $(ITEM).parent().fadeOut().delay(100).queue(function() {
            $(this).remove();
            numbers()
         });
      }

      function numbers(){
         var PageNumber = 1
         $(".PageList").find(".dz-preview").each(function(){
            $(this).find(".PageNumber").html(PageNumber)
            PageNumber = PageNumber + 1
         })
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
