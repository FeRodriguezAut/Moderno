// ejercicio2.js
// Calcula el inventario final de un producto y determina su estado (crítico o estable).

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function calcularInventario
 * @description Calcula el inventario final y su estado, validando las cantidades.
 * @param {number} inicial - Cantidad inicial en inventario.
 * @param {number} vendida - Cantidad vendida.
 * @param {number} recibida - Cantidad recibida.
 * @returns {Object} { inventarioFinal: number | null, estado: string }.
 */
function calcularInventario(inicial, vendida, recibida) {
    // Validar que las cantidades sean positivas.
    if (inicial < 0 || vendida < 0 || recibida < 0) {
        return {
            inventarioFinal: null,
            estado: "Error: Todas las cantidades deben ser números positivos."
        };
    }

    // Validar que no se vendan más unidades de las disponibles.
    if (vendida > inicial + recibida) {
        return {
            inventarioFinal: null,
            estado: "Error: No se pueden vender más unidades de las que hay en existencia."
        };
    }

    // Calcular el inventario final.
    const inventarioFinal = inicial - vendida + recibida;
    let estadoInventario;

    // Determinar el estado del inventario.
    if (inventarioFinal < 5) {
        estadoInventario = "Inventario crítico";
    } else {
        estadoInventario = "Inventario estable";
    }

    // Retornar el resultado del cálculo.
    return {
        inventarioFinal: inventarioFinal,
        estado: estadoInventario
    };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 2: Cálculo y Estado de Inventario ---");

let cantidadInicial, cantidadVendida, cantidadRecibida;

// Pedir y validar cantidad inicial.
while (true) {
    const input = prompt('Ingresa la cantidad inicial en inventario: ');
    cantidadInicial = Number(input);
    if (!isNaN(cantidadInicial)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Pedir y validar cantidad vendida.
while (true) {
    const input = prompt('Ingresa la cantidad vendida: ');
    cantidadVendida = Number(input);
    if (!isNaN(cantidadVendida)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Pedir y validar cantidad recibida.
while (true) {
    const input = prompt('Ingresa la cantidad recibida: ');
    cantidadRecibida = Number(input);
    if (!isNaN(cantidadRecibida)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Llamar a la función para calcular inventario.
const resultado = calcularInventario(cantidadInicial, cantidadVendida, cantidadRecibida);

// Mostrar el resultado.
if (resultado.inventarioFinal !== null) {
    console.log(`Inventario Final: ${resultado.inventarioFinal}`);
    console.log(`Estado: ${resultado.estado}`);
} else {
    console.log(`Error en el cálculo: ${resultado.estado}`);
}

console.log("--- Fin del Ejercicio 2 ---");
