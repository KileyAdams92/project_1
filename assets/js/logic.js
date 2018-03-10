
//Global variables
//Initial Search variables
  //common for the MusixMatch and YoutTube Data search
  var artistName ="";
  var songTitle="";
  //for YouTube Data API
  var duration = ""; 

  //Arrays populated with  YouTube API Data
  //TODO combine into a single array of objects
  //TODO remove the inital values once rendering works. 
  var titleArray = ["Lady Gaga Carpool Karaoke",]
  var videoIdArray = ["X5Cfi7U4eL4"]
  var imageArray = ["https://i.ytimg.com/vi/X5Cfi7U4eL4/hqdefault.jpg",]

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
    songTitle = $("#song-title").val().trim()
    artistName = $("#artist").val().trim();
    duration =$("#inlineFormCustomSelectPref").val();
    console.log("Song: " + songTitle + ", Artist: " + artistName + ", Duration: " + duration);

    addLyrics();
    ytDataSearch();

  });
  //musixmatch API call
  function addLyrics(lyricSpot) {
    $(".lyrics").html("");
    var mmQueryURL =
      "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=2ba1698bb3ae560efd18a96c8b13d980&q_track=" +
      songTitle +
      "&q_artist=" +
      artistName;

    $.ajax({
      url: mmQueryURL,
      method: "GET"
    }).then(function(response) {
      var lyrics = $(this).attr("data-lyrics");
      var lyricsBody = JSON.parse(response).message.body.lyrics.lyrics_body;
      console.log(lyricsBody);
      $(".lyrics").text(lyricsBody);
    });
  }

    //YouTube Data API call
  function ytDataSearch(){

    var ytQueryURL =
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB213LbFGRmVEeWvM3O3-AVreKCX6uhJXk&q="+ 
    artistName + "&"+ songTitle  + "&part=snippet&type=video&videoDuration=" + duration + "&maxResults=8";
    
    $.ajax({
      url: ytQueryURL,
      method: "GET"
      }).then(function(response) {
      for (i = 0; i < 8; i++){
          videoIdArray.push(response.items[i].id.videoId);
          titleArray.push(response.items[i].snippet.title);
          imageArray.push(response.items[i].snippet.thumbnails.high.url);
          };
          console.log(titleArray);
          console.log(videoIdArray);
          console.log(imageArray);
          //displayImages();
    });
  }
  
});

