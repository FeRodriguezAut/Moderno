/**
 * ejercicio7.js
 * Módulo de registro de productos sin duplicados.
Registra productos únicos.
*/
export function registrarProductos(...productos) {
    // Uso de 'Set' para asegurar unicidad.
    const productosRegistrados = new Set();

    // Iterar sobre productos.
    for (const producto of productos) {
        // Normalización de producto.
        const productoNormalizado = producto.trim().toLowerCase();
        
        // Añadir producto al Set.
        productosRegistrados.add(productoNormalizado);
    }

    // Conversión de Set a Array para retorno.
    return [...productosRegistrados];
}
