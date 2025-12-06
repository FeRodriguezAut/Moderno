// ejercicio1.js
// Este módulo permite verificar si un nombre específico se encuentra en una lista de aprendices.
// La verificación ignora mayúsculas/minúsculas y espacios al inicio/final del nombre.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function verificarExistencia
 * @description Verifica si un nombre dado está presente en una lista de aprendices.
 *              La comparación es insensible a mayúsculas/minúsculas y omite espacios en blanco.
 *
 * @param {string} nombre - El nombre que se desea buscar en la lista.
 * @param {Array<string>} aprendices - Un array de strings, donde cada string es el nombre de un aprendiz.
 * @returns {boolean} - Retorna 'true' si el nombre se encuentra en la lista, 'false' en caso contrario.
 *
 * @comment Este es el bloque funcional principal del ejercicio. Fue diseñado así
 *          para encapsular la lógica de búsqueda, haciéndola reutilizable y fácil de probar.
 *          La normalización de los nombres antes de la comparación asegura que la búsqueda sea flexible.
 */
function verificarExistencia(nombre, aprendices) {
    // Normalizamos el nombre que queremos buscar: quitamos espacios extra y lo pasamos a minúsculas.
    // Esto es para que la búsqueda no distinga entre " Juan ", "juan" o "JUAN".
    const nombreNormalizado = nombre.trim().toLowerCase();
    
    // Normalizamos cada nombre en la lista de aprendices de la misma manera.
    // Esto crea una nueva lista donde todos los nombres están listos para una comparación consistente.
    const listaNormalizada = aprendices.map(a => a.trim().toLowerCase());
    
    // Usamos el método `includes()` de los arrays para verificar si el nombre normalizado
    // está presente en nuestra lista normalizada de aprendices.
    // Este método es sencillo y directo para la tarea de verificación de existencia.
    return listaNormalizada.includes(nombreNormalizado);
}

// --- Explicación Técnica para el Ejercicio 1 ---

/*
Entradas:
- nombre: Un string que representa el nombre a buscar.
- aprendices: Un array de strings, donde cada string es un nombre de aprendiz.

Proceso:
1. Normalización del nombre a buscar: Se limpia el string (se eliminan espacios en blanco al inicio y al final con `trim()`) y se convierte a minúsculas (`toLowerCase()`) para asegurar una búsqueda sin distinción de mayúsculas/minúsculas o formato.
2. Normalización de la lista de aprendices: Cada nombre en el array `aprendices` se procesa de la misma manera (trim y toLowerCase) para crear una lista homogénea para la comparación.
3. Verificación de existencia: Se utiliza el método `includes()` del array normalizado de aprendices para determinar si el nombre normalizado a buscar se encuentra en la lista.

Salidas:
- Un valor booleano (`true` si el nombre existe, `false` si no).

Reglas de Negocio:
- La búsqueda debe ser insensible a mayúsculas y minúsculas.
- Los espacios en blanco al inicio o al final de los nombres no deben afectar la búsqueda.
- El nombre buscado debe coincidir exactamente con un nombre en la lista, una vez normalizado.

Casos Límite:
- Lista de aprendices vacía: La función retornará `false` ya que `includes()` en un array vacío siempre es `false`.
- Nombre a buscar vacío o solo con espacios: Tras la normalización, se buscará una cadena vacía. Si algún aprendiz en la lista, tras normalizarlo, resulta en una cadena vacía, podría haber un falso positivo (aunque esto es improbable para nombres reales).
- Nombres con caracteres especiales: La normalización solo afecta a mayúsculas/minúsculas y espacios, otros caracteres se conservan.

Decisiones de Diseño Justificadas:
1. Uso de `trim().toLowerCase()` para normalización:
   - Por qué: Esta combinación de métodos es una forma estándar y eficiente en JavaScript para crear una representación consistente de strings para comparaciones, ignorando diferencias de formato que no son relevantes para la identidad ("Juan" vs "juan" vs " Juan "). Simplifica la lógica de búsqueda al asegurar que solo se compare el contenido significativo del nombre.
   - Alternativas consideradas: No normalizar y hacer una búsqueda sensible a mayúsculas/minúsculas, o usar expresiones regulares. Descartadas porque la normalización simple es suficiente y más clara para este requisito básico.
2. Uso del método `Array.prototype.includes()`:
   - Por qué: `includes()` es el método más directo y legible para verificar la existencia de un elemento dentro de un array. Su propósito es precisamente este, lo que hace el código autoexplicativo y fácil de entender para cualquier persona que lea el código.
   - Alternativas consideradas: Un bucle `for` tradicional con una comparación `===`, o `Array.prototype.indexOf()`. Descartadas por ser ligeramente menos concisas o directas que `includes()` para la tarea específica de solo verificar existencia.
*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 1: Verificar Existencia de Aprendiz ---");

// Pedimos al usuario que ingrese la lista de aprendices.
// Se espera que los nombres estén separados por comas.
const aprendicesInput = prompt('Ingresa los nombres de los aprendices (separados por comas): ');
// Convertimos la cadena de entrada en un array de strings.
// Usamos .split(',') para separar por comas y .map(s => s.trim()) para limpiar espacios extra en cada nombre.
const listaAprendices = aprendicesInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

// Pedimos el nombre del aprendiz a buscar.
const nombreABuscar = prompt('¿Qué nombre de aprendiz deseas buscar? ');

// Validamos que se haya ingresado un nombre a buscar.
if (nombreABuscar.trim().length === 0) {
    console.log("No ingresaste un nombre para buscar. Por favor, inténtalo de nuevo.");
} else if (listaAprendices.length === 0) {
    console.log("No hay aprendices en la lista para buscar.");
} else {
    // Llamamos a nuestra función principal para verificar la existencia.
    const existe = verificarExistencia(nombreABuscar, listaAprendices);

    // Mostramos el resultado al usuario.
    if (existe) {
        console.log(`¡Sí! '${nombreABuscar}' se encuentra en la lista de aprendices.`);
    } else {
        console.log(`No, '${nombreABuscar}' NO se encuentra en la lista de aprendices.`);
    }
}

console.log("--- Fin del Ejercicio 1 ---");