/**
 * @file Ejercicio1.js
 * @description Módulo para validar la asistencia de un aprendiz.
 */

/**
 * @typedef {string[]} ListaAprendices - Un arreglo de strings con los nombres de los aprendices.
 */

/**
 * @description Verifica si un nombre de aprendiz existe en una lista.
 * Este bloque funcional recibe una lista de nombres y un nombre a buscar.
 * Se diseñó así para encapsular la lógica de búsqueda en una función pura,
 * que es fácil de probar y reutilizar.
 * 
 * @param {ListaAprendices} aprendices - El arreglo con los nombres de los aprendices inscritos.
 * @param {string} nombre - El nombre del aprendiz a validar.
 * @returns {boolean} - Devuelve `true` si el aprendiz está en la lista, de lo contrario `false`.
 */
export function verificarAsistencia(aprendices, nombre) {
    // Decisión de diseño 1: Usar `trim()` y `toLowerCase()` para la normalización.
    // Se normalizan tanto el nombre a buscar como los nombres en la lista para evitar
    // errores de validación por mayúsculas/minúsculas o espacios en blanco accidentales.
    // Esto hace la búsqueda más robusta y amigable para el usuario.
    const nombreNormalizado = nombre.trim().toLowerCase();
    
    // Decisión de diseño 2: Elegir el método `includes()`.
    // Para este caso, solo necesitamos saber si el elemento existe (un booleano), no su posición o el elemento en sí.
    // `includes()` es el método más directo y legible para esta tarea, en comparación con `find()` (que devolvería el elemento)
    // o `filter()` (que crearía un nuevo arreglo). Su rendimiento es óptimo para una simple comprobación de existencia.
    const listaNormalizada = aprendices.map(a => a.trim().toLowerCase());
    
    return listaNormalizada.includes(nombreNormalizado);
}