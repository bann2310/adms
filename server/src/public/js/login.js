const username = document.querySelector('#username')
const password = document.querySelector('#password')
const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const res = await fetch('/login', {
    method: 'POST',
     body: JSON.stringify({ username: username.value, password: password.value }),
    headers: { 'Content-Type': 'application/json' }
    })
  if (res.redirected) {
    window.location.href = res.url
  }
  else {
    const error = await res.json()
    const main = document.querySelector('.form__fail')
      if (main.querySelector('.form__fail--content'))
        main.removeChild(main.querySelector('.form__fail--content'))
      var fail = document.createElement('div')
      fail.classList.add('form__fail','form__fail--content')
      fail.innerHTML = `${error}`
      main.appendChild(fail)
  }
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