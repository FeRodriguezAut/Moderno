// ejercicio13.js - Control de gastos y análisis financiero

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Esto es necesario porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Gasto
 * @property {string} categoria - La categoría del gasto (ej. "Alimentos", "Transporte").
 * @property {number} monto - El monto del gasto.
 */

/**
 * Función principal para el control de gastos y análisis financiero.
 * Esta función orquesta la entrada de datos, el procesamiento de gastos y la generación del reporte.
 */
async function analizarGastos() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 13: Control de gastos y análisis financiero ---");
    console.log("Este programa te ayuda a analizar tus gastos mensuales para identificar hábitos financieros.");

    // Pregunta al usuario cuántos gastos va a ingresar.
    let numeroGastos = parseInt(prompt("Ingrese la cantidad de gastos a registrar: "));

    // Valida que la cantidad de gastos sea un número positivo.
    while (isNaN(numeroGastos) || numeroGastos <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de gastos.");
        numeroGastos = parseInt(prompt("Ingrese la cantidad de gastos a registrar: "));
    }

    const gastos = []; // Array para almacenar los objetos de gastos.

    // Bucle para pedir la categoría y el monto de cada gasto.
    for (let i = 0; i < numeroGastos; i++) {
        console.log(`\n--- Gasto ${i + 1} ---`);
        const categoria = prompt("Ingrese la categoría del gasto (ej. Alimentos, Transporte, Entretenimiento): ");

        let monto = parseFloat(prompt("Ingrese el monto del gasto: "));
        // Valida que el monto sea un número positivo.
        while (isNaN(monto) || monto <= 0) {
            console.log("Por favor, ingrese un monto válido (número positivo).");
            monto = parseFloat(prompt("Ingrese el monto del gasto: "));
        }

        // Agrega el objeto de gasto al arreglo.
        gastos.push({ categoria: categoria.trim(), monto }); // .trim() para limpiar espacios en blanco.
    }


    let totalGastado = 0; // Acumulador para el gasto total.
    const gastosPorCategoria = {}; // Objeto para sumar gastos por categoría.

    // Calcula el total gastado y agrupa los montos por categoría.
    for (const gasto of gastos) {
        totalGastado += gasto.monto; // Suma al total general.

        // Si la categoría ya existe, suma el monto; si no, inicialízala.
        if (gastosPorCategoria[gasto.categoria]) {
            gastosPorCategoria[gasto.categoria] += gasto.monto;
        } else {
            gastosPorCategoria[gasto.categoria] = gasto.monto;
        }
    } // Cierre del bucle for (const gasto of gastos)

    let categoriaMasCostosa = 'N/A'; // Variable para almacenar la categoría más costosa.
    let montoMasCostoso = 0; // Monto de la categoría más costosa.

    // Itera sobre las categorías para encontrar la más costosa.
    for (const categoria in gastosPorCategoria) {
        if (gastosPorCategoria[categoria] > montoMasCostoso) {
            montoMasCostoso = gastosPorCategoria[categoria];
            categoriaMasCostosa = categoria;
        }
    }

    const alertasDesbalance = []; // Array para guardar las categorías que superan el 40% del total.
    const limiteDesbalance = totalGastado * 0.40; // Calcula el 40% del gasto total.

    // Revisa si alguna categoría supera el límite de desbalance.
    for (const categoria in gastosPorCategoria) {
        if (gastosPorCategoria[categoria] > limiteDesbalance) {
            alertasDesbalance.push(
                `${categoria} (${((gastosPorCategoria[categoria] / totalGastado) * 100).toFixed(2)}%)`
            );
        }
    }

    console.log("\n--- Reporte Financiero ---");
    console.log(`Total gastado: $${totalGastado.toFixed(2)}`);
    console.log(`Categoría más costosa: ${categoriaMasCostosa} ($${montoMasCostoso.toFixed(2)})`);

    if (alertasDesbalance.length > 0) {
        console.log("\n--- Alertas de Desbalance Financiero (categorías que superan el 40% del gasto total) ---");
        alertasDesbalance.forEach(alerta => console.log(`- ${alerta}`));
    } else {
        console.log("\nNo se encontraron alertas de desbalance financiero (ninguna categoría supera el 40% del gasto total).");
    }
}

// Ejecuta la función principal para iniciar el programa.
analizarGastos();
