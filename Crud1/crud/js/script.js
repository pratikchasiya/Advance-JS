let array = []
let count = 1

document.getElementById('profileimage').style.display = 'none';
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const changeFunction = async (e) => {
    let file = document.querySelector('input[name = profile]');
    document.getElementById('profileimage').src = file.files[0] ? await toBase64(file.files[0]) : '';
    document.getElementById('profileimage').style.display = 'block'
}

const saveUser = async () => {
    let obj = {}
    let input_group = document.querySelectorAll('.input_group');
    input_group.forEach((x) => {
        obj[x.name] = x.value
    })
    let gender = document.querySelector('input[name = gender]:checked')
    obj.gender = gender.value

    let file = document.querySelector('input[name = profile]')
    obj.profile = file.files[0] ? await toBase64(file.files[0]) : '';

    let checkbox = document.querySelectorAll('input[name = hobby]:checked')
    let hbyArray = [];
    checkbox.forEach((x) => {
        hbyArray.push(x.value)
    })
    obj.hobby = hbyArray;


    if (obj.id == '0') {
        obj.id = count++
        array.push(obj)
    } else {
        let index = array.findIndex(x => x.id == obj.id)
        array.splice(index, 1, obj)
        document.querySelector('input[name = id]').value = 0
    }

    printData();
    document.getElementById('form').reset();
    document.getElementById('profileimage').style.display = 'none'
}

const deleteUser = (id) => {
    array = array.filter(x => x.id != id)
    printData()
}


const editUser = async (editObj) => {
    document.querySelector('form').reset();
    for (let x in editObj) {
        if (x == 'hobby') {
            editObj[x].forEach((y) => {
                document.querySelector(`input[value=${y}]`).checked = true
            })
        }
        else if (x == 'gender') {
            document.querySelector(`input[value=${editObj[x]}]`).checked = true
        }
        else if (x == 'profile') {
            
        }
        else {
            document.querySelector(`input[name=${x}]`).value = editObj[x];
        }
    }
}
















const printData = () => {
    let str = '';
    array.forEach((x, i) => {
        return str +=
            `<tr>
            <td>${x.id}</td>
            <td><img src='${x.profile}' width='50px'/></td>
            <td>${x.name}</td>
            <td>${x.email}</td>
            <td>${x.phone}</td>
            <td>${x.gender}</td>
            <td>${x.hobby}</td>
            <td>${x.date}</td>
            <td>
                <button class='btn btn-success' onclick='editUser(${JSON.stringify(x)})'>Edit</button>
                <button class='btn btn-danger' onclick=deleteUser(${x.id})>Delete</button>
            </td?

        </tr>`
    })
    document.getElementById('tbody').innerHTML = str
}
printData()


