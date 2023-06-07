const name = document.querySelector('#name')
const email = document.querySelector('#email')
const problem = document.querySelector('#problem')
const describe = document.querySelector('#describe')
const form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const res = await fetch('/report', {
    method: 'POST',
     body: JSON.stringify({ name: name.value, email: email.value, problem: problem.value, descrip:  describe.value, time: new Date()}),
    headers: { 'Content-Type': 'application/json' }
    })
    if (res.redirected) {
    window.location.href = res.url
  }
})