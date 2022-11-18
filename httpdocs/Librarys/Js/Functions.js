

function Loading(){

}




function htmlResetPassword(){
   $('[CD="Page"]').addClass("main-signin-wrapper").html('\
   <div class="row signpages text-center">\
      <div class="col-md-12">\
         <div class="card">\
            <div class="row row-sm">\
               <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">\
                  <div class="mt-4 pt-5 p-2 pos-absolute">\
                     <img src="'+setLogo+'" class="header-brand-img mb-4" alt="logo" style="height: 140px;">\
                     <div class="clearfix"></div>\
                     <h5 class="mt-4 text-black">Reset Your Password</h5>\
                     <span class="tx-white-6 tx-13 mb-5 mt-xl-0" style="color: #555;">Signup to create, discover and connect with the global community</span>\
                  </div>\
               </div>\
               <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">\
                  <div class="container-fluid">\
                     <div class="row row-sm">\
                        <div class="card-body mt-2 mb-2">\
                           <div class="clearfix"></div>\
                           <h5 class="text-start mb-2">Reset Your Password</h5>\
                           <p class="mb-4 text-muted tx-13 ms-0 text-start">Its free to signup and only takes a minute.</p>\
                           <form>\
                              <div class="form-group text-start">\
                                 <label>Email</label>\
                                 <input class="form-control" placeholder="Enter your email" type="text">\
                              </div>\
                              <div class="form-group text-start">\
                                 <label>New Password</label>\
                                 <input class="form-control" placeholder="Enter your password" type="password">\
                              </div>\
                              <div class="form-group text-start">\
                                 <label>Confirm Password</label>\
                                 <input class="form-control" placeholder="Enter your password" type="password">\
                              </div>\
                              <button class="btn ripple btn-main-primary btn-block">Reset Password</button>\
                           </form>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
   </div>')
}

function htmlForgotPassword(){
   $('[CD="Page"]').addClass("main-signin-wrapper").html('\
   <div class="row signpages text-center">\
      <div class="col-md-12">\
         <div class="card">\
            <div class="row row-sm">\
               <div class="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">\
                  <div class="mt-3 pt-3 p-2 pos-absolute">\
                     <img src="'+setLogo+'" class="header-brand-img mb-4" alt="logo" style="height: 140px;">\
                     <div class="clearfix"></div>\
                     <h5 class="mt-4 text-black">Reset Your Password</h5>\
                     <span class="tx-white-6 tx-13 mb-5 mt-xl-0" style="color: #555;">Signup to create, discover and connect with the global community</span>\
                  </div>\
               </div>\
               <div class="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">\
                  <div class="container-fluid">\
                     <div class="row row-sm">\
                        <div class="card-body mt-2 mb-2">\
                           <div class="clearfix"></div>\
                           <h5 class="text-start mb-2">Forgot Password</h5>\
                           <p class="mb-4 text-muted tx-13 ms-0 text-start">Its free to signup and only takes a minute.</p>\
                           <form>\
                              <div class="form-group text-start">\
                                 <label>Email</label>\
                                 <input class="form-control" placeholder="Enter your email" type="text" value="">\
                              </div>\
                              <button class="btn ripple btn-main-primary btn-block">Request reset link</button>\
                           </form>\
                           <div class="card-footer border-top-0 ps-0 mt-3 text-start ">\
                              <p>Did you remembered your password?</p>\
                              <p class="mb-0">Try to <a href="/login">Signin</a></p>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
   </div>')
}

function html404(){
   $('[CD="Page"]').addClass("main-signin-wrapper bg-primary construction").html('\
   <div class="container ">\
      <div class="construction1 text-center details text-white">\
         <div class="">\
            <div class="col-lg-12">\
               <h1 class="tx-140 mb-0">404</h1>\
            </div>\
            <div class="col-lg-12 ">\
               <h1>Oops.The Page you are looking  for doesn`t  exit..</h1>\
               <h6 class="tx-15 mt-3 mb-4 text-white-50">You may have mistyped the address or the page may have moved. Try searching below.</h6>\
               <a class="btn ripple btn-success text-center mb-2" href="/">Back to Home</a>\
            </div>\
         </div>\
      </div>\
   </div>')
}


function notificationModal(type,title,text){
   if($(".AlertArea").html()==undefined){
      $('<div class="AlertArea"></div>').appendTo("body")
   }
   $('<div class="Alert '+type+'">\
      <div class="Title">\
         <span> '+title+' </span>\
         <i class="fa fa-close"></i>\
      </div>\
      <div class="Text"> '+text+' </div>\
   </div>').appendTo(".AlertArea").delay(3000).queue(function() {
      $(this).remove();
   });
   $(document).on("click",".Alert .fa-close",function(){
      $(this).parent().parent().remove()
   })
}














function meetRoom(){
   locationUrl    = locationUrl.replace("/?","?")
   var LOI        = locationUrl.split("/")
   var MEET_CODE  = LOI[4]
   var data       = digitNonValue(MEET_CODE)

   var meetId     = 0
   var userId     = 0
   if(data.indexOf("_")!=-1){
      var DI = data.split("_")
      meetId = DI[0]
      userId = DI[1]
   }else{
      meetId = data
   }

   $.ajax({
   type: "post",
   url: systemApp+"meet/meet-list",
   dataType: "json",
   data : "comId="+COM_ID+"&customerId="+userId+"&projectId="+meetId+"&language="+userLang+"",
   success: function(data) {
      
      var data_dateEnd              =  data.list[0].dateEnd
      var data_dateStart            =  data.list[0].dateStart
      var data_hour                 =  data.list[0].hour
      var data_id                   =  data.list[0].id
      var data_live                 =  data.list[0].live
      var data_minute               =  data.list[0].minute
      var data_name                 =  data.list[0].name
      var data_password             =  data.list[0].password
      var data_passwordStatus       =  data.list[0].passwordStatus
      var data_recordStatus         =  data.list[0].recordStatus
      var data_startDate            =  data.list[0].startDate
      var data_startHour            =  data.list[0].startHour
      var data_startMinute          =  data.list[0].startMinute
      var data_subject              =  data.list[0].subject
      var data_timeZone             =  data.list[0].timeZone
      var data_timeZoneHour         =  data.list[0].timeZoneHour
      var data_users                =  data.list[0].users

      $("body").css({"background-image":"url('/Library/Img/meetWall2.jpg')"})
      $('[CD="Page"]').addClass("main-signin-wrapper meetRoomWall").html('\
      <div class="container ">\
      <div class="Top" style="position: fixed;top: 0;left: 0;width: 100%;display: flex;align-items: center;justify-content: center;">\
         <div style="background: #fff;border-radius: 0px 0px 12px 12px;padding: 16px;display: flex;flex-direction: column;align-items: center;">\
            <span style="font-weight: 600;"> Toplantının Başlamasına Kalan Süre </span>\
            <span style="font-size: 22px;font-weight: 800;font-family: monospace;"> 00:00:00 </span>\
         </div>\
      </div>\
      <div class="Bottom" style="position: fixed;bottom: 0;left: 0;width: 100%;display: flex;align-items: center;justify-content: space-around;background: #fff;padding: 20px;">\
         <div style="display: flex;justify-content: flex-start;width: 100%;">\
            <span style="font-weight: 600;font-size: 13px;margin-bottom: 5px;width: 100%;">'+data_name+'</span>\
            <span style="font-size: 12px;width: 100%;">'+data_subject+'</span>\
         </div>\
         <div></div>\
         <div style="display: flex;justify-content: flex-end;width: 100%;">\
            <div class="Btn MeetUser" style="background: #4caf50;color: #fff;border-radius: 10px;padding: 10px;font-weight: 700;box-shadow: 0px 0px 0px 10px #caf4cb;cursor: pointer;"> Katıl </div>\
         </div>\
      </div>\
      </div>')


         $(".Btn.MeetUser").click(function(){
            if(userId==0){
               var WIDTH      =  "center-30"
               var BOX 		   =	1
               var TITLE 		=	"Toplantıya Katıl"
               var SUBTITLE	=	""
               var nonTITLE   =  1
               var nonCLOSE   =  1
               popupTrigger(BOX,WIDTH,TITLE,SUBTITLE,nonTITLE,nonCLOSE)
         
               $('\
               <div class="row row-xs align-items-center mg-b-20">\
                  <div class="col-md-12">\
                     <label class="mg-b-0">Adınız Soyadınız</label>\
                     <input class="form-control" name="NAME" autocomplete="off" type="text">\
                  </div>\
               </div>\
               ').appendTo($(".Popup_v2.B"+BOX+"").find(".Center"))
         
               
               $('\
               <div class="theme-button success-btn btnSuccess"> Katıl </div>\
               ').appendTo(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right")
         
               $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnSuccess").click(function(){
                  var NAME    =  $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").val()
                  var Error   =  0
         
                  if(NAME==""){Error=1; $(".Popup_v2.B"+BOX+"").find(".Center").find("[name='NAME']").addClass("error") }
                  
                  if(Error==0){
                     $.ajax({
                     type: "post",
                     url: systemApp+"meet/meet-userControl",
                     dataType: "json",
                     data : "comId="+COM_ID+"&meetId="+meetId+"&userId=0",
                     success: function(data) {
                        var serviceUrl    =  data.serviceUrl
                        var secretKey     =  data.secretKey
                        
                        var stringRoomData = "createallowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID="+meetId+"&moderatorPW=mp&name="+data_name+"&record=false&voiceBridge="+meetId+"&welcome="+data_name+""
                        var HashRoomData     = $.sha1(stringRoomData+secretKey)
                        var XX  = "&checksum="+HashRoomData.toLowerCase()
                        var createUrl = serviceUrl+stringRoomData.replace("create","create?")+XX

                        $('<iframe style="display:none"/>');  // Create an iframe element
                        $('<iframe />', {
                              name: 'frame1',
                              id: 'frame1',
                              src: createUrl
                        }).appendTo('body');
                        
                        var StringClientLoginData = "joinfullName="+slugify(NAME)+"&meetingID="+meetId+"&password=ap&redirect=true"
                        console.log(StringClientLoginData)
                        var HashClientLoginData = $.sha1(StringClientLoginData+secretKey) 
                        var url = serviceUrl+StringClientLoginData.replace("join","join?")+"&checksum="+HashClientLoginData.toLowerCase()
                        window.location.href=url
                     }
                     })
                  }
               })
               $(".Popup_v2.B"+BOX+">.Modal>.Htm>.Document>.Bottom>.column.Right>.btnCancel").click(function(){
                  $(".Popup_v2.B"+BOX+"").remove();
                  $("Body").css({"overflow":"visible"});
               });
            }else{
               $.ajax({
               type: "post",
               url: systemApp+"meet/meet-userControl",
               dataType: "json",
               data : "comId="+COM_ID+"&meetId="+meetId+"&userId="+userId+"",
               success: function(data) {
                  var serviceUrl    =  data.serviceUrl
                  var secretKey     =  data.secretKey
                  var customerName  =  data.customerName


                  var stringRoomData = "createallowStartStopRecording=true&attendeePW=ap&autoStartRecording=false&meetingID="+meetId+"&moderatorPW=mp&name="+data_name+"&record=false&voiceBridge="+meetId+"&welcome="+data_name+""
                  var HashRoomData     = $.sha1(stringRoomData+secretKey)
                  var XX  = "&checksum="+HashRoomData.toLowerCase()
                  var createUrl = serviceUrl+stringRoomData.replace("create","create?")+XX

                  $('<iframe style="display:none"/>');  // Create an iframe element
                  $('<iframe />', {
                        name: 'frame1',
                        id: 'frame1',
                        src: createUrl
                  }).appendTo('body');
                  
                  var StringClientLoginData = "joinfullName="+slugify(customerName).replace(" ","+")+"&meetingID="+meetId+"&password=ap&redirect=true"
                  var HashClientLoginData = $.sha1(StringClientLoginData+secretKey) 
                  var url = serviceUrl+StringClientLoginData.replace("join","join?")+"&checksum="+HashClientLoginData.toLowerCase()
                  window.location.href=url
               }
               })
            }
         })


         
         
   }
   });
}














(function($){
var rotateLeft = function(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
}
var lsbHex = function(value) {
      var string = "";
      var i;
      var vh;
      var vl;
      for(i = 0;i <= 6;i += 2) {
         vh = (value>>>(i * 4 + 4))&0x0f;
         vl = (value>>>(i*4))&0x0f;
         string += vh.toString(16) + vl.toString(16);
      }
      return string;
};

var cvtHex = function(value) {
      var string = "";
      var i;
      var v;
      for(i = 7;i >= 0;i--) {
         v = (value>>>(i * 4))&0x0f;
         string += v.toString(16);
      }
      return string;
};

var uTF8Encode = function(string) {
      string = string.replace(/\x0d\x0a/g, "\x0a");
      var output = "";
      for (var n = 0; n < string.length; n++) {
         var c = string.charCodeAt(n);
         if (c < 128) {
            output += String.fromCharCode(c);
         } else if ((c > 127) && (c < 2048)) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
         } else {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
         }
      }
      return output;
};

$.extend({
      sha1: function(string) {
         var blockstart;
         var i, j;
         var W = new Array(80);
         var H0 = 0x67452301;
         var H1 = 0xEFCDAB89;
         var H2 = 0x98BADCFE;
         var H3 = 0x10325476;
         var H4 = 0xC3D2E1F0;
         var A, B, C, D, E;
         var tempValue;
         string = uTF8Encode(string);
         var stringLength = string.length;
         var wordArray = new Array();
         for(i = 0;i < stringLength - 3;i += 4) {
            j = string.charCodeAt(i)<<24 | string.charCodeAt(i + 1)<<16 | string.charCodeAt(i + 2)<<8 | string.charCodeAt(i + 3);
            wordArray.push(j);
         }
         switch(stringLength % 4) {
            case 0:
                  i = 0x080000000;
            break;
            case 1:
                  i = string.charCodeAt(stringLength - 1)<<24 | 0x0800000;
            break;
            case 2:
                  i = string.charCodeAt(stringLength - 2)<<24 | string.charCodeAt(stringLength - 1)<<16 | 0x08000;
            break;
            case 3:
                  i = string.charCodeAt(stringLength - 3)<<24 | string.charCodeAt(stringLength - 2)<<16 | string.charCodeAt(stringLength - 1)<<8 | 0x80;
            break;
         }
         wordArray.push(i);
         while((wordArray.length % 16) != 14 ) wordArray.push(0);
         wordArray.push(stringLength>>>29);
         wordArray.push((stringLength<<3)&0x0ffffffff);
         for(blockstart = 0;blockstart < wordArray.length;blockstart += 16) {
            for(i = 0;i < 16;i++) W[i] = wordArray[blockstart+i];
            for(i = 16;i <= 79;i++) W[i] = rotateLeft(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for(i = 0;i <= 19;i++) {
                  tempValue = (rotateLeft(A, 5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                  E = D;
                  D = C;
                  C = rotateLeft(B, 30);
                  B = A;
                  A = tempValue;
            }
            for(i = 20;i <= 39;i++) {
                  tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                  E = D;
                  D = C;
                  C = rotateLeft(B, 30);
                  B = A;
                  A = tempValue;
            }
            for(i = 40;i <= 59;i++) {
                  tempValue = (rotateLeft(A, 5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                  E = D;
                  D = C;
                  C = rotateLeft(B, 30);
                  B = A;
                  A = tempValue;
            }
            for(i = 60;i <= 79;i++) {
                  tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                  E = D;
                  D = C;
                  C = rotateLeft(B, 30);
                  B = A;
                  A = tempValue;
            }
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
         }
         tempValue = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);
         return tempValue.toLowerCase();
      }
});
})(jQuery);





slugify = function(text) {
   var trMap = {
       'çÇ':'c',
       'ğĞ':'g',
       'şŞ':'s',
       'üÜ':'u',
       'ıİ':'i',
       'öÖ':'o'
   };
   for(var key in trMap) {
       text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
   }
   return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
               .replace(/\s/gi, "-") // convert spaces to dashes
               .replace(/[-]+/gi, "-") // trim repeated dashes
               .toLowerCase();

}

function nameColor(CARACTER){
   if(CARACTER=="A"){ return "#8A2BE2" }
   if(CARACTER=="B"){ return "#A52A2A" }
   if(CARACTER=="C"){ return "#D2691E" }
   if(CARACTER=="Ç"){ return "#6495ED" }
   if(CARACTER=="D"){ return "#DC143C" }
   if(CARACTER=="E"){ return "#0000FF" }
   if(CARACTER=="F"){ return "#FF7F50" }
   if(CARACTER=="G"){ return "#6495ED" }
   if(CARACTER=="Ğ"){ return "#00008B" }
   if(CARACTER=="H"){ return "#9932CC" }
   if(CARACTER=="I"){ return "#00CED1" }
   if(CARACTER=="İ"){ return "#696969" }
   if(CARACTER=="J"){ return "#228B22" }
   if(CARACTER=="K"){ return "#FF00FF" }
   if(CARACTER=="L"){ return "#DAA520" }
   if(CARACTER=="M"){ return "#CD5C5C" }
   if(CARACTER=="N"){ return "#F08080" }
   if(CARACTER=="Ö"){ return "#20B2AA" }
   if(CARACTER=="P"){ return "#32CD32" }
   if(CARACTER=="R"){ return "#C71585" }
   if(CARACTER=="S"){ return "#6B8E23" }
   if(CARACTER=="Ş"){ return "#FFA500" }
   if(CARACTER=="T"){ return "#FF4500" }
   if(CARACTER=="U"){ return "#DA70D6" }
   if(CARACTER=="Ü"){ return "#D87093" }
   if(CARACTER=="V"){ return "#CD853F" }
   if(CARACTER=="Y"){ return "#800080" }
   if(CARACTER=="Z"){ return "#8B4513" }
   if(CARACTER=="X"){ return "#4682B4" }
   if(CARACTER=="Q"){ return "#FF6347" }
}
