$(function() {
  // Wrap every letter in a span
  $(".ml7 .letters").each(function() {
    $(this).html(
      $(this)
        .text()
        .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
    );
  });

  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml7 .letter",
      translateY: ["1.1em", 0],
      translateX: ["0.55em", 0],
      translateZ: 0,
      rotateZ: [180, 0],
      duration: 750,
      easing: "easeOutExpo",
      delay: function(el, i) {
        return 50 * i;
      }
    })
    .add({
      targets: ".ml7",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });

  $("#submit-song").click(function() {
    event.preventDefault();
    addLyrics();
  });
  //musixmatch API call
  function addLyrics(lyricSpot) {
    $(".lyrics").html("");
    var songTitle = $("#song-title")
      .val()
      .trim();
    console.log(songTitle);
    var artistName = $("#artist")
      .val()
      .trim();
    var queryURL =
      "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=2ba1698bb3ae560efd18a96c8b13d980&q_track=" +
      songTitle +
      "&q_artist=" +
      artistName;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var lyrics = $(this).attr("data-lyrics");
      console.log(response);
      var result = response.message;
      var newLyrics = $(".lyrics").text(message.body.lyrics_body);
    });
  }
  //attempt at CORS header
  var createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // Most browsers.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // IE8 & IE9
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  };
  
  var url = "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=2ba1698bb3ae560efd18a96c8b13d980&q_track=" +songTitle +"&q_artist=" + artistName;
  var method = 'GET';
  var xhr = createCORSRequest(method, url);
  
  xhr.onload = function() {
    // Success code goes here.
  };
  
  xhr.onerror = function() {
    // Error code goes here.
  };
  
  xhr.send();
});
