console.log("funciona!");

window.addEventListener("DOMContentLoaded", cargarMarcas);


const inputSearch = document.getElementById("inputSearch");

inputSearch.addEventListener("keyup", async function filtrarMarcas(event){
    let busqueda = "";
    busqueda += event.key; 

    console.log(busqueda);
    let request =  await fetch("http://localhost:3000/brands/");    
    let response = await request.json();

     let resultado = response.filter(marca =>{
        return  marca.name.includes(busqueda)  || marca.description.includes(busqueda);
    });
    const divMarcas = document.getElementById("brands-container");
    divMarcas.innerHTML ="";
    listarMarcas(resultado);

});

async function cargarMarcas(){

    let request =  await fetch("http://localhost:3000/brands/");    
    let response = await request.json();

    listarMarcas(response);
}




function listarMarcas(marcas){
    const divMarcas = document.getElementById("brands-container");
    let row = document.createElement("div");
    row.classList.add("row");
    divMarcas.appendChild(row);

    marcas.forEach((marca, idx) => {

        let card = document.createElement("div");
        card.classList.add("col-md-6", "col-lg-3", "d-flex" ,"align-items-stretch" ,"mb-5", "mb-lg-0")
        card.innerHTML = `
        <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
          <img src="./assets/images/${marca.logo}" class="img-fluid" alt="">
          <h4 class="title"><a href="">${marca.name}</a></h4>
          <p class="description">${marca.description}Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
          <br>
          <button class="btn btn-primary w-100 btn-sm">Detalles</button>
        </div>
       `;

        row.appendChild(card);
        
    });

}   


