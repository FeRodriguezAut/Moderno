// ejercicio6.js
// Calcula el salario neto de un empleado a partir de valor por hora y horas trabajadas, aplicando deducciones.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function calcularNomina
 * @description Calcula el salario bruto, deducciones y salario neto de un empleado.
 * @param {number} valorHora - Costo por cada hora de trabajo.
 * @param {number} horasTrabajadas - Total de horas trabajadas.
 * @returns {Object} { salarioBruto: number | null, deducciones: number | null, salarioNeto: number | null, error: string | null }.
 */
function calcularNomina(valorHora, horasTrabajadas) {
    // Validar que las entradas sean números positivos.
    if (typeof valorHora !== 'number' || isNaN(valorHora) || valorHora < 0 ||
        typeof horasTrabajadas !== 'number' || isNaN(horasTrabajadas) || horasTrabajadas < 0) {
        return {
            salarioBruto: null,
            deducciones: null,
            salarioNeto: null,
            error: "Error: El valor por hora y las horas trabajadas deben ser números positivos."
        };
    }

    // Calcular el salario bruto.
    const salarioBruto = valorHora * horasTrabajadas;

    // Calcular las deducciones (8%).
    const TASA_DEDUCCIONES = 0.08;
    const deducciones = salarioBruto * TASA_DEDUCCIONES;

    // Calcular el salario neto.
    const salarioNeto = salarioBruto - deducciones;

    // Retornar los detalles de la nómina.
    return {
        salarioBruto,
        deducciones,
        salarioNeto,
        error: null
    };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 6: Cálculo de Nómina ---");

let valorHoraInput, horasTrabajadasInput;

// Solicitar y validar el valor por hora.
while (true) {
    const input = prompt('Ingresa el valor por hora: ');
    valorHoraInput = Number(input);
    if (!isNaN(valorHoraInput) && valorHoraInput >= 0) break;
    console.log("Entrada inválida. Por favor, ingresa un número positivo para el valor por hora.");
}

// Solicitar y validar las horas trabajadas.
while (true) {
    const input = prompt('Ingresa las horas trabajadas: ');
    horasTrabajadasInput = Number(input);
    if (!isNaN(horasTrabajadasInput) && horasTrabajadasInput >= 0) break;
    console.log("Entrada inválida. Por favor, ingresa un número positivo para las horas trabajadas.");
}

// Llamar a la función para calcular la nómina.
const resultado = calcularNomina(valorHoraInput, horasTrabajadasInput);

// Mostrar el resultado.
if (!resultado.error) {
    console.log(`Salario Bruto: $${resultado.salarioBruto.toFixed(2)}`);
    console.log(`Deducciones (8%): $${resultado.deducciones.toFixed(2)}`);
    console.log(`Salario Neto: $${resultado.salarioNeto.toFixed(2)}`);
} else {
    console.log(`Error: ${resultado.error}`);
}

console.log("--- Fin del Ejercicio 6 ---");
