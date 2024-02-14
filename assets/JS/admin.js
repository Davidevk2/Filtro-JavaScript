
const btnRegisterAdmin = document.getElementById("btnRegisterAdmin");
const btneditarAdmin = document.getElementById("btnEditarAdmin");
const btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", flitraTabla)

/* listar los admin cuando carga la pagina */
window.addEventListener("DOMContentLoaded", listarAdmins)

btnRegisterAdmin.addEventListener("click", agregarAdmin);


/* Estruturta del objeto admin */
let dataAdmin = {
    names: "",
    email: "",
    password: "password"
}


async function agregarAdmin(){

    let  inputNombre = document.adminForm.nombre.value;
    let  inputCorreo = document.adminForm.correo.value;

    if(inputNombre !=  "" && inputCorreo != ""){

        dataAdmin.names = inputNombre;
        dataAdmin.email = inputCorreo;

        if(buscarCorreo(inputCorreo)){
        
            let request =  await fetch("http://localhost:3000/admins",{method: "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dataAdmin)});
        
            let response = await request.json();
    
            console.log(request);
    
            if(request.status == 200  || request.status == 201 || request.ok == true){
                showMessage("El admin se ha creado con exito!", "green");
                limpiarCampos();
            }else{
                showMessage("Error al tratar de crear el admin!", "red");
            }

        }else{
            showMessage("El correo ya se encuentra registrado!", "red");
        }

        
    }else{
    
        showMessage("Los campos requeridos están vacios!", "red");
    }

}


async function listarAdmins(){

    let request =  await fetch("http://localhost:3000/admins");
    let response = await request.json();

    llenarTablaAdmin(response);
}

const tbodyAdmin = document.getElementById("tbodyAdmin");
function llenarTablaAdmin(data){

    data.forEach((admin,idx) => {

        let row = document.createElement("tr");
        row.innerHTML = ` 
        <tr>
            <td>${1+idx++}</td>
            <td>${admin.id}</td>
            <td>${admin.names}</td>
            <td>${admin.email}</td>
            <td>
                <button class="btn btn-sm btn-info" type="button"  onclick="cargarInfoAdmin('${admin.id}')">Detalles</button>
                <button class="btn btn-sm btn-warning" type="button"  onclick="cargarInfoAdmin('${admin.id}')">Editar</button>
                <button class="btn btn-sm btn-danger" type="button"  onclick="eliminarAdmin('${admin.id}')">Eliminar</button>
            </td>
        </tr>`;
        tbodyAdmin.appendChild(row);
    });
}


/* Funcion para cargar la infor al editar */
async function cargarInfoAdmin(idAdmin){

    abrirModal();
    const contentEdit = document.getElementById("content-normal");
    const contentDetail = document.getElementById("content-detail");

    let request =  await fetch("http://localhost:3000/admins/"+idAdmin);
    let response = await request.json();

    contentEdit.style.display = "block";
    contentDetail.style.display = "none";

    document.editForm.id.value = response.id;
    document.editForm.nombre.value = response.names;
    document.editForm.correo.value = response.email;

}

/* funcion de editar el admin */

btneditarAdmin.addEventListener("click", editarAdmin);
async function editarAdmin(){

    let  id = document.editForm.id.value;
    let  inputNombre = document.editForm.nombre.value;
    let  inputCorreo = document.editForm.correo.value;

    if(inputNombre !=  "" && inputCorreo != ""){

        dataAdmin.names = inputNombre;
        dataAdmin.email = inputCorreo;

        if(buscarCorreo(inputCorreo)){
        
            let request =  await fetch(`http://localhost:3000/admins/${id}`,{method: "PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dataAdmin)});
        
            let response = await request.json();
    
            console.log(request);
    
            if(request.status == 200  || request.status == 201 || request.ok == true){
                showMessage("El admin se ha actulizado con exito!", "green");
                limpiarCampos();
                cerrarModal();
                recargarPagina();
            }else{
                showMessage("Error al tratar de editar el admin!", "red");
            }

        }else{
            showMessage("El correo ya se encuentra registrado!")
        }

        
    }else{
    
        showMessage("Los campos requeridos están vacios!", "red");
    }

}

/* Funcion para filtrar la tabla de admin */
async function flitraTabla(){
    let inputId = document.getElementById("inputId");
    let inputNombre = document.getElementById("inputNombre");
    let inputCorreo = document.getElementById("inputCorreo");

    let request =  await fetch("http://localhost:3000/admins");
    let response = await request.json();

    let resultado = response.filter(admin =>{
         console.log(admin);
            return  admin.id.includes(inputId.value) || admin.names.includes(inputNombre.value) || admin.email.includes(inputCorreo.value);
    })

    console.log(resultado);

    tbodyAdmin.innerHTML = "";
    llenarTablaAdmin(resultado);


}

/* funcion para buscar si el correo existe!*/
function buscarCorreo(correo){
    let request =  fetch("http://localhost:3000/admins")
    .then( r =>{ return r.json()})
    .then(data =>{
        resultado = data.filter(admin =>{
            return admin.email === correo;
        })
        
        console.log(resultado);
        if(resultado.length >= 1 ){
            return false;
        }else{
            return true;
        }
    })
}   


/* elimiar un admin */
async function eliminarAdmin(idAdmin){

    if(confirm("Seguro que quires eliminar el admin: "+ idAdmin +"?")){
        
        let request =  await fetch("http://localhost:3000/admins/"+idAdmin, {method: 'DELETE'});
        let response = await request.json();

        if(request.status == 200  || request.status == 201 || request.ok == true){
            alert("El admin se ha eliminado con exito!");
            location.href = "";
        }else{
            alert("Hubo un error al eliminar el admin, intenta más tarde!");
        }
    }
}




/* Modal */
const modalAdmin = document.getElementById("modalA");

function abrirModal(){
    modalAdmin.style.display = "block";
}

function cerrarModal(){
    modalAdmin.style.display = "none";
}





