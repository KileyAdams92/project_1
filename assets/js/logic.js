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
    "http://api.musixmatch.com/ws/1.1/" +
    buttonText +
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

    // var result = response.data;
    // console.log(result);
    // for (var k = 0; k < result.length; k++) {
    //   var artist = result[k].rating;
    //   var p = $("<p>").text("Rating: " + rating);
    //   var characterImage = $("<img>");
    //   $("#gifs").append(p);
    //   $("#gifs").append(characterImage);
    //   characterImage.attr("src", result[k].images.fixed_height_still.url);
    //   characterImage.attr("data-state", "still");
    //   characterImage.addClass("gifImage");
    //   characterImage.attr("data-animate", result[k].images.fixed_height.url);
    //   characterImage.attr(
    //     "data-still",
    //     result[k].images.fixed_height_still.url
    //   );
    // }
  });
  addLyrics();
}
