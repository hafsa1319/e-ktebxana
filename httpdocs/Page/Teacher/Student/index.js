$("body").attr("Page","TeacherStudentList")

                  
      $('<article class="PageArea">\
      <div class="Container">\
      <div class="row">\
      <div class="col-12">\
               <div class="SchoolroomList">\
                  <div class="Title"> '+pageLang(2011)+' </div>\
                  <div class="List"></div>\
               </div>\
               <div class="StudentTable">\
                  <table class="table">\
                     <thead>\
                        <tr class="Active">\
                           <th style="width:420px">'+pageLang(2012)+'</th>\
                           <th style="width:120px">'+pageLang(2013)+'</th>\
                           <th>'+pageLang(2014)+'</th>\
                        </tr>\
                     </thead>\
                     <tbody CD="[[List]]">\
                     </tbody>\
                  </table>\
               </div>\
            </div>\
         </div>\
      </div>\
      </div>\
      </div>\
      </article>\
      ').appendTo(".PageContentArea")

      var WH = parseInt($(window).height())-240
      var WW = parseInt($(window).width())
      if(WW<980){
         $(".Header .Left").html("<a href='/' class='BtnReportView'><i></i> <span> "+defaultLang(2042)+" </span></a>")
      }


      var systemUser = JSON.parse(localStorage.getItem("systemUser"))
      var userType   = systemUser.type

      studentList()
      function studentList(SchoolroomId){
         if(SchoolroomId==undefined){ SchoolroomId = 0 }
            $.ajax({
            type: "post",
            url: appPath+"teacher/students",
            dataType: "json",
            data : "teacherId="+systemUser.user.id+"",
            success: function(data) {

               
                  $.each( data.schoolroom, function( i, itemx ) {
                        var xx_SCHOOLROOM_ID =  itemx.id
                        var xx_NAME          =  itemx.name

                        if(SchoolroomId==0 && i==0){ SchoolroomId = xx_SCHOOLROOM_ID }
                        $(".SchoolroomList>.List").append('\
                           <div class="SchoolroomItem" D="'+xx_SCHOOLROOM_ID+'">'+xx_NAME+'</div>\
                        ')
                  })
               


               $(".SchoolroomItem").removeClass("Active")
               $(".SchoolroomItem[D='"+SchoolroomId+"']").addClass("Active")
               $.each( data.list, function( i, itemx ) {

                     var xx_ID             =  itemx.id
                     var xx_FIRST_NAME     =  itemx.firstName
                     var xx_MIDDLE_NAME    =  itemx.middleName
                     var xx_LAST_NAME      =  itemx.lastName
                     var xx_AVATAR         =  "https://ktebxana.s3.eu-west-1.wasabisys.com/166320255671810.png" //cdnDefaultUrl+itemx.avatar
                     var xx_LEVEL          =  itemx.level
                     var xx_GRADE_ID       =  itemx.gradeId
                     var xx_SCHOOLROOM_ID  =  itemx.schoolroomId
                     var xx_ISTATISTIC     =  itemx.istatistic
                     if(xx_LEVEL==null){xx_LEVEL=0}

                     
                     $.each( xx_ISTATISTIC, function( i, itemx ) {
                        xx_LEVEL_NAME     =  itemx.level
                        xx_LEVEL_BOOK     =  itemx.levelBook
                        xx_STUDENT_READ   =  itemx.book
                     });

                     var Rate = (xx_STUDENT_READ/xx_LEVEL_BOOK)*100
                     var Rate = parseInt(Rate)
                     if(parseInt(xx_LEVEL_BOOK)==0){ Rate=0 }
                     
                     var Class = ""
                     if(SchoolroomId==xx_SCHOOLROOM_ID){ Class=" Active " }
                     if(xx_LEVEL==0){
                        $("[CD='[[List]]']").append('\
                        <tr class="'+Class+'" studentId="'+xx_ID+'" schoolroomId="'+xx_SCHOOLROOM_ID+'">\
                           <td style="width:420px">\
                              <a href="/student-view?studentId='+xx_ID+'" class="photoRow">\
                                 <div class="Photo"><img src="'+xx_AVATAR+'"></div>\
                                 <div class="Info">\
                                    <span>'+xx_FIRST_NAME+' '+xx_MIDDLE_NAME+' '+xx_LAST_NAME+' </span>\
                                    <span>'+xx_ID+'</span>\
                                 </div>\
                              </a>\
                           </td>\
                           <td colspan="2" class="nonLevel"><div style="border: 1px solid #efefef;border-radius: 4px;text-align: center;padding: 2px 0px;cursor: pointer;background: #fff;">?</div></td>\
                        </tr>\
                        ')
                     }else{
                        $("[CD='[[List]]']").append('\
                        <tr class="'+Class+'" studentId="'+xx_ID+'" schoolroomId="'+xx_SCHOOLROOM_ID+'">\
                           <td style="width:420px">\
                              <a href="/student-view?studentId='+xx_ID+'" class="photoRow">\
                                 <div class="Photo"><img src="'+xx_AVATAR+'"></div>\
                                 <div class="Info">\
                                    <span>'+xx_FIRST_NAME+' '+xx_MIDDLE_NAME+' '+xx_LAST_NAME+' </span>\
                                    <span>'+xx_ID+'</span>\
                                 </div>\
                              </a>\
                           </td>\
                           <td class="Level" style="width:120px"><div style="border: 1px solid #efefef;border-radius: 4px;text-align: center;padding: 2px 0px;cursor: pointer;background: #fff;">'+xx_LEVEL_NAME+'</div></td>\
                           <td class="Progress">\
                              <div class="ProgressBar">\
                                 <div class="Rate">%'+Rate+'</div>\
                                 <div class="Bar"><span style="width:'+Rate+'%"></span></div>\
                                 <div class="Text">'+xx_STUDENT_READ+'/'+xx_LEVEL_BOOK+'</div>\
                              </div>\
                           </td>\
                        </tr>\
                        ')
                     }
                     
               })
            }
            });
      }

      $(document).on("click",".SchoolroomList>.List>.SchoolroomItem",function(){
         var SchoolroomId     =  $(this).attr("D")
         $("[CD='[[List]]']>tr").removeClass("Active")
         $("[CD='[[List]]']>tr[schoolroomId='"+SchoolroomId+"']").addClass("Active")

         $(".SchoolroomItem").removeClass("Active")
         $(".SchoolroomItem[D='"+SchoolroomId+"']").addClass("Active")
      })
