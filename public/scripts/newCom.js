console.log("hi");
$('#inst').keypress(function(e){
   if(e.which === 13){
      var comtex = $(this).val();
       $(this).val("");
       var st = $("#com").attr("data-test-value");
       console.log(st);
       var obj = JSON.parse(st);
       obj.text = comtex;
       var cid;
      // $("#com").append(`<div class="col-md-12"><strong>${obj.currentUser.username}</strong><p style="padding-top=0">` + comtex + `</p></div>`);
      // $.post("/commentNew",obj);
      $.ajax({
        url:"/commentNew",
        data:obj,
        type:"POST",
        success:function(resdata){
          console.log(resdata);
           $("#com").append(`  <div class="col-md-10" style="padding:20px;border:3px solid black;margin:auto">
               <h4 style="text-align:center">By:${obj.currentUser.username}</h4>
               <h5 style="text-align:center">` + comtex + `</h5>
             </div>`);
        },
        error:console.error
      });
    //  console.log(cid);
  }
});
$(".like").click(function(e){
    if($(this).attr("data-test-value")==1){
  console.log("clicking like");
  var st = $("#com").attr("data-test-value");
  var obj = JSON.parse(st);
  $.ajax({
    url:"/like",
    data:obj,
    type:"POST",
    success:function(resdata){
      $(".like").attr("data-test-value","0");
      $(".like").text("Unlike");
      $(".like").addClass("btn-danger").removeClass("btn-success");
      console.log(resdata);
    error:console.error
    }
  });
}
  if($(this).attr("data-test-value")==0){
    console.log("clicking like");
    var st = $("#com").attr("data-test-value");
    var obj = JSON.parse(st);
    $.ajax({
      url:"/unlike",
      data:obj,
      type:"POST",
      success:function(resdata){
        $(".like").attr("data-test-value","1");
        $(".like").text("Like");
        $(".like").addClass("btn-success").removeClass("btn-danger");
        console.log(resdata);
      error:console.error
      }
    });
  }
});
