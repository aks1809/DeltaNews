var pageNumber = 1;
$(function(){
    var d = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var strDate = d.getDate() + "." + months[d.getMonth()] + " " + d.getFullYear();
    $("#todaysDate").html(strDate);
});
$("#open_search").click(function(){
    $("#scrolldownbox").slideDown("slow",function(){
        $(this).show();
        
    });
});
$("#close_search").click(function(){
    $("#scrolldownbox").slideUp("slow",function(){
        $(this).hide();
    });
});
$(".magnifier").hover(function(){
    $(this).find(".image-box").toggleClass("magnify");
});
$("#increment").click(function(){
    pageNumber += 1;
    console.log(pageNumber);
});
$("#decrement").click(function(){
    pageNumber -= 1;
});
$("#search_button").click(function(){
    var value = $("#search").val();
    if(value.length>0){
        $(this).attr("href","/"+value+"/1");
    }
});