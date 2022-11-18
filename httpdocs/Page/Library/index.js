

      $('<article class="PageArea">\
         <div class="Container">\
         <div class="row">\
            <div class="col-12 pageSubNavList">\
            </div>\
         </div>\
         </div>\
      </article>\
      ').appendTo(".PageContentArea")

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

      if(xx_TOPID==pageID & xx_VIEW==1 & $('.pageSubNavList>a[href="'+xx_URL+'"]').html()==undefined){
         $('.pageSubNavList').append('\
            <a href="'+xx_URL+'" class="pageSubNav">\
               <div class="Icon"><img src="'+xx_ICON+'"/></div>\
               <div class="Info">\
                  <span>'+xx_NAME+'</span>\
                  <span>'+xx_DESC+'</span>\
               </div>\
            </a>\
         ')
      }

   });