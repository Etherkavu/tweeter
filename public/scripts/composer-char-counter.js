
$(document).ready(function() {
  console.log("Ready to go!");
  $("textarea").keypress(function(){
    $("span").text(140 - ($("textarea")[0].value.length + 1));
  });
});