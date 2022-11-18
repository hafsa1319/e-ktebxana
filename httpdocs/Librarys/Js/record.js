function uploadAudioBase64(audiosrc)
{
var dataString ='audiosrc='+audiosrc;
$.ajax({
type: "POST",
url: "uploadAudio.php",
data: dataString,
cache: false,
success: function(html)
{
var ID = Number(new Date()); //Timestamp
var A='<div class="audioContainer">'
+'<div class="audioProgress" id="audioProgress'+ID+'" style="width:0px"></div>'
+'<div class="audioControl audioPlay" rel="play" id="'+ID+'"></div>'
+'<div class="audioTime" id="audioTime'+ID+'">00.00</div>'
+'<div class="audioBar"></div>'
+'<audio preload="auto" src="'+audiosrc+'" type="audio/mpeg" class="a" id="audio'+ID+'"><source></audio>'
+'</div>';
var B='<div class="stbody"><div class="stimg ">'
+'<a href="https://labs.9lessons.info/srinivas"><img src="http://www.gravatar.com/avatar/c9e85bd3f889cc998dd1bb71d832634b?d=mm&s=230" class="big_face " alt="You" ></a></div>'
+'<div class="sttext"><div class="sttext_content"><span class="sttext_span"><b><a href="https://labs.9lessons.info/srinivas">You</a></b> </span>'
+A
+'</div></div></div>';
$(".recordingslist").prepend(B);
}
});
}