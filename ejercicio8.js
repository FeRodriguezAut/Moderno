
export function buscarCursos(catalogo, callback) {
    // Uso de 'filter()' para aplicar criterio.
    if (!Array.isArray(catalogo)) {
        console.error("El catálogo debe ser un arreglo.");
        return [];
    }
    if (typeof callback !== 'function') {
        console.error("El callback de búsqueda debe ser una función.");
        return [];
    }

    const cursosEncontrados = catalogo.filter(callback);

    // Función pura: no modifica el catálogo original.
    return cursosEncontrados;
}


