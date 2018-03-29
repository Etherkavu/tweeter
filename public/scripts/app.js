/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(data){
  let $result = $('<div class="datafield">');
  for (i = (data.length - 1); i > -1; i--){
     var date = dateBuilder(data[i].created_at);
     const safeInput = `<p>${escape(data[i].content.text)}</p>`;
     $result.append('<article class="tweet"><header><img class="logo" src=' + data[i].user.avatars.small + '><p>' + data[i].user.name + '</p><p2>' + data[i].user.handle + '</p2></header><p>' + safeInput + '</p><footer><p>' + date + '</p><span class="Reacts"><img src="/images/bird.png"><img src="/images/bird.png"><img src="/images/bird.png"></span></footer></article>');
   }
  return $result;
}

function dateBuilder(data){
  var now = new Date();
  now = now.getTime();
  var result = Math.floor((now - data)/(1000*60*60*24));
  result = 'posted ' + result + ' days ago.'
  return result;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        $('#tweets-container').append(createTweetElement(tweets));
        $('article').hover(
          function(){
          $(this.children[2].children[1]).show();
            }, function(){
          $(this.children[2].children[1]).hide();
        });
      }
    });

  $('.buttonScroll').click(function(){
    $('.new-tweet').slideToggle("fast");
    $("textarea").focus();
  });

  $('.buttonScroll').hover(
                function() {
                  $(this).css('background-color', '#e1fbf4')
                }, function() {
                  $(this).css('background-color', '')
              });


  $('form').on('submit', function(e){
    e.preventDefault();
      $('.error').remove();
    if(($("#textybox").val()).length < 1){
      $('form').append('<p class="error"> Error: Empty Tweet</p>');
    }else if(($("#textybox").val()).length > 140){
      $('form').append('<p class="error"> Error: Tweet too big</p>');
    }else{
      var data = $('form').serialize();
      $.post('/tweets', data).done(function() {
        $('textarea').val('');
        $('.counter').text(140);
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function (tweets) {
            $('.datafield').remove();
            $('#tweets-container').append(createTweetElement(tweets));
            $('article').hover(
              function(){
                $(this.children[2].children[1]).show();
              }, function(){
                $(this.children[2].children[1]).hide();
            });
          }
        });
      });
    }
  });

});
