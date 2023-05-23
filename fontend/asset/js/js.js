
form.addEventListener("click", () => {
  const login = {
    username: username.value,
    password: password.value
  }
  fetch('/login', {
    method: "POST",
    body: JSON.stringify(login),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data)
  })
})

function hideFuntion() {
  var x = document.getElementById("myInput");
  var y = document.getElementById("eye-click");
  if (x.type === "password") {
      x.type = "text";
      y.classList.add("eye-off");
  } else {
      x.type = "password";
      y.classList.remove("eye-off");
  }
}