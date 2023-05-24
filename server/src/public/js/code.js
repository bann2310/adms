const code = document.querySelector('#code')
const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const res = await fetch('/forgot/code', {
    method: 'POST',
     body: JSON.stringify({code: code.value}),
    headers: { 'Content-Type': 'application/json' }
    })
  if (res.redirected) {
    window.location.href = res.url
  }
  else {
    const error = await res.json()
    if (res.status === 401 || res.status === 402)
    {
      console.log(error)
      const hidden = document.querySelector('.hidden')
      hidden.innerHTML = error
      hidden.setAttribute('class','form__fail')
    }
  }
})
