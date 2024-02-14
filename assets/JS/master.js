window.addEventListener("DOMContentLoaded", cargarData);


const spanTotalAdmins = document.getElementById("countAdmins");
const spanTotalBrands= document.getElementById("countBrands");
const spanTotalPQR = document.getElementById("countPQR");

async function cargarData(){
    let requestAdmins =  await fetch("http://localhost:3000/admins");
    let responseAdmins = await requestAdmins.json();

    let totalAdmins = responseAdmins.length;
    spanTotalAdmins.textContent =  totalAdmins < 10 ? "0"+totalAdmins : totalAdmins;
    
    let requestBrands =  await fetch("http://localhost:3000/brands");
    let responseBrands = await requestBrands.json();

    let totalBrands = responseBrands.length;
    spanTotalBrands.textContent = totalBrands < 10 ? "0"+ totalBrands: totalBrands;
    
    let requestPQR =  await fetch("http://localhost:3000/pqrs");
    let responsePQR = await requestPQR.json();
    
    let totalPQR = responsePQR.length;
    spanTotalPQR.textContent = totalPQR < 10 ? "0"+ totalPQR : totalPQR ;

    

}