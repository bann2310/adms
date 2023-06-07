async function remove(id) {
    const res = await fetch(`/account/delete/${id}`)
    if (res.redirected) {
        window.location.href = res.url}
}

async function unblock(user) {
    // console.log(`/account/unblock/${user}`)
    const res = await fetch(`/account/unblock/${user}`)
    if (res.redirected) {
        window.location.href = res.url}
}

async function load() {
    const res_report = await fetch('/report/get')
    const data_report = await res_report.json()

    const res_user = await fetch('/account/getuser')
    const data_user = await res_user.json()

    const res_block = await fetch('/account/getblock')
    const data_block = await res_block.json()

    const user = document.querySelector('.container__account-view')
    user.innerHTML = ''
    data_user.forEach(element => {
        user.innerHTML += `
        <div class="container__account-view-account">
            <div class="container__account-view-account--username">${element.username}</div>
            <div class="container__account-view-account--status">${element.firstlogin?'Người mới':'Người cũ'}</div>
            <div class="container__account-view-account--delete"><a href="" onclick="event.preventDefault();remove(${element.id})"><i class="fa-solid fa-trash"></i></a></div>
        </div>
        `
    });

    const block = document.querySelector('.container__accountblock-view')
    block.innerHTML = ''
    var num = 1
    data_block.forEach(element => {
        block.innerHTML += `
        <div class="container__accountblock-view-account">
            <div class="container__accountblock-view-account--number">${num}</div>
            <div class="container__accountblock-view-account--username">${element.username}</div>
            <div class="container__accountblock-view-account--delete"><a href="" onclick="event.preventDefault();unblock(${element.username})"><i class="fa-solid fa-unlock"></i></a></div>
        </div>`
        num++
    })

    const report = document.querySelector('.container__report-view')
    report.innerHTML = ''
    data_report.forEach(element => {
        report.innerHTML += `
            <div class="container__report-view-account">
                <div class="container__report-view-account-line-date">
                    <div class="container__report-view-account--date">${element.datesub}</div>
                </div>
                <div class="container__report-view-account-line-name">
                    <div class="container__report-view-account--title">Name: </div>
                    <div class="container__report-view-account--name">${element.name}</div>
                </div>
                <div class="container__report-view-account-line-email">
                    <div class="container__report-view-account--title">Email: </div>
                    <div class="container__report-view-account--email">${element.email}</div>
                </div>
                <div class="container__report-view-account-line-problem">
                    <div class="container__report-view-account--title">Problem: </div>
                    <div class="container__report-view-account--problem">${element.problem}</div>
                </div>
                <div class="container__report-view-account-line-descri">
                    <div class="container__report-view-account--title">Description: </div>
                    <div class="container__report-view-account--descri">${element.descrip}</div>
                </div>
            </div>
        `
    })
}
load()

var name_ = document.querySelector('#name')
var username = document.querySelector('#username')
var email_ = document.querySelector('#email')
var form = document.querySelector('#form')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const res = await fetch('/account/create', {
        method: 'POST',
            body: JSON.stringify({ name_: name_.value, username: username.value, email: email_.value}),
        headers: { 'Content-Type': 'application/json' }
    })
    // const data = await res.json()
    // console.log(res.status)
    if (res.redirected) {
        window.location.href = res.url
    }
    if (res.status == 301) {
        var user = document.querySelector('#u')
        var email = document.querySelector('#e')
        user.className = 'container__create-view__items__error'
        email.className = 'container__create-view__items__error'
    } 
    else if (res.status == 302) {
        var user = document.querySelector('#u')
        var email = document.querySelector('#e')
        user.className = 'container__create-view__items__error'
        email.className = 'container__create-view__items__error hiddenemail'
    }
    else {
        var user = document.querySelector('#u')
        var email = document.querySelector('#e')
        user.className = 'container__create-view__items__error hiddenuser'
        email.className = 'container__create-view__items__error'
    }
})