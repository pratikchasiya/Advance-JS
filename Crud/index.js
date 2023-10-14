let array = JSON.parse(localStorage.getItem('array')) || [] /* jo localstorage ma data null hoy to or niconditon fullfill tahse ane array ni value blank set thase[] */
let count = JSON.parse(localStorage.getItem('count')) || 0
let editId = 0
let a;
document.getElementById('outImage').style.display = 'none'
const setProfile = async (e) => {
    a = await image1(e.files[0])
    document.getElementById('outImage').src = a
    document.getElementById('outImage').style.display = 'block'
}
const submitFunction = () => {
    let obj = {}
    document.querySelectorAll('.input')?.forEach((element) => {
        obj[element.name] = element.value
    })
    obj.gender = document.querySelector('input[type="radio"]:checked')?.value
    let language = []
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((element) => {
        language.push(element.value)
    })
    obj.language = language
    obj.profile = a
    if (editId == 0) {
        count++
        localStorage.setItem('count', JSON.stringify(count))
        obj.id = count
        array.push(obj)
    }
    else {
        obj.id = editId
        objFind = array.findIndex(element => element.id == editId)
        array.splice(objFind, 1, obj)
        editId = 0
    }
    localStorage.setItem('array', JSON.stringify(array))
    document.getElementById('form').reset()
    maketable()
    document.getElementById('outImage').style.display = 'none'
}
maketable = () => {
    let html = ''
    array.forEach(element => {
        let str = ` <tr>
        <td>${element.id}</td>
        <td><img src=${element.profile} width='50' height='50' class='text-center'/></td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td>${element.pincode}</td>
        <td>${element.gender}</td>
        <td>${element.language}</td>
        <td>
            <button onclick="edit(${element.id})">edit</button>
            <button onclick="del(${element.id})">delet</button>
        </td>
    </tr>`
        html += str
    })
    document.getElementById('tbody').innerHTML = html
}
/* this function is use for read file any type image,video.audio and then convert 
In string format if any error occur then return null else send that string data where this image1 function call and store in object when we want image back that time this dtringify data set in img tag src attribute */
const image1 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject
})

const del = (id) => {
    array.splice(array.findIndex(element => element.id === id), 1)
    localStorage.setItem('array', JSON.stringify(array))
    maketable()
}
const edit = (id) => {
    editId = id
    editObj = array.find(element => element.id === id)
    for (let x in editObj) {
        if (x === 'id') {

        }
        else if (x === 'profile') {
            document.getElementById('outImage').src = editObj[x]
            document.getElementById('outImage').style.display = "block"
        }
        else if (x === 'language') {
            editObj.language.forEach(element => {
                document.querySelector(`input[value=${element}]`).checked = true
            })
        }
        else if (x === 'gender') {
            ((document.querySelector(`input[value=${editObj[x]}]`))).checked = true
        }
        else {
            document.querySelector(`input[name=${x}]`).value = editObj[x]
        }
    }
}
maketable()
