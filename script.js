document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (name == "" || email == "" || password == "") {
    document.getElementById("error").innerText = "Please fill all fields";
  } else {
    document.getElementById("error").innerText = "";
    alert("Form submitted!");
  }
});
