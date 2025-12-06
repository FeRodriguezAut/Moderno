// ejercicio3.js
// Este módulo calcula el promedio de una serie de calificaciones y determina el rendimiento
// académico basado en ese promedio.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function calcularPromedio
 * @description Calcula el promedio de un array de notas y asigna un nivel de rendimiento (Alto, Medio, Bajo).
 *              Realiza validaciones para asegurar que las notas sean números válidos entre 0 y 5.
 *
 * @param {Array<number>} notas - Un array de números, donde cada número representa una calificación.
 * @returns {Object} Un objeto con dos propiedades:
 *                   - promedio: El promedio de las notas o `null` si hay un error de validación.
 *                   - rendimiento: Una cadena de texto indicando el nivel de rendimiento ("Alto", "Medio", "Bajo")
 *                                  o un mensaje de error si alguna nota es inválida o no se ingresaron notas.
 *
 * @comment Esta función es el núcleo del ejercicio. Su objetivo es procesar un conjunto de calificaciones,
 *          calcular una medida central (el promedio) y categorizar el desempeño. Incluye validaciones
 *          para garantizar la integridad de los datos de entrada, lo cual es crucial para resultados significativos.
 */
function calcularPromedio(notas) {
    // Comentario: Validación de notas en el arreglo.
    // Propósito: Asegurar que cada nota sea un número válido y esté dentro del rango esperado (0 a 5).
    // Esto previene cálculos erróneos o promedios sin sentido con datos incorrectos.
    for (const nota of notas) {
        if (typeof nota !== 'number' || isNaN(nota) || nota < 0 || nota > 5) {
            return {
                promedio: null,
                rendimiento: `Error: La nota "${nota}" no es un número válido entre 0 y 5.`
            };
        }
    }
    
    // Comentario: Manejo de caso para arreglo de notas vacío.
    // Propósito: Evitar una división por cero y proporcionar un mensaje claro cuando no hay notas para promediar.
    if (notas.length === 0) {
        return {
            promedio: 0, // El promedio de una lista vacía puede considerarse 0 o indefinido; aquí se opta por 0.
            rendimiento: "No se ingresaron notas."
        };
    }

    // Comentario: Suma de notas con 'reduce()'.
    // Propósito: Calcular la suma total de todas las notas de manera concisa y eficiente.
    // 'reduce' es ideal para acumular un único valor a partir de un array.
    const sumaNotas = notas.reduce((acumulador, notaActual) => acumulador + notaActual, 0);
    
    // Comentario: Cálculo del promedio.
    // Propósito: Obtener el valor central de las calificaciones.
    const promedio = sumaNotas / notas.length;

    let rendimiento;
    // Comentario: Clasificación del rendimiento.
    // Propósito: Asignar una categoría cualitativa al rendimiento académico basada en el promedio calculado.
    // Se usan umbrales predefinidos (4.0 y 3.0) para "Alto", "Medio" y "Bajo".
    if (promedio >= 4.0) {
        rendimiento = "Alto";
    } else if (promedio >= 3.0) {
        rendimiento = "Medio";
    } else {
        rendimiento = "Bajo";
    }

    // Comentario: Retorno del resultado.
    // Propósito: Devolver un objeto que contiene tanto el promedio numérico como la categoría de rendimiento.
    return {
        promedio: promedio,
        rendimiento: rendimiento
    };
}

// --- Explicación Técnica para el Ejercicio 3 ---

/*
Entradas:
- notas: Un array de números. Cada número representa una calificación individual en una escala de 0 a 5.

Proceso:
1. Validación de Pre-condiciones (Notas Individuales): La función itera sobre cada `nota` en el array de entrada para asegurar que:
   a. Sea un tipo `number` y no `NaN`.
   b. Esté dentro del rango válido de 0 a 5 (inclusive).
   Si alguna nota no cumple estas condiciones, la función retorna un objeto con `promedio: null` y un mensaje de error.
2. Manejo de Array Vacío: Si el array `notas` no contiene elementos (`notas.length === 0`), se retorna un `promedio` de 0 y un mensaje indicando que no se ingresaron notas. Esto evita una división por cero.
3. Suma de Notas: Se utiliza el método `Array.prototype.reduce()` para sumar todas las notas válidas en el array.
4. Cálculo del Promedio: La `sumaNotas` se divide por el `notas.length` para obtener el promedio.
5. Clasificación del Rendimiento: El `promedio` calculado se compara con umbrales predefinidos:
   - `>= 4.0`: "Alto"
   - `>= 3.0`: "Medio"
   - `< 3.0`: "Bajo"

Salidas:
- Un objeto con las propiedades `promedio` (número o `null` si hay error) y `rendimiento` (string con la categoría de rendimiento o mensaje de error).

Reglas de Negocio:
- Las calificaciones deben ser valores numéricos entre 0 y 5.
- El rendimiento se clasifica en "Alto", "Medio" o "Bajo" según los umbrales definidos.

Casos Límite:
- Array de notas vacío: Retorna `promedio: 0` y `rendimiento: "No se ingresaron notas."`.
- Notas inválidas (no numéricas, fuera de rango): Retorna `promedio: null` y un mensaje de error específico.
- Promedio justo en el umbral: (ej. 3.0, 4.0) se clasifica en la categoría superior (Medio, Alto).

Decisiones de Diseño Justificadas:
1. Uso de `Array.prototype.reduce()` para la suma de notas:
   - Por qué: `reduce()` es un método funcional de los arrays en JavaScript que es ideal para transformar un array en un único valor (en este caso, la suma). Su uso mejora la legibilidad y la concisión del código en comparación con un bucle `for` tradicional para esta tarea específica. Promueve un estilo de programación más declarativo, enfocándose en "qué" se hace en lugar de "cómo".
   - Alternativas consideradas: Un bucle `for...of` o un bucle `for` clásico. Descartadas por ser más verbosas para la simple operación de suma.
2. Validación de cada nota individual al inicio de la función:
   - Por qué: Al validar cada nota en el array de entrada antes de cualquier cálculo, la función asegura la integridad de los datos que procesará. Esto previene que una única nota malformada o fuera de rango corrompa el cálculo del promedio o cause comportamientos inesperados más adelante. Detener la ejecución con un mensaje de error claro en caso de dato inválido es un principio de "fail-fast" que mejora la robustez y la depuración del código.
   - Alternativas consideradas: Permitir que la función intente promediar notas inválidas (lo que resultaría en `NaN` o errores si no se maneja explícitamente), o realizar la validación fuera de la función. Descartadas porque la validación dentro de la función la hace autocontenida y más fiable.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 3: Análisis de Calificaciones ---");

let notasInputValido = false;
let listaNotas = [];

// Comentario: Bucle para solicitar y validar la entrada de notas.
// Propósito: Asegurar que el usuario ingrese una serie de números válidos para las calificaciones,
// separados por comas, y que cada número esté en el rango de 0 a 5.
while (!notasInputValido) {
    const notasStr = prompt('Ingresa las calificaciones separadas por comas (0-5): ');
    const notasRaw = notasStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    listaNotas = [];
    let todasNotasValidas = true;

    if (notasRaw.length === 0) {
        console.log("No ingresaste ninguna nota. El promedio será 0.");
        notasInputValido = true; // Permite continuar para que la función maneje el array vacío.
        break; // Sale del bucle porque el caso de array vacío ya está previsto.
    }

    for (const notaStr of notasRaw) {
        const nota = Number(notaStr);
        // Validamos si es un número y si está dentro del rango.
        if (isNaN(nota) || nota < 0 || nota > 5) {
            console.log(`Error: "${notaStr}" no es una nota válida. Debe ser un número entre 0 y 5.`);
            todasNotasValidas = false;
            break; // Salimos del bucle interno si encontramos una nota inválida.
        }
        listaNotas.push(nota);
    }

    if (todasNotasValidas) {
        notasInputValido = true;
    } else {
        console.log("Por favor, vuelve a ingresar las notas correctamente.");
    }
}

// Llamamos a nuestra función principal para calcular el promedio y rendimiento.
const resultado = calcularPromedio(listaNotas);

// Mostramos el resultado al usuario.
if (resultado.promedio !== null) {
    console.log(`Promedio: ${resultado.promedio.toFixed(2)}`); // Formateamos el promedio a 2 decimales.
    console.log(`Rendimiento: ${resultado.rendimiento}`);
} else {
    // Si promedio es null, significa que hubo un error de validación en la función.
    console.log(`Error en el cálculo: ${resultado.rendimiento}`);
}

console.log("--- Fin del Ejercicio 3 ---");