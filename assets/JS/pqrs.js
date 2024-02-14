console.log("Funciona!");

const btnSend = document.getElementById("btnSend");

btnSend.addEventListener("click", enviarPQR)

async function enviarPQR(){

    let inputTipo  = document.pqrsForm.tipo.value;
    let inputCorreo  = document.pqrsForm.correo.value;
    let inputMensaje  = document.pqrsForm.mensaje.value;

    if(inputTipo != "" && inputCorreo != "" && inputMensaje != ""){


        let dataPQR ={
            type: inputTipo,
            email: inputCorreo,
            message: inputMensaje
        }

        let request = await fetch("http://localhost:3000/pqrs", {method: "POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(dataPQR)});

        let response = await request.json();
        

        if(request.status == 200  || request.status == 201 || request.ok == true){
            showMessage("La pqrs se ha enviado con exito!!", "green");
            limpiarCampos();
        }else{
            showMessage("Error al enviar la PQRS, intenta más tarde!", "red");
        }

    }else{
        showMessage("Los campos requeridos están vacios!", "red");
    }

}