
$(document).ready(function() {
  $("textarea").on("input",function(){
    $("span.counter").text(140 - ($("textarea")[0].value.length));
    if (($("textarea")[0].value.length) > 140){
      $("span.counter").css('color', 'red');
    } else {
      $("span.counter").css('color', 'black');
    }
  });
});