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
    if (res.status === 401)
    {
      console.log(error)
      const hidden = document.querySelector('.hidden')
      hidden.setAttribute('class','form__fail')
    }
    else if (res.status === 402) {
      console.log(error)
    }
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