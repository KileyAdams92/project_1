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

//   function addButtons(buttonText) {
//     $(".lyrics").html("");

//     var queryURL =
//       "http://api.musixmatch.com/ws/1.1/" +
//       buttonText +
//       "&api_key=2ba1698bb3ae560efd18a96c8b13d980";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//       var lyrics = $(this).attr("data-lyrics");
//       var result = response.data;
//       console.log(result);
