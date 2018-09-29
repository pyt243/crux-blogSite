  $("#inp").keypress(function(e){
    if(e.which===13){
  console.log("listening")
   var st = $(this).val().toLowerCase();
   $(".title").each(function(i,ti){
     var t = $(this).text().toLowerCase();
     if(t.indexOf(st)==-1)
       {
         $(this).parent().css("display","none");
       }
       if(t.indexOf(st)!=-1)
         {
           $(this).parent().css("display","block");
         }
   });
 }
});
