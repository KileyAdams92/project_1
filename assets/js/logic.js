  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeq7mfg3gK0IBtgkGYr32wO3UWw2PhV_k",
    authDomain: "video-jukebox-612ac.firebaseapp.com",
    databaseURL: "https://video-jukebox-612ac.firebaseio.com",
    projectId: "youtube-video-jukebox",
    storageBucket: "youtube-video-jukebox.appspot.com",
    messagingSenderId: "265159850889"
  };
  firebase.initializeApp(config);

// a variable to reference the database
  var database = firebase.database();
  
//Global variables
//Initial Search variables
  //common for the MusixMatch and YoutTube Data searches
  var artistName ="";
  var songTitle="";
  //for YouTube Data API
  var duration = "";

  //Array of objects to be populated with  YouTube API Data
  var ytSearchArray = [];

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

    ytSearchArray = [];

    var ytQueryURL ="https://www.googleapis.com/youtube/v3/search?key=AIzaSyB213LbFGRmVEeWvM3O3-AVreKCX6uhJXk&q="+ 
    artistName + "&"+ songTitle  + "&part=snippet&type=video&videoDuration=" + duration + "&maxResults=4"
    
    $.ajax({
      url: ytQueryURL,
      method: "GET"
      }).then(function(response) {
      for (i = 0; i < 4; i++){
          var ytInfo = response.items[i]; 
          var objTitle = ytInfo.snippet.title;
          var objVideo = ytInfo.id.videoId;
          var objImage = ytInfo.snippet.thumbnails.high.url
          ytSearchArray.push({ ytTitle: objTitle, ytVideo: objVideo, ytImage: objImage,});
          };
      console.log(ytSearchArray);
      console.log(ytSearchArray.length);
      console.log('"' + ytSearchArray.length + '"');
      videoSearchResults();
    });
  }

  function videoSearchResults() {
    //empties the video-selection div to remove past search results.
    $(".video-selection").empty();

    //repopulates the video-selection div with the current search results;
    for (i = 0; i < ytSearchArray.length; i++){
      //Creates a Bootstrap Card for each video
      var videoCard = $("<div>").addClass("card").attr("style", "width: 18rem;");

        //Creates the Card image
        var cardImage = $("<img>").addClass("card-img-top")

          cardImage.attr("src", ytSearchArray[i].ytImage);
          cardImage.attr("alt", "Card image cap");

        //Creates the Card Body
        var cardBody = $("<div>").addClass("card-body");

          var cardHeader = $("<h5>").addClass("card-title").text("Video Title:");
              console.log(cardHeader.text());

          var cardText = $("<p>").addClass("card-text");
              cardText.text(ytSearchArray[i].ytTitle);
              console.log(cardText.text());

          var cardButton = $("<button>").addClass("btn btn-primary").text("Select");
            cardButton.val([i]);
            console.log(cardButton.val());

    //Assembles the Card and displays to page
    cardBody.append(cardHeader, cardText, cardButton);
    videoCard.append(cardImage, cardBody);
    $(".video-selection").append(videoCard)
    $(".video-box").text("Select a video to Preview!");
    }
  }

});

