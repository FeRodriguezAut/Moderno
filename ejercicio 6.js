// ejercicio6.js
// Este módulo calcula el salario neto de un empleado, aplicando deducciones fijas
// sobre el salario bruto, el cual se determina por el valor por hora y las horas trabajadas.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function calcularNomina
 * @description Calcula el salario bruto, las deducciones y el salario neto de un empleado.
 *              Incluye validaciones para asegurar que los valores de entrada sean numéricos y positivos.
 *
 * @param {number} valorHora - El costo por cada hora de trabajo.
 * @param {number} horasTrabajadas - El total de horas que el empleado ha trabajado.
 * @returns {Object} Un objeto con las propiedades:
 *                   - salarioBruto: El salario total antes de deducciones, o `null` si hay un error.
 *                   - deducciones: El monto total de las deducciones aplicadas, o `null` si hay un error.
 *                   - salarioNeto: El salario después de aplicar las deducciones, o `null` si hay un error.
 *                   - error: Mensaje de error si la validación falla, o `null` si no hay errores.
 *
 * @comment Esta función es fundamental para el cálculo básico de la nómina. Su diseño permite
 *          una clara separación entre el cálculo del salario bruto, la aplicación de deducciones
 *          y el resultado final, asegurando que todos los componentes sean transparentes y válidos.
 */
function calcularNomina(valorHora, horasTrabajadas) {
    // Comentario: Validación de entradas.
    // Propósito: Asegurar que tanto el valor por hora como las horas trabajadas sean números válidos (no NaN)
    // y positivos. Es ilógico calcular nómina con valores negativos o no numéricos.
    if (typeof valorHora !== 'number' || isNaN(valorHora) || valorHora < 0 ||
        typeof horasTrabajadas !== 'number' || isNaN(horasTrabajadas) || horasTrabajadas < 0) {
        return {
            salarioBruto: null,
            deducciones: null,
            salarioNeto: null,
            error: "Error: El valor por hora y las horas trabajadas deben ser números positivos."
        };
    }

    // Comentario: Cálculo del salario bruto.
    // Propósito: Determinar el ingreso total antes de aplicar cualquier descuento.
    // Es la base sobre la cual se calcularán las deducciones.
    const salarioBruto = valorHora * horasTrabajadas;

    // Comentario: Deducciones simplificadas (8%).
    // Propósito: Aplicar un porcentaje fijo al salario bruto para representar las deducciones.
    // En este ejercicio, se considera un 8% (ej. 4% para salud y 4% para pensión), para simplificar.
    const TASA_DEDUCCIONES = 0.08; // 4% salud + 4% pensión
    const deducciones = salarioBruto * TASA_DEDUCCIONES;

    // Comentario: Cálculo del salario neto.
    // Propósito: Obtener el monto final que el empleado recibirá, restando las deducciones al salario bruto.
    const salarioNeto = salarioBruto - deducciones;

    // Comentario: Retorno de objeto detallado.
    // Propósito: Devolver todos los componentes calculados (bruto, deducciones, neto)
    // en un objeto estructurado, lo que facilita el acceso y la visualización de la información.
    return {
        salarioBruto,
        deducciones,
        salarioNeto,
        error: null
    };
}

// --- Explicación Técnica para el Ejercicio 6 ---

/*
Entradas:
- valorHora: Un número que representa el pago por cada hora de trabajo. Se espera un valor no negativo.
- horasTrabajadas: Un número que representa la cantidad total de horas que se han trabajado. Se espera un valor no negativo.

Proceso:
1. Validación de Entradas: La función primero valida que `valorHora` y `horasTrabajadas` sean números válidos (no `NaN`) y no negativos. Si alguna de estas condiciones no se cumple, se retorna un objeto con `null` para los salarios y un mensaje de error.
2. Cálculo del Salario Bruto: Si las validaciones son exitosas, el `salarioBruto` se calcula multiplicando `valorHora` por `horasTrabajadas`.
3. Cálculo de Deducciones: Se define una `TASA_DEDUCCIONES` constante (0.08, representando un 8%). Las `deducciones` se calculan multiplicando el `salarioBruto` por esta tasa.
4. Cálculo del Salario Neto: El `salarioNeto` se obtiene restando las `deducciones` del `salarioBruto`.

Salidas:
- Un objeto con las propiedades:
  - `salarioBruto`: El monto del salario antes de deducciones.
  - `deducciones`: El monto total deducido.
  - `salarioNeto`: El monto final que el empleado recibirá.
  - `error`: Un mensaje de error si alguna validación falló, o `null` si la operación fue exitosa.

Reglas de Negocio:
- El valor por hora y las horas trabajadas deben ser valores numéricos positivos.
- Las deducciones se calculan como un porcentaje fijo del salario bruto (8% en este caso simplificado).
- El salario neto es el salario bruto menos las deducciones.

Casos Límite:
- Valores de entrada cero (ej. horasTrabajadas = 0): Resultará en salarioBruto, deducciones y salarioNeto de 0.
- Valores de entrada negativos o no numéricos: La función retornará un error específico y valores `null`.
- Altas horas trabajadas o valor por hora: El cálculo se realizará correctamente sin desbordamientos en JavaScript.

Decisiones de Diseño Justificadas:
1. Validación robusta de entradas al inicio de la función:
   - Por qué: Realizar validaciones exhaustivas al comienzo de la función (`typeof`, `isNaN`, y rangos positivos) asegura que la lógica principal de cálculo solo opere sobre datos limpios y significativos. Esto es crucial en funciones financieras como el cálculo de nómina, donde datos incorrectos pueden llevar a resultados erróneos y problemas serios. Esta práctica de "fail-fast" mejora la fiabilidad de la función y simplifica el manejo de errores en las partes posteriores del código.
   - Alternativas consideradas: Realizar conversiones implícitas o no validar, lo que podría llevar a `NaN` o valores inesperados en los resultados; o delegar la validación completamente al código que llama a la función (menos encapsulamiento).
2. Retorno de un objeto detallado con todos los componentes del cálculo:
   - Por qué: En lugar de retornar solo el `salarioNeto`, la función devuelve un objeto que contiene el `salarioBruto`, las `deducciones`, el `salarioNeto` y el `error` (si existe). Esto proporciona una visión completa de cómo se llegó al salario neto, lo que es muy útil para la transparencia, auditorías o para mostrar un desglose detallado al usuario. Es una forma clara y estructurada de comunicar múltiples resultados relacionados.
   - Alternativas consideradas: Retornar solo el salario neto (oculta detalles); usar `console.log` dentro de la función (menos flexible para reutilización); o pasar objetos por referencia para actualizar (menos claro y más propenso a efectos secundarios).

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 6: Cálculo de Nómina ---");

let valorHoraInput, horasTrabajadasInput;

// Comentario: Bucle para solicitar y validar el valor por hora.
// Propósito: Obtener un número positivo para el valor por hora.
while (true) {
    const input = prompt('Ingresa el valor por hora: ');
    valorHoraInput = Number(input);
    if (!isNaN(valorHoraInput) && valorHoraInput >= 0) break;
    console.log("Entrada inválida. Por favor, ingresa un número positivo para el valor por hora.");
}

// Comentario: Bucle para solicitar y validar las horas trabajadas.
// Propósito: Obtener un número positivo para las horas trabajadas.
while (true) {
    const input = prompt('Ingresa las horas trabajadas: ');
    horasTrabajadasInput = Number(input);
    if (!isNaN(horasTrabajadasInput) && horasTrabajadasInput >= 0) break;
    console.log("Entrada inválida. Por favor, ingresa un número positivo para las horas trabajadas.");
}

// Llamamos a nuestra función principal para calcular la nómina.
const resultado = calcularNomina(valorHoraInput, horasTrabajadasInput);

// Mostramos el resultado al usuario.
if (!resultado.error) {
    console.log(`Salario Bruto: $${resultado.salarioBruto.toFixed(2)}`);
    console.log(`Deducciones (8%): $${resultado.deducciones.toFixed(2)}`);
    console.log(`Salario Neto: $${resultado.salarioNeto.toFixed(2)}`);
} else {
    // Si hubo un error de validación en la función.
    console.log(`Error: ${resultado.error}`);
}

console.log("--- Fin del Ejercicio 6 ---");