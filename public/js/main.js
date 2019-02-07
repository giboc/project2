// Get references to page elements
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $email = $("#email");
var $password = $("#password");
var $loginEmail = $("#loginEmail");
var $loginPassword = $("#loginPassword");

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
  login: function(playerLogin) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/login",
      data: JSON.stringify(playerLogin)
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "api/delUser/" + id,
      type: "DELETE"
    });
  }
};

//Function to handle player creation.
var createPlayer = function (event) {
  console.log("create test");
  if ($firstName.val() && $lastName.val() && $email.val() && $password.val()){
    event.preventDefault();
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

//Function to handle login
var login = function(event){
  console.log("login test");
  if ($loginEmail.val() && $loginPassword.val()){
    event.preventDefault();
    var input = {
      email: $loginEmail.val().trim(),
      password: $loginPassword.val().trim()
    };
    API.login(input);
  }
  else
    return;
}

$("#createUser").on("click", createPlayer);
$("#login").on("click", login);

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