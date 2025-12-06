/**
 * ejercicio4.js
 * Módulo de ordenamiento y extremos de precios.
 Ordena precios y encuentra valores extremos. */



export function ordenarYEncontrarExtremos(precios) {
    // Caso: arreglo vacío.
    if (!precios || precios.length === 0) {
        return { ordenados: [], masAlto: null, masBajo: null, error: "La lista de precios está vacía." };
    }

    // Validación de elementos numéricos.
    for (const precio of precios) {
        if (typeof precio !== 'number' || isNaN(precio) || precio < 0) {
            return { ordenados: null, masAlto: null, masBajo: null, error: `El valor "${precio}" no es un precio válido.` };
        }
    }

    // Copia del arreglo para inmutabilidad.
    const preciosCopia = [...precios];

    // Ordenamiento descendente numérico con `sort()`.
    const preciosOrdenados = preciosCopia.sort((a, b) => b - a);

    const precioMasAlto = preciosOrdenados[0];
    const precioMasBajo = preciosOrdenados[preciosOrdenados.length - 1];

    return {
        ordenados: preciosOrdenados,
        masAlto: precioMasAlto,
        masBajo: precioMasBajo,
        error: null
    };
}