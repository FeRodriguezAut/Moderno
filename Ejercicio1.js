// ejercicio1.js
// Verifica si un nombre se encuentra en una lista de aprendices, ignorando mayúsculas/minúsculas y espacios.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function verificarExistencia
 * @description Verifica si un nombre dado está presente en una lista de aprendices.
 * @param {string} nombre - El nombre que se desea buscar.
 * @param {Array<string>} aprendices - Lista de nombres de aprendices.
 * @returns {boolean} - True si el nombre se encuentra, false en caso contrario.
 */
function verificarExistencia(nombre, aprendices) {
    // Normalizar el nombre a buscar (sin espacios extra, en minúsculas).
    const nombreNormalizado = nombre.trim().toLowerCase();
    
    // Normalizar cada nombre en la lista de aprendices.
    const listaNormalizada = aprendices.map(a => a.trim().toLowerCase());
    
    // Verificar si el nombre normalizado existe en la lista normalizada.
    return listaNormalizada.includes(nombreNormalizado);
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 1: Verificar Existencia de Aprendiz ---");

// Pedir al usuario la lista de aprendices (separados por comas).
const aprendicesInput = prompt('Ingresa los nombres de los aprendices (separados por comas): ');
// Convertir la entrada en un array de strings, limpiando espacios y vacíos.
const listaAprendices = aprendicesInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

// Pedir el nombre del aprendiz a buscar.
const nombreABuscar = prompt('¿Qué nombre de aprendiz deseas buscar? ');

// Validar y mostrar resultado.
if (nombreABuscar.trim().length === 0) {
    console.log("No ingresaste un nombre para buscar.");
} else if (listaAprendices.length === 0) {
    console.log("No hay aprendices en la lista para buscar.");
} else {
    // Llamar a la función para verificar existencia.
    const existe = verificarExistencia(nombreABuscar, listaAprendices);

    // Mostrar el resultado.
    if (existe) {
        console.log(`¡Sí! '${nombreABuscar}' se encuentra en la lista de aprendices.`);
    } else {
        console.log(`No, '${nombreABuscar}' NO se encuentra en la lista de aprendices.`);
    }
}

console.log("--- Fin del Ejercicio 1 ---");
