console.log("Javascript,are you there?");

// ALL SCORES

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");

  var url = "http://localhost:3000/";

  $.get(url).done(function(data) {

    if (data.length === 0) {
      $(".score").append("<p>").append("NO HIGHSCORES FOUND!!!");

    } else {

      var tr;
      for (var i = 0; i < data.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + data[i].name + "</td>");
          tr.append("<td>" + data[i].score + "</td>");
          tr.append("<td>" + data[i].initial + "</td>");
          $('table').append(tr);
      }
    };
  })
});
