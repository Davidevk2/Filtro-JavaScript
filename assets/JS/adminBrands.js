const btnAgregar = document.getElementById("btnAgregarMarca");
const btnEditar = document.getElementById("btnEditarMarca");
const btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", flitraTabla);


btnAgregar.addEventListener("click", agregarMarca);
btnEditar.addEventListener("click", EditarMarca);

window.addEventListener("DOMContentLoaded", cargarMarcas);

/* estructura de la marca  */
let dataMarca = {
    name: "",
    local: "",
    floor: "",
    schedule: "",
    logo: "",
    website:"",
    description: ""
}

/* crear marca */
async function agregarMarca(){

    let inputLogo = document.brandForm.logo.value;
    let inputNombre = document.brandForm.nombre.value;
    let inputLocal = document.brandForm.local.value;
    let inputPiso = document.brandForm.piso.value;
    let inputHorarios = document.brandForm.horarios.value;
    let inputSitio = document.brandForm.sitio.value;

    console.log(inputLocal, inputLogo);

    if(inputLogo != ""  && inputNombre != "" && inputPiso != "" && inputHorarios != "" && inputSitio != ""){
        dataMarca.name = inputNombre;
        dataMarca.local = inputLocal;
        dataMarca.floor = inputPiso;
        dataMarca.schedule = inputHorarios;
        dataMarca.logo = inputLogo;
        dataMarca.website = inputSitio;
        
        if(buscarNombre(inputNombre)){

            let request =  await fetch("http://localhost:3000/brands",{method: "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dataMarca)});
            
                let response = await request.json();
    
                console.log(request);
    
                if(request.status == 200  || request.status == 201 || request.ok == true){
                    showMessage("La marca se ha creado con exito!", "green");
                    limpiarCampos();
                    recargarPagina();
                    
                }else{
                    showMessage("Error al tratar de crear la marca!", "red");
                }

        }else{
            showMessage("el nombre ya se encuentra regsiatrado!", "red");
        }


    }else{
        showMessage("Los campos requeridos están vacios!", "red");
        
    }

}

/* hacer peticion de las marcas  */
async function cargarMarcas(){

    let request =  await fetch("http://localhost:3000/brands/");    
    let response = await request.json();

    listarMarcas(response);
}


/* listar las marcas */
const tbdoyMarcas = document.getElementById("tbodyMarcas");
function listarMarcas(marcas){

    marcas.forEach((marca, idx) => {

        let row = document.createElement("tr");
        row.innerHTML = `
        <tr>
            <td>${1+idx++}</td>                                
            <td>${marca.id}</td>
            <td><img width="100px" src="./../../assets/images/${marca.logo}" alt="${marca.logo}"></td>
            <td>${marca.name}</td>
            <td>${marca.local}</td>
            <td>${marca.floor}</td>
            <td>
            ${marca.schedule}
            </td>
            <td>
                <a href="${marca.website}" target="_blank">Sitio web</a>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="cargarMarcaPorId('${marca.id}')">Detalles</button>
                <button class="btn btn-sm btn-warning" onclick="cargarMarcaPorId('${marca.id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarMarca('${marca.id}')">Eliminar</button>
            </td>
    </tr>`;

        tbdoyMarcas.appendChild(row);
        
    });

}  

/* llenar la indo de la marca  */
async function cargarMarcaPorId(id){
    abrirModal();

    let request =  await fetch("http://localhost:3000/brands/"+id);    
    let response = await request.json();

    console.log(response);
    document.editBForm.idmarca.value = response.id;
    document.editBForm.logo.value = response.logo;
    document.editBForm.nombre.value = response.name;
    document.editBForm.local.value = response.local;
    document.editBForm.piso.value = response.floor;
    document.editBForm.horarios.value = response.schedule;
    document.editBForm.sitio.value = response.website;

} 


/* Editar la marca */

async function EditarMarca(){
    let id = document.editBForm.idmarca.value;
    let inputLogo = document.editBForm.logo.value;
    let inputNombre = document.editBForm.nombre.value;
    let inputLocal = document.editBForm.local.value;
    let inputPiso = document.editBForm.piso.value;
    let inputHorarios = document.editBForm.horarios.value;
    let inputSitio = document.editBForm.sitio.value;


    if(inputLogo != ""  && inputNombre != "" && inputPiso != "" && inputHorarios != "" && inputSitio != ""){
        dataMarca.name = inputNombre;
        dataMarca.local = inputLocal;
        dataMarca.floor = inputPiso;
        dataMarca.schedule = inputHorarios;
        dataMarca.logo = inputLogo;
        dataMarca.website = inputSitio;
        

        let request =  await fetch("http://localhost:3000/brands/"+id,{method: "PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dataMarca)});
        
            let response = await request.json();

            console.log(request);

            if(request.status == 200  || request.status == 201 || request.ok == true){
                showMessage("La marca se ha editado con exito!", "green");
                limpiarCampos();
                recargarPagina();
                
            }else{
                showMessage("Error al tratar de editar la marca!", "red");
            }

    }else{
        showMessage("Los campos requeridos están vacios!", "red");
        
    }



}

/* Funcion para eliminar la marca */
async function eliminarMarca(idMarca){
    if(confirm("Seguro que quires la marca: "+ idMarca +"?")){
        
        let request =  await fetch("http://localhost:3000/brands/"+idMarca, {method: 'DELETE'});
        let response = await request.json();

        if(request.status == 200  || request.status == 201 || request.ok == true){
            alert("La marca se ha eliminado con exito!");
            location.href = "";
        }else{
            alert("Hubo un error al eliminar la marca, intenta más tarde!");
        }
    }


}

async function flitraTabla(){
    let inputId = document.getElementById("inputId");
    let inputNombre = document.getElementById("inputNombre");
    let inputPiso = document.getElementById("inputPiso");
    let inputLocal = document.getElementById("inputlocal");

    let request =  await fetch("http://localhost:3000/brands/");
    let response = await request.json();

    let resultado = response.filter(marca =>{
        return  marca.id.includes(inputId.value) || marca.name.includes(inputNombre.value) || marca.floor.includes(inputPiso.value) || marca.local.includes(inputLocal.value);
    })

    console.log(resultado);

    tbdoyMarcas .innerHTML = "";
    listarMarcas(resultado);

}

function buscarNombre(nombre){
    let request =  fetch("http://localhost:3000/brands")
    .then( r =>{ return r.json()})
    .then(data =>{
        resultado = data.filter(brand =>{
            return brand.name === nombre;
        })
        
        console.log(resultado);
        if(resultado.length >= 1 ){
            return false;
        }else{
            return true;
        }
    })
} 

/* Modal */
const modalAdmin = document.getElementById("modalA");

function abrirModal(){
    modalAdmin.style.display = "block";
}

function cerrarModal(){
    modalAdmin.style.display = "none";
}

