const password = document.querySelector('#password')
const password_cf = document.querySelector('#password_cf')
const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const res = await fetch('/forgot/reset', {
    method: 'POST',
     body: JSON.stringify({ password: password.value, password_cf: password_cf.value }),
    headers: { 'Content-Type': 'application/json' }
    })
  if (res.redirected) {
    window.location.href = res.url
  }
  else {
    const err = await res.json()
    if (res.status === 400)
    {
      console.log(err)
      const hidden = document.querySelector('.hidden')
      hidden.setAttribute('class','form__fail')
    }
  }
})