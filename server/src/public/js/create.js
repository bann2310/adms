var input = document.querySelector('#input')
var namedoc = document.querySelector('#name')
var number = document.querySelector('#number')
var date = document.querySelector('#date')
var type = document.querySelector('#type')
var term = document.querySelector('#term')
var note = document.querySelector('#note')
var documentat = document.querySelector('#documentat')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    var formData = new FormData();
    formData.append('input', input.files[0])
    formData.append('name', namedoc.value)
    formData.append('number', number.value)
    formData.append('date', date.value)
    formData.append('type', type.value)
    formData.append('term', term.value)
    formData.append('note', note.value)
    // formData.append('documentat', documentat.files[0])
    const res = await fetch('/create', {
      method: 'POST',
      body: formData,
    })
    if (res.redirected) {
        window.location.href = res.url
    }
})
