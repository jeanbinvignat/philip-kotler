//alert("Hola Baaart!!");
/*
Siis
*/

window.addEventListener('DOMContentLoaded', (e) => {
    //con el evento DOMContentLoaded mea aseguro que todas las etiquetas HTML
    //fueron cargadas y procesadas por el browser
    //mas info en https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

    console.log("evento DOMContentLoaded");

    //Sintaxis de variables:
    //let nombreVariable = valor;
    //mas ejemplos 
    //let nombre = "Santiago";
    //let edad = 34;
    //recuperar los valores del formulario
    let boton = document.getElementById("btn-suscribir")
    boton.addEventListener("click", (ev) => {
        try {
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("correo").value;
        let genero = getGenero();
        let intereses = getIntereses();
        let suscriptor = {
            nombre_completo: nombre,
            email,
            genero,
            intereses,
            fecha_registro: (new Date()).toISOString()
        };
        //console.log("El nombre del suscriptor es: " + nombre);    
        console.dir(suscriptor);
        guardarSuscriptor( suscriptor );
;
        } catch(e) {
            mostrarError(e.message)
        }
    });

});
async function guardarSuscriptor( suscriptor ) {
    const url = "https://fir-tutorial-b18db-default-rtdb.firebaseio.com/suscriptores.json";
    //fetch(url, {
    //    method: "POST",
    //    body: JSON.stringify(suscriptor)
    //})
    //    .then( respuesta => respuesta.json() )
    //    .then( data => mostrarExito("Se guardo correctamente su sucripción") )
    const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(suscriptor)
    });
    const data = await respuesta.json();
    mostrarExito("Se guardo correctamente su sucripción") 
}

function getIntereses() {
    let inputIntereses = document.querySelectorAll("input[name='intereses']:checked")
    let arrIntereses   = [];

    //inputIntereses.forEach( nodoInteres => arrIntereses.push(nodoInteres.value) );
    for(let i = 0; i < inputIntereses.length; i++ ) {
        const interes = inputIntereses[i].value;
        arrIntereses.push(interes);
    }

    if( inputIntereses.length < 1 ) {
        mostrarError("Debe seleccionar al menos 1 tema de su interés!!!");
        return false;
    }
    return arrIntereses;
    
}
function getGenero() {
    let inputSeleccionado= document.querySelector("input[name='genero']:checked")
    if ( inputSeleccionado == null ) {
        //mostrarError("Debe seleccionar un género!!");
        throw new Error("Debe seleccionar un género!!!");
        //return false
    }
    const genero = inputSeleccionado.value;
    return genero;
}

const errores = [] // array vacío 
const nombre = getNombreDesdeForm();
const edad = getEdadDesdeForm();
if( !nombreEsValido(nombre)) {
    errores[0] = "El nombre no es válido";
}
if( edad < 18) {
    errores[1] = "Debe ser mayor de edad";
}

if( errores.length > 0) {
    mostrarErrores(errores);
} else {
    guardarDatos(); 
}

function mostrarExito(mensaje) {
    document.getElementById("form-mensaje-exitoso").style.display = "block";
    const ul = document.querySelector("#form-mensaje-exitoso ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensaje);
    li.appendChild(liText);
    ul.appendChild(li);
}
function mostrarError(mensajeDeError) {
    //console.error(mensajeDeError);
    document.getElementById("form-mensaje-error").style.display = "block";
    const ul = document.querySelector("#form-mensaje-error ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensajeDeError);
    li.appendChild(liText);
    ul.appendChild(li);
}

console.log("Hola Baaart!!");

