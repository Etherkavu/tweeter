/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//constructs a div full of each tweet and returns the div to be added to the tweet page
//constructs text html copy of the article to be appended to the div
function createTweetElement(data){
  let $result = $('<div class="datafield">');
  for (i = (data.length - 1); i > -1; i--){
     var date = dateBuilder(data[i].created_at);
     const safeInput = `<p>${escape(data[i].content.text)}</p>`;
     $result.append('<article class="tweet"><header><img class="logo" src=' + data[i].user.avatars.small + '><p>' + data[i].user.name + '</p><p2>' + data[i].user.handle + '</p2></header><p>' + safeInput + '</p><footer><p>' + date + '</p><span class="Reacts"><img src="/images/bird.png"><img src="/images/bird.png"><img src="/images/bird.png"></span></footer></article>');
   }
  return $result;
}

//does some math to calcualte how many days ago the tweet was made
function dateBuilder(data){
  var now = new Date();
  now = now.getTime();
  var result = Math.floor((now - data)/(1000*60*60*24));
  result = 'posted ' + result + ' days ago.'
  return result;
}

//Disables users ability to enter script into the tweet
//returns string
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

//ajax request to pull previous tweets, and turns on the hover of the bottom right buttons
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        console.log("suc1");
        $('#tweets-container').append(createTweetElement(tweets));
        $('article').hover(
          function(){
          $(this.children[2].children[1]).show();
            }, function(){
          $(this.children[2].children[1]).hide();
        });
      }
    });

//Compose button hide, on click with toggle the tweet entering window to hide or show
// uses a slide animation
  $('.buttonScroll').click(function(){
    $('.new-tweet').slideToggle("fast");
    $("textarea").focus();
  });

//changes the colour of the compose button on hover
  $('.buttonScroll').hover(
                function() {
                  $(this).css('background-color', '#e1fbf4')
                }, function() {
                  $(this).css('background-color', '')
              });

//Form step 1: check for empty entry and oversized tweet, displays errors box with message
  $('form').on('submit', function(e){
    e.preventDefault();
    if(($("#textybox").val()).length < 1){
      $('form').append('<p class="error"> Error: Empty Tweet</p>');
    }else if(($("#textybox").val()).length > 140){
      $('form').append('<p class="error"> Error: Tweet too big</p>');
    }else{

//Form step 2: takes form data and sends to database
      var data = $('form').serialize();
      $.post('/tweets', data).done(function() {

//form step 3: reset textarea and counter
        $('textarea').val('');
        $('.counter').text(140);

//forms dtep 4: refetches the tweet collection and refreshes the page to show new tweet
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
