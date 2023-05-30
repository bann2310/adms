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

async function getname() {
    var cookie = getCookie('login')
    const res = await fetch(`/user/getname?id=${cookie}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        })
    var name = await res.json()
    return JSON.stringify(name)
}

function hello(name) {
    var currentTime = new Date()
    var vietnamHour = currentTime.getHours()
    var Greeting = ""
    if (vietnamHour >= 0 && vietnamHour <= 10) {
        Greeting = "morning"
    }
    else if (vietnamHour > 10 && vietnamHour <= 16) {
        Greeting = "afternoon"
    }
    else {
        Greeting = "evening"
    }
    name = name.slice(1, -1).split(" ").slice(-1).join(" ")
    const main = document.querySelector('.hello')
    main.innerHTML = `Good ${Greeting}, ${name}!!!`
}

async function start(){
    var name = await getname()
    hello(name)
}

start()