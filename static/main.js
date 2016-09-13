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
          tr.append("<td>" + "<button type='button' class='removebutton' title='Remove this row'>X</button>" + "</td>");
          $('table').append(tr);
      }
    };
  })
});

var i = 1;
$("#addbutton").click(function () {
    $("table tr:first").clone().find("input").each(function () {
        $(this).val('').attr({
            'id': function (_, id) {
                return id + i
            },
                'name': function (_, name) {
                return name + i
            },
                'value': ''
        });
    }).end().appendTo("table");
    i++;
});

$(document).on('click', 'button.removebutton', function () {
    $(this).closest('tr').remove();
    return false;
});
