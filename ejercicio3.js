/**
 * ejercicio3.js
 * Módulo de análisis de calificaciones.
 */

export function calcularPromedio(notas) {
    // Validación de notas en el arreglo.
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

    // Suma de notas con 'reduce()'.
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
