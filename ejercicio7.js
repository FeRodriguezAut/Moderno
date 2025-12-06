// ejercicio7.js
// Registra productos únicos, ignorando mayúsculas/minúsculas y espacios extra.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function registrarProductos
 * @description Registra una lista de productos, almacenando solo nombres únicos y normalizados.
 * @param {...string} productos - Nombres de productos.
 * @returns {Array<string>} Array de productos únicos y normalizados.
 */
function registrarProductos(...productos) {
    // Usar Set para almacenar productos únicos.
    const productosRegistrados = new Set();

    // Iterar sobre cada producto.
    for (const producto of productos) {
        // Normalizar el nombre del producto.
        const productoNormalizado = producto.trim().toLowerCase();
        
        // Añadir producto normalizado al Set (garantiza unicidad).
        productosRegistrados.add(productoNormalizado);
    }

    // Convertir Set a Array para el retorno.
    return [...productosRegistrados];
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 7: Registro de Productos Únicos ---");

let productosInputValido = false;
let productosIngresados = [];

// Solicitar y procesar la entrada de productos.
while (!productosInputValido) {
    const productosStr = prompt('Ingresa los nombres de los productos (separados por comas): ');
    
    const productosTemp = productosStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (productosTemp.length === 0 && productosStr.trim().length > 0) {
        console.log("Entrada inválida. Por favor, ingresa al menos un nombre de producto válido.");
    } else {
        productosIngresados = productosTemp;
        productosInputValido = true;
    }
}

// Llamar a la función para registrar productos únicos.
const productosUnicos = registrarProductos(...productosIngresados);

// Mostrar los productos únicos registrados.
if (productosUnicos.length > 0) {
    console.log("Productos únicos registrados:");
    productosUnicos.forEach(producto => console.log(`- ${producto}`));
} else {
    console.log("No se registraron productos únicos.");
}

console.log("--- Fin del Ejercicio 7 ---");
