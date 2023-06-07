const list_doc = {
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

const typefile = {
    'pdf': 'pdf',
    'docx': 'word',
    'xlsx': 'excel'
}

async function loadpage() {
    const url = window.location.href
    var string = url.split('/')[4]
    const res = await fetch(`/view/getdata/${string.substring(10)}`)
    var data = await res.json()
    // console.log(data)
    data = data[0]
    var view = document.querySelector('.container-view')
    var information = document.querySelector('.container-information')
    view.innerHTML = `
        <div class="container-view--block">
            <div class="container-view__title1">${list_doc[data.typedoc][1]} số ${data.number < 10 ? '0' + data.number : data.number}</div>
            <div class="container-view__title2">${data.namedoc}</div>
            <div class="container-view__img">
                <a href="/view/d/${data.filepri}"><img src="../imgs/${typefile[data.filepri.split('.')[2]]}.png" alt=""></a>
            </div>
            <div class="container-view__file">
                <a href="/view/d/${data.filepri}">${data.number < 10 ? '0' + data.number : data.number}-${list_doc[data.typedoc][0]}/ĐTN</a>
            </div>
        </div>
    `
    information.innerHTML = `
    <div class="container-information__title">Thông tin văn bản</div>
        <form enctype="multipart/form-data" id="form">

            <div class="flex">
                <div class="container-information__items container-information__items__name">
                    <label for="name">Tên văn bản</label>
                    <div class="container-information__items--data container-information__items__name--data">${data.namedoc}</div>
                </div>
                
                <div class="container-information__items container-information__number">
                    <label for="number">Số văn bản</label>
                    <div class="container-information__items--data container-information__items__number--data">${data.number < 10 ? '0' + data.number : data.number}</div>
                </div>

                <div class="container-information__items container-information__date">
                    <label for="date">Ngày ban hành văn bản</label>
                    <div class="container-information__items--data container-information__items__date--data">${data.datedoc.substring(0, 10)}</div>
                </div>

                <div class="container-information__items container-information__select">
                    <label for="select">Thể loại văn bản</label>
                    <div class="container-information__items--data container-information__items__select--data">${list_doc[data.typedoc][1]}</div>
                </div>

                <div class="container-information__items container-information__term">
                    <label for="term">Nhiệm kỳ</label>
                    <div class="container-information__items--data container-information__items__term--data">${data.termdoc}</div>
                </div>
            </div>

            <div class="container-information__note">
                <label for="note">Ghi chú</label>
                <div class="container-information__items__note--data">${data.note}</div>
            </div>

            <div class="flex2">
                <div class="container-information__repair" onclick="repair()">Sửa</div>
                <div class="container-information__delete" onclick="delete_()">Xóa</div>
            </div>
        </form>
    `
}
loadpage()

async function delete_() {
    const url = window.location.href
    var string = url.split('/')[4]
    const res = await fetch(`/view/delete/${string.substring(10)}`)
    if (res.redirected) {
        window.location.href = res.url
    }
}

async function repair() {
    const url = window.location.href
    var string = url.split('/')[4]
    const res = await fetch(`/view/getdata/${string.substring(10)}`)
    var data = await res.json()
    data = data[0]
    

    var select = ``
    Object.keys(list_doc).forEach(function(key) {
        var value = list_doc[key]
        if (key == data.typedoc) {
            select += `<option value="${key}" selected="selected" >${value[1]}</option>`
        }
        else {
            select += `<option value="${key}">${value[1]}</option>`
        }
    })
    // console.log(select)

    var form = document.querySelector('#form')
    form.innerHTML= `
    <div class="flex">
        <div class="container-information__items container-information__items__name">
            <label for="name">Tên văn bản</label>
            <input type="text" class="container-information__items--data container-information__items__name--data" value="${data.namedoc}" id="name" required>
        </div>
        
        <div class="container-information__items container-information__number">
            <label for="number">Số văn bản</label>
            <input type="number" class="container-information__items--data container-information__items__number--data" value="${data.number}" id="number" required>
        </div>

        <div class="container-information__items container-information__date">
            <label for="date">Ngày ban hành văn bản</label>
            <input type="date" class="container-information__items--data container-information__items__date--data" value="${data.datedoc.substring(0, 10)}" id="date" required>
        </div>

        <div class="container-information__items container-information__select">
            <label for="select">Thể loại văn bản</label>
            <select name="type" class="container-information__items--data container-information__items__select--data" id="type" required>
                <option value="none">Chọn danh mục</option>
                ${select}
            </select>
        </div>

        <div class="container-information__items container-information__term">
            <label for="term">Nhiệm kỳ</label>
            <input type="text" class="container-information__items--data container-information__items__term--data" value="${data.termdoc}" id="term" required>
        </div>

        <div class="container-information__items container-information__file">
            <label for="input">Thay đổi file</label>
            <input type="file" class="container-information__items--data container-information__items__file--data" id="input" name="myfile" required>
        </div>

    </div>

    <div class="container-information__note">
        <label for="note">Ghi chú</label>
        <input type="text" class="container-information__items__note--data" value="${data.note}" id="note">
    </div>

    <button type="submit" class="container-information__submit">Cập nhật</button>
    `
    var input = document.querySelector('#input')
    var namedoc = document.querySelector('#name')
    var number = document.querySelector('#number')
    var date = document.querySelector('#date')
    var type = document.querySelector('#type')
    var term = document.querySelector('#term')
    var note = document.querySelector('#note')
    // var documentat = document.querySelector('#documentat')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        var formData = new FormData();
        formData.append('id',url.substr(-1))
        formData.append('input', input.files[0])
        formData.append('name', namedoc.value)
        formData.append('number', number.value)
        formData.append('date', date.value)
        formData.append('type', type.value)
        formData.append('term', term.value)
        formData.append('note', note.value)
        // formData.append('documentat', documentat.files[0])
        const res = await fetch('/view/u', {
        method: 'POST',
        body: formData,
        })
        if (res.redirected) {
            window.location.href = res.url
        }
    })
}

