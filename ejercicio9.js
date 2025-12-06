// ejercicio9.js
// Procesa pagos, clasificándolos como "aprobados" o "rechazados" según un callback de aprobación.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function procesarPagos
 * @description Procesa un array de pagos, aplicando una función de callback para determinar
 *              si cada pago es aprobado o rechazado.
 * @param {Array<Object>} pagos - Array de objetos que representan pagos.
 * @param {function(Object): boolean} callback - Función de callback que actúa como la regla de aprobación.
 *   @callback callback
 *   @param {Object} pago - Objeto que representa un pago individual.
 *   @returns {boolean} - `true` si el pago es aprobado, `false` si es rechazado.
 *   @responsibility El `callback` define la lógica de aprobación.
 * @returns {Object} { aprobados: Array, rechazados: Array }.
 */
function procesarPagos(pagos, callback) {
    // Validar que la lista de pagos sea un array.
    if (!Array.isArray(pagos)) {
        console.error("Error (procesarPagos): La lista de pagos debe ser un arreglo.");
        return { aprobados: [], rechazados: [] };
    }
    // Validar que el callback sea una función.
    if (typeof callback !== 'function') {
        console.error("Error (procesarPagos): El callback de regla de aprobación debe ser una función.");
        return { aprobados: [], rechazados: [] };
    }

    const aprobados = [];
    const rechazados = [];

    // Iterar sobre cada pago, aplicar regla y clasificar.
    pagos.forEach(pago => {
        // Crear copia del pago para añadir estado (inmutabilidad).
        const pagoConEstado = { ...pago }; 
        // Evaluar pago con el callback.
        if (callback(pago)) {
            pagoConEstado.aprobacionEstado = 'aprobado';
            aprobados.push(pagoConEstado);
        } else {
            pagoConEstado.aprobacionEstado = 'rechazado';
            rechazados.push(pagoConEstado);
        }
    });

    // Retornar pagos aprobados y rechazados.
    return { aprobados, rechazados };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 9: Procesamiento de Pagos con Callbacks ---");

// Lista de pagos de ejemplo.
const listaDePagos = [
    { id: 'P001', monto: 120, cliente: 'Juan Perez', fecha: '2025-11-20' },
    { id: 'P002', monto: 950, cliente: 'Maria Gomez', fecha: '2025-11-25' },
    { id: 'P003', monto: 2000, cliente: 'Estafa S.A.', fecha: '2025-12-01' },
    { id: 'P004', monto: 50, cliente: 'Carlos Ruiz', fecha: '2025-12-10' },
    { id: 'P005', monto: 700, cliente: 'Maria Gomez', fecha: '2025-11-15' },
    { id: 'P006', monto: 100, cliente: 'Estafa S.A.', fecha: '2025-11-28' },
];

console.log("\nLista de Pagos a Procesar:");
listaDePagos.forEach(pago => console.log(`- ID: ${pago.id}, Monto: $${pago.monto}, Cliente: ${pago.cliente}, Fecha: ${pago.fecha}`));

console.log("\nElige una regla de aprobación para los pagos:");
console.log("1. Aprobar pagos con monto menor a $1000.");
console.log("2. Aprobar pagos que NO sean del cliente 'Estafa S.A.'.");
console.log("3. Aprobar pagos realizados ANTES del 1 de Diciembre de 2025.");

let opcionRegla;
// Solicitar opción de regla de aprobación al usuario.
while (!['1', '2', '3'].includes(opcionRegla)) {
    opcionRegla = prompt('Elige una opción (1, 2 o 3): ');
}

let reglaDeAprobacionCallback; // Variable para almacenar la función de callback.

// Construir el callback de aprobación dinámicamente.
switch (opcionRegla) {
    case '1':
        // Callback para aprobar pagos con monto menor a $1000.
        reglaDeAprobacionCallback = (pago) => pago.monto < 1000;
        console.log("Regla: Aprobando pagos con monto menor a $1000.");
        break;

    case '2':
        // Callback para aprobar pagos que NO sean del cliente 'Estafa S.A.'.
        reglaDeAprobacionCallback = (pago) => pago.cliente !== 'Estafa S.A.';
        console.log("Regla: Aprobando pagos que NO sean del cliente 'Estafa S.A.'.");
        break;

    case '3':
        // Callback para aprobar pagos realizados ANTES del 1 de Diciembre de 2025.
        const fechaLimite = new Date('2025-12-01T00:00:00.000Z');
        reglaDeAprobacionCallback = (pago) => {
            const fechaPago = new Date(pago.fecha + 'T00:00:00.000Z');
            return fechaPago < fechaLimite;
        };
        console.log("Regla: Aprobando pagos realizados ANTES del 1 de Diciembre de 2025.");
        break;
}

// Llamar a la función para procesar los pagos.
const resultadoProcesamiento = procesarPagos(listaDePagos, reglaDeAprobacionCallback);

// Mostrar los resultados (pagos aprobados/rechazados).
console.log("\n--- Pagos Aprobados ---");
if (resultadoProcesamiento.aprobados.length > 0) {
    resultadoProcesamiento.aprobados.forEach(pago => {
        console.log(`- ID: ${pago.id}, Monto: $${pago.monto}, Cliente: ${pago.cliente}, Estado: ${pago.aprobacionEstado}`);
    });
} else {
    console.log("No se aprobaron pagos.");
}

console.log("\n--- Pagos Rechazados ---");
if (resultadoProcesamiento.rechazados.length > 0) {
    resultadoProcesamiento.rechazados.forEach(pago => {
        console.log(`- ID: ${pago.id}, Monto: $${pago.monto}, Cliente: ${pago.cliente}, Estado: ${pago.aprobacionEstado}`);
    });
} else {
    console.log("No se rechazaron pagos.");
}

console.log("--- Fin del Ejercicio 9 ---");
