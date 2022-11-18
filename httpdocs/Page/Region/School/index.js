

   $('\
   <article class="PageArea">\
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
            <div class="TabList">\
            </div>\
         </div>\
         <div class="col-12 ">\
            <div class="PageBox" CD="[[LoadView]]">\
            </div>\
         </div>\
      </div>\
      </div>\
   </article>\
   ').appendTo(".PageContentArea")

   var schoolId = 0
   var Qpathname = window.location.pathname
   var Qstring   = new URLSearchParams(window.location.search);
   var schoolId = Qstring.get('schoolId')
   if(schoolId==undefined){ schoolId = 0 }

var pageID     = sessionStorage.getItem("pageID")
var pageTOP_ID = sessionStorage.getItem("pageTOP_ID")

var systemUser = JSON.parse(localStorage.getItem("systemUser"))
var userType   = systemUser.type

   var promises = [];
   $.each( systemUser.nav, function( i, itemx ) {

      var xx_ID      =  itemx.id
      var xx_TOPID   =  itemx.topId
      var xx_NAME    =  itemx.name
      var xx_DESC    =  itemx.name
      var xx_ICON    =  itemx.icon
      var xx_URL     =  itemx.url
      var xx_VIEW    =  itemx.view

      if(xx_TOPID==pageID & $('.pageSubNavList>a[href="'+xx_URL+'"]').html()==undefined){
         $('.TabList').append('\
            <div href="'+xx_URL+'" class="TabItem" Id="'+xx_ID+'">\
               <div class="Icon"><img src="'+xx_ICON+'"/></div>\
               <span>'+xx_NAME+'</span>\
            </div>\
         ')
      }
      promises.push();
   });

   $.when.apply($, promises).done(function () {

      var schoolTabItem =  localStorage.getItem("schoolTabItem")
      if(schoolTabItem==null){
         schoolTabItem = $(".TabList>.TabItem:first").attr("Id")
         localStorage.setItem("schoolTabItem",schoolTabItem)

      }
      $(".TabList>.TabItem[Id='"+schoolTabItem+"']").addClass("Active")
      LoadView(schoolTabItem)


      $(".TabList>.TabItem").click(function(){
         var TabItem = $(this).attr("Id")
         localStorage.setItem("schoolTabItem",TabItem)
         $(".TabList>.TabItem").removeClass("Active")
         $(".TabList>.TabItem[Id='"+TabItem+"']").addClass("Active")
         LoadView(TabItem)
      })

   });


   function LoadView(PageId){
      Loading()
      $(".Popup_v2").remove();
      $("Body").css({"overflow":"visible"});
      localStorage.setItem("schoolTabItem",PageId)
      $(".TabList>.TabItem").removeClass("Active")
      $(".TabList>.TabItem[Id='"+PageId+"']").addClass("Active")
      $.each( systemUser.nav, function( i, itemx ) {
         if(itemx.id==PageId){
            var randomnos = Math.ceil(Math.random() * 1000000000);
            var script = document.createElement('script');
            script.id = itemx.id;
            script.src = itemx.path+"?"+randomnos+"";
            document.head.appendChild(script);
            $(".Loading").fadeOut(1000)
         }
      });
   }