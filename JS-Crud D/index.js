let array = JSON.parse(localStorage.getItem('crud')) || [];
let count = JSON.parse(localStorage.getItem('count')) || 1;
// let array =  [];
// let count =  1;

const DateFormat=(date)=>{
      console.log(new Date(date))
      return (new Date(date).getDate()) + '/' + (new Date(date).getMonth()+1) + '/' + (new Date(date).getFullYear())
}
document.getElementById('profileImage').style.display = 'none';
const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
});

const changeFunction = async (e) => {
      let file = document.querySelector('input[name=profile]');
      document.getElementById('profileImage').src = file.files[0] ?  await toBase64(file.files[0]) : '';
      document.getElementById('profileImage').style.display = 'block';
      
}

const SaveUser = async () => {
      let obj = {}
      let input_group = document.querySelectorAll('.input_group');
      input_group.forEach((x) => {
            obj[x.name] = x.value;
      })

      let file = document.querySelector('input[name=profile]');
      obj.profile = file.files[0] ? await toBase64(file.files[0]) : '';

      let gender = document.querySelector('input[name=gender]:checked');
      obj.gender = gender?.value;
      
      let checkboxes = document.querySelectorAll('input[name=hobby]:checked');
      let hbyArray = [];
      checkboxes.forEach((x) => {
            hbyArray.push(x.value)
      })
      obj.hobby = hbyArray;
      
      if(obj.id == '0'){
            obj.id = count++;
            array.push(obj);
      }else{ 
            let index = array.findIndex(x => x.id == obj.id);
            array.splice(index , 1 , obj);
            document.querySelector('input[name=id]').value = '0';
      }
      PrintData();
      document.querySelector('form').reset();
      document.getElementById('profileImage').style.display = 'none';
      localStorage.setItem('crud',JSON.stringify(array))
      localStorage.setItem('count',JSON.stringify(count))
      console.log(array)
}

const deleteUser = (id) => {
      confirm("Are You Sure You Want Delete This Row?");
      array = array.filter(x => x.id != id)
      PrintData();
      localStorage.setItem('crud',JSON.stringify(array))
}

const editUser = async (editObj) => {
      document.querySelector('form').reset();
      for(let x in editObj){
            if(x == 'hobby'){
                  editObj[x].forEach((y) => {
                        document.querySelector(`input[value=${y}]`).checked =  true;
                  })
            }
            else if(x == 'gender'){
                  document.querySelector(`input[value=${editObj[x]}]`).checked = true;
            }
            else if(x == 'profile'){
                  
            }
            else{
                  document.querySelector(`input[name=${x}]`).value = editObj[x];
            }
      }
}

const PrintData = () => {
      let str = '';
      array?.forEach((x, i) => {
            return str += `<tr>
            <td>${x.id}</td>
            <td><img src='${x.profile}' width='50px' /></td>
            <td>${x.name}</td>
            <td>${x.email}</td>
            <td>${x.mobile}</td>
            <td>${x.gender}</td>
            <td>${x.hobby}</td>
            <td>${DateFormat(x.date)}</td>
            <td>
            <button class='btn btn-warning py-1' onclick='editUser(${JSON.stringify(x)})'>EDIT</button>
            <button class='btn btn-danger py-1' onclick='deleteUser(${x.id})'>DELETE</button>
            </td>
            </tr>`
      })
      document.getElementById('tbody').innerHTML = str;
}

PrintData();