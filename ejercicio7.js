/**
 * @file ejercicio7.js
 * @description Módulo para registrar productos, evitando duplicados.
 */

/**
 * @typedef {string[]} ListaProductos - Un arreglo de strings con los nombres de los productos registrados.
 */

/**
 * @description Registra un número indefinido de productos, asegurando que no haya duplicados.
 * Esta función recibe una lista de productos y se encarga de agregarlos a una colección interna
 * si no existen previamente. Se diseñó para ser flexible en la cantidad de productos a recibir
 * y mantener la unicidad de los mismos.
 *
 * @param {...string} productos - Múltiples nombres de productos como argumentos separados.
 * @returns {ListaProductos} - Un arreglo con la lista final de productos sin duplicados.
 */
export function registrarProductos(...productos) {
    // Decisión de diseño 1: Usar un `Set` para manejar la unicidad.
    // Un `Set` es una colección de valores únicos. Esto simplifica enormemente la lógica
    // para evitar duplicados, ya que el `Set` se encarga automáticamente de ello.
    // Es más eficiente y legible que iterar y comprobar manualmente en un arreglo cada vez.
    const productosRegistrados = new Set();

    // Recorrer los productos que se quieren registrar.
    for (const producto of productos) {
        // Normalizar el producto para que la comparación de duplicados sea insensible a mayúsculas/minúsculas y espacios.
        const productoNormalizado = producto.trim().toLowerCase();
        
        // Agregar el producto al Set. Si ya existe (en su forma normalizada), el Set no lo añadirá de nuevo.
        productosRegistrados.add(productoNormalizado);
    }

    // Decisión de diseño 2: Convertir el Set de vuelta a un Array.
    // Aunque el `Set` es ideal para la gestión interna de unicidad, los arreglos son a menudo más
    // útiles y esperados como formato de retorno para ser usados en otras partes de la aplicación (ej. UI).
    // Usar el operador de propagación `...` es la forma más concisa de convertir un `Set` a un `Array`.
    return [...productosRegistrados];
}
