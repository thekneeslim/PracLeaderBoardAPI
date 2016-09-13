console.log("Javascript,are you there?");

// ALL SCORES

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");

  var url = "http://localhost:3000/";

  $.get(url).done(function(data) {

    console.log(data.length)
    $(".score").append("<table id='mainTable' border='1'></table>")

    var tr = $('<tr/>');
    tr.append("<th>" + "Name" + "</th>");
    tr.append("<th>" + "Score" + "</th>");
    tr.append("<th>" + "Initial" + "</th>");
    tr.append("<th>" + "Edit" + "</th>");
    $('table').append(tr);

    for (var i = 0; i < data.length; i++) {
      tr = $('<tr/>');
      tr.append("<td>" + data[i].name + "</td>");
      tr.append("<td>" + data[i].score + "</td>");
      tr.append("<td>" + data[i].initial + "</td>");
      tr.append("<td>" + "<button type='button' class='removebutton' title='Remove this row'>DELETE</button>" + "</td>");
      $('table').append(tr);
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
