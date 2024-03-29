
$("body").attr("Page","BookRead")


         
$('\
<div class="BookOverlow"></div>\
<article class="PageArea">\
<div class="Container">\
<div class="row">\
   <div class="col-12 ">\
      <div class="BookDetailArea">\
         <div class="BookDetail">\
            <div class="Left" T="Prev"><i class="fa fa-chevron-left fa-fw"></i> <span> '+pageLang(2045)+' </span> </div>\
            <div class="Center">\</div>\
            <div class="Right" T="Next"> <span> '+pageLang(2046)+' </span> <i class="fa fa-chevron-right fa-fw"></i></div>\
         </div>\
         <div class="BookBar">\
            <div class="Container">\
               <a href="/student-library" class="Left">\
                  <i class="fa fa-arrow-left"></i>\
                  <span> '+pageLang(2047)+' </span>\
               </a>\
               <div class="Center">\
                  <div class="Book">\
                     <div class="Img"></div>\
                     <div class="Info">\
                        <span></span>\
                        <span></span>\
                     </div>\
                  </div>\
                  <div class="Pagination">\
                     <div class="Left" T="Prev"><i class="fa fa-chevron-left fa-fw"></i></div>\
                     <span></span>\
                     <span>/</span>\
                     <span></span>\
                     <div class="Right" T="Next"> <i class="fa fa-chevron-right fa-fw"></i></div>\
                  </div>\
               </div>\
               <div class="Right">\
                  <div class="Btn fillOrange">\
                     <svg viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg"><path  d="M480 704h160a64 64 0 0064-64v-32h-96a32 32 0 010-64h96v-96h-96a32 32 0 010-64h96v-96h-96a32 32 0 010-64h96v-32a64 64 0 00-64-64H384a64 64 0 00-64 64v32h96a32 32 0 010 64h-96v96h96a32 32 0 010 64h-96v96h96a32 32 0 010 64h-96v32a64 64 0 0064 64h96zm64 64v128h192a32 32 0 110 64H288a32 32 0 110-64h192V768h-96a128 128 0 01-128-128V192A128 128 0 01384 64h256a128 128 0 01128 128v448a128 128 0 01-128 128h-96z"/></svg>\
                     <div class="audio-record" style="bottom: 85px;position: relative;display:none">\
                        <button id="recordButton">Start Recording</button>\
                        <button id="stopButton" class="inactive">Stop</button>\
                        <input id="preprocess" type="file">\
                        <pre id="data-uri"></pre>\
                        <div id="dz"> dropzone.js </div>\
                        <div class="download">\
                        <button class="hidden" id="downloadContainer">\
                           <a href="" download="" id="downloadButton">Download Audio</a>\
                        </button>\
                        </div>\
                        <div class="playback">\
                        <audio src="" controls id="audio-playback" class="hidden"></audio>\
                        </div>\
                     </div>\
                  </div>\
                  <div class="Btn fillGreen" T="Voice" S="0">\
                     <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 467.2 467.2" style="enable-background:new 0 0 467.2 467.2;" xml:space="preserve"><g><path d="M467.2,235.7c0-62.4-24.3-121.1-68.4-165.2S296,2.1,233.6,2.1S112.5,26.4,68.4,70.5S0,173.3,0,235.7v110.6 c0,62.5,50.9,113.4,113.4,113.4c7.5,0,13.5-6,13.5-13.5V246.5c0-7.5-6-13.5-13.5-13.5c-34.6,0-65.6,15.5-86.4,40v-37.3 c0-113.9,92.7-206.6,206.6-206.6s206.6,92.7,206.6,206.6c0,0.9,0.1,1.8,0.3,2.7c-0.2,0.9-0.3,1.8-0.3,2.7v37.3 c-20.8-24.5-51.8-40-86.4-40c-7.5,0-13.5,6-13.5,13.5v199.7c0,7.5,6,13.5,13.5,13.5c62.5,0,113.4-50.9,113.4-113.4V241.1 c0-0.9-0.1-1.8-0.3-2.7C467.1,237.5,467.2,236.6,467.2,235.7z M99.8,261v170.6c-41.2-6.5-72.9-42.3-72.9-85.3 C27,303.3,58.6,267.5,99.8,261z M367.4,437V266.4c41.2,6.5,72.9,42.3,72.9,85.3C440.2,394.8,408.6,430.5,367.4,437z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\
                     <div class="Wind">\
                        <div class="Arrow fa fa-arrow-down"></div>\
                        <div class="WindArea">\
                           <div class="Title"> '+pageLang(2619)+' </div>\
                           <div class="List"></div>\
                           <div class="NewReocrd">\
                              <div class="InputItem">\
                                 <button class="btn btn-primary voiceStart" id="start-recording" onclick="startRecording()">Recording Start</button>\
                                 <button class="btn btn-default voiceStop" id="stop-recording" onclick="stopRecording()">Stop</button>\
                                 <button class="btn btn-default" id="save-recording" onclick="saveRecording()" style="display:none">Save</button>\
                                 <div id="record-audio" style="position: absolute;bottom: 0;width: 100%;display: flex;align-items: center;justify-content: center;padding-bottom: 10px;"></div>\
                                 <span id="clicks" style="display:none">0</span>\
                                 <input id="preprocess" type="file" style="display:none">\
                                 <pre id="data-uri" style="display:none"></pre>\
                                 <div id="dz" style="display:none"> dropzone.js </div>\
                              </div>\
                           </div>\
                           <div class="BtnList" T="1">\
                              <div class="Btn" T="AddVoice"> '+pageLang(2620)+' </div>\
                              <div class="Btn" T="CloseVoice"> '+pageLang(2621)+' </div>\
                           </div>\
                           <div class="BtnList" T="2">\
                              <div class="Btn Disabled" T="SaveVoice" onclick="saveRecording()"> '+pageLang(2622)+' </div>\
                              <div class="Btn" T="CancelVoice"> '+pageLang(2621)+' </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
                  <div class="Btn fillPrimary" T="Note" S="0">\
                     <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M376,208c-4.418,0-8,3.582-8,8v256c0,13.234-10.766,24-24,24H40c-13.234,0-24-10.766-24-24V168c0-13.234,10.766-24,24-24 h256c4.418,0,8-3.582,8-8s-3.582-8-8-8H40c-22.056,0-40,17.944-40,40v304c0,22.056,17.944,40,40,40h304c22.056,0,40-17.944,40-40 V216C384,211.582,380.418,208,376,208z"/><path d="M502.628,9.377C496.586,3.33,488.55,0,480,0s-16.586,3.33-22.625,9.375L200.406,266.343 c-0.759,0.759-1.358,1.663-1.76,2.658l-23.031,56.969c-1.203,2.977-0.51,6.385,1.76,8.655c1.53,1.53,3.576,2.343,5.658,2.343 c1.009,0,2.026-0.19,2.997-0.583l56.969-23.031c0.995-0.402,1.899-1.001,2.658-1.76L502.625,54.627 C508.67,48.583,512,40.548,512,32S508.67,15.417,502.628,9.377z M240.969,293.655l-22.624-22.624L455.031,34.345l22.624,22.624 L240.969,293.655z M209.508,284.822l17.67,17.67l-29.662,11.992L209.508,284.822z M491.312,43.312l-2.343,2.343l-22.624-22.624 l2.346-2.346C471.709,17.664,475.726,16,480,16s8.291,1.664,11.313,4.689C494.335,23.71,496,27.728,496,32 S494.335,40.29,491.312,43.312z"/><path d="M240,200c0-4.418-3.582-8-8-8H72c-4.418,0-8,3.582-8,8s3.582,8,8,8h160C236.418,208,240,204.418,240,200z"/><path d="M200,240c0-4.418-3.582-8-8-8H72c-4.418,0-8,3.582-8,8s3.582,8,8,8h120C196.418,248,200,244.418,200,240z"/><path d="M168,272H72c-4.418,0-8,3.582-8,8s3.582,8,8,8h96c4.418,0,8-3.582,8-8S172.418,272,168,272z"/><path d="M72,328h80c4.418,0,8-3.582,8-8s-3.582-8-8-8H72c-4.418,0-8,3.582-8,8S67.582,328,72,328z"/><path d="M264,320c0,4.418,3.582,8,8,8h40c4.418,0,8-3.582,8-8s-3.582-8-8-8h-40C267.582,312,264,315.582,264,320z"/><path d="M317.66,285.66c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66c-1.49-1.49-3.55-2.34-5.66-2.34 c-2.1,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.56-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66c1.49,1.49,3.56,2.34,5.66,2.34 S316.17,287.15,317.66,285.66z"/><path d="M64,360c0,4.418,3.582,8,8,8h240c4.418,0,8-3.582,8-8s-3.582-8-8-8H72C67.582,352,64,355.582,64,360z"/><path d="M312,392H72c-4.418,0-8,3.582-8,8s3.582,8,8,8h240c4.418,0,8-3.582,8-8S316.418,392,312,392z"/><path d="M312,432H72c-4.418,0-8,3.582-8,8s3.582,8,8,8h240c4.418,0,8-3.582,8-8S316.418,432,312,432z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\
                     <div class="Wind">\
                        <div class="Arrow fa fa-arrow-down"></div>\
                        <div class="WindArea">\
                           <div class="Title"> '+pageLang(2623)+' </div>\
                           <div class="List"></div>\
                           <div class="NewReocrd">\
                              <div class="InputItem">\
                                 <span> '+pageLang(2624)+' </span>\
                                 <textarea name="NewNote"></textarea>\
                              </div>\
                           </div>\
                           <div class="BtnList" T="1">\
                              <div class="Btn" T="AddNote"> '+pageLang(2625)+' </div>\
                              <div class="Btn" T="CloseNote"> '+pageLang(2621)+' </div>\
                           </div>\
                           <div class="BtnList" T="2">\
                              <div class="Btn" T="SaveNote"> '+pageLang(2622)+' </div>\
                              <div class="Btn" T="CancelNote"> '+pageLang(2621)+' </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
   </div>\
</div>\
</article>\
').appendTo(".PageContentArea")

var  Qpathname = window.location.pathname
var  Qstring   = new URLSearchParams(window.location.search);
var bookId = Qstring.get('bookId')
if(bookId==undefined){ bookId = 0 }


var systemUser = JSON.parse(localStorage.getItem("systemUser"))
var userType   = systemUser.type

var DataId     = 0
var DataId     = 0
var BookPaper  = 0
var BookLanguage  = ""

var BookContent= JSON.parse(localStorage.getItem("bookDetail"))

   DataId               =  BookContent.id
   var LastPage         =  BookContent.lastPage
   var LastTime         =  BookContent.lastTime
   var Listen           =  BookContent.listen
   var Read             =  BookContent.read
   BookPage             =  BookContent.pages
   BookListen           =  BookContent.listenList
   var BookName         =  BookContent.book.name
   var BookAuthor       =  BookContent.book.author
   var BookAuthors      =  BookContent.book.authors
   var BookImg          =  BookContent.book.img
   BookPaper            =  BookContent.pages.length

   if(localStorage.getItem("bookDetailLastPage")==null){
      localStorage.setItem("bookDetailLastPage",LastPage)
   }
   LastPage = localStorage.getItem("bookDetailLastPage")

   $(".BookDetail>.Center").html("<img src='"+cdnDefaultUrl+BookImg+"'>")
   $(".Pagination>span:first").html(LastPage)
   $(".Pagination>span:last").html(BookPaper)
   $(".Book>.Info>span:first").html(BookName)
   $(".Book>.Info>span:last").html(BookAuthor)
   $(".Book>.Img").html("<img src='"+cdnDefaultUrl+BookImg+"'/>")

   $(".BookDetailArea .Pagination .Left").addClass("Disabled")
   $(".BookDetailArea .BookDetail .Left").addClass("Disabled")
   $(".BookDetailArea .Pagination .Right").addClass("Disabled")
   $(".BookDetailArea .BookDetail .Right").addClass("Disabled")

   if(LastPage>1){
      $(".BookDetailArea .Pagination .Left").removeClass("Disabled")
      $(".BookDetailArea .BookDetail .Left").removeClass("Disabled")
   }
   if(LastPage<BookPaper){
      $(".BookDetailArea .Pagination .Right").removeClass("Disabled")
      $(".BookDetailArea .BookDetail .Right").removeClass("Disabled")
   }
   $.each(BookPage, function( i, itemx ) {
      BookLanguage = itemx.language
      if(itemx.page==LastPage){ 
         $(".BookDetail>.Center").html("<img src='"+cdnDefaultUrl+itemx.file +"'>")
      }
      if(itemx.page==LastPage+1){ 
         $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
      }
      if(itemx.page==LastPage-1){ 
         $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
      }
   });

   $.each(BookListen, function( i, itemx ) {
      if(itemx.page==LastPage){ 
      //      console.log("file="+cdnDefaultUrl+itemx.file)
      //      $('.BookBar>.Container>.Center').append('<div T="Voice" style="position: absolute;left: 0;bottom: 100%;width: 100%;"><audio id="audio" class="audio" preload="auto" controls><source src="'+cdnDefaultUrl+itemx.file+'"></audio></div>')
      //      $(".audio").audioPlayer({
      //         
      //      })
      //      $(".audioplayer-playpause").trigger("click");
      }
   });



$('[T="Voice"]>svg').click(function(){
   $('[T="Listen"]').removeClass("Active").attr("S",0)
   $('[T="Note"]').removeClass("Active").attr("S",0)
   var S = $(this).parent().attr("S")
   bookVoiceList()
   if(S==0){
      $(this).parent().attr("S",1).addClass("Active")
   }else{
      $(this).parent().attr("S",0).removeClass("Active")
   }
})
$('[T="CloseVoice"]').click(function(){
   $('[T="Voice"]').removeClass("Active").attr("S",0)
   $('[T="Voice"]').find(".WindArea>.List").show()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
   $('[T="Voice"]').find(".WindArea>.NewReocrd").hide()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='2']").hide()
})
$('[T="CancelVoice"]').click(function(){
   $('[T="Voice"]').find(".WindArea>.List").show()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
   $('[T="Voice"]').find(".WindArea>.NewReocrd").hide()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='2']").hide()
})
$('[T="AddVoice"]').click(function(){
   $('[T="Voice"]').find(".WindArea>.List").hide()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='1']").hide()
   $('[T="Voice"]').find(".WindArea>.NewReocrd").show()
   $('[T="Voice"]').find(".WindArea>.BtnList[T='2']").css({"display":"flex"})
})



$('[T="SaveNote"]').click(function(){
   var NOTE = $("[name='NewNote']").val()
   var PAGE = $(".BookDetailArea .BookBar .Center>.Pagination>span:nth-child(2)").html()
   $.ajax({
   type: "post",
   url: appPath+"student/bookNoteAdd",
   dataType: "json",
   data : "studentId="+systemUser.user.id+"&dataId="+DataId+"&page="+PAGE+"&language="+BookLanguage+"&note="+NOTE+"",
   success: function(data) {
      bookNoteList()
   }
   })
   $("[name='NewNote']").val("")
   $('[T="Note"]').find(".WindArea>.List").show()
   $('[T="Note"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
   $('[T="Note"]').find(".WindArea>.NewReocrd").hide()
   $('[T="Note"]').find(".WindArea>.BtnList[T='2']").hide()
})
$('[T="CloseNote"]').click(function(){
   $('[T="Note"]').removeClass("Active").attr("S",0)
   $('[T="Note"]').find(".WindArea>.List").show()
   $('[T="Note"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
   $('[T="Note"]').find(".WindArea>.NewReocrd").hide()
   $('[T="Note"]').find(".WindArea>.BtnList[T='2']").hide()
})
$('[T="CancelNote"]').click(function(){
   $('[T="Note"]').find(".WindArea>.List").show()
   $('[T="Note"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
   $('[T="Note"]').find(".WindArea>.NewReocrd").hide()
   $('[T="Note"]').find(".WindArea>.BtnList[T='2']").hide()
})
$('[T="AddNote"]').click(function(){
   $('[T="Note"]').find(".WindArea>.List").hide()
   $('[T="Note"]').find(".WindArea>.BtnList[T='1']").hide()
   $('[T="Note"]').find(".WindArea>.NewReocrd").show()
   $('[T="Note"]').find(".WindArea>.BtnList[T='2']").css({"display":"flex"})
})
$('[T="Note"]>svg').click(function(){
   $('[T="Listen"]').removeClass("Active").attr("S",0)
   $('[T="Voice"]').removeClass("Active").attr("S",0)
   var S = $(this).parent().attr("S")
   bookNoteList()
   if(S==0){
      $(this).parent().attr("S",1).addClass("Active")
   }else{
      $(this).parent().attr("S",0).removeClass("Active")
   }
})
function bookNoteList(){
   $.ajax({
   type: "post",
   url: appPath+"student/bookNote",
   dataType: "json",
   data : "studentId="+systemUser.user.id+"&dataId="+DataId+"",
   success: function(data) {
      $("[T='Note']").find(".WindArea>.List").html("")
      $.each(data.list, function( i, itemx ) {
         $("[T='Note']").find(".WindArea>.List").append('\
         <div class="Item">\
            <div class="Text">\
               <span>Not : '+itemx.id+'</span>\
               <span>'+itemx.note+'</span>\
               <span>'+pageLang(2626)+' '+itemx.page+' - '+itemx.recordTime+'</span>\
            </div>\
            <div class="BtnList">\
               <div class="Btn fa fa-trash" T="NoteDelete" D="'+itemx.id+'"></div>\
            </div>\
         </div>\
         ')

         $('.Btn[T="NoteDelete"]').click(function(){
            var D = $(this).attr("D")
            $.ajax({
            type: "post",
            url: appPath+"student/bookNoteDelete",
            dataType: "json",
            data : "id="+D+"",
            success: function(data) {
               bookNoteList()
            }
            });
         })
      });
   }
   })
}
function bookVoiceList(){
   $.ajax({
   type: "post",
   url: appPath+"student/bookVoice",
   dataType: "json",
   data : "studentId="+systemUser.user.id+"&dataId="+DataId+"",
   success: function(data) {
      $("[T='Voice']").find(".WindArea>.List").html("")
      $.each(data.list, function( i, itemx ) {
         $("[T='Voice']").find(".WindArea>.List").append('\
         <div class="Item Voice">\
            <div class="Text">\
               <audio controls="" id="record-audioItem"><source src="' + itemx.file + '"></source></audio>\
               <span></span>\
               <span>'+pageLang(2626)+' '+itemx.page+' - '+itemx.recordTime+'</span>\
            </div>\
            <div class="BtnList">\
               <div class="Btn fa fa-trash" T="VoiceDelete" D="'+itemx.id+'"></div>\
            </div>\
         </div>\
         ')

         $('.Btn[T="VoiceDelete"]').click(function(){
            var D = $(this).attr("D")
            $.ajax({
            type: "post",
            url: appPath+"student/bookVoiceDelete",
            dataType: "json",
            data : "id="+D+"",
            success: function(data) {
               bookVoiceList()
            }
            });
         })
      });
   }
   })
}

   

$(document).ready(function(){



var WW = parseInt($(window).width())
var WH = parseInt($(window).height()) - 120
$(".BookDetail").css({"height":WH+"px"})
   var ReturnUrl = "/student-library"
   $(".BookBar>.Container>.Left>a").attr("href",ReturnUrl)
   if(WW<980){
      var ReturnUrl = "/"
      var WH = parseInt($(window).height())-60
      $(".BookDetail").css({"height":WH+"px"})
      $(".BookBar>.Container>.Left>a").attr("href",ReturnUrl)
   }
   if(WW<540){
      var ReturnUrl = "/"
      var WH = parseInt($(window).height())-120
      $(".BookDetail").css({"height":WH+"px"})
      $(".BookBar>.Container>.Left>a").attr("href",ReturnUrl)
   }

$(".BookDetail>.Center").css({"height":WH+"px"})
$(".BookDetail>.Center>img").css({"height":WH+"px"})






$(".BookDetailArea [T='Next']").click(function(){
   var NowPage    =  parseInt($(".Pagination>span:first").html())+1
   $.ajax({
   type: "post",
   url: appPath+"student/bookPage",
   dataType: "json",
   data : "id="+DataId+"&page="+NowPage+"",
   success: function(data) {
      
      localStorage.setItem("bookDetailLastPage",NowPage)
      var NextPage = ""
      $.each(BookPage, function( i, itemx ) {
         if(itemx.page==NowPage){ NextPage = itemx.file }
         if(itemx.page==NowPage+1){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
         if(itemx.page==NowPage+2){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
         if(itemx.page==NowPage+3){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
      });
   
      $(".BookDetail>.Center").html("<img src='"+cdnDefaultUrl+NextPage+"'>")
      $(".Pagination>span:first").html(NowPage)
      
      $(".BookDetailArea .Pagination .Left").removeClass("Disabled")
      $(".BookDetailArea .BookDetail .Left").removeClass("Disabled")
      console.log("NowPage="+NowPage)
      console.log("BookPaper="+BookPaper)
      if(NowPage==BookPaper){
         $(".BookDetailArea .Pagination .Right").addClass("Disabled")
         $(".BookDetailArea .BookDetail .Right").addClass("Disabled")
         $.ajax({
         type: "post",
         url: appPath+"student/bookReadEnd",
         dataType: "json",
         data : "id="+DataId+"",
         success: function(data) {
         }});
         
      }
   }
   });
});

$(".BookDetailArea [T='Prev']").click(function(){
   var NowPage    =  parseInt($(".Pagination>span:first").html())-1
   $.ajax({
   type: "post",
   url: appPath+"student/bookPage",
   dataType: "json",
   data : "id="+DataId+"&page="+NowPage+"",
   success: function(data) {
   
      localStorage.setItem("bookDetailLastPage",NowPage)
      var NextPage = ""
      $.each(BookPage, function( i, itemx ) {
         if(itemx.page==NowPage){ NextPage = itemx.file }
         if(itemx.page==NowPage-1){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
         if(itemx.page==NowPage-2){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
         if(itemx.page==NowPage-3){ 
            $("<img style='display:none' src='"+cdnDefaultUrl+itemx.file+"'/>").appendTo("body")
         }
      });
   
      $(".BookDetail>.Center").html("<img src='"+cdnDefaultUrl+NextPage+"'>")
      $(".Pagination>span:first").html(NowPage)

      console.log("NowPage="+NowPage)
      console.log("BookPaper="+BookPaper)
      $(".BookDetailArea .Pagination .Right").removeClass("Disabled")
      $(".BookDetailArea .BookDetail .Right").removeClass("Disabled")
      if(NowPage==1){
         $(".BookDetailArea .Pagination .Left").addClass("Disabled")
         $(".BookDetailArea .BookDetail .Left").addClass("Disabled")
      }
   }
   });
});

})




function dataURItoBlob(dataURI) {
   // http://stackoverflow.com/a/12300351/4578017
   var byteString = atob(dataURI.split(',')[1]);
 
   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
 
   var ab = new ArrayBuffer(byteString.length);
   var ia = new Uint8Array(ab);
   for (var i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
   }
 
   var blob = new Blob([ab], {type: mimeString});
   return blob;
 }

Dropzone.autoDiscover = false;
var myDropzone = new Dropzone('#dz', {
    previewTemplate: '<div class="Item" data-id=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="26px" height="26px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#72e15b" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg></div>',
    url: "https://dev.runsia.com/zfc/"+cdnDefaultPath,
    method: 'post',
    init: function () {
        this.on("sending", function (file, xhr, formData) {
        console.log(file)
        console.log(formData)
        $("[T='Voice']").addClass("Loading")
        $(".Btn[T='SaveVoice']").addClass("Loading")
        });
    },
    success: function (file, response) {
        file.serverId = (new Date().getTime()).toString(36)
        $(file.previewTemplate).attr('id', "document-" + file.serverId);
        response = response.url;
        var FI = response.split("/")
        var fileName = FI[FI.length-1]

         var PAGE = $(".BookDetailArea .BookBar .Center>.Pagination>span:nth-child(2)").html()
         var Time    =  document.getElementById("record-audioItem").duration
         $.ajax({
         type: "post",
         url: appPath+"student/bookVoiceAdd",
         dataType: "json",
         data : "studentId="+systemUser.user.id+"&dataId="+DataId+"&page="+PAGE+"&language="+BookLanguage+"&file="+response+"&fileTime="+Time+"",
         success: function(data) {
            bookVoiceList()
            $('[T="Voice"]').find(".WindArea>.List").show()
            $('[T="Voice"]').find(".WindArea>.BtnList[T='1']").css({"display":"flex"})
            $('[T="Voice"]').find(".WindArea>.NewReocrd").hide()
            $('[T="Voice"]').find(".WindArea>.BtnList[T='2']").hide()
            $("[T='Voice']").removeClass("Loading")
            $(".Btn[T='SaveVoice']").removeClass("Loading")
         }
         })
    }
});

$('#preprocess').on('change', function() {
const reader = new FileReader();
reader.onload = () => {
    $('#data-uri').text(reader.result.slice(0, 64) + '...');
    addBlob(dataURItoBlob(reader.result));
};
reader.readAsDataURL(this.files[0]);
});

function addBlob(blob) {
blob.name = 'myfilename.ogg'
myDropzone.addFile(blob);
}



function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
   navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

var mediaConstraints = {
   audio: true
};
document.querySelector('#save-recording').onclick = function () {
   this.disabled = true;
   mediaRecorder.save();
   // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
};
function startRecording(idx) {
   
   $(".voiceStart").hide()
   $(".voiceStop").show()
   $(".Btn[T='SaveVoice']").addClass("Disabled")

   $('#start-recording').disabled = true;
   audiosContainer = document.getElementById('audios-container');
   document.getElementById("clicks").innerHTML = "Recording Started";
   var f = document.getElementById('clicks');
   captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
};

function stopRecording() {
   $('#stop-recording').disabled = true;

   document.getElementById("clicks").innerHTML = "Recording Stopped";
   var f = document.getElementById('clicks');
   mediaRecorder.stop();
   mediaRecorder.stream.stop();

   $(".voiceStart").show()
   $(".voiceStop").hide()
   $(".Btn[T='SaveVoice']").removeClass("Disabled")
   $('.start-recording').disabled = false;
};

function saveRecording() {
   mediaRecorder.save();
};

var mediaRecorder;

function onMediaSuccess(stream) {
   mediaRecorder = new MediaStreamRecorder(stream);
   mediaRecorder.stream = stream;
   mediaRecorder.mimeType = 'audio/wav';
   mediaRecorder.audioChannels = 1;
   
   mediaRecorder.ondataavailable = function (blob) {
       $('#record-audio').html("<audio controls='' id='record-audioItem'><source src=" + URL.createObjectURL(blob) + "></source></audio>");
   };
   var timeInterval = 360 * 1000;
   mediaRecorder.start(timeInterval);
   $('#stop-recording').disabled = false;
}

function onMediaError(e) {
   console.error('media error', e);
}

function bytesToSize(bytes) {
   var k = 1000;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return '0 Bytes';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function getTimeLength(milliseconds) {
   var data = new Date(milliseconds);
   return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}

window.onbeforeunload = function () {
   $('#start-recording').disabled = false;
};



'use strict';
function MediaStreamRecorder(mediaStream) {
if (!mediaStream) {
throw 'MediaStream is mandatory.';
}

// void start(optional long timeSlice)
// timestamp to fire "ondataavailable"
this.start = function(timeSlice) {
var Recorder;

if (typeof MediaRecorder !== 'undefined') {
   Recorder = MediaRecorderWrapper;
} else if (IsChrome || IsOpera || IsEdge) {
   if (this.mimeType.indexOf('video') !== -1) {
       Recorder = WhammyRecorder;
   } else if (this.mimeType.indexOf('audio') !== -1) {
       Recorder = StereoAudioRecorder;
   }
}

// video recorder (in GIF format)
if (this.mimeType === 'image/gif') {
   Recorder = GifRecorder;
}

// audio/wav is supported only via StereoAudioRecorder
// audio/pcm (int16) is supported only via StereoAudioRecorder
if (this.mimeType === 'audio/wav' || this.mimeType === 'audio/pcm') {
   Recorder = StereoAudioRecorder;
}

// allows forcing StereoAudioRecorder.js on Edge/Firefox
if (this.recorderType) {
   Recorder = this.recorderType;
}

mediaRecorder = new Recorder(mediaStream);
mediaRecorder.blobs = [];

var self = this;
mediaRecorder.ondataavailable = function(data) {
   mediaRecorder.blobs.push(data);
   self.ondataavailable(data);
};
mediaRecorder.onstop = this.onstop;
mediaRecorder.onStartedDrawingNonBlankFrames = this.onStartedDrawingNonBlankFrames;

// Merge all data-types except "function"
mediaRecorder = mergeProps(mediaRecorder, this);

mediaRecorder.start(timeSlice);
};

this.onStartedDrawingNonBlankFrames = function() {};
this.clearOldRecordedFrames = function() {
if (!mediaRecorder) {
   return;
}

mediaRecorder.clearOldRecordedFrames();
};

this.stop = function() {
if (mediaRecorder) {
   mediaRecorder.stop();
}
};

this.ondataavailable = function(blob) {
if (this.disableLogs) return;
console.log('ondataavailable..', blob);
};

this.onstop = function(error) {
console.warn('stopped..', error);
};

this.save = function(file, fileName) {

if (!file) {
   if (!mediaRecorder) {
       return;
   }

   ConcatenateBlobs(mediaRecorder.blobs, mediaRecorder.blobs[0].type, function(concatenatedBlob) {
       invokeSaveAsDialog(concatenatedBlob);
   });
   return;
}
invokeSaveAsDialog(file, fileName);
};

this.pause = function() {
if (!mediaRecorder) {
   return;
}
mediaRecorder.pause();

if (this.disableLogs) return;
console.log('Paused recording.', this.mimeType || mediaRecorder.mimeType);
};

this.resume = function() {
if (!mediaRecorder) {
   return;
}
mediaRecorder.resume();

if (this.disableLogs) return;
console.log('Resumed recording.', this.mimeType || mediaRecorder.mimeType);
};

// StereoAudioRecorder || WhammyRecorder || MediaRecorderWrapper || GifRecorder
this.recorderType = null;

// video/webm or audio/webm or audio/ogg or audio/wav
this.mimeType = 'video/webm';

// logs are enabled by default
this.disableLogs = false;

// Reference to "MediaRecorder.js"
var mediaRecorder;
}

// ______________________
// MultiStreamRecorder.js

function MultiStreamRecorder(arrayOfMediaStreams, options) {
arrayOfMediaStreams = arrayOfMediaStreams || [];

if (arrayOfMediaStreams instanceof MediaStream) {
arrayOfMediaStreams = [arrayOfMediaStreams];
}

var self = this;

var mixer;
var mediaRecorder;

options = options || {
mimeType: 'video/webm',
video: {
   width: 360,
   height: 240
}
};

if (!options.frameInterval) {
options.frameInterval = 10;
}

if (!options.video) {
options.video = {};
}

if (!options.video.width) {
options.video.width = 360;
}

if (!options.video.height) {
options.video.height = 240;
}

this.start = function(timeSlice) {
// github/muaz-khan/MultiStreamsMixer
mixer = new MultiStreamsMixer(arrayOfMediaStreams);

if (getVideoTracks().length) {
   mixer.frameInterval = options.frameInterval || 10;
   mixer.width = options.video.width || 360;
   mixer.height = options.video.height || 240;
   mixer.startDrawingFrames();
}

if (typeof self.previewStream === 'function') {
   self.previewStream(mixer.getMixedStream());
}

// record using MediaRecorder API
mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream());

for (var prop in self) {
   if (typeof self[prop] !== 'function') {
       mediaRecorder[prop] = self[prop];
   }
}

mediaRecorder.ondataavailable = function(blob) {
   self.ondataavailable(blob);
};

mediaRecorder.onstop = self.onstop;

mediaRecorder.start(timeSlice);
};

function getVideoTracks() {
var tracks = [];
arrayOfMediaStreams.forEach(function(stream) {
   stream.getVideoTracks().forEach(function(track) {
       tracks.push(track);
   });
});
return tracks;
}

this.stop = function(callback) {
if (!mediaRecorder) {
   return;
}

mediaRecorder.stop(function(blob) {
   callback(blob);
});
};

this.pause = function() {
if (mediaRecorder) {
   mediaRecorder.pause();
}
};

this.resume = function() {
if (mediaRecorder) {
   mediaRecorder.resume();
}
};

this.clearRecordedData = function() {
if (mediaRecorder) {
   mediaRecorder.clearRecordedData();
   mediaRecorder = null;
}

if (mixer) {
   mixer.releaseStreams();
   mixer = null;
}
};

this.addStreams = this.addStream = function(streams) {
if (!streams) {
   throw 'First parameter is required.';
}

if (!(streams instanceof Array)) {
   streams = [streams];
}

arrayOfMediaStreams.concat(streams);

if (!mediaRecorder || !mixer) {
   return;
}

mixer.appendStreams(streams);
};

this.resetVideoStreams = function(streams) {
if (!mixer) {
   return;
}

if (streams && !(streams instanceof Array)) {
   streams = [streams];
}

mixer.resetVideoStreams(streams);
};

this.ondataavailable = function(blob) {
if (self.disableLogs) {
   return;
}

console.log('ondataavailable', blob);
};

this.onstop = function() {};

// for debugging
this.name = 'MultiStreamRecorder';
this.toString = function() {
return this.name;
};
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.MultiStreamRecorder = MultiStreamRecorder;
}


function MultiStreamsMixer(arrayOfMediaStreams) {
var videos = [];
var isStopDrawingFrames = false;

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.style = 'opacity:0;position:absolute;z-index:-1;top: -100000000;left:-1000000000; margin-top:-1000000000;margin-left:-1000000000;';
(document.body || document.documentElement).appendChild(canvas);

this.disableLogs = false;
this.frameInterval = 10;

this.width = 360;
this.height = 240;

// use gain node to prevent echo
this.useGainNode = true;

var self = this;

// _____________________________
// Cross-Browser-Declarations.js

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
if (typeof webkitAudioContext !== 'undefined') {
   /*global AudioContext:true */
   AudioContext = webkitAudioContext;
}

if (typeof mozAudioContext !== 'undefined') {
   /*global AudioContext:true */
   AudioContext = mozAudioContext;
}
}

/*jshint -W079 */
var URL = window.URL;

if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
/*global URL:true */
URL = webkitURL;
}

if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
if (typeof navigator.webkitGetUserMedia !== 'undefined') {
   navigator.getUserMedia = navigator.webkitGetUserMedia;
}

if (typeof navigator.mozGetUserMedia !== 'undefined') {
   navigator.getUserMedia = navigator.mozGetUserMedia;
}
}

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined') {
if (!('getVideoTracks' in MediaStream.prototype)) {
   MediaStream.prototype.getVideoTracks = function() {
       if (!this.getTracks) {
           return [];
       }

       var tracks = [];
       this.getTracks.forEach(function(track) {
           if (track.kind.toString().indexOf('video') !== -1) {
               tracks.push(track);
           }
       });
       return tracks;
   };

   MediaStream.prototype.getAudioTracks = function() {
       if (!this.getTracks) {
           return [];
       }

       var tracks = [];
       this.getTracks.forEach(function(track) {
           if (track.kind.toString().indexOf('audio') !== -1) {
               tracks.push(track);
           }
       });
       return tracks;
   };
}

// override "stop" method for all browsers
if (typeof MediaStream.prototype.stop === 'undefined') {
   MediaStream.prototype.stop = function() {
       this.getTracks().forEach(function(track) {
           track.stop();
       });
   };
}
}

var Storage = {};

if (typeof AudioContext !== 'undefined') {
Storage.AudioContext = AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
Storage.AudioContext = webkitAudioContext;
}

this.startDrawingFrames = function() {
drawVideosToCanvas();
};

function drawVideosToCanvas() {
if (isStopDrawingFrames) {
   return;
}

var videosLength = videos.length;

var fullcanvas = false;
var remaining = [];
videos.forEach(function(video) {
   if (!video.stream) {
       video.stream = {};
   }

   if (video.stream.fullcanvas) {
       fullcanvas = video;
   } else {
       remaining.push(video);
   }
});

if (fullcanvas) {
   canvas.width = fullcanvas.stream.width;
   canvas.height = fullcanvas.stream.height;
} else if (remaining.length) {
   canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;
   canvas.height = videosLength > 2 ? remaining[0].height * 2 : remaining[0].height;
} else {
   canvas.width = self.width || 360;
   canvas.height = self.height || 240;
}

if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
   drawImage(fullcanvas);
}

remaining.forEach(function(video, idx) {
   drawImage(video, idx);
});

setTimeout(drawVideosToCanvas, self.frameInterval);
}

function drawImage(video, idx) {
if (isStopDrawingFrames) {
   return;
}

var x = 0;
var y = 0;
var width = video.width;
var height = video.height;

if (idx === 1) {
   x = video.width;
}

if (idx === 2) {
   y = video.height;
}

if (idx === 3) {
   x = video.width;
   y = video.height;
}

if (typeof video.stream.left !== 'undefined') {
   x = video.stream.left;
}

if (typeof video.stream.top !== 'undefined') {
   y = video.stream.top;
}

if (typeof video.stream.width !== 'undefined') {
   width = video.stream.width;
}

if (typeof video.stream.height !== 'undefined') {
   height = video.stream.height;
}

context.drawImage(video, x, y, width, height);

if (typeof video.stream.onRender === 'function') {
   video.stream.onRender(context, x, y, width, height, idx);
}
}

function getMixedStream() {
isStopDrawingFrames = false;
var mixedVideoStream = getMixedVideoStream();

var mixedAudioStream = getMixedAudioStream();
if (mixedAudioStream) {
   mixedAudioStream.getAudioTracks().forEach(function(track) {
       mixedVideoStream.addTrack(track);
   });
}

var fullcanvas;
arrayOfMediaStreams.forEach(function(stream) {
   if (stream.fullcanvas) {
       fullcanvas = true;
   }
});

return mixedVideoStream;
}

function getMixedVideoStream() {
resetVideoStreams();

var capturedStream;

if ('captureStream' in canvas) {
   capturedStream = canvas.captureStream();
} else if ('mozCaptureStream' in canvas) {
   capturedStream = canvas.mozCaptureStream();
} else if (!self.disableLogs) {
   console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
}

var videoStream = new MediaStream();

capturedStream.getVideoTracks().forEach(function(track) {
   videoStream.addTrack(track);
});

canvas.stream = videoStream;

return videoStream;
}

function getMixedAudioStream() {
// via: @pehrsons
if (!Storage.AudioContextConstructor) {
   Storage.AudioContextConstructor = new Storage.AudioContext();
}

self.audioContext = Storage.AudioContextConstructor;

self.audioSources = [];

if (self.useGainNode === true) {
   self.gainNode = self.audioContext.createGain();
   self.gainNode.connect(self.audioContext.destination);
   self.gainNode.gain.value = 0; // don't hear self
}

var audioTracksLength = 0;
arrayOfMediaStreams.forEach(function(stream) {
   if (!stream.getAudioTracks().length) {
       return;
   }

   audioTracksLength++;

   var audioSource = self.audioContext.createMediaStreamSource(stream);

   if (self.useGainNode === true) {
       audioSource.connect(self.gainNode);
   }

   self.audioSources.push(audioSource);
});

if (!audioTracksLength) {
   return;
}

self.audioDestination = self.audioContext.createMediaStreamDestination();
self.audioSources.forEach(function(audioSource) {
   audioSource.connect(self.audioDestination);
});
return self.audioDestination.stream;
}

function getVideo(stream) {
var video = document.createElement('video');

if ('srcObject' in video) {
   video.srcObject = stream;
} else {
   video.src = URL.createObjectURL(stream);
}

video.muted = true;
video.volume = 0;

video.width = stream.width || self.width || 360;
video.height = stream.height || self.height || 240;

video.play();

return video;
}

this.appendStreams = function(streams) {
if (!streams) {
   throw 'First parameter is required.';
}

if (!(streams instanceof Array)) {
   streams = [streams];
}

arrayOfMediaStreams.concat(streams);

streams.forEach(function(stream) {
   if (stream.getVideoTracks().length) {
       var video = getVideo(stream);
       video.stream = stream;
       videos.push(video);
   }

   if (stream.getAudioTracks().length && self.audioContext) {
       var audioSource = self.audioContext.createMediaStreamSource(stream);
       audioSource.connect(self.audioDestination);
       self.audioSources.push(audioSource);
   }
});
};

this.releaseStreams = function() {
videos = [];
isStopDrawingFrames = true;

if (self.gainNode) {
   self.gainNode.disconnect();
   self.gainNode = null;
}

if (self.audioSources.length) {
   self.audioSources.forEach(function(source) {
       source.disconnect();
   });
   self.audioSources = [];
}

if (self.audioDestination) {
   self.audioDestination.disconnect();
   self.audioDestination = null;
}

self.audioContext = null;

context.clearRect(0, 0, canvas.width, canvas.height);

if (canvas.stream) {
   canvas.stream.stop();
   canvas.stream = null;
}
};

this.resetVideoStreams = function(streams) {
if (streams && !(streams instanceof Array)) {
   streams = [streams];
}

resetVideoStreams(streams);
};

function resetVideoStreams(streams) {
videos = [];
streams = streams || arrayOfMediaStreams;

// via: @adrian-ber
streams.forEach(function(stream) {
   if (!stream.getVideoTracks().length) {
       return;
   }

   var video = getVideo(stream);
   video.stream = stream;
   videos.push(video);
});
}

// for debugging
this.name = 'MultiStreamsMixer';
this.toString = function() {
return this.name;
};

this.getMixedStream = getMixedStream;

}

// _____________________________
// Cross-Browser-Declarations.js

var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

(function(that) {
if (typeof window !== 'undefined') {
return;
}

if (typeof window === 'undefined' && typeof global !== 'undefined') {
global.navigator = {
   userAgent: browserFakeUserAgent,
   getUserMedia: function() {}
};

/*global window:true */
that.window = global;
} else if (typeof window === 'undefined') {
// window = this;
}

if (typeof document === 'undefined') {
/*global document:true */
that.document = {};

document.createElement = document.captureStream = document.mozCaptureStream = function() {
   return {};
};
}

if (typeof location === 'undefined') {
/*global location:true */
that.location = {
   protocol: 'file:',
   href: '',
   hash: ''
};
}

if (typeof screen === 'undefined') {
/*global screen:true */
that.screen = {
   width: 0,
   height: 0
};
}
})(typeof global !== 'undefined' ? global : window);

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
if (typeof webkitAudioContext !== 'undefined') {
/*global AudioContext:true */
AudioContext = webkitAudioContext;
}

if (typeof mozAudioContext !== 'undefined') {
/*global AudioContext:true */
AudioContext = mozAudioContext;
}
}

if (typeof window === 'undefined') {
/*jshint -W020 */
window = {};
}

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
if (typeof webkitAudioContext !== 'undefined') {
/*global AudioContext:true */
AudioContext = webkitAudioContext;
}

if (typeof mozAudioContext !== 'undefined') {
/*global AudioContext:true */
AudioContext = mozAudioContext;
}
}

/*jshint -W079 */
var URL = window.URL;

if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
/*global URL:true */
URL = webkitURL;
}

if (typeof navigator !== 'undefined') {
if (typeof navigator.webkitGetUserMedia !== 'undefined') {
navigator.getUserMedia = navigator.webkitGetUserMedia;
}

if (typeof navigator.mozGetUserMedia !== 'undefined') {
navigator.getUserMedia = navigator.mozGetUserMedia;
}
} else {
navigator = {
getUserMedia: function() {},
userAgent: browserFakeUserAgent
};
}

var IsEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);

var IsOpera = false;
if (typeof opera !== 'undefined' && navigator.userAgent && navigator.userAgent.indexOf('OPR/') !== -1) {
IsOpera = true;
}
var IsChrome = !IsEdge && !IsEdge && !!navigator.webkitGetUserMedia;

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined') {
if (!('getVideoTracks' in MediaStream.prototype)) {
MediaStream.prototype.getVideoTracks = function() {
   if (!this.getTracks) {
       return [];
   }

   var tracks = [];
   this.getTracks.forEach(function(track) {
       if (track.kind.toString().indexOf('video') !== -1) {
           tracks.push(track);
       }
   });
   return tracks;
};

MediaStream.prototype.getAudioTracks = function() {
   if (!this.getTracks) {
       return [];
   }

   var tracks = [];
   this.getTracks.forEach(function(track) {
       if (track.kind.toString().indexOf('audio') !== -1) {
           tracks.push(track);
       }
   });
   return tracks;
};
}

if (!('stop' in MediaStream.prototype)) {
MediaStream.prototype.stop = function() {
   this.getAudioTracks().forEach(function(track) {
       if (!!track.stop) {
           track.stop();
       }
   });

   this.getVideoTracks().forEach(function(track) {
       if (!!track.stop) {
           track.stop();
       }
   });
};
}
}

if (typeof location !== 'undefined') {
if (location.href.indexOf('file:') === 0) {
console.error('Please load this HTML file on HTTP or HTTPS.');
}
}

// Merge all other data-types except "function"

function mergeProps(mergein, mergeto) {
for (var t in mergeto) {
if (typeof mergeto[t] !== 'function') {
   mergein[t] = mergeto[t];
}
}
return mergein;
}

// "dropFirstFrame" has been added by Graham Roth
// https://github.com/gsroth

function dropFirstFrame(arr) {
arr.shift();
return arr;
}


const reader = new FileReader();
// This fires after the blob has been read/loaded.
reader.addEventListener('loadend', (e) => {
const text = e.srcElement.result;
console.log(text);
});

// Start reading the blob as text.


/**
* @param {Blob} file - File or Blob object. This parameter is required.
* @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
* @example
* invokeSaveAsDialog(blob or file, [optional] fileName);
* @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
*/
function invokeSaveAsDialog(file, fileName) {
if (!file) {
throw 'Blob object is required.';
}

if (!file.type) {
try {
   file.type = 'video/webm';
} catch (e) {}
}

var fileExtension = (file.type || 'video/webm').split('/')[1];

if (fileName && fileName.indexOf('.') !== -1) {
var splitted = fileName.split('.');
fileName = splitted[0];
fileExtension = splitted[1];
}

var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
return navigator.msSaveOrOpenBlob(file, fileFullName);
} else if (typeof navigator.msSaveBlob !== 'undefined') {
return navigator.msSaveBlob(file, fileFullName);
}


addBlob(file)

var evt = new MouseEvent('click', {
view: window,
bubbles: true,
cancelable: true
});

hyperlink.dispatchEvent(evt);

if (!navigator.mozGetUserMedia) {
URL.revokeObjectURL(hyperlink.href);
}
}

function bytesToSize(bytes) {
var k = 1000;
var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) {
return '0 Bytes';
}
var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

// ______________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
// ObjectStore.js
var ObjectStore = {
AudioContext: AudioContext
};

function isMediaRecorderCompatible() {
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isChrome = !!window.chrome && !isOpera;
var isFirefox = typeof window.InstallTrigger !== 'undefined';

if (isFirefox) {
return true;
}

if (!isChrome) {
return false;
}

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var fullVersion = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

if (isChrome) {
verOffset = nAgt.indexOf('Chrome');
fullVersion = nAgt.substring(verOffset + 7);
}

// trim the fullVersion string at semicolon/space if present
if ((ix = fullVersion.indexOf(';')) !== -1) {
fullVersion = fullVersion.substring(0, ix);
}

if ((ix = fullVersion.indexOf(' ')) !== -1) {
fullVersion = fullVersion.substring(0, ix);
}

majorVersion = parseInt('' + fullVersion, 10);

if (isNaN(majorVersion)) {
fullVersion = '' + parseFloat(navigator.appVersion);
majorVersion = parseInt(navigator.appVersion, 10);
}

return majorVersion >= 49;
}

function MediaRecorderWrapper(mediaStream) {
var self = this;

/**
* This method records MediaStream.
* @method
* @memberof MediaStreamRecorder
* @example
* recorder.start(5000);
*/
this.start = function(timeSlice, __disableLogs) {
this.timeSlice = timeSlice || 5000;

if (!self.mimeType) {
   self.mimeType = 'video/webm';
}

if (self.mimeType.indexOf('audio') !== -1) {
   if (mediaStream.getVideoTracks().length && mediaStream.getAudioTracks().length) {
       var stream;
       if (!!navigator.mozGetUserMedia) {
           stream = new MediaStream();
           stream.addTrack(mediaStream.getAudioTracks()[0]);
       } else {
           // webkitMediaStream
           stream = new MediaStream(mediaStream.getAudioTracks());
       }
       mediaStream = stream;
   }
}

if (self.mimeType.indexOf('audio') !== -1) {
   self.mimeType = IsChrome ? 'audio/webm' : 'audio/ogg';
}

self.dontFireOnDataAvailableEvent = false;

var recorderHints = {
   mimeType: self.mimeType
};

if (!self.disableLogs && !__disableLogs) {
   console.log('Passing following params over MediaRecorder API.', recorderHints);
}

if (mediaRecorder) {
   // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
   mediaRecorder = null;
}

if (IsChrome && !isMediaRecorderCompatible()) {
   // to support video-only recording on stable
   recorderHints = 'video/vp8';
}

// http://dxr.mozilla.org/mozilla-central/source/content/media/MediaRecorder.cpp
// https://wiki.mozilla.org/Gecko:MediaRecorder
// https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html

// starting a recording session; which will initiate "Reading Thread"
// "Reading Thread" are used to prevent main-thread blocking scenarios
try {
   mediaRecorder = new MediaRecorder(mediaStream, recorderHints);
} catch (e) {
   // if someone passed NON_supported mimeType
   // or if Firefox on Android
   mediaRecorder = new MediaRecorder(mediaStream);
}

if ('canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(self.mimeType) === false) {
   if (!self.disableLogs) {
       console.warn('MediaRecorder API seems unable to record mimeType:', self.mimeType);
   }
}

// i.e. stop recording when <video> is paused by the user; and auto restart recording 
// when video is resumed. E.g. yourStream.getVideoTracks()[0].muted = true; // it will auto-stop recording.
if (self.ignoreMutedMedia === true) {
   mediaRecorder.ignoreMutedMedia = true;
}

var firedOnDataAvailableOnce = false;

// Dispatching OnDataAvailable Handler
mediaRecorder.ondataavailable = function(e) {
   // how to fix FF-corrupt-webm issues?
   // should we leave this?          e.data.size < 26800
   if (!e.data || !e.data.size || e.data.size < 26800 || firedOnDataAvailableOnce) {
       return;
   }

   firedOnDataAvailableOnce = true;

   var blob = self.getNativeBlob ? e.data : new Blob([e.data], {
       type: self.mimeType || 'video/webm'
   });

   self.ondataavailable(blob);

   // self.dontFireOnDataAvailableEvent = true;

   if (!!mediaRecorder && mediaRecorder.state === 'recording') {
       mediaRecorder.stop();
   }
   mediaRecorder = null;

   if (self.dontFireOnDataAvailableEvent) {
       return;
   }

   // record next interval
   self.start(timeSlice, '__disableLogs');
};

mediaRecorder.onerror = function(error) {
   if (!self.disableLogs) {
       if (error.name === 'InvalidState') {
           console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.');
       } else if (error.name === 'OutOfMemory') {
           console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.');
       } else if (error.name === 'IllegalStreamModification') {
           console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.');
       } else if (error.name === 'OtherRecordingError') {
           console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.');
       } else if (error.name === 'GenericError') {
           console.error('The UA cannot provide the codec or recording option that has been requested.', error);
       } else {
           console.error('MediaRecorder Error', error);
       }
   }

   // When the stream is "ended" set recording to 'inactive' 
   // and stop gathering data. Callers should not rely on 
   // exactness of the timeSlice value, especially 
   // if the timeSlice value is small. Callers should 
   // consider timeSlice as a minimum value

   if (!!mediaRecorder && mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
       mediaRecorder.stop();
   }
};

// void start(optional long mTimeSlice)
// The interval of passing encoded data from EncodedBufferCache to onDataAvailable
// handler. "mTimeSlice < 0" means Session object does not push encoded data to
// onDataAvailable, instead, it passive wait the client side pull encoded data
// by calling requestData API.
try {
   mediaRecorder.start(3.6e+6);
} catch (e) {
   mediaRecorder = null;
}

setTimeout(function() {
   if (!mediaRecorder) {
       return;
   }

   if (mediaRecorder.state === 'recording') {
       // "stop" method auto invokes "requestData"!
       mediaRecorder.requestData();
       // mediaRecorder.stop();
   }
}, timeSlice);

// Start recording. If timeSlice has been provided, mediaRecorder will
// raise a dataavailable event containing the Blob of collected data on every timeSlice milliseconds.
// If timeSlice isn't provided, UA should call the RequestData to obtain the Blob data, also set the mTimeSlice to zero.
};

/**
* This method stops recording MediaStream.
* @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
* @method
* @memberof MediaStreamRecorder
* @example
* recorder.stop(function(blob) {
*     video.src = URL.createObjectURL(blob);
* });
*/
this.stop = function(callback) {
if (!mediaRecorder) {
   return;
}

// mediaRecorder.state === 'recording' means that media recorder is associated with "session"
// mediaRecorder.state === 'stopped' means that media recorder is detached from the "session" ... in this case; "session" will also be deleted.

if (mediaRecorder.state === 'recording') {
   // "stop" method auto invokes "requestData"!
   mediaRecorder.requestData();

   setTimeout(function() {
       self.dontFireOnDataAvailableEvent = true;
       if (!!mediaRecorder && mediaRecorder.state === 'recording') {
           mediaRecorder.stop();
       }
       mediaRecorder = null;
       self.onstop();
   }, 2000);
}
};

/**
* This method pauses the recording process.
* @method
* @memberof MediaStreamRecorder
* @example
* recorder.pause();
*/
this.pause = function() {
if (!mediaRecorder) {
   return;
}

if (mediaRecorder.state === 'recording') {
   mediaRecorder.pause();
}

this.dontFireOnDataAvailableEvent = true;
};

/**
* The recorded blobs are passed over this event.
* @event
* @memberof MediaStreamRecorder
* @example
* recorder.ondataavailable = function(data) {};
*/
this.ondataavailable = function(blob) {
console.log('recorded-blob', blob);
};

/**
* This method resumes the recording process.
* @method
* @memberof MediaStreamRecorder
* @example
* recorder.resume();
*/
this.resume = function() {
if (this.dontFireOnDataAvailableEvent) {
   this.dontFireOnDataAvailableEvent = false;

   var disableLogs = self.disableLogs;
   self.disableLogs = true;
   this.start(this.timeslice || 5000);
   self.disableLogs = disableLogs;
   return;
}

if (!mediaRecorder) {
   return;
}

if (mediaRecorder.state === 'paused') {
   mediaRecorder.resume();
}
};

/**
* This method resets currently recorded data.
* @method
* @memberof MediaStreamRecorder
* @example
* recorder.clearRecordedData();
*/
this.clearRecordedData = function() {
if (!mediaRecorder) {
   return;
}

this.pause();

this.dontFireOnDataAvailableEvent = true;
this.stop();
};

this.onstop = function() {};

// Reference to "MediaRecorder" object
var mediaRecorder;

function isMediaStreamActive() {
if ('active' in mediaStream) {
   if (!mediaStream.active) {
       return false;
   }
} else if ('ended' in mediaStream) { // old hack
   if (mediaStream.ended) {
       return false;
   }
}
return true;
}

// this method checks if media stream is stopped
// or any track is ended.
(function looper() {
if (!mediaRecorder) {
   return;
}

if (isMediaStreamActive() === false) {
   self.stop();
   return;
}

setTimeout(looper, 1000); // check every second
})();
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.MediaRecorderWrapper = MediaRecorderWrapper;
}

// ======================
// StereoAudioRecorder.js

function StereoAudioRecorder(mediaStream) {
// void start(optional long timeSlice)
// timestamp to fire "ondataavailable"
this.start = function(timeSlice) {
timeSlice = timeSlice || 1000;

mediaRecorder = new StereoAudioRecorderHelper(mediaStream, this);

mediaRecorder.record();

timeout = setInterval(function() {
   mediaRecorder.requestData();
}, timeSlice);
};

this.stop = function() {
if (mediaRecorder) {
   mediaRecorder.stop();
   clearTimeout(timeout);
   this.onstop();
}
};

this.pause = function() {
if (!mediaRecorder) {
   return;
}

mediaRecorder.pause();
};

this.resume = function() {
if (!mediaRecorder) {
   return;
}

mediaRecorder.resume();
};

this.ondataavailable = function() {};
this.onstop = function() {};

// Reference to "StereoAudioRecorder" object
var mediaRecorder;
var timeout;
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.StereoAudioRecorder = StereoAudioRecorder;
}

// ============================
// StereoAudioRecorderHelper.js

// source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js

function StereoAudioRecorderHelper(mediaStream, root) {

// variables    
var deviceSampleRate = 44100; // range: 22050 to 96000

if (!ObjectStore.AudioContextConstructor) {
ObjectStore.AudioContextConstructor = new ObjectStore.AudioContext();
}

// check device sample rate
deviceSampleRate = ObjectStore.AudioContextConstructor.sampleRate;

var leftchannel = [];
var rightchannel = [];
var scriptprocessornode;
var recording = false;
var recordingLength = 0;
var volume;
var audioInput;
var sampleRate = root.sampleRate || deviceSampleRate;

var mimeType = root.mimeType || 'audio/wav';
var isPCM = mimeType.indexOf('audio/pcm') > -1;

var context;

var numChannels = root.audioChannels || 2;

this.record = function() {
recording = true;
// reset the buffers for the new recording
leftchannel.length = rightchannel.length = 0;
recordingLength = 0;
};

this.requestData = function() {
if (isPaused) {
   return;
}

if (recordingLength === 0) {
   requestDataInvoked = false;
   return;
}

requestDataInvoked = true;
// clone stuff
var internalLeftChannel = leftchannel.slice(0);
var internalRightChannel = rightchannel.slice(0);
var internalRecordingLength = recordingLength;

// reset the buffers for the new recording
leftchannel.length = rightchannel.length = [];
recordingLength = 0;
requestDataInvoked = false;

// we flat the left and right channels down
var leftBuffer = mergeBuffers(internalLeftChannel, internalRecordingLength);

var interleaved = leftBuffer;

// we interleave both channels together
if (numChannels === 2) {
   var rightBuffer = mergeBuffers(internalRightChannel, internalRecordingLength); // bug fixed via #70,#71
   interleaved = interleave(leftBuffer, rightBuffer);
}

if (isPCM) {
   // our final binary blob
   var blob = new Blob([convertoFloat32ToInt16(interleaved)], {
       type: 'audio/pcm'
   });

   console.debug('audio recorded blob size:', bytesToSize(blob.size));
   root.ondataavailable(blob);
   return;
}

// we create our wav file
var buffer = new ArrayBuffer(44 + interleaved.length * 2);
var view = new DataView(buffer);

// RIFF chunk descriptor
writeUTFBytes(view, 0, 'RIFF');

// -8 (via #97)
view.setUint32(4, 44 + interleaved.length * 2 - 8, true);

writeUTFBytes(view, 8, 'WAVE');
// FMT sub-chunk
writeUTFBytes(view, 12, 'fmt ');
view.setUint32(16, 16, true);
view.setUint16(20, 1, true);
// stereo (2 channels)
view.setUint16(22, numChannels, true);
view.setUint32(24, sampleRate, true);
view.setUint32(28, sampleRate * numChannels * 2, true); // numChannels * 2 (via #71)
view.setUint16(32, numChannels * 2, true);
view.setUint16(34, 16, true);
// data sub-chunk
writeUTFBytes(view, 36, 'data');
view.setUint32(40, interleaved.length * 2, true);

// write the PCM samples
var lng = interleaved.length;
var index = 44;
var volume = 1;
for (var i = 0; i < lng; i++) {
   view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
   index += 2;
}

// our final binary blob
var blob = new Blob([view], {
   type: 'audio/wav'
});

console.debug('audio recorded blob size:', bytesToSize(blob.size));

root.ondataavailable(blob);
};

this.stop = function() {
// we stop recording
recording = false;
this.requestData();

audioInput.disconnect();
this.onstop();
};

function interleave(leftChannel, rightChannel) {
var length = leftChannel.length + rightChannel.length;
var result = new Float32Array(length);

var inputIndex = 0;

for (var index = 0; index < length;) {
   result[index++] = leftChannel[inputIndex];
   result[index++] = rightChannel[inputIndex];
   inputIndex++;
}
return result;
}

function mergeBuffers(channelBuffer, recordingLength) {
var result = new Float32Array(recordingLength);
var offset = 0;
var lng = channelBuffer.length;
for (var i = 0; i < lng; i++) {
   var buffer = channelBuffer[i];
   result.set(buffer, offset);
   offset += buffer.length;
}
return result;
}

function writeUTFBytes(view, offset, string) {
var lng = string.length;
for (var i = 0; i < lng; i++) {
   view.setUint8(offset + i, string.charCodeAt(i));
}
}

function convertoFloat32ToInt16(buffer) {
var l = buffer.length;
var buf = new Int16Array(l)

while (l--) {
   buf[l] = buffer[l] * 0xFFFF; //convert to 16 bit
}
return buf.buffer
}

// creates the audio context
var context = ObjectStore.AudioContextConstructor;

// creates a gain node
ObjectStore.VolumeGainNode = context.createGain();

var volume = ObjectStore.VolumeGainNode;

// creates an audio node from the microphone incoming stream
ObjectStore.AudioInput = context.createMediaStreamSource(mediaStream);

// creates an audio node from the microphone incoming stream
var audioInput = ObjectStore.AudioInput;

// connect the stream to the gain node
audioInput.connect(volume);

/* From the spec: This value controls how frequently the audioprocess event is
dispatched and how many sample-frames need to be processed each call.
Lower values for buffer size will result in a lower (better) latency.
Higher values will be necessary to avoid audio breakup and glitches 
Legal values are 256, 512, 1024, 2048, 4096, 8192, and 16384.*/
var bufferSize = root.bufferSize || 2048;
if (root.bufferSize === 0) {
bufferSize = 0;
}

if (context.createJavaScriptNode) {
scriptprocessornode = context.createJavaScriptNode(bufferSize, numChannels, numChannels);
} else if (context.createScriptProcessor) {
scriptprocessornode = context.createScriptProcessor(bufferSize, numChannels, numChannels);
} else {
throw 'WebAudio API has no support on this browser.';
}

bufferSize = scriptprocessornode.bufferSize;

console.debug('using audio buffer-size:', bufferSize);

var requestDataInvoked = false;

// sometimes "scriptprocessornode" disconnects from he destination-node
// and there is no exception thrown in this case.
// and obviously no further "ondataavailable" events will be emitted.
// below global-scope variable is added to debug such unexpected but "rare" cases.
window.scriptprocessornode = scriptprocessornode;

if (numChannels === 1) {
console.debug('All right-channels are skipped.');
}

var isPaused = false;

this.pause = function() {
isPaused = true;
};

this.resume = function() {
isPaused = false;
};

this.onstop = function() {};

// http://webaudio.github.io/web-audio-api/#the-scriptprocessornode-interface
scriptprocessornode.onaudioprocess = function(e) {
if (!recording || requestDataInvoked || isPaused) {
   return;
}

var left = e.inputBuffer.getChannelData(0);
leftchannel.push(new Float32Array(left));

if (numChannels === 2) {
   var right = e.inputBuffer.getChannelData(1);
   rightchannel.push(new Float32Array(right));
}
recordingLength += bufferSize;
};

volume.connect(scriptprocessornode);
scriptprocessornode.connect(context.destination);
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.StereoAudioRecorderHelper = StereoAudioRecorderHelper;
}

// ===================
// WhammyRecorder.js

function WhammyRecorder(mediaStream) {
// void start(optional long timeSlice)
// timestamp to fire "ondataavailable"
this.start = function(timeSlice) {
timeSlice = timeSlice || 1000;

mediaRecorder = new WhammyRecorderHelper(mediaStream, this);

for (var prop in this) {
   if (typeof this[prop] !== 'function') {
       mediaRecorder[prop] = this[prop];
   }
}

mediaRecorder.record();

timeout = setInterval(function() {
   mediaRecorder.requestData();
}, timeSlice);
};

this.stop = function() {
if (mediaRecorder) {
   mediaRecorder.stop();
   clearTimeout(timeout);
   this.onstop();
}
};

this.onstop = function() {};

this.clearOldRecordedFrames = function() {
if (mediaRecorder) {
   mediaRecorder.clearOldRecordedFrames();
}
};

this.pause = function() {
if (!mediaRecorder) {
   return;
}

mediaRecorder.pause();
};

this.resume = function() {
if (!mediaRecorder) {
   return;
}

mediaRecorder.resume();
};

this.ondataavailable = function() {};

// Reference to "WhammyRecorder" object
var mediaRecorder;
var timeout;
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.WhammyRecorder = WhammyRecorder;
}

// ==========================
// WhammyRecorderHelper.js

function WhammyRecorderHelper(mediaStream, root) {
this.record = function(timeSlice) {
if (!this.width) {
   this.width = 320;
}
if (!this.height) {
   this.height = 240;
}

if (this.video && this.video instanceof HTMLVideoElement) {
   if (!this.width) {
       this.width = video.videoWidth || video.clientWidth || 320;
   }
   if (!this.height) {
       this.height = video.videoHeight || video.clientHeight || 240;
   }
}

if (!this.video) {
   this.video = {
       width: this.width,
       height: this.height
   };
}

if (!this.canvas || !this.canvas.width || !this.canvas.height) {
   this.canvas = {
       width: this.width,
       height: this.height
   };
}

canvas.width = this.canvas.width;
canvas.height = this.canvas.height;

// setting defaults
if (this.video && this.video instanceof HTMLVideoElement) {
   this.isHTMLObject = true;
   video = this.video.cloneNode();
} else {
   video = document.createElement('video');
   video.src = URL.createObjectURL(mediaStream);

   video.width = this.video.width;
   video.height = this.video.height;
}

video.muted = true;
video.play();

lastTime = new Date().getTime();
whammy = new Whammy.Video(root.speed, root.quality);

console.log('canvas resolutions', canvas.width, '*', canvas.height);
console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);

drawFrames();
};

this.clearOldRecordedFrames = function() {
whammy.frames = [];
};

var requestDataInvoked = false;
this.requestData = function() {
if (isPaused) {
   return;
}

if (!whammy.frames.length) {
   requestDataInvoked = false;
   return;
}

requestDataInvoked = true;
// clone stuff
var internalFrames = whammy.frames.slice(0);

// reset the frames for the new recording

whammy.frames = dropBlackFrames(internalFrames, -1);

whammy.compile(function(whammyBlob) {
   root.ondataavailable(whammyBlob);
   console.debug('video recorded blob size:', bytesToSize(whammyBlob.size));
});

whammy.frames = [];

requestDataInvoked = false;
};

var isOnStartedDrawingNonBlankFramesInvoked = false;

function drawFrames() {
if (isPaused) {
   lastTime = new Date().getTime();
   setTimeout(drawFrames, 500);
   return;
}

if (isStopDrawing) {
   return;
}

if (requestDataInvoked) {
   return setTimeout(drawFrames, 100);
}

var duration = new Date().getTime() - lastTime;
if (!duration) {
   return drawFrames();
}

// via webrtc-experiment#206, by Jack i.e. @Seymourr
lastTime = new Date().getTime();

if (!self.isHTMLObject && video.paused) {
   video.play(); // Android
}

context.drawImage(video, 0, 0, canvas.width, canvas.height);

if (!isStopDrawing) {
   whammy.frames.push({
       duration: duration,
       image: canvas.toDataURL('image/webp')
   });
}

if (!isOnStartedDrawingNonBlankFramesInvoked && !isBlankFrame(whammy.frames[whammy.frames.length - 1])) {
   isOnStartedDrawingNonBlankFramesInvoked = true;
   root.onStartedDrawingNonBlankFrames();
}

setTimeout(drawFrames, 10);
}

var isStopDrawing = false;

this.stop = function() {
isStopDrawing = true;
this.requestData();
this.onstop();
};

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var video;
var lastTime;
var whammy;

var self = this;

function isBlankFrame(frame, _pixTolerance, _frameTolerance) {
var localCanvas = document.createElement('canvas');
localCanvas.width = canvas.width;
localCanvas.height = canvas.height;
var context2d = localCanvas.getContext('2d');

var sampleColor = {
   r: 0,
   g: 0,
   b: 0
};
var maxColorDifference = Math.sqrt(
   Math.pow(255, 2) +
   Math.pow(255, 2) +
   Math.pow(255, 2)
);
var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;

var matchPixCount, endPixCheck, maxPixCount;

var image = new Image();
image.src = frame.image;
context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
matchPixCount = 0;
endPixCheck = imageData.data.length;
maxPixCount = imageData.data.length / 4;

for (var pix = 0; pix < endPixCheck; pix += 4) {
   var currentColor = {
       r: imageData.data[pix],
       g: imageData.data[pix + 1],
       b: imageData.data[pix + 2]
   };
   var colorDifference = Math.sqrt(
       Math.pow(currentColor.r - sampleColor.r, 2) +
       Math.pow(currentColor.g - sampleColor.g, 2) +
       Math.pow(currentColor.b - sampleColor.b, 2)
   );
   // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
   if (colorDifference <= maxColorDifference * pixTolerance) {
       matchPixCount++;
   }
}

if (maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
   return false;
} else {
   return true;
}
}

function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance) {
var localCanvas = document.createElement('canvas');
localCanvas.width = canvas.width;
localCanvas.height = canvas.height;
var context2d = localCanvas.getContext('2d');
var resultFrames = [];

var checkUntilNotBlack = _framesToCheck === -1;
var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
   _framesToCheck : _frames.length;
var sampleColor = {
   r: 0,
   g: 0,
   b: 0
};
var maxColorDifference = Math.sqrt(
   Math.pow(255, 2) +
   Math.pow(255, 2) +
   Math.pow(255, 2)
);
var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
var doNotCheckNext = false;

for (var f = 0; f < endCheckFrame; f++) {
   var matchPixCount, endPixCheck, maxPixCount;

   if (!doNotCheckNext) {
       var image = new Image();
       image.src = _frames[f].image;
       context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
       var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
       matchPixCount = 0;
       endPixCheck = imageData.data.length;
       maxPixCount = imageData.data.length / 4;

       for (var pix = 0; pix < endPixCheck; pix += 4) {
           var currentColor = {
               r: imageData.data[pix],
               g: imageData.data[pix + 1],
               b: imageData.data[pix + 2]
           };
           var colorDifference = Math.sqrt(
               Math.pow(currentColor.r - sampleColor.r, 2) +
               Math.pow(currentColor.g - sampleColor.g, 2) +
               Math.pow(currentColor.b - sampleColor.b, 2)
           );
           // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
           if (colorDifference <= maxColorDifference * pixTolerance) {
               matchPixCount++;
           }
       }
   }

   if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
       // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
   } else {
       // console.log('frame is passed : ' + f);
       if (checkUntilNotBlack) {
           doNotCheckNext = true;
       }
       resultFrames.push(_frames[f]);
   }
}

resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

if (resultFrames.length <= 0) {
   // at least one last frame should be available for next manipulation
   // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
   resultFrames.push(_frames[_frames.length - 1]);
}

return resultFrames;
}

var isPaused = false;

this.pause = function() {
isPaused = true;
};

this.resume = function() {
isPaused = false;
};

this.onstop = function() {};
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.WhammyRecorderHelper = WhammyRecorderHelper;
}

// --------------
// GifRecorder.js

function GifRecorder(mediaStream) {
if (typeof GIFEncoder === 'undefined') {
throw 'Please link: https://cdn.webrtc-experiment.com/gif-recorder.js';
}

// void start(optional long timeSlice)
// timestamp to fire "ondataavailable"
this.start = function(timeSlice) {
timeSlice = timeSlice || 1000;

var imageWidth = this.videoWidth || 320;
var imageHeight = this.videoHeight || 240;

canvas.width = video.width = imageWidth;
canvas.height = video.height = imageHeight;

// external library to record as GIF images
gifEncoder = new GIFEncoder();

// void setRepeat(int iter)
// Sets the number of times the set of GIF frames should be played.
// Default is 1; 0 means play indefinitely.
gifEncoder.setRepeat(0);

// void setFrameRate(Number fps)
// Sets frame rate in frames per second.
// Equivalent to setDelay(1000/fps).
// Using "setDelay" instead of "setFrameRate"
gifEncoder.setDelay(this.frameRate || this.speed || 200);

// void setQuality(int quality)
// Sets quality of color quantization (conversion of images to the
// maximum 256 colors allowed by the GIF specification).
// Lower values (minimum = 1) produce better colors,
// but slow processing significantly. 10 is the default,
// and produces good color mapping at reasonable speeds.
// Values greater than 20 do not yield significant improvements in speed.
gifEncoder.setQuality(this.quality || 1);

// Boolean start()
// This writes the GIF Header and returns false if it fails.
gifEncoder.start();

startTime = Date.now();

function drawVideoFrame(time) {
   if (isPaused) {
       setTimeout(drawVideoFrame, 500, time);
       return;
   }

   lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

   if (typeof lastFrameTime === undefined) {
       lastFrameTime = time;
   }

   // ~10 fps
   if (time - lastFrameTime < 90) {
       return;
   }

   if (video.paused) {
       video.play(); // Android
   }

   context.drawImage(video, 0, 0, imageWidth, imageHeight);

   gifEncoder.addFrame(context);

   // console.log('Recording...' + Math.round((Date.now() - startTime) / 1000) + 's');
   // console.log("fps: ", 1000 / (time - lastFrameTime));

   lastFrameTime = time;
}

lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

timeout = setTimeout(doneRecording, timeSlice);
};

function doneRecording() {
endTime = Date.now();

var gifBlob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
   type: 'image/gif'
});
self.ondataavailable(gifBlob);

// todo: find a way to clear old recorded blobs
gifEncoder.stream().bin = [];
}

this.stop = function() {
if (lastAnimationFrame) {
   cancelAnimationFrame(lastAnimationFrame);
   clearTimeout(timeout);
   doneRecording();
   this.onstop();
}
};

this.onstop = function() {};

var isPaused = false;

this.pause = function() {
isPaused = true;
};

this.resume = function() {
isPaused = false;
};

this.ondataavailable = function() {};
this.onstop = function() {};

// Reference to itself
var self = this;

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

var video = document.createElement('video');
video.muted = true;
video.autoplay = true;
video.src = URL.createObjectURL(mediaStream);
video.play();

var lastAnimationFrame = null;
var startTime, endTime, lastFrameTime;

var gifEncoder;
var timeout;
}

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.GifRecorder = GifRecorder;
}

// https://github.com/antimatter15/whammy/blob/master/LICENSE
// _________
// Whammy.js

// todo: Firefox now supports webp for webm containers!
// their MediaRecorder implementation works well!
// should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

/**
* Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
* @summary A real time javascript webm encoder based on a canvas hack.
* @typedef Whammy
* @class
* @example
* var recorder = new Whammy().Video(15);
* recorder.add(context || canvas || dataURL);
* var output = recorder.compile();
*/

var Whammy = (function() {
// a more abstract-ish API

function WhammyVideo(duration, quality) {
this.frames = [];
if (!duration) {
   duration = 1;
}
this.duration = 1000 / duration;
this.quality = quality || 0.8;
}

/**
* Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
* @method
* @memberof Whammy
* @example
* recorder = new Whammy().Video(0.8, 100);
* recorder.add(canvas || context || 'image/webp');
* @param {string} frame - Canvas || Context || image/webp
* @param {number} duration - Stick a duration (in milliseconds)
*/
WhammyVideo.prototype.add = function(frame, duration) {
if ('canvas' in frame) { //CanvasRenderingContext2D
   frame = frame.canvas;
}

if ('toDataURL' in frame) {
   frame = frame.toDataURL('image/webp', this.quality);
}

if (!(/^data:image\/webp;base64,/ig).test(frame)) {
   throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
}
this.frames.push({
   image: frame,
   duration: duration || this.duration
});
};

function processInWebWorker(_function) {
var blob = URL.createObjectURL(new Blob([_function.toString(),
   'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
], {
   type: 'application/javascript'
}));

var worker = new Worker(blob);
URL.revokeObjectURL(blob);
return worker;
}

function whammyInWebWorker(frames) {
function ArrayToWebM(frames) {
   var info = checkFrames(frames);
   if (!info) {
       return [];
   }

   var clusterMaxDuration = 30000;

   var EBML = [{
       'id': 0x1a45dfa3, // EBML
       'data': [{
           'data': 1,
           'id': 0x4286 // EBMLVersion
       }, {
           'data': 1,
           'id': 0x42f7 // EBMLReadVersion
       }, {
           'data': 4,
           'id': 0x42f2 // EBMLMaxIDLength
       }, {
           'data': 8,
           'id': 0x42f3 // EBMLMaxSizeLength
       }, {
           'data': 'webm',
           'id': 0x4282 // DocType
       }, {
           'data': 2,
           'id': 0x4287 // DocTypeVersion
       }, {
           'data': 2,
           'id': 0x4285 // DocTypeReadVersion
       }]
   }, {
       'id': 0x18538067, // Segment
       'data': [{
           'id': 0x1549a966, // Info
           'data': [{
               'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
               'id': 0x2ad7b1 // TimecodeScale
           }, {
               'data': 'whammy',
               'id': 0x4d80 // MuxingApp
           }, {
               'data': 'whammy',
               'id': 0x5741 // WritingApp
           }, {
               'data': doubleToString(info.duration),
               'id': 0x4489 // Duration
           }]
       }, {
           'id': 0x1654ae6b, // Tracks
           'data': [{
               'id': 0xae, // TrackEntry
               'data': [{
                   'data': 1,
                   'id': 0xd7 // TrackNumber
               }, {
                   'data': 1,
                   'id': 0x73c5 // TrackUID
               }, {
                   'data': 0,
                   'id': 0x9c // FlagLacing
               }, {
                   'data': 'und',
                   'id': 0x22b59c // Language
               }, {
                   'data': 'V_VP8',
                   'id': 0x86 // CodecID
               }, {
                   'data': 'VP8',
                   'id': 0x258688 // CodecName
               }, {
                   'data': 1,
                   'id': 0x83 // TrackType
               }, {
                   'id': 0xe0, // Video
                   'data': [{
                       'data': info.width,
                       'id': 0xb0 // PixelWidth
                   }, {
                       'data': info.height,
                       'id': 0xba // PixelHeight
                   }]
               }]
           }]
       }]
   }];

   //Generate clusters (max duration)
   var frameNumber = 0;
   var clusterTimecode = 0;
   while (frameNumber < frames.length) {

       var clusterFrames = [];
       var clusterDuration = 0;
       do {
           clusterFrames.push(frames[frameNumber]);
           clusterDuration += frames[frameNumber].duration;
           frameNumber++;
       } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

       var clusterCounter = 0;
       var cluster = {
           'id': 0x1f43b675, // Cluster
           'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
       }; //Add cluster to segment
       EBML[1].data.push(cluster);
       clusterTimecode += clusterDuration;
   }

   return generateEBML(EBML);
}

function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
   return [{
       'data': clusterTimecode,
       'id': 0xe7 // Timecode
   }].concat(clusterFrames.map(function(webp) {
       var block = makeSimpleBlock({
           discardable: 0,
           frame: webp.data.slice(4),
           invisible: 0,
           keyframe: 1,
           lacing: 0,
           trackNum: 1,
           timecode: Math.round(clusterCounter)
       });
       clusterCounter += webp.duration;
       return {
           data: block,
           id: 0xa3
       };
   }));
}

// sums the lengths of all the frames and gets the duration

function checkFrames(frames) {
   if (!frames[0]) {
       postMessage({
           error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
       });
       return;
   }

   var width = frames[0].width,
       height = frames[0].height,
       duration = frames[0].duration;

   for (var i = 1; i < frames.length; i++) {
       duration += frames[i].duration;
   }
   return {
       duration: duration,
       width: width,
       height: height
   };
}

function numToBuffer(num) {
   var parts = [];
   while (num > 0) {
       parts.push(num & 0xff);
       num = num >> 8;
   }
   return new Uint8Array(parts.reverse());
}

function strToBuffer(str) {
   return new Uint8Array(str.split('').map(function(e) {
       return e.charCodeAt(0);
   }));
}

function bitsToBuffer(bits) {
   var data = [];
   var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
   bits = pad + bits;
   for (var i = 0; i < bits.length; i += 8) {
       data.push(parseInt(bits.substr(i, 8), 2));
   }
   return new Uint8Array(data);
}

function generateEBML(json) {
   var ebml = [];
   for (var i = 0; i < json.length; i++) {
       var data = json[i].data;

       if (typeof data === 'object') {
           data = generateEBML(data);
       }

       if (typeof data === 'number') {
           data = bitsToBuffer(data.toString(2));
       }

       if (typeof data === 'string') {
           data = strToBuffer(data);
       }

       var len = data.size || data.byteLength || data.length;
       var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
       var sizeToString = len.toString(2);
       var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
       var size = (new Array(zeroes)).join('0') + '1' + padded;

       ebml.push(numToBuffer(json[i].id));
       ebml.push(bitsToBuffer(size));
       ebml.push(data);
   }

   return new Blob(ebml, {
       type: 'video/webm'
   });
}

function toBinStrOld(bits) {
   var data = '';
   var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
   bits = pad + bits;
   for (var i = 0; i < bits.length; i += 8) {
       data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
   }
   return data;
}

function makeSimpleBlock(data) {
   var flags = 0;

   if (data.keyframe) {
       flags |= 128;
   }

   if (data.invisible) {
       flags |= 8;
   }

   if (data.lacing) {
       flags |= (data.lacing << 1);
   }

   if (data.discardable) {
       flags |= 1;
   }

   if (data.trackNum > 127) {
       throw 'TrackNumber > 127 not supported';
   }

   var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
       return String.fromCharCode(e);
   }).join('') + data.frame;

   return out;
}

function parseWebP(riff) {
   var VP8 = riff.RIFF[0].WEBP[0];

   var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
   for (var i = 0, c = []; i < 4; i++) {
       c[i] = VP8.charCodeAt(frameStart + 3 + i);
   }

   var width, height, tmp;

   //the code below is literally copied verbatim from the bitstream spec
   tmp = (c[1] << 8) | c[0];
   width = tmp & 0x3FFF;
   tmp = (c[3] << 8) | c[2];
   height = tmp & 0x3FFF;
   return {
       width: width,
       height: height,
       data: VP8,
       riff: riff
   };
}

function getStrLength(string, offset) {
   return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
       var unpadded = i.charCodeAt(0).toString(2);
       return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
   }).join(''), 2);
}

function parseRIFF(string) {
   var offset = 0;
   var chunks = {};

   while (offset < string.length) {
       var id = string.substr(offset, 4);
       var len = getStrLength(string, offset);
       var data = string.substr(offset + 4 + 4, len);
       offset += 4 + 4 + len;
       chunks[id] = chunks[id] || [];

       if (id === 'RIFF' || id === 'LIST') {
           chunks[id].push(parseRIFF(data));
       } else {
           chunks[id].push(data);
       }
   }
   return chunks;
}

function doubleToString(num) {
   return [].slice.call(
       new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
       return String.fromCharCode(e);
   }).reverse().join('');
}

var webm = new ArrayToWebM(frames.map(function(frame) {
   var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
   webp.duration = frame.duration;
   return webp;
}));

postMessage(webm);
}

/**
* Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
* @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
* @method
* @memberof Whammy
* @example
* recorder = new Whammy().Video(0.8, 100);
* recorder.compile(function(blob) {
*    // blob.size - blob.type
* });
*/
WhammyVideo.prototype.compile = function(callback) {
var webWorker = processInWebWorker(whammyInWebWorker);

webWorker.onmessage = function(event) {
   if (event.data.error) {
       console.error(event.data.error);
       return;
   }
   callback(event.data);
};

webWorker.postMessage(this.frames);
};

return {
/**
* A more abstract-ish API.
* @method
* @memberof Whammy
* @example
* recorder = new Whammy().Video(0.8, 100);
* @param {?number} speed - 0.8
* @param {?number} quality - 100
*/
Video: WhammyVideo
};
})();

if (typeof MediaStreamRecorder !== 'undefined') {
MediaStreamRecorder.Whammy = Whammy;
}

// Last time updated at Nov 18, 2014, 08:32:23

// Latest file can be found here: https://cdn.webrtc-experiment.com/ConcatenateBlobs.js

// Muaz Khan    - www.MuazKhan.com
// MIT License  - www.WebRTC-Experiment.com/licence
// Source Code  - https://github.com/muaz-khan/ConcatenateBlobs
// Demo         - https://www.WebRTC-Experiment.com/ConcatenateBlobs/

// ___________________
// ConcatenateBlobs.js

// Simply pass array of blobs.
// This javascript library will concatenate all blobs in single "Blob" object.

(function() {
window.ConcatenateBlobs = function(blobs, type, callback) {
var buffers = [];

var index = 0;

function readAsArrayBuffer() {
   if (!blobs[index]) {
       return concatenateBuffers();
   }
   var reader = new FileReader();
   reader.onload = function(event) {
       buffers.push(event.target.result);
       index++;
       readAsArrayBuffer();
   };
   reader.readAsArrayBuffer(blobs[index]);
}

readAsArrayBuffer();

function concatenateBuffers() {
   var byteLength = 0;
   buffers.forEach(function(buffer) {
       byteLength += buffer.byteLength;
   });

   var tmp = new Uint16Array(byteLength);
   var lastOffset = 0;
   buffers.forEach(function(buffer) {
       // BYTES_PER_ELEMENT == 2 for Uint16Array
       var reusableByteLength = buffer.byteLength;
       if (reusableByteLength % 2 != 0) {
           buffer = buffer.slice(0, reusableByteLength - 1)
       }
       tmp.set(new Uint16Array(buffer), lastOffset);
       lastOffset += reusableByteLength;
   });

   var blob = new Blob([tmp.buffer], {
       type: type
   });

   callback(blob);
}
};
})();

// https://github.com/streamproc/MediaStreamRecorder/issues/42
if (typeof module !== 'undefined' /* && !!module.exports*/ ) {
module.exports = MediaStreamRecorder;
}

if (typeof define === 'function' && define.amd) {
define('MediaStreamRecorder', [], function() {
return MediaStreamRecorder;
});
}

