$("body").attr("Page","StudentView")


                  
      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
      <div class="col-12">\
               <div class="InfoBar">\
                  <div class="Left"></div>\
               </div>\
               <div class="LevelReport">\
               </div>\
            </div>\
         </div>\
      </div>\
      </div>\
      </div>\
      </article>\
      ').appendTo(".PageContentArea")

      var WW = parseInt($(window).width())
      if(WW<980){
         $(".Header .Left").html("<a href='/students' class='BtnBack'><i></i> <span> "+defaultLang(2515)+" </span></a>")
      }



      var  Qpathname = window.location.pathname
      var  Qstring   = new URLSearchParams(window.location.search);
      var studentId = Qstring.get('studentId')
      if(studentId==undefined){ studentId = 0 }

      var systemUser = JSON.parse(localStorage.getItem("systemUser"))
      var userType   = systemUser.type

            $.ajax({
            type: "post",
            url: appPath+"student/view",
            dataType: "json",
            data : "id="+studentId+"",
            success: function(data) {
               
               var student_AVATAR         =  data.student[0].avatar
               var student_BACKGROUND     =  data.student[0].background
               var student_BIRTHDATE      =  data.student[0].birthdate
               var student_CITY_ID        =  data.student[0].cityId
               var student_COMPANY_ID     =  data.student[0].companyId
               var student_DIRECTORATE_ID =  data.student[0].directorateId
               var student_FIRST_NAME     =  data.student[0].firstName
               var student_GRADE_ID       =  data.student[0].gradeId
               var student_ID             =  data.student[0].id
               var student_LANGUAGE       =  data.student[0].language
               var student_LAST_NAME      =  data.student[0].lastName
               var student_LEVEL          =  data.student[0].level
               var student_MIDDLE_NAME    =  data.student[0].middleName
               var student_MINISTRY_ID    =  data.student[0].ministryId
               var student_PHONE          =  data.student[0].phone
               var student_PHOTO          =  data.student[0].photo
               var student_PROGRESS       =  data.student[0].progress
               var student_REGION_ID      =  data.student[0].regionId
               var student_SCHOOLROOM_ID  =  data.student[0].schoolroomId
               var student_STUDENT_ID     =  data.student[0].studentId
               var student_TIME_ZONE      =  data.student[0].timeZone

               $('.InfoBar>.Left').html('\
               <div class="photoRow">\
                  <div class="Photo"><img src="'+student_AVATAR+'"></div>\
                  <div class="Info">\
                     <span>'+student_FIRST_NAME+' '+student_MIDDLE_NAME+' '+student_LAST_NAME+' </span>\
                     <span>'+student_STUDENT_ID+'</span>\
                  </div>\
               </div>\
               ')


               $.ajax({
               type: "post",
               url: systemApp+"library/level/",
               dataType: "json",
               data : "sort=desc",
               success: function(data) {
                  $.each( data.content, function( i, itemx ) {
                  if(student_LEVEL>=itemx.id){
                     $(".LevelReport").append('\
                     <div class="LevelTab" lvl="'+itemx.id+'">\
                        <div class="Head">\
                        <div> '+pageLang(2016)+' : <span>'+itemx.name+'</span> </div>\
                        <i class="fa fa-chevron-up"></i>\
                        </div>\
                        <div class="View">\
                           <div class="Istatistic"></div>\
                           <div class="BookList">\
                              <table class="table">\
                                 <thead>\
                                    <tr>\
                                       <th colspan="2">'+pageLang(2031)+'</th>\
                                       <th style="width:320px">'+pageLang(2032)+'</th>\
                                       <th style="width:120px">'+pageLang(2033)+'</th>\
                                       <th style="width:120px">'+pageLang(2034)+'</th>\
                                    </tr>\
                                 </thead>\
                                 <tbody CD="[[List]]">\
                                 </tbody>\
                              </table>\
                           </div>\
                        </div>\
                     </div>')
                     if(student_LEVEL==itemx.id){
                        $(".LevelTab[lvl='"+student_LEVEL+"']").addClass("Active")
                        Level(student_LEVEL)
                     }
                  }
                  });
               }
               });
            }
            });

            

            function Level(level){
               $.ajax({
               type: "post",
               url: systemApp+"student/levelReport",
               dataType: "json",
               data : "studentId="+studentId+"&levelId="+level+"",
               success: function(data) {

                  var xx_Y_Book     =  data.statistic[0].year[0].book
                  var xx_Y_Page     =  data.statistic[0].year[0].page
                  var xx_Y_Listen   =  data.statistic[0].year[0].listen
                  var xx_Y_Time     =  data.statistic[0].year[0].listenTime
                  
                  var xx_M_Book     =  data.statistic[0].month[0].book
                  var xx_M_Page     =  data.statistic[0].month[0].page
                  var xx_M_Listen   =  data.statistic[0].month[0].listen
                  var xx_M_Time     =  data.statistic[0].month[0].listenTime
                  
                  var xx_W_Book     =  data.statistic[0].week[0].book
                  var xx_W_Page     =  data.statistic[0].week[0].page
                  var xx_W_Listen   =  data.statistic[0].week[0].listen
                  var xx_W_Time     =  data.statistic[0].week[0].listenTime
                  
                  $(".LevelTab[lvl='"+level+"']>.View>.Istatistic").html("\
                     <div class='Item'>\
                        <span>"+pageLang(2017)+"</span>\
                        <div class='Info'>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-book'></i> "+pageLang(2018)+" </span>\
                              <span> "+xx_Y_Book+" "+pageLang(2019)+" / "+xx_Y_Page+" "+pageLang(2020)+" </span>\
                           </div>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-headphones'></i> "+pageLang(2021)+" </span>\
                              <span> "+xx_Y_Listen+" "+pageLang(2019)+" / "+xx_Y_Time+" "+pageLang(2022)+" </span>\
                           </div>\
                        </div>\
                     </div>\
                     <div class='Item'>\
                        <span>"+pageLang(2023)+"</span>\
                        <div class='Info'>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-book'></i> "+pageLang(2018)+" </span>\
                              <span> "+xx_M_Book+" "+pageLang(2019)+" / "+xx_M_Page+" "+pageLang(2020)+" </span>\
                           </div>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-headphones'></i> "+pageLang(2021)+" </span>\
                              <span> "+xx_M_Listen+" "+pageLang(2019)+" / "+xx_M_Time+" "+pageLang(2022)+" </span>\
                           </div>\
                        </div>\
                     </div>\
                     <div class='Item'>\
                        <span>"+pageLang(2024)+"</span>\
                        <div class='Info'>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-book'></i> "+pageLang(2018)+" </span>\
                              <span> "+xx_W_Book+" "+pageLang(2019)+" / "+xx_W_Page+" "+pageLang(2020)+" </span>\
                           </div>\
                           <div class='SubItem'>\
                              <span> <i class='fa fa-headphones'></i> "+pageLang(2021)+" </span>\
                              <span> "+xx_W_Listen+" "+pageLang(2019)+" / "+xx_W_Time+" "+pageLang(2022)+" </span>\
                           </div>\
                        </div>\
                     </div>\
                  ")

                     $(".LevelTab[lvl='"+level+"'] [CD='[[List]]']").html("")
                     $.each( data.bookList, function( i, itemx ) {
                        var data_ID          =  itemx.id
                        var data_AUTHOR      =  itemx.author
                        var data_AUTHORS     =  itemx.authors
                        var data_CATEGORY    =  itemx.category
                        var data_CATEGORYS   =  itemx.categorys
                        var data_NAME        =  itemx.name
                        var data_DESC        =  itemx.desc
                        var data_IMG         =  itemx.img
                        var data_LEVEL       =  itemx.levelName
                        var data_PAPER       =  itemx.paper
                        var data_SUBJECT     =  itemx.subject
                        var data_SUBJECT     =  itemx.subjects
                        var data_ISTATISTIC  =  itemx.student

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
                        
                  
                        var data_PAPER    =  itemx.student.page
                        var xx_LAST_PAGE  =  itemx.student.lastPage
                        var xx_LAST_TIME  =  itemx.student.lastTime
                        var xx_LISTEN     =  itemx.student.listen
                        var xx_READ       =  itemx.student.read

                        var xx_readSTATUS    = ""
                        var xx_listenSTATUS  = ""
                        if(xx_READ==0){ xx_readSTATUS = " <div class='Badge S"+xx_READ+"'>"+pageLang(2025)+"</div> " }
                        if(xx_READ==2){ xx_readSTATUS = " <div class='Badge S"+xx_READ+"'>"+pageLang(2026)+"</div> " }
                        if(xx_READ==1){ xx_readSTATUS = " <div class='Badge S"+xx_READ+"'>"+pageLang(2027)+"</div> " }

                        if(xx_LISTEN==0){ xx_listenSTATUS = " <div class='Badge S"+xx_LISTEN+"'>"+pageLang(2025)+"</div> " }
                        if(xx_LISTEN==2){ xx_listenSTATUS = " <div class='Badge S"+xx_LISTEN+"'>"+pageLang(2028)+"</div> " }
                        if(xx_LISTEN==1){ xx_listenSTATUS = " <div class='Badge S"+xx_LISTEN+"'>"+pageLang(2029)+"</div> " }
                        
                        var Rate = (xx_LAST_PAGE/data_PAPER)*100
                        var Rate = parseInt(Rate)
                        if(parseInt(xx_LAST_PAGE)==0){ Rate=0 }
                        
                        $(".LevelTab[lvl='"+level+"'] [CD='[[List]]']").append('\
                        <tr departmentId="'+data_ID+'">\
                           <td class="Level"></td>\
                           <td class="trBook">\
                              <div class="Book">\
                                 <div class="Img"><img src="'+cdnDefaultUrl+data_IMG+'"></div>\
                                 <div class="Info">\
                                    <div class="Name">'+data_NAME+'</div>\
                                    <div class="Authors">'+AuthorsList+'</div>\
                                 </div>\
                              </div>\
                           </td>\
                           <td class="trProggress">\
                              <div class="ProgressBar">\
                                 <div class="Rate">%'+Rate+'</div>\
                                 <div class="Bar"><span style="width:'+Rate+'%"></span></div>\
                                 <div class="Text">'+xx_LAST_PAGE+'/'+data_PAPER+' '+pageLang(2030)+'</div>\
                              </div>\
                           </td>\
                           <td class="trReadStatus">'+xx_readSTATUS+'</td>\
                           <td class="trListenStatus" >'+xx_listenSTATUS+'</td>\
                        </tr>\
                        ')
                     });
               }
               });
            }
