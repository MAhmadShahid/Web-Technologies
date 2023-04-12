$(function () {
    // this code will execute when the DOM is ready.
    $("#loadDataBtn").on("click",loadData);
    loadData();
  });
  
  function loadData() {
    console.log("Sending Ajax Call");
    $("#statusRow td").html("Loading Data...");
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/products",
      success: processResponse,
    });
    console.log("Ajax Call Sent");
  }
  
  function processResponse(response) {
    console.log(response);
    $("#statusRow").remove();
    for (var i = 0; i < response.length; i++) {
      $("#tableBody").append(
        `<tr><td><button class="btn btn-danger">Delete</button></td><td>${response[i].department}</td><td>${response[i].name}</td><td>` +
          response[i].price + `</td></tr>`
        );
    }
  }
  
  //Handle Addition

    function addItem() {
        console.log("Entered On Submit Function");
        $("#addForm").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "https://usman-fake-api.herokuapp.com/api/products",
            method: "post",
            data: {
            department: $("#Department").val(),
            name: $("#Name").val(),
            price: $("#Price").val(),
            },
            success: function () {
            window.location.href = "ajax.html";
            },
        });
        });
    }
});
