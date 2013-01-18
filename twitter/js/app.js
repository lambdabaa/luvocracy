
goog.provide('twitter.App');

goog.require('goog.events');
goog.require('soy');
goog.require('twitter.tweet');



/**
 * @export
 */
twitter.App.init = function() {
  var tweetList = goog.dom.getElementByClass('tweet-list');
  var tweetButton = goog.dom.getElementByClass('tweet-button');
  var tweetForm = goog.dom.getElementByClass('tweet-form');

  goog.events.listen(tweetButton, goog.events.EventType.CLICK, function(e) {
    // Get the tweet text
    var tweet = tweetForm.value;

    // Validate that the tweet has 0 < number of characters <= 140
    if (tweet.length == 0) {
      alert('Tweets must have at least one character.');
      return;
    } else if (tweet.length > 140) {
      alert('Tweets must have fewer than 140 characters');
      return;
    }

    // Build the tweet node and insert it into the document
    var node = goog.dom.createElement('div');
    goog.dom.classes.add(node, 'tweet');
    soy.renderElement(node, twitter.tweet.main, {
      tweet: tweet,
      timestamp: twitter.App.getDate()
    });
    goog.dom.insertChildAt(tweetList, node, 0);

    // Reset the tweet form
    tweetForm.value = '';
  });
};


/**
 * @return {string} a formatted timestamp
 */
twitter.App.getDate = function() {
  var date = new Date();
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
};
