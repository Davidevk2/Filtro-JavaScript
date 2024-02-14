function showMessage(message, color){
    let inputs = document.querySelectorAll(".form-control");
    let spanMessages = document.getElementById("spanMessages");

    inputs.forEach((input) => {
        if (input.value == "") {
            input.classList.add("is-invalid");
            input.style.border = "1px solid red";
        }
    });

    spanMessages.style.color = color;
    spanMessages.innerText = message;

    setTimeout(() => {
        
        spanMessages.innerText = "";

        inputs.forEach((input) => {
            input.classList.remove("is-invalid");
            input.style.border = "1px solid #6A6A6D";
        });

    }, 4000);

  
}

function recargarPagina(){
    location.href = "";
}

function limpiarCampos(){
    let form = document.getElementsByTagName("form");
    console.log(form);
    form[0].reset();
}