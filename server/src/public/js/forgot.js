const email = document.querySelector('#email')
const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const res = await fetch('/forgot', {
    method: 'POST',
     body: JSON.stringify({email: email.value}),
    headers: { 'Content-Type': 'application/json' }
    })
  if (res.redirected) {
    window.location.href = res.url
  }
  else {
    const error = await res.json()
    console.log(error)
    if (res.status === 400)
    {
      console.log(error)
      const hidden = document.querySelector('.hidden')
      hidden.setAttribute('class','form__fail')
    }
  }
})
