$(document).ready(function() {

$(document).on("click", ".load-comments-button", function (event) {
    event.preventDefault()
    console.log("clicked the load button")
    var thisId = $(this).attr("data-attribute")
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function (data) {
        console.log(data.comment)
        if (data.comment.length) {
            for (var i = 0; i < data.comment.length; i++) {
                var $div = $('<div>')
                var $title = $('<h3>').text(data.comment[i].title)
                var $body = $('<p>').text(data.comment[i].body)
                $div = $div.append($title).append($body)
                $('#comment-' + thisId).append($div)
            }

        }

    })
})


$(document).on("click", ".save-comment-button", function (event) {
    event.preventDefault()
    console.log("clicked the save button")
    var thisId = $(this).attr("data-attribute")
    console.log(thisId)
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput-" + thisId).val(),
            body: $("#bodyinput-" + thisId).val()
        }
    }).then(function (data) {
        console.log("callback frompost " + JSON.stringify(data))
    })

    $("#titleinput-" + thisId).val('')
    $("#bodyinput-" + thisId).val('')
})

})

