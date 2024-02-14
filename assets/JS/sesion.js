function checkSesion (){
    let admin = localStorage.getItem("user");
    if(!admin){
        location.href = "../../index.html";
        localStorage.clear();
    }
}


function cerrarSession(){

    localStorage.clear();

    setTimeout(()=>{
        //location.href = "../../index.html";
        location.href = "../../index.html";
    },1500);
}

checkSesion();