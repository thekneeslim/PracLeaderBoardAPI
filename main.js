console.log("Javascript,are you there?");

$(document).ready(function () { //Putting them in a table.
    var entries = $.getJSON('http://localhost:3000/entries',
    function (entries) {
        var tr;
        for (var i = 0; i < entries.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + entries[i].Name + "</td>");
            tr.append("<td>" + entries[i].Score + "</td>");
            tr.append("<td>" + entries[i].Initial + "</td>");
            $('table').append(tr);
        }
        $.fail(function () {
          console.log('error')
        })
        $.always(function () {
          console.log('complete')
        })
    });
});
