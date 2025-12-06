/**
 * @file ejercicio4.js
 * @description Módulo para ordenar precios y encontrar los valores extremos.
 */

/**
 * @typedef {object} ResultadoPrecios
 * @property {number[]|null} ordenados - El arreglo de precios ordenado de mayor a menor. Null si hay error.
 * @property {number|null} masAlto - El precio más alto encontrado.
 * @property {number|null} masBajo - El precio más bajo encontrado.
 * @property {string|null} error - Mensaje de error si ocurre uno.
 */

/**
 * @description Ordena un arreglo de precios de mayor a menor y encuentra el más alto y el más bajo.
 * Este bloque funcional recibe un arreglo de precios, lo valida y procesa. Se diseñó para ser una
 * función pura que no modifica el arreglo original y devuelve un objeto con todos los resultados
 * calculados, facilitando su uso y testeo.
 *
 * @param {number[]} precios - Un arreglo de números representando los precios.
 * @returns {ResultadoPrecios} - Un objeto con el arreglo ordenado y los precios extremos.
 */
export function ordenarYEncontrarExtremos(precios) {
    // Caso límite: el arreglo está vacío.
    if (!precios || precios.length === 0) {
        return { ordenados: [], masAlto: null, masBajo: null, error: "La lista de precios está vacía." };
    }

    // Validación de que todos los elementos sean números válidos.
    for (const precio of precios) {
        if (typeof precio !== 'number' || isNaN(precio) || precio < 0) {
            return { ordenados: null, masAlto: null, masBajo: null, error: `El valor "${precio}" no es un precio válido.` };
        }
    }

    // Decisión de diseño 1: Crear una copia del arreglo para no mutar el original.
    // Se utiliza el operador de propagación `[...precios]` para crear una copia superficial del arreglo.
    // Esto es una buena práctica en programación funcional, ya que evita efectos secundarios
    // y asegura que la función no modifique datos fuera de su propio alcance (es una función pura).
    const preciosCopia = [...precios];

    // Decisión de diseño 2: Usar una función de comparación `(a, b) => b - a` en `sort()`.
    // El método `sort()` por defecto ordena los elementos como strings. Para asegurar un ordenamiento
    // numérico correcto, es indispensable proveer una función de comparación. `b - a` ordena los
    // elementos en orden descendente (de mayor a menor), cumpliendo directamente el requisito.
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