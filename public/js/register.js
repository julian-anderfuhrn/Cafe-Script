
//DOM
const contenedor_register = document.querySelector("#contenedor_register");
contenedor_register.classList.add("animate__animated", "animate__backInLeft");
const inputUser = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#email");
const inputTel = document.querySelector("#tel");
const inputPass = document.querySelector("#pass");
const inputConfirmPass = document.querySelector("#confirmPass");
const formulario = document.querySelector("#form2");
const validador = document.querySelector("#validador");
console.log("Conected");
//Objeto
const objUser = {
    nombre: "",
    apellido: "",
    email: "",
    tel: "",
    pass: "",
    confirmPass: ""

};
//Eventos
const eventListeners = () => {
    inputUser.addEventListener("change", validar);
    inputApellido.addEventListener("change", validar);
    inputEmail.addEventListener("change", validar);
    inputTel.addEventListener("change", validar);
    inputPass.addEventListener("change", validar);
    inputConfirmPass.addEventListener("change", validar);
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
    const { nombre, apellido, email, tel, pass, confirmPass } = objUser;

    if (validarVacios(nombre, apellido, tel, pass, confirmPass)) {
        ui.validarInput("Todos los mensajes son obligatorios", "error");
        console.log(`Usuario : ${nombre} y Password:${contra}`);
        return;
    }
    else if (validarPass(pass, confirmPass)) {
        ui.validarInput("Las contraseñas deben coincidir", "error");
        console.log(`Usuario : ${nombre} , Password:${pass} y ConfirmPassword : ${confirmPass}`);
        return;
    } else if (!validarEmail(email)) {
        ui.validarInput("Mail incorrecto", "error");
        console.log(`Usuario : ${nombre} y Password:${pass}`);
        return;
    }
    else {
        console.log(`Usuario : ${nombre} y Password:${pass}`);
        ui.validarInput("Datos correctos");
    }
}
const validarEmail = (email) => {
    const regex = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const resultado = regex.test(email);
    return resultado;
}
const validarPass = (password, confirmedPass) => {
    return password !== confirmedPass ? ui.validarInput("Las contraseñas deben coincidir", "error") : console.log("Coinciden")
};
const validarVacios = (nombre, ape, mail, telefono, contra, confirmedContra) => {

    if (nombre === "" || ape === "" || mail === "" || telefono === "" || contra === "" || confirmedContra === "") {
        ui.validarInput("Todos los mensajes son obligatorios", "error");
        console.log(`Usuario : ${nombre} y Password:${contra}`);
        return;
    }

};
eventListeners();