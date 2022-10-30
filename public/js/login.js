
//DOM
const inputUser = document.querySelector("#nombre");
const inputPass = document.querySelector("#password");
const formulario = document.querySelector("#form1");
const validador = document.querySelector("#validador");
console.log("Conected");
//Objeto
const objUser = {
    nombre: "",
    password: ""
};
//Eventos
const eventListeners = () => {
    inputUser.addEventListener("change", validar);
    inputPass.addEventListener("change", validar);
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
    const { nombre, password } = objUser;
    if (validarEmail(nombre)) {
        ui.validarInput("Mail incorrecto", "error");
        console.log(`Usuario : ${nombre} y Password:${password}`);
        return;
    }
    else if (nombre === "" || password === "") {
        ui.validarInput("Todos los mensajes son obligatorios", "error");
        console.log(`Usuario : ${nombre} y Password:${password}`);
        return;

    }
    else {
        console.log(`Usuario : ${nombre} y Password:${password}`);
        ui.validarInput("Datos correctos");
    }
}
function validarEmail(email) {
    const regex = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const resultado = regex.test(email);
    return resultado;
}

eventListeners();