console.log("Javascript,are you there?");

// ALL SCORES

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");

  var url = "http://localhost:3000/";

  $.get(url).done(function(data) {

    if (data.length === 0) {
      $(".score").append("<p>").append("NO HIGHSCORES FOUND!!!");
    } else {
      for (var i = 0; i < data.length; i++) {
          var tr = $('<tr>');

          $("#table").append("<tr>").append("<td>").append("data[i].name");
          tr.append("data[i].score");
          tr.append("data[i].initial");
      }
    }
    $.fail(function () {
      console.log('error')
    })
    $.always(function () {
      console.log('complete')
    })
  })
});


//
// $(document).ready(function () { //Putting them in a table.
//     var entries = $.getJSON('http://localhost:3000/entries',
//     function (entries) {
//         var tr;
//         for (var i = 0; i < entries.length; i++) {
//             tr = $('<tr/>');
//             tr.append("<td>" + entries[i].Name + "</td>");
//             tr.append("<td>" + entries[i].Score + "</td>");
//             tr.append("<td>" + entries[i].Initial + "</td>");
//             $('table').append(tr);
//         }
//         $.fail(function () {
//           console.log('error')
//         })
//         $.always(function () {
//           console.log('complete')
//         })
//     });
// });
