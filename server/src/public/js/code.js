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
      const main = document.querySelector('.form__fail')
      if (main.querySelector('.form__fail--content'))
        main.removeChild(main.querySelector('.form__fail--content'))
      var fail = document.createElement('div')
      fail.classList.add('form__fail','form__fail--content')
      fail.innerHTML = `${error}`
      main.appendChild(fail)
    }
  }
})


function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
}

async function resend() {
  var cookie = getCookie('adms__')
  const res = await fetch(`/forgot/resend?id=${cookie}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      })
  if (res.redirected) {
    window.location.href = res.url
  }
      
  var content = await res.json()
  const main = document.querySelector('.form__fail')
  if (main.querySelector('.form__fail--content'))
      main.removeChild(main.querySelector('.form__fail--content'))
  var fail = document.createElement('div')
  if (res.status !== 200) {
    fail.classList.add('form__fail','form__fail--content')
    fail.innerHTML = `${content}`
    main.appendChild(fail)
  }
  else {
    fail.classList.add('form__fail','form__fail--content', 'successfull')
    fail.innerHTML = `${content}`
    main.appendChild(fail)
  }
}