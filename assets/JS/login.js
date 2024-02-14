

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", login);

async function login(){
    
    let inputCorreo = document.loginForm.correo.value;
    let inputPass = document.loginForm.password.value;
    
    if(inputCorreo.value !=  "" && inputPass != ""){
        let request = await fetch("http://localhost:3000/admins")
        let response = await request.json();
        
        let userLogged = response.filter(item =>{
            return  inputCorreo == item.email  &&  inputPass == item.password;
        })
        
        console.log(response);

        console.log(userLogged.length);
        if(userLogged.length >= 1){
            console.log(response);
            console.log("Esto funciona");
            
            let nombreAdmin = userLogged[0].name;
            let idAdmin = userLogged[0].id;

            localStorage.setItem("user", nombreAdmin);
            localStorage.setItem("id", idAdmin);
            showMessage("Autenticacion exitosa !", "green");
            limpiarCampos();

            setTimeout(()=>{
                location.href = "admin/admins/index.html";
                
            },2000);

            
        }else{
            console.log("Correo o contraseña incorrectos!");
            showMessage("Correo o contraseña incorrectos!", "red");
        }

    }else{
        showMessage("los campos requeridos están vacios !", "red");
        console.log("los campos estan vacios ");
    }

}




