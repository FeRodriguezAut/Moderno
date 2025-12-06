/**
ejercicio6.js
Módulo de cálculo de nómina.
Calcula salario neto con deducciones fijas.
 */


export function calcularNomina(valorHora, horasTrabajadas) {
    // Validación de entradas.
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

    // Deducciones simplificadas (8%).
    const TASA_DEDUCCIONES = 0.08; // 4% salud + 4% pensión
    const deducciones = salarioBruto * TASA_DEDUCCIONES;

    const salarioNeto = salarioBruto - deducciones;

    // Retorno de objeto detallado.
    return {
        salarioBruto,
        deducciones,
        salarioNeto,
        error: null
    };
}
