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
var artistName = "";
var songTitle = "";
//for YouTube Data API
var duration = "";
var ytSearchArray = []; //Array of objects populated with YouTube API Data
var ytArrayNum; // the index number of the selected video in the array.

// for holding the playlist array
var playlistArray = [];

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

  //Triggers both musicmatch and YouTube-Data APIs
  $("#submit-song").click(function() {
    event.preventDefault();
    songTitle = $("#song-title")
      .val()
      .trim();
    artistName = $("#artist")
      .val()
      .trim();
    duration = $("#inlineFormCustomSelectPref").val();
    console.log(
      "Song: " +
        songTitle +
        ", Artist: " +
        artistName +
        ", Duration: " +
        duration
    );

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
  function ytDataSearch() {
    ytSearchArray = [];

    var ytQueryURL =
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB213LbFGRmVEeWvM3O3-AVreKCX6uhJXk&q=" +
      artistName +
      "&" +
      songTitle +
      "&part=snippet&type=video&videoDuration=" +
      duration +
      "&maxResults=4";

    $.ajax({
      url: ytQueryURL,
      method: "GET"
    }).then(function(response) {
      for (i = 0; i < 4; i++) {
        var ytInfo = response.items[i];
        var objTitle = ytInfo.snippet.title;
        var objVideo = ytInfo.id.videoId;
        var objImage = ytInfo.snippet.thumbnails.high.url;
        var objSmImage = ytInfo.snippet.thumbnails.default.url;
        var objMdImage = ytInfo.snippet.thumbnails.medium.url;

        ytSearchArray.push({
          ytTitle: objTitle,
          ytVideo: objVideo,
          ytImage: objImage,
          ytSmImage: objSmImage,
          ytMdImage: objMdImage
        });
      }
      videoSearchResults();
    });
  }

  function videoSearchResults() {
    //empties the video-selection div to remove past search results.
    $(".video-selection").empty();

    //repopulates the video-selection div with the current search results;
    for (i = 0; i < ytSearchArray.length; i++) {
      //Creates a Bootstrap Card for each video
      var videoCard = $("<div>")
        .addClass("card")
        .attr("style", "width: 17rem;");

      //Creates the Card image
      var cardImage = $("<img>").addClass("card-img-top");
      cardImage.attr("src", ytSearchArray[i].ytImage);
      cardImage.attr("alt", "Card image cap");

      //Creates the Card Body
      var cardBody = $("<div>").addClass("card-body");
      var cardHeader = $("<h5>")
        .addClass("card-title")
        .text("Video Title:");

      var cardText = $("<p>").addClass("card-text");
      cardText.text(ytSearchArray[i].ytTitle);

      var cardButton = $("<button>")
        .addClass("btn btn-primary video-selected")
        .text("Select");
      //sets a value for each button equql to position in the ytSearchArray
      cardButton.val([i]);
      console.log(cardButton.val());

      //Assembles the Card and displays to page
      cardBody.append(cardHeader, cardText, cardButton);
      videoCard.append(cardImage, cardBody);
      $(".video-selection").append(videoCard);
      $(".video-box").text("Select a video to Preview!");
    }
  }

  //listens for a video selection to be made.
  $(document).on("click", ".video-selected", function(event) {
    ytArrayNum = parseInt($(this).val());
    $(".video-box").text("Review your video below!");
    $(".video-selection").empty();
    console.log(ytArrayNum);
    displaySelectedVideo();
  });

  //Brings up the video info and enables the user to update artist and song info.
  function displaySelectedVideo() {
    $(".video-selection").empty();

    var selectedImage = $("<img>").attr("id", "selected-image");
    selectedImage.attr("src", ytSearchArray[ytArrayNum].ytImage);

    var selectedTitle = $("<div>").attr("id", "selected-title");
    selectedTitle.text(ytSearchArray[ytArrayNum].ytTitle);

    var selectedForm = $("<form>").addClass("form");

    var selectedDiv1 = $("<div>").addClass("form-group");
    var selectedLabel1 = $("<label>")
      .attr("for", "user-name")
      .text("Added By: (your name)");
    var selectedInput1 = $("<input>").addClass("form-control");
    selectedInput1.attr("id", "user-name").attr("type", "text");
    selectedDiv1.append(selectedLabel1, selectedInput1);

    var selectedDiv2 = $("<div>").addClass("form-group");
    var selectedLabel2 = $("<label>")
      .attr("for", "user-comment")
      .text("Comment:");
    var selectedInput2 = $("<input>").addClass("form-control");
    selectedInput2.attr("id", "user-comment").attr("type", "text");
    selectedDiv2.append(selectedLabel2, selectedInput2);

    selectedForm.append(selectedDiv1, selectedDiv2);

    //Button that will add the video to playlist in FireBase

    var selectedButtons = $("<div>").addClass("selected-buttons");

    var addVideo = $("<button>")
      .addClass("btn btn-success")
      .text("Upload");
    addVideo.attr("type", "submit");
    addVideo.attr("id", "upload-video");

    var selectAgain = $("<button>")
      .addClass("btn btn-danger")
      .text("Reselect");
    selectAgain.attr("type", "submit");
    selectAgain.attr("id", "reselect-video");

    selectedButtons.append(addVideo, selectAgain);

    $(".video-info-display").append(
      selectedImage,
      selectedTitle,
      selectedForm,
      selectedButtons
    );
  }
  $(document).on("click", "#upload-video", function(event) {
    var addedBy = $("#user-name")
      .val()
      .trim();
    var userComment = $("#user-comment")
      .val()
      .trim();

    pushToFirebase(addedBy, userComment);

    $(".video-box").text("Search again or play the awesome playlist!");
    $(".video-info-display").empty();
    $(".video-playback").empty();
  });

  //Clears the selected video and redisplays the original search list.
  $(document).on("click", "#reselect-video", function(event) {
    $(".video-info-display").empty();
    $(".video-playback").empty();
    videoSearchResults();
  });

  function pushToFirebase(varName, varComment) {
    database.ref("/music").push({
      videoId: ytSearchArray[ytArrayNum].ytVideo,
      videoTitle: ytSearchArray[ytArrayNum].ytTitle,
      videoImage: ytSearchArray[ytArrayNum].ytImage,
      videoSmImage: ytSearchArray[ytArrayNum].ytSmImage,
      videoMdImage: ytSearchArray[ytArrayNum].ytMdImage,
      addedBy: varName,
      userComment: varComment,
      searchedArtistName: artistName,
      searchedSongTitle: songTitle,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }

  function displayPlaylist() {
    //empty out the current table
    $("tbody").empty();
    var counter = 0;
    //orders video info by date added and takes snapshot of data.
    database
      .ref("/music")
      .orderByChild("dateAdded")
      .startAt(1)
      .on(
        "child_added",
        function(childSnapshot) {
          counter++;
          console.log(counter);
          console.log(childSnapshot.val().videoSmImage); //monitoring purposes only
          console.log(childSnapshot.val().videoTitle);
          console.log(childSnapshot.val().addedBy);
          console.log(childSnapshot.val().userComment);
          console.log(childSnapshot.val().videoId);

          var tBody = $("tbody");
          var tRow = $("<tr>");

          var headTh = $("<th>")
            .attr("scope", "row")
            .text(counter + ".");

          var imageTd = $("<td>");
          var playlistImage = $("<img>").attr(
            "src",
            childSnapshot.val().videoSmImage
          );
          imageTd.append(playlistImage);

          var titleTd = $("<td>").text(childSnapshot.val().videoTitle);
          var userTd = $("<td>").text(childSnapshot.val().addedBy);
          var commentTd = $("<td>").text(childSnapshot.val().userComment);

          tRow.append(headTh, imageTd, titleTd, userTd, commentTd);
          tBody.append(tRow);
        },
        function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      );
  }

  displayPlaylist();

  $("#start-playlist").click(function() {
    getPlaylistArray();
    console.log(playlistArray);
    //TODO activate YouTube iFrame API
  });

  function getPlaylistArray() {
    //empty out the contents of the current playlist
    playlistArray = [];
    var counter = 0;
    //orders video info by date added and takes snapshot of data.
    database
      .ref("/music")
      .orderByChild("dateAdded")
      .startAt(1)
      .on(
        "child_added",
        function(childSnapshot) {
          counter++;
          console.log(counter);
          console.log(childSnapshot.val().videoId); //monitoring purposes only
          playlistArray.push(childSnapshot.val().videoId);
        },
        function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      );
  }
});
