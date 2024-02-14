console.log("Funciona!");


window.addEventListener("DOMContentLoaded", cargarPQRS);


async function cargarPQRS(){
    let request =  await fetch("http://localhost:3000/pqrs/");
    let response = await request.json();

    listarPQRS(response);
}


function listarPQRS(data){
    const tbodyPQRS = document.getElementById("tbodyPQR");

    data.forEach((pqr, idx) => {

        let row = document.createElement("tr");
        row.innerHTML = `<tr>
        <td>${1+idx++}</td>                                                    
        <td>${pqr.id}</td>
        <td>${pqr.type}</td>
        <td>${pqr.email}</td>
        <td>
            L${pqr.message}
        </td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="eliminarPQRS('${pqr.id}')">Eliminar</button>
        </td>
    </tr>`;
        tbodyPQRS.appendChild(row)
    });
}

 async function eliminarPQRS(idPqr){
    if(confirm("Seguro que quires eliminar la PQR: "+ idPqr +"?")){
        
        let request =  await fetch("http://localhost:3000/pqrs/"+idPqr, {method: 'DELETE'});
        let response = await request.json();

        if(request.status == 200  || request.status == 201 || request.ok == true){
            alert("La PQR se ha eliminado con exito!");
            location.href = "";
        }else{
            alert("Hubo un error al eliminar la PQR, intenta más tarde!");
        }
    }

}