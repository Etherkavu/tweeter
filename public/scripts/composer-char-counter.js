//Used to increment the character counter during tweet creation.
//will also remove error message if present, keeping the creen pleasent
//
$(document).ready(function() {
  $("textarea").on("input",function(){
    $('.error').remove();
    $("span.counter").text(140 - ($("textarea")[0].value.length));
    if (($("textarea")[0].value.length) > 140){
      $("span.counter").css('color', 'red');
    } else {
      $("span.counter").css('color', 'black');
    }
  });
});