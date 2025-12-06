/**
 * @file ejercicio6.js
 * @description Módulo para realizar un cálculo de nómina simple.
 */

/**
 * @typedef {object} ResultadoNomina
 * @property {number|null} salarioBruto - El salario total antes de las deducciones.
 * @property {number|null} deducciones - El monto total de las deducciones.
 * @property {number|null} salarioNeto - El salario final después de las deducciones.
 * @property {string|null} error - Mensaje de error si ocurre uno.
 */

/**
 * @description Calcula el salario neto de un trabajador basado en las horas trabajadas y el valor por hora, aplicando deducciones fijas.
 * Este bloque funcional encapsula todo el cálculo de la nómina. Recibe los datos base, los valida,
 * y devuelve un objeto detallado con el desglose del salario.
 *
 * @param {number} valorHora - El valor monetario por cada hora de trabajo.
 * @param {number} horasTrabajadas - El total de horas trabajadas en el periodo.
 * @returns {ResultadoNomina} - Un objeto con el desglose del salario o un error.
 */
export function calcularNomina(valorHora, horasTrabajadas) {
    // Validación de entradas: Asegurarse de que los valores son números positivos.
    if (typeof valorHora !== 'number' || isNaN(valorHora) || valorHora < 0 ||
        typeof horasTrabajadas !== 'number' || isNaN(horasTrabajadas) || horasTrabajadas < 0) {
        return {
            salarioBruto: null,
            deducciones: null,
            salarioNeto: null,
            error: "Error: El valor por hora y las horas trabajadas deben ser números positivos."
        };
    }

    const salarioBruto = valorHora * horasTrabajadas;

    // Decisión de diseño 1: Modelo de deducciones simplificado.
    // Se optó por un modelo de deducciones fijo y simple (4% para salud, 4% para pensión), sumando un 8% total.
    // Para un ejercicio introductorio, este enfoque es ideal porque es fácil de entender y demuestra el concepto
    // de deducciones sin añadir la complejidad de leyes fiscales reales (ej. topes, salario integral, etc.).
    const TASA_DEDUCCIONES = 0.08; // 4% salud + 4% pensión
    const deducciones = salarioBruto * TASA_DEDUCCIONES;

    const salarioNeto = salarioBruto - deducciones;

    // Decisión de diseño 2: Devolver un objeto detallado.
    // En lugar de devolver únicamente el salario neto, la función retorna un objeto que desglosa
    // el salario bruto, las deducciones y el neto. Esta decisión de diseño aporta transparencia,
    // permitiendo que la interfaz de usuario muestre al usuario exactamente cómo se calculó su salario,
    // lo cual es más informativo y útil.
    return {
        salarioBruto,
        deducciones,
        salarioNeto,
        error: null
    };
}
