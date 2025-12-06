// ejercicio2.js
// Este módulo calcula el inventario final y determina su estado (crítico o estable)
// basándose en las cantidades iniciales, vendidas y recibidas de un producto.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function calcularInventario
 * @description Calcula el inventario final de un producto y su estado basado en umbrales.
 *              Realiza validaciones sobre las cantidades de entrada y la coherencia del stock.
 *
 * @param {number} inicial - Cantidad inicial de producto en inventario.
 * @param {number} vendida - Cantidad de producto vendida.
 * @param {number} recibida - Cantidad de producto recibida (reabastecimiento).
 * @returns {Object} Un objeto con dos propiedades:
 *                   - inventarioFinal: El número de unidades restantes o `null` si hay un error.
 *                   - estado: Una cadena de texto indicando el estado del inventario ("Inventario crítico",
 *                             "Inventario estable") o un mensaje de error.
 *
 * @comment Esta función encapsula la lógica de negocio para el cálculo del inventario.
 *          Fue diseñada para ser robusta, incluyendo validaciones iniciales para prevenir
 *          cálculos con datos ilógicos o negativos, y para proporcionar un estado claro del inventario.
 */
function calcularInventario(inicial, vendida, recibida) {
    // Comentario: Validación de entradas negativas.
    // Propósito: Asegurar que todas las cantidades sean positivas, ya que no tiene sentido
    // trabajar con cantidades negativas en un contexto de inventario físico.
    if (inicial < 0 || vendida < 0 || recibida < 0) {
        return {
            inventarioFinal: null,
            estado: "Error: Todas las cantidades deben ser números positivos."
        };
    }

    // Comentario: Validación de coherencia del stock.
    // Propósito: Evitar que se registren ventas mayores a la suma total de productos
    // disponibles (inicial + recibida), lo cual es físicamente imposible y un error lógico.
    if (vendida > inicial + recibida) {
        return {
            inventarioFinal: null,
            estado: "Error: No se pueden vender más unidades de las que hay en existencia."
        };
    }

    // Comentario: Cálculo del inventario final.
    // Propósito: Realizar la operación aritmética central del módulo.
    // Restamos lo vendido del stock inicial y sumamos lo recibido.
    const inventarioFinal = inicial - vendida + recibida;
    let estadoInventario;

    // Comentario: Determinación del estado del inventario.
    // Propósito: Clasificar el inventario en categorías ("crítico" o "estable")
    // basándose en un umbral predefinido de 5 unidades. Esto ayuda a la toma de decisiones.
    if (inventarioFinal < 5) {
        estadoInventario = "Inventario crítico";
    } else {
        estadoInventario = "Inventario estable";
    }

    // Comentario: Retorno del resultado.
    // Propósito: Devolver un objeto que contiene tanto el valor calculado del inventario
    // como su estado cualitativo, facilitando el uso de ambos datos.
    return {
        inventarioFinal: inventarioFinal,
        estado: estadoInventario
    };
}

// --- Explicación Técnica para el Ejercicio 2 ---

/*
Entradas:
- inicial: Número entero o decimal que representa la cantidad de producto al inicio del período.
- vendida: Número entero o decimal que representa la cantidad de producto que se ha vendido.
- recibida: Número entero o decimal que representa la cantidad de producto que se ha reabastecido.

Proceso:
1. Validación de Pre-condiciones: Antes de cualquier cálculo, la función verifica dos condiciones críticas:
   a. Todas las cantidades (inicial, vendida, recibida) deben ser números no negativos.
   b. La cantidad vendida no puede exceder la suma del inventario inicial y lo recibido.
   Si alguna validación falla, se retorna un objeto con `inventarioFinal: null` y un mensaje de error descriptivo en `estado`.
2. Cálculo Aritmético: Si las validaciones pasan, se calcula el `inventarioFinal` restando la `vendida` del `inicial` y sumando la `recibida`.
3. Determinación de Estado: El `inventarioFinal` se compara con un umbral fijo (5 unidades). Si es menor que 5, el estado es "Inventario crítico"; de lo contrario, es "Inventario estable".

Salidas:
- Un objeto con las propiedades `inventarioFinal` (número o `null` si hay error) y `estado` (string con el estado o mensaje de error).

Reglas de Negocio:
- Las cantidades de inventario no pueden ser negativas.
- No se pueden vender unidades que no existen físicamente.
- Un inventario final por debajo de 5 unidades se considera "crítico".

Casos Límite:
- Cantidades cero: (e.g., inicial=0, vendida=0, recibida=0) => inventarioFinal=0, estado="Inventario crítico".
- Venta exactamente igual a disponibilidad: (e.g., inicial=10, vendida=10, recibida=0) => inventarioFinal=0, estado="Inventario crítico".
- Inventario final en el umbral: (e.g., inventarioFinal=4) => "Inventario crítico", (inventarioFinal=5) => "Inventario estable".
- Entrada de datos no numéricos: Manejado por la conversión a `Number()` en la interacción con el usuario; si resulta en `NaN`, la validación de negativos fallaría o el cálculo sería `NaN`.

Decisiones de Diseño Justificadas:
1. Retorno de un objeto para encapsular resultados y estado:
   - Por qué: En lugar de retornar solo el `inventarioFinal` o lanzar una excepción en caso de error, la función devuelve un objeto ` { inventarioFinal, estado } `. Esto permite que el llamador reciba tanto el resultado numérico como un mensaje cualitativo sobre el estado o la razón de un error de manera estructurada y fácil de manejar. Facilita la comunicación de múltiples piezas de información relevantes de una sola ejecución de la función.
   - Alternativas consideradas: Lanzar excepciones para errores (haría el código de llamada más complejo con bloques `try-catch` para un control simple), o usar múltiples argumentos de retorno (no es idiomático en JavaScript). El objeto de retorno es claro y extensible.
2. Validaciones tempranas y explícitas al inicio de la función:
   - Por qué: Las validaciones de `inicial < 0`, `vendida < 0`, `recibida < 0` y `vendida > inicial + recibida` se realizan al principio de la función. Esto previene cálculos innecesarios con datos inválidos o ilógicos, lo que hace que la función sea más eficiente y robusta. Si los datos no cumplen con las pre-condiciones, la función termina de inmediato con un mensaje de error claro, evitando resultados erróneos en etapas posteriores.
   - Alternativas consideradas: Permitir cálculos con negativos y luego interpretar el resultado (riesgo de lógica incorrecta); o realizar validaciones fuera de la función (menos encapsulamiento y reusabilidad).

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 2: Cálculo y Estado de Inventario ---");

let cantidadInicial, cantidadVendida, cantidadRecibida;

// Comentario: Solicitar y validar la cantidad inicial.
// Propósito: Obtener un número válido para el stock inicial del usuario.
while (true) {
    const input = prompt('Ingresa la cantidad inicial en inventario: ');
    cantidadInicial = Number(input);
    if (!isNaN(cantidadInicial)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Comentario: Solicitar y validar la cantidad vendida.
// Propósito: Obtener un número válido para las unidades vendidas.
while (true) {
    const input = prompt('Ingresa la cantidad vendida: ');
    cantidadVendida = Number(input);
    if (!isNaN(cantidadVendida)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Comentario: Solicitar y validar la cantidad recibida.
// Propósito: Obtener un número válido para las unidades reabastecidas.
while (true) {
    const input = prompt('Ingresa la cantidad recibida: ');
    cantidadRecibida = Number(input);
    if (!isNaN(cantidadRecibida)) break;
    console.log("Entrada inválida. Por favor, ingresa un número.");
}

// Llamamos a nuestra función principal para calcular el inventario.
const resultado = calcularInventario(cantidadInicial, cantidadVendida, cantidadRecibida);

// Mostramos el resultado al usuario de forma clara.
if (resultado.inventarioFinal !== null) {
    console.log(`Inventario Final: ${resultado.inventarioFinal}`);
    console.log(`Estado: ${resultado.estado}`);
} else {
    // Si inventarioFinal es null, significa que hubo un error.
    console.log(`Error en el cálculo: ${resultado.estado}`);
}

console.log("--- Fin del Ejercicio 2 ---");