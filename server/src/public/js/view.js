function start() {
    loadpagebytag('none')
}
start()
var status = null

const _00 = document.querySelector("#_00")
const _41 = document.querySelector("#_41")
const _35 = document.querySelector("#_35")
const _87 = document.querySelector("#_87")
const _40 = document.querySelector("#_40")
const _42 = document.querySelector("#_42")
const _36 = document.querySelector("#_36")
const _44 = document.querySelector("#_44")

const list_doc = {
    'none': ['none','Văn bản lưu trữ',"all"],
    40: ["BC","Báo cáo","baocao"],
    36: ["CT","Chương trình","chuongtrinh"],
    42: ["CV","Công văn","congvan"],
    43: ["HD","Hướng dẫn","huongdan"],
    35: ["KH","Kế hoạch","kehoach"],
    99: ["KHLT","Kế hoạch liên tịch","kehoachlientich"],
    87: ["QD","Quyết định","quyetdinh"],
    41: ["TB","Thông báo","thongbao"],
    44: ["TM","Thư mời","thumoi"]
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length,c.length));
        }
    }
    return "";
}

var currentpage = 1
async function prepage() {
    if (currentpage != 1) {
        currentpage -= 1
        var request =JSON.parse(getCookie('view').substring(2)) 
    
        const main = document.querySelector('.container-view__table')
        main.innerHTML = ""

        const res = await fetch(`/view/v?type=${request.type}&page=${currentpage}`)
        const data = await res.json()

        data.map(item => {
            main.innerHTML+=`<tr class="container-view__table--header">
            <th><a href="/view/${item.id_save}${item.id}" value="">${item.number < 10 ? '0' + item.number : item.number}-${list_doc[item.typedoc][0]}/ĐTN</a></th>
            <th>Date</th>
            <th>Term</th>
            <th><a href="/view/d/${item.filepri}"><i class="fa-solid fa-download"></i></a></th>
        </tr>
        <tr>
            <td>${item.namedoc}</td>
            <td>${item.datedoc.substring(0, 10)}</td>
            <td>${item.termdoc}</td>
        </tr>`
        })

        var old_ = document.querySelector('.container-pagination__items--active')
        old_.className = 'container-pagination__items'
        var new_ = document.querySelectorAll('.container-pagination__items')[currentpage]
        new_.classList.add('container-pagination__items--active')
    }
}

async function nextpage() {
    var count = document.querySelectorAll('.container-pagination__items').length - 2
    if (currentpage != count)
    {
        currentpage += 1
        var request =JSON.parse(getCookie('view').substring(2)) 
        
        const main = document.querySelector('.container-view__table')
        main.innerHTML = ""

        const res = await fetch(`/view/v?type=${request.type}&page=${currentpage}`)
        const data = await res.json()

        data.map(item => {
            main.innerHTML+=`<tr class="container-view__table--header">
            <th><a href="/view/${item.id_save}${item.id}" value="">${item.number < 10 ? '0' + item.number : item.number}-${list_doc[item.typedoc][0]}/ĐTN</a></th>
            <th>Date</th>
            <th>Term</th>
            <th><a href="/view/d/${item.filepri}"><i class="fa-solid fa-download"></i></a></th>
        </tr>
        <tr>
            <td>${item.namedoc}</td>
            <td>${item.datedoc.substring(0, 10)}</td>
            <td>${item.termdoc}</td>
        </tr>`
        })

        var old_ = document.querySelector('.container-pagination__items--active')
        old_.className = 'container-pagination__items'
        var new_ = document.querySelectorAll('.container-pagination__items')[currentpage]
        new_.classList.add('container-pagination__items--active')
    }
}

async function loadpage(number) {
    currentpage = number
    var request =JSON.parse(getCookie('view').substring(2)) 
    
    const main = document.querySelector('.container-view__table')
    main.innerHTML = ""

    const res = await fetch(`/view/v?type=${request.type}&page=${number}`)
    const data = await res.json()

    data.map(item => {
        main.innerHTML+=`<tr class="container-view__table--header">
        <th><a href="/view/${item.id_save}${item.id}" value="">${item.number < 10 ? '0' + item.number : item.number}-${list_doc[item.typedoc][0]}/ĐTN</a></th>
        <th>Date</th>
        <th>Term</th>
        <th><a href="/view/d/${item.filepri}"><i class="fa-solid fa-download"></i></a></th>
    </tr>
    <tr>
        <td>${item.namedoc}</td>
        <td>${item.datedoc.substring(0, 10)}</td>
        <td>${item.termdoc}</td>
    </tr>`
    })

    var old_ = document.querySelector('.container-pagination__items--active')
    old_.className = 'container-pagination__items'
    var new_ = document.querySelectorAll('.container-pagination__items')[number]
    new_.classList.add('container-pagination__items--active')
}

async function loadpagebytag (element) {
    currentpage = 1
    const _res = await fetch(`/view/s?type=${element}`)
    const _data = await _res.json()

    const main = document.querySelector('.container-view')
    
    main.innerHTML = ""
    main.innerHTML += `<div class="container-view__title">${list_doc[element][1]}</div>`
    
    if (_data) {
        const amount = Math.ceil(_data/5)

        const res = await fetch(`/view/v?type=${element}&page=1`)
        const data = await res.json()
        
        if (element == 'none')
        {
            var form = document.createElement('form')
            form.classList.add('container-view__form')
            form.id = 'form'
            form.innerHTML = `
            <div class="container-view__form-input">
                <input type="text" name="keyword" id="keyword" placeholder="Gõ tên văn bản" onkeyup="">
            </div>
            <div class="container-view__form-select">
                <select class="vanban" name="vanban" id="type">
                    <option value="none">Chọn danh mục</option>
                    <option value="40">Báo cáo</option>
                    <option value="36">Chương trình</option>
                    <option value="42">Công văn</option>
                    <option value="43">Hướng dẫn</option>
                    <option value="35">Kế hoạch</option>
                    <option value="99">Kế hoạch liên tịch</option>
                    <option value="87">Quyết định</option>
                    <option value="41">Thông báo</option>
                    <option value="44">Thư mời</option>
                </select>
            </div>
            <div class="container-view__form-button">
                <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>`
            main.appendChild(form)

            const search = document.querySelector('.container-view__form')
            search.addEventListener('submit', async (event) => {
                event.preventDefault()
                const keyword = document.querySelector('#keyword')
                const type = document.querySelector('#type')
                const res = await fetch(`/view/search?keyword=${keyword.value}&type=${type.value}`)
                const data = await res.json()
                var table = document.querySelector('.container-view__table')
                table.innerHTML=''
                if (data)
                {
                    data.map(item => {
                        table.innerHTML+=`<tr class="container-view__table--header">
                        <th><a href="/view/${item.id_save}${item.id}" value="">${item.number < 10 ? '0' + item.number : item.number}-${list_doc[item.typedoc][0]}/ĐTN</a></th>
                        <th>Date</th>
                        <th>Term</th>
                        <th><a href="/view/d/${item.filepri}"><i class="fa-solid fa-download"></i></a></th>
                    </tr>
                    <tr>
                        <td>${item.namedoc}</td>
                        <td>${item.datedoc.substring(0, 10)}</td>
                        <td>${item.termdoc}</td>
                    </tr>`
                    })
                }
                else {
                    table.innerHTML+=`<h1 style="font-size: 18px">Không tồn tại văn bản chứa từ khóa.</h1>`
                }
                var div = document.querySelector('.container-pagination')
                div.innerHTML=''
            })
        }

        var table = document.createElement('table')
        table.classList.add('container-view__table')
        data.map(item => {
            table.innerHTML+=`<tr class="container-view__table--header">
            <th><a href="/view/${item.id_save}${item.id}" value="">${item.number < 10 ? '0' + item.number : item.number}-${list_doc[item.typedoc][0]}/ĐTN</a></th>
            <th>Date</th>
            <th>Term</th>
            <th><a href="/view/d/${item.filepri}"><i class="fa-solid fa-download"></i></a></th>
        </tr>
        <tr>
            <td>${item.namedoc}</td>
            <td>${item.datedoc.substring(0, 10)}</td>
            <td>${item.termdoc}</td>
        </tr>`
        })
        main.appendChild(table)

        var div = document.createElement('div')
        div.classList.add('container-pagination')
        div.innerHTML += `
        <i class="container-pagination__items fa-solid fa-angle-left" onclick="prepage()"></i>
        <div class="container-pagination__items container-pagination__items--active" onclick="loadpage(1)">1</div>`
        for (var i = 2; i<=amount; i++)
        {
            div.innerHTML += `
            <div class="container-pagination__items" onclick="loadpage(${i})">${i}</div>`
        }
        div.innerHTML += `
        <i class="container-pagination__items fa-solid fa-angle-right" onclick="nextpage()"></i>
        `
        main.appendChild(div)
    }
    else {
        main.innerHTML+=`<h1 style="font-size: 18px">Hiện tại không có văn bản.</h1>`
    }
}

_00.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('none')
})
_40.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('40')    
})
_42.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('42')    
})
_36.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('36')    
})
_44.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('44')    
})
_87.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('87')
})
_35.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('35')
})
_41.addEventListener('click', async (event) => {
    event.preventDefault()
    loadpagebytag('41')
})


