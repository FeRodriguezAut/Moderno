/**
 * ejercicio9.js
 * Módulo de procesamiento de pagos con callbacks.
 Procesa pagos aplicando una regla de aprobación.
*/
export function procesarPagos(pagos, callback) {
    if (!Array.isArray(pagos)) {
        console.error("La lista de pagos debe ser un arreglo.");
        return { aprobados: [], rechazados: [] };
    }
    if (typeof callback !== 'function') {
        console.error("El callback de regla de aprobación debe ser una función.");
        return { aprobados: [], rechazados: [] };
    }

    const aprobados = [];
    const rechazados = [];

    // Iteración inmutable aplicando el callback.
    pagos.forEach(pago => {
        // Añadir estado de aprobación.
        const pagoConEstado = { ...pago }; // Copia el pago para añadir el estado sin mutar el original
        if (callback(pago)) {
            pagoConEstado.aprobacionEstado = 'aprobado';
            aprobados.push(pagoConEstado);
        } else {
            pagoConEstado.aprobacionEstado = 'rechazado';
            rechazados.push(pagoConEstado);
        }
    });

    // Retorno de pagos aprobados y rechazados.
    return { aprobados, rechazados };
}
