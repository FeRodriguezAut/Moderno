/**
 * @file ejercicio3.js
 * @description Módulo para analizar las calificaciones de un aprendiz.
 */

/**
 * @typedef {object} ResultadoCalificaciones
 * @property {number|null} promedio - El promedio final de las notas. Null si hay un error.
 * @property {string} rendimiento - El nivel de rendimiento ("Alto", "Medio", "Bajo" o un mensaje de error).
 */

/**
 * @description Calcula el promedio de una lista de notas y determina el rendimiento académico.
 * Este bloque funcional toma un arreglo de notas, valida su contenido, calcula el promedio
 * y lo clasifica. Se diseñó para ser una función pura que devuelve un objeto con los resultados
 * para mantener la lógica de negocio aislada.
 *
 * @param {number[]} notas - Un arreglo de números representando las calificaciones.
 * @returns {ResultadoCalificaciones} - Un objeto con el promedio y el rendimiento.
 */
export function calcularPromedio(notas) {
    // Decisión de diseño 1: Validar las entradas del arreglo.
    // La función itera sobre el arreglo de notas para asegurar que cada una sea un número válido
    // y esté en el rango permitido (0-5). Esto previene que datos corruptos o incorrectos
    // afecten el cálculo, devolviendo un error claro y controlando un caso límite fundamental.
    for (const nota of notas) {
        if (typeof nota !== 'number' || isNaN(nota) || nota < 0 || nota > 5) {
            return {
                promedio: null,
                rendimiento: `Error: La nota "${nota}" no es un número válido entre 0 y 5.`
            };
        }
    }
    
    if (notas.length === 0) {
        return {
            promedio: 0,
            rendimiento: "No se ingresaron notas."
        };
    }

    // Decisión de diseño 2: Usar `reduce` para sumar las notas.
    // En lugar de un bucle `for` tradicional, se opta por el método `reduce`. Es una forma más
    // funcional y declarativa de expresar la suma de los elementos de un arreglo. El código
    // es más conciso y expresa claramente la intención de "reducir" el arreglo a un solo valor (la suma).
    const sumaNotas = notas.reduce((acumulador, notaActual) => acumulador + notaActual, 0);
    const promedio = sumaNotas / notas.length;

    let rendimiento;
    if (promedio >= 4.0) {
        rendimiento = "Alto";
    } else if (promedio >= 3.0) {
        rendimiento = "Medio";
    } else {
        rendimiento = "Bajo";
    }

    return {
        promedio: promedio,
        rendimiento: rendimiento
    };
}
