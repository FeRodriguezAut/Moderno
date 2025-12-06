// ejercicio4.js
// Toma una lista de precios, los ordena y encuentra el precio más alto y el más bajo.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function ordenarYEncontrarExtremos
 * @description Recibe un array de precios, los valida, los ordena de forma descendente
 *              y encuentra el precio más alto y el más bajo.
 * @param {Array<number>} precios - Un array de números que representan precios.
 * @returns {Object} { ordenados: Array, masAlto: number | null, masBajo: number | null, error: string | null }.
 */
function ordenarYEncontrarExtremos(precios) {
    // Manejar caso de lista de precios vacía.
    if (!precios || precios.length === 0) {
        return { ordenados: [], masAlto: null, masBajo: null, error: "La lista de precios está vacía." };
    }

    // Validar que cada precio sea un número no negativo.
    for (const precio of precios) {
        if (typeof precio !== 'number' || isNaN(precio) || precio < 0) {
            return { ordenados: null, masAlto: null, masBajo: null, error: `El valor "${precio}" no es un precio válido. Debe ser un número no negativo.` };
        }
    }

    // Crear una copia del array para no modificar el original.
    const preciosCopia = [...precios];

    // Ordenar los precios de forma descendente.
    const preciosOrdenados = preciosCopia.sort((a, b) => b - a);

    // Identificar el precio más alto y más bajo.
    const precioMasAlto = preciosOrdenados[0];
    const precioMasBajo = preciosOrdenados[preciosOrdenados.length - 1];

    // Retornar los precios ordenados y los extremos.
    return {
        ordenados: preciosOrdenados,
        masAlto: precioMasAlto,
        masBajo: precioMasBajo,
        error: null
    };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 4: Ordenamiento y Extremos de Precios ---");

let preciosInputValido = false;
let listaPrecios = [];

// Solicitar y validar los precios ingresados por el usuario.
while (!preciosInputValido) {
    const preciosStr = prompt('Ingresa los precios separados por comas (ej. 10.5, 20, 5.25): ');
    const preciosRaw = preciosStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    listaPrecios = [];
    let todosPreciosValidos = true;

    if (preciosRaw.length === 0) {
        console.log("No ingresaste ningún precio. La función manejará la lista vacía.");
        preciosInputValido = true;
        break;
    }

    for (const precioStr of preciosRaw) {
        const precio = Number(precioStr);
        // Validar cada precio individual.
        if (isNaN(precio) || precio < 0) {
            console.log(`Error: "${precioStr}" no es un precio válido. Debe ser un número no negativo.`);
            todosPreciosValidos = false;
            break;
        }
        listaPrecios.push(precio);
    }

    if (todosPreciosValidos) {
        preciosInputValido = true;
    } else {
        console.log("Por favor, vuelve a ingresar los precios correctamente.");
    }
}

// Llamar a la función para ordenar y encontrar extremos.
const resultado = ordenarYEncontrarExtremos(listaPrecios);

// Mostrar el resultado.
if (!resultado.error) {
    console.log("Precios Ordenados (de mayor a menor):", resultado.ordenados);
    console.log("Precio Más Alto:", resultado.masAlto);
    console.log("Precio Más Bajo:", resultado.masBajo);
} else {
    console.log(`Error: ${resultado.error}`);
}

console.log("--- Fin del Ejercicio 4 ---");