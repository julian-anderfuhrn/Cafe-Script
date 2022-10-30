//DOM
const contenedor_olvidar = document.querySelector("#contenido");
contenedor_olvidar.classList.add("animate__animated", "animate__backInLeft");
const inputEmail = document.querySelector("#email1");
const formulario = document.querySelector("#form3");
const validador = document.querySelector("#validador");
console.log("Conected");
//Objeto
const objUser = {
    email1: ""
};
//Eventos
const eventListeners = () => {
    inputEmail.addEventListener("change", validar);
    formulario.addEventListener("submit", validacionFormulario);
}
//Clase
class UI {
    validarInput(mensaje, tipo) {
        const divMensaje = document.createElement('p');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'm-3');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        validador.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

}
//Instancia
const ui = new UI();
//Funciones
const validar = (e) => {
    console.log(e.target.value)   // Obtener el Input
    console.log(objUser[e.target.id] = e.target.value);
}
const validacionFormulario = (e) => {
    e.preventDefault();
    console.log(objUser);
    const { email1 } = objUser;
    if (!validarEmail(email1)) {
        ui.validarInput("Mail incorrecto", "error");
        console.log(`Email : ${email1} `);
        return;
    }
    else if (email1 === "") {
        ui.validarInput("Mail obligatorio", "error");
        console.log(`Email : ${email1}`);
        return;

    }
    else {
        console.log(`Email : ${email1} correcto`);
        ui.validarInput("Datos correctos");
    }
}
function validarEmail(email) {
    const regex = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const resultado = regex.test(email);
    return resultado;
}

eventListeners();