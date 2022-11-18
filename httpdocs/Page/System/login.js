

$('<article>\
   <div class="PageLogin">\
      <div class="LoginContainer">\
         <div class="row" style="background: #fff;padding: 20px;border-radius: 8px ">\
            <div class="col-12">\
               <div class="PageTitle">\
                  <div>'+defaultLang(2051)+'</div>\
                  <div class="LanguageBar">\
                     <span>  </span>\
                     <div class="Wind">\
                        <span class="LangItem" T="SO" onclick=userlanguage("SO")>\
                           <div> سۆرانی </div>\
                        </span>\
                        <span class="LangItem" T="BA" onclick=userlanguage("BA")>\
                           <div> بادینی </div>\
                        </span>\
                        <span class="LangItem" T="EN" onclick=userlanguage("EN")>\
                           <div> English</div>\
                        </span>\
                        <span class="LangItem" T="AR" onclick=userlanguage("AR")>\
                           <div> عربي </div>\
                        </span>\
                        <span class="LangItem" T="DE" onclick=userlanguage("DE")>\
                           <div> Deutsch </div>\
                        </span>\
                        <span class="LangItem" T="TR" onclick=userlanguage("TR")>\
                           <div> Türkçe </div>\
                        </span>\
                     </div>\
                  </div>\
               </div>\
               <div class="FormElement">\
                  <span>'+defaultLang(2052)+'</span>\
                  <input name="UserName">\
               </div>\
               <div class="FormElement">\
                  <span>'+defaultLang(2053)+'</span>\
                  <input name="Password" type="password">\
               </div>\
            </div>\
            <div class="col-12">\
               <div class="d-flex">\
                  <div class="FormElement" style="margin:0">\
                     <span>'+defaultLang(2054)+'</span>\
                  </div>\
                  <div class="Btn BtnLogin"> '+defaultLang(2055)+' </div>\
               </div>\
            </div>\
         </div>\
         <div class="row">\
            <div class="LoginBottom"></div>\
         </div>\
      </div>\
   </div>\
</article>\
').appendTo(".PageContentArea")

   $(".Btn.BtnLogin").click(function(){
      var UserName      = $("[name='UserName']").val()
      var Password      = $("[name='Password']").val()
      var Error         = 0

      if(UserName==""){ Error = 1; $("[name='UserName']").addClass("Error") }
      if(Password==""){ Error = 1; $("[name='Password']").addClass("Error") }

      if(Error==0){
         
         $.ajax({
         type: "post",
         url: appPath+"user/login",
         dataType: "json",
         data : "mail="+UserName+"&password="+Password+"&language="+userLang+"",
         success: function(data) {
            if(data.status=="error"){
               notificationBox(data.status,data.message)
            }else{
               localStorage.setItem("systemUser",JSON.stringify(data))
               localStorage.setItem("systemUserLanguage",data.user.language)
               $.cookie("uConnect",true,{expires:90,path:'/'})
               window.location.href="/"
            }
         }
         });
      }
      
   })
