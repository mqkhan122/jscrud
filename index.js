// get data

async function fet(){
    let res = await fetch("http://localhost:3000/employe")
    let r = await res.json()
    let sh = document.querySelector('#showdata')

    let ans = r.map((e)=>`
    
    <tr>
        <td>${e.id}</td>
        <td>${e.emp_name}</td>
        <td>${e.emp_age}</td>
        <td> <button onclick="mydelete(${e.id})"> Delete data </button></td>
        <td> <button onclick="myupdate(${e.id})"> Edit data </button></td>
    </tr>

    `).join(" ")

    sh.innerHTML=ans
}
fet()

//delete data

function mydelete(id){
    fetch(`http://localhost:3000/employe/${id}`,{
        method:'DELETE'
    })
    .then(res=>alert("delete successfully"))
}

// insert data

function addData(){
    let myfrmdata = {
        id:document.getElementById('id').value,
        emp_name:document.getElementById('name').value,
        emp_age:document.getElementById('age').value
    }

    fetch("http://localhost:3000/employe",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(myfrmdata)
    })

    .then(res=>alert("inserted"))
    .catch(er=>alert("error"))
}

// edit data
var strid = 0
async function myupdate(id){
    strid=id
   
    let res = await fetch(`http://localhost:3000/employe/${id}`)
    let r = await res.json()
    let p =`
     <input type="text" value="${r.id}" id="id1" readonly>
     <input type="text" value="${r.emp_name}" id="name1">
     <input type="text" value="${r.emp_age}" id="age1">
     <input type="submit" onclick="finalupdate()" value="update">
    `

    document.getElementById('demo').innerHTML=p

}

function finalupdate(){
    let y = {
        id:document.getElementById('id1').value,
        emp_name:document.getElementById('name1').value,
        emp_age:document.getElementById('age1').value
    }

    fetch(`http://localhost:3000/employe/${strid}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(y)
    })
    .then(res=>alert("Updated"))
    .catch(ress=>alert("error"))
}