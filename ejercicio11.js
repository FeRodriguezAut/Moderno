// ejercicio11.js
// Genera un resumen de mensajes extrayendo remitente, contenido breve y fecha.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function generarResumen
 * @description Genera un resumen de un objeto mensaje.
 * @param {Object} mensaje - Objeto con 'remitente', 'contenido' y 'fecha'.
 * @returns {string} Resumen formateado del mensaje o un mensaje de error.
 */
function generarResumen(mensaje) {
    // Validar propiedades esenciales del mensaje.
    if (!mensaje || typeof mensaje !== 'object' || !mensaje.remitente || !mensaje.contenido || !mensaje.fecha) {
        return "Error: El mensaje debe contener 'remitente', 'contenido' y 'fecha'.";
    }

    // Destructurar el objeto mensaje.
    const { remitente, contenido, fecha } = mensaje;

    // Truncar el contenido si es muy largo.
    const contenidoBreve = contenido.length > 50 ? contenido.substring(0, 47) + '...' : contenido;

    // Formatear la fecha para mejor lectura.
    let fechaFormateada = fecha;
    try {
        const fechaObj = new Date(fecha);
        fechaFormateada = fechaObj.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) {
        // En caso de error, se usa la fecha original.
    }

    // Retornar el resumen del mensaje.
    return `De: ${remitente} | Fecha: ${fechaFormateada} | Mensaje: "${contenidoBreve}"`;
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 11: Resumen de Mensajes con Destructuración ---");

let mensajeInputValido = false;
let mensajeUsuario = {};

// Solicitar y validar el mensaje del usuario en formato JSON.
while (!mensajeInputValido) {
    const inputStr = prompt('Ingresa el mensaje en formato JSON (ej. {"remitente":"Ana","contenido":"Hola...","fecha":"2025-12-06T14:30:00Z"}): ');
    try {
        const tempMensaje = JSON.parse(inputStr);
        // Validar propiedades esenciales.
        if (typeof tempMensaje !== 'object' || tempMensaje === null || !tempMensaje.remitente || !tempMensaje.contenido || !tempMensaje.fecha) {
            throw new Error("El JSON debe ser un objeto y contener las propiedades 'remitente', 'contenido' y 'fecha'.");
        }
        mensajeUsuario = tempMensaje;
        mensajeInputValido = true;
    } catch (error) {
        console.log(`Error: ${error.message}. Por favor, ingresa un JSON válido con las propiedades requeridas.`);
    }
}

// Generar y mostrar el resumen del mensaje.
const resumenMensaje = generarResumen(mensajeUsuario);
console.log("\n--- Resumen del Mensaje ---");
console.log(resumenMensaje);

console.log("--- Fin del Ejercicio 11 ---");