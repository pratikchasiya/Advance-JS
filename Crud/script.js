let array = [];
let count = 0;
editId = 0;

const saveUser = () => {
  let data = {};
  let input = document.querySelectorAll(".input_group");
  input.forEach((item,index)=>{
   data[item.name] = item.value
})
// console.log(data)

let radio = document.querySelectorAll("input[type = radio]:checked")
radio.forEach((item)=>{
   data[item.name] = item.value
})
// console.log(data)

let checkboxes = document.querySelectorAll("input[type = checkbox]:checked")
let courseArray = [];
checkboxes.forEach((item)=>{
   courseArray.push(item.value)
})
data.course = courseArray
// console.log(data.course)
// console.log(data)

let profile = document.querySelector("#profile")
data.profile = profile.files[0]? await toBase64(profile.files[0]);

if(data.id == "0"){
   // count++;
   data.id = count++;
   array.push(data)

   localStorage.setItem('count', JSON.stringify(count))
}
else{
   let index = array.findIndex(item => item.id == data.id)
   array.splice(index , 1 , data)
   document.querySelector("input[name = id]").value = "0"
}
localStorage.setItem('array', JSON.stringify(array))
grid()
console.log(array)

};

const deleteUser = (id)=>{
   let index = array.findIndex((item) =>item.id == id)
   array.splice(index , 1)
   grid()
   }

const grid =()=>{
   let htmlData = "";
   array.forEach((item,index)=>{
      htmlData += `<tr>
      <td>${item.id}</td>
      <td><img src="${item.profile}" width="40px" height = "40px" /></td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.mobile}</td>
      <td>${item.birthDate}</td>
      <td>${item.pincode}</td>
      <td>${item.gender}</td>
      <td>${item.skill}</td>
      <td>${item.course}</td>
      <td>
      <button class = "btn btn-warning onclick="editUser({item.id})">Edit</button>
      <button class = "btn btn-danger onclick="deleteUser({item.id})">Delete</button>
      </td>
      </tr>`
   })
   document.getElementById("tbody").innerHTML = htmlData
}
grid()   


