
$("body").attr("Page","StudenLibraryPage")
$('<article class="PageArea">\
   <div class="Container">\
   <div class="row">\
      <div class="col-12 " style="padding:0">\
      <div class="DashArea">\
         <div class="LevelList">\
            <div class="Title"> '+pageLang(2048)+' </div>\
            <select name="LevelList"></select>\
            <div class="Navi">\
            </div>\
            <div class="LoadBar">\
               <span></span>\
            </div>\
            </div>\
         <div class="PageBox" CD="[[BookList]]" style="display:none">\
         </div>\
      </div>\
      </div>\
   </div>\
   </div>\
</article>\
').appendTo(".PageContentArea")

var WW = parseInt($(window).width())
if(WW<980){
   $(".Header .Left").html("<a href='/' class='BtnReportView'><i></i> <span> "+defaultLang(2042)+" </span></a>")
}


var systemUser = JSON.parse(localStorage.getItem("systemUser"))
var userType   = systemUser.type

$.ajax({
type: "post",
url: appPath+"student/view",
dataType: "json",
data : "id="+systemUser.user.id+"&language=TR",
success: function(data) {

      var student_Level    = data.student[0].level
      
      $.ajax({
      type: "post",
      url: systemApp+"library/level/",
      dataType: "json",
      data : "",
      success: function(data) {
         $.each( data.content, function( i, itemx ) {
            $(".LevelList>.Navi").append('<span lvl="'+itemx.id+'">'+itemx.name+'</span>')
            $("[name='LevelList']").append('<option value="'+itemx.id+'">'+itemx.name+'</option>')
         });

         $(".LevelList>.Navi>span[lvl='"+student_Level+"']").removeClass("Disabled").addClass("Active")
         var WW = parseInt($(".LevelList>.Navi>span.Active").width())
         var CC = parseInt($(".LevelList>.Navi>span.Active").index())+1
         var DD = (CC * 10)-10
         counter()

         $(".LevelList .LoadBar>span").css({"width":((WW*CC)+DD)+"px"})

         $(".LevelList>.Navi>span").click(function(){
            var LVL = $(this).attr("lvl")
            $(".LevelList>.Navi>span").removeClass("Active")
            $(".LevelList>.Navi>span[lvl='"+LVL+"']").addClass("Active")
            var WW = parseInt($(".LevelList>.Navi>span.Active").width())
            var CC = parseInt($(".LevelList>.Navi>span.Active").index())+1
            var DD = (CC * 10)-10

            $(".LevelList .LoadBar>span").css({"width":((WW*CC)+DD)+"px"})
            bookList(LVL)

            $.ajax({
            type: "post",
            url: appPath+"student/studentLevelUpdate",
            dataType: "json",
            data : "studentId="+systemUser.user.id+"&level="+LVL+"",
            success: function(data) {
            }
            })
            counter()
         })
      }
      });
      bookList(student_Level)
}
});

$("[name='LevelList']").change(function(){
   var LVL = $(this).val()
   $(".LevelList>.Navi>span").removeClass("Active")
   $(".LevelList>.Navi>span[lvl='"+LVL+"']").addClass("Active")
   var WW = parseInt($(".LevelList>.Navi>span.Active").width())
   var CC = parseInt($(".LevelList>.Navi>span.Active").index())+1
   var DD = (CC * 10)-10

   $(".LevelList .LoadBar>span").css({"width":((WW*CC)+DD)+"px"})
   bookList(LVL)

   $.ajax({
   type: "post",
   url: appPath+"student/studentLevelUpdate",
   dataType: "json",
   data : "studentId="+systemUser.user.id+"&level="+LVL+"",
   success: function(data) {
   }
   })
   counter()
})

function counter(){
   $(".LevelList>.Navi>span").removeClass("View")
   var LastIndex = $(".LevelList>.Navi>span").length
   var Index = parseInt($(".LevelList>.Navi>span.Active").index())
   if(Index==0){
      $(".LevelList>.Navi>span").eq(Index+1).addClass("View")
      $(".LevelList>.Navi>span").eq(Index+2).addClass("View")
   }else{
      $(".LevelList>.Navi>span").eq(Index-1).addClass("View")
      $(".LevelList>.Navi>span").eq(Index+1).addClass("View")
   }
   if(Index==(LastIndex-1)){
      $(".LevelList>.Navi>span").removeClass("View")
      $(".LevelList>.Navi>span").eq(Index-1).addClass("View")
      $(".LevelList>.Navi>span").eq(Index-2).addClass("View")
   }
}

function bookList(LVL){
   $.ajax({
   type: "post",
   url: systemApp+"book/list",
   dataType: "json",
   data : "type=2&studentId="+systemUser.user.id+"&levelId="+LVL+"&page=0&pageSize=33",
   success: function(data) {


      if(data!=""){
         $("[CD='[[BookList]]']").show()
      }else{
         $("[CD='[[BookList]]']").hide()
      }
      $("[CD='[[BookList]]']").html("")
      $.each( data.list, function( i, itemx ) {
         sessionStorage.setItem("book_"+itemx.id+"",JSON.stringify(itemx))

         var data_ID                =  itemx.id
         var book_Name              =  itemx.name
         var book_Photo             =  cdnDefaultUrl+itemx.img
         var book_Author            =  itemx.authors
            var book_Authors        =  ""
         if(book_Author!=""){
            book_Authors            =  itemx.authors[0].name
         }
         var book_Language          =  itemx.language
         var user_read              =  itemx.user.read
         var user_lastPage          =  itemx.user.lastPage
         var user_listen            =  itemx.user.listen
         var user_lastTime          =  itemx.user.lastTime

         if(user_read==undefined){ user_read  = 0}
         if(user_listen==undefined){ user_listen  = 0}

         if(user_listen==0){ user_listen_Text = pageLang(2049) }
         if(user_listen==1){ user_listen_Text = "Dinledi" }
         if(user_listen==2){ user_listen_Text = "Dinliyor" }

         if(user_read==0){ user_read_Text = pageLang(2050) }
         if(user_read==1){ user_read_Text = "Okundu" }
         if(user_read==2){ user_read_Text = "Okuyor" }

         $("[CD='[[BookList]]']").append('\
         <a class="Item" book="'+data_ID+'" Complete="'+user_read+'">\
            <div class="Area">\
               <div class="Language">\
               </div>\
               <div class="Photo"><img src="'+book_Photo+'"/></div>\
               <div class="Detail">\
                  <span>'+book_Name+'</span>\
                  <span>'+book_Authors+'</span>\
               </div>\
            </div>\
         </a>\
         ')
      });
   }
   });
}


$(document).on("click","[CD='[[BookList]]']>.Item",function(){
   var WIDTH      =  "ReadyBook"
   var BOX 		   =	1
   var TITLE 		=	""
   var SUBTITLE	=	""
   var nonTITLE   =  1
   var nonCLOSE   =  1
   popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
   $(".ReadyBook").addClass("Active")

   var BookId      = $(this).attr("book")
   var BookContent = JSON.parse(sessionStorage.getItem("book_"+BookId+""))

   var book_Name              =  BookContent.name
   var book_Photo             =  cdnDefaultUrl+BookContent.img
   var book_Author            =  BookContent.authors
   var book_Paper             =  0
      var book_Authors        =  ""
   if(book_Author!=""){
      book_Authors            =  BookContent.authors[0].name
   }
   var book_Language          =  BookContent.language
   var user_read              =  BookContent.user.read
   var user_lastPage          =  BookContent.user.lastPage
   var user_listen            =  BookContent.user.listen
   var user_lastTime          =  BookContent.user.lastTime
   
   var xbook_paper        =  0
   var book_timeStatus        =  0
   var book_time              =  ""
   var LanguageList = ""

   var promises = [];
   $.each( BookContent.languages, function( i, itemxx ) {
      var cll = ""
      if(i==0){ 
         cll = " Active" 
         xbook_paper        = itemxx.page
         book_time         = itemxx.time
         book_timeStatus   = itemxx.timeStatus
      }
      
      LanguageList = LanguageList + "<div class='LangItem "+cll+"' T='"+itemxx.code+"'>"+itemxx.flag+"</div>"
      promises.push();
   });
   
   $.when.apply($, promises).done(function () {
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom").remove()
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center").append('\
         <div>\
         <div class="Photo"><img src="'+book_Photo+'"></div>\
         <div class="Info">\
            <div class="Name">'+book_Name+'</div>\
            <div class="Authors">\
               <span>'+pageLang(2164)+'</span>\
               <span>'+book_Authors+'</span>\
            </div>\
            <div class="Language">\
               <span>'+pageLang(2165)+'</span>\
               <div>'+LanguageList+'</div>\
            </div>\
            <div style="display:flex">\
               <div class="Item Page">\
                  <span>'+pageLang(2163)+'</span>\
                  <span>'+xbook_paper+' '+pageLang(2163)+'</span>\
               </div>\
               <div class="Item Time Hide">\
                  <span>'+pageLang(2166)+'</span>\
                  <span>'+secondsTimeSpanToHMS(book_time)+'</span>\
               </div>\
            </div>\
         </div>\
         </div>\
         <div class="BtnList">\
            <div class="Btn Green"><i class="fa fa-book fa-fw"></i><span>'+pageLang(2167)+'</span></div>\
         </div>\
      ')
      if(book_timeStatus==1){ $(".Btn.Orange").removeClass("Hide");$(".Item.Time").removeClass("Hide") }

   
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .LangItem").click(function(){
         var Lang = $(this).attr("T")
         $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .LangItem").removeClass("Active")
         $(this).addClass("Active")


         var BookContent = JSON.parse(sessionStorage.getItem("book_"+BookId+""))
         var book_timeStatus        =  0
         var book_paper             =  ""
         var book_time              =  ""
         $.each( BookContent.languages, function( i, itemxx ) {
            var cll = ""
            if(itemxx.code==Lang){ 
               book_paper        = itemxx.page
               book_time         = itemxx.time
               book_timeStatus   = itemxx.timeStatus

               $(".Item.Page>span:last").html(book_paper+" "+pageLang(2163)+"")
               $(".Item.Time>span:last").html(secondsTimeSpanToHMS(book_time))
               if(book_timeStatus==1){
                  $(".Item.Time").removeClass("Hide")
                  $(".Btn.Orange").removeClass("Hide")
               }else{
                  $(".Item.Time").addClass("Hide")
                  $(".Btn.Orange").addClass("Hide")
               }
            }
         });
      });

      


      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .Btn.Green").click(function(){
         var Language = $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center").find(".LangItem.Active").attr("T")
         $.ajax({
         type: "post",
         url: systemApp+"student/bookDetail",
         dataType: "json",
         data : "studentId="+systemUser.user.id+"&bookId="+BookId+"&type=1&language="+Language+"",
         success: function(data) {
            sessionStorage.clear()
            localStorage.setItem("bookDetail",JSON.stringify(data))
            localStorage.removeItem("bookDetailLastPage")
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
            window.location.href="/student-book?bookId="+BookId

         }
         });
      });
      $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center .Btn.Orange").click(function(){
         var Language = $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Center").find(".LangItem.Active").attr("T")
         $.ajax({
         type: "post",
         url: systemApp+"student/bookDetail",
         dataType: "json",
         data : "studentId="+systemUser.user.id+"&bookId="+BookId+"&type=2&language="+Language+"",
         success: function(data) {
            sessionStorage.clear()
            localStorage.setItem("bookDetail",JSON.stringify(data))
            localStorage.removeItem("bookDetailLastPage")
            $(".Popup_v2.B"+BOX+"").remove();
            $("Body").css({"overflow":"visible"});
            window.location.href="/student-book?bookId="+BookId
         }
         });
      });
   });
})