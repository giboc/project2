// Get references to page elements
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $email = $("#email");
var $password = $("#password");

// The API object contains methods for each kind of request we"ll make
var API = {
  savePlayer: function(player) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/savePlayer",
      data: JSON.stringify(player)
    });
  },
  getUser: function() {
    return $.ajax({
      url: "api/getPlayers",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/delUser/" + id,
      type: "DELETE"
    });
  }
};

// //Function to handle player creation.
var createPlayer = function (event) {

  //event.preventDefault();
  
  if ($firstName.val() && $lastName.val() && $email.val() && $password.val()){
    event.preventDefault();
    console.log("???");
    var player = {
      firstName: $firstName.val().trim(),
      lastName: $lastName.val().trim(),
      email: $email.val().trim(),
      password: $password.val().trim()
    };

    API.savePlayer(player);
  }
  else
    return;
};

$("#createUser").on("click", createPlayer);

$(".form").find("input, textarea").on("keyup blur focus", function (e) {
  var $this = $(this),
    label = $this.prev("label");
  if (e.type === "keyup") {
    if ($this.val() === "") {
      label.removeClass("active highlight");
    }
    else {
      label.addClass("active highlight");
    }
  }
  else if (e.type === "blur") {
    if ($this.val() === "") {
      label.removeClass("active highlight");
    }
    else {
      label.removeClass("highlight");
    }
  }
  else if (e.type === "focus") {
    if ($this.val() === "") {
      label.removeClass("highlight");
    }
    else if ($this.val() !== "") {
      label.addClass("highlight");
    }
  }
  
});

$(".tab a").on("click", function (e) {

  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);

});