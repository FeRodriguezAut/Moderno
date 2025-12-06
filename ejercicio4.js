// ejercicio4.js
// Este módulo toma una lista de precios, los ordena y encuentra el precio más alto y el más bajo.
// Incluye validaciones para asegurar que los precios sean números válidos y no negativos.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function ordenarYEncontrarExtremos
 * @description Recibe un array de precios, los valida, los ordena de forma descendente
 *              y encuentra el precio más alto y el más bajo.
 *
 * @param {Array<number>} precios - Un array de números que representan precios.
 * @returns {Object} Un objeto con las propiedades:
 *                   - ordenados: Array de precios ordenados de mayor a menor, o `null` si hay un error.
 *                   - masAlto: El precio más alto, o `null` si hay un error o lista vacía.
 *                   - masBajo: El precio más bajo, o `null` si hay un error o lista vacía.
 *                   - error: Mensaje de error si la validación falla, o `null` si no hay errores.
 *
 * @comment Esta función es fundamental para el análisis de datos de precios. Su diseño incluye
 *          validaciones robustas para garantizar que solo se procesen datos numéricos válidos,
 *          la inmutabilidad del array original y un ordenamiento claro para facilitar
 *          la extracción de los valores extremos.
 */
function ordenarYEncontrarExtremos(precios) {
    // Comentario: Manejo de caso para arreglo vacío o nulo.
    // Propósito: Evitar errores en operaciones sobre arrays vacíos y proporcionar un mensaje claro al usuario.
    if (!precios || precios.length === 0) {
        return { ordenados: [], masAlto: null, masBajo: null, error: "La lista de precios está vacía." };
    }

    // Comentario: Validación de elementos numéricos y no negativos.
    // Propósito: Asegurar que todos los elementos en el array sean números válidos y representen
    // precios lógicos (no negativos). Esto previene cálculos con datos corruptos.
    for (const precio of precios) {
        if (typeof precio !== 'number' || isNaN(precio) || precio < 0) {
            return { ordenados: null, masAlto: null, masBajo: null, error: `El valor "${precio}" no es un precio válido. Debe ser un número no negativo.` };
        }
    }

    // Comentario: Creación de una copia del array original.
    // Propósito: Mantener la inmutabilidad del array de entrada original.
    // Esto significa que la función no modificará el array 'precios' que se le pasó,
    // lo que es una buena práctica de programación y evita efectos secundarios inesperados.
    const preciosCopia = [...precios];

    // Comentario: Ordenamiento descendente numérico con `sort()`.
    // Propósito: Organizar los precios de mayor a menor para facilitar la identificación
    // de los valores extremos. La función de comparación `(a, b) => b - a` es estándar para orden descendente.
    const preciosOrdenados = preciosCopia.sort((a, b) => b - a);

    // Comentario: Identificación del precio más alto y más bajo.
    // Propósito: Extraer los valores extremos de la lista ya ordenada.
    // Después de ordenar descendentemente, el primer elemento es el más alto y el último es el más bajo.
    const precioMasAlto = preciosOrdenados[0];
    const precioMasBajo = preciosOrdenados[preciosOrdenados.length - 1];

    // Comentario: Retorno de los resultados.
    // Propósito: Entregar un objeto consolidado con el array ordenado, el más alto y el más bajo,
    // y un indicador de error si lo hubiera.
    return {
        ordenados: preciosOrdenados,
        masAlto: precioMasAlto,
        masBajo: precioMasBajo,
        error: null // Indica que no hubo errores de validación interna.
    };
}

// --- Explicación Técnica para el Ejercicio 4 ---

/*
Entradas:
- precios: Un array de números. Cada número representa un precio individual de un producto o servicio.

Proceso:
1. Validación de Array de Entrada: Se verifica si el array `precios` es nulo o está vacío. Si lo es, se devuelve un objeto indicando la lista vacía.
2. Validación de Elementos Individuales: Se itera sobre cada `precio` en el array para asegurar que:
   a. Sea un tipo `number` y no `NaN`.
   b. Sea un número no negativo (`precio >= 0`), ya que los precios no pueden ser negativos.
   Si alguna validación falla, la función retorna un objeto con `error` y los demás valores como `null`.
3. Creación de Copia: Se crea una copia del array `precios` (`preciosCopia`) utilizando el operador spread. Esto asegura que el array original pasado a la función no sea modificado (principio de inmutabilidad).
4. Ordenamiento: La `preciosCopia` se ordena de forma descendente (de mayor a menor) utilizando el método `Array.prototype.sort()` con una función de comparación `(a, b) => b - a`.
5. Extracción de Extremos: Una vez ordenado el array, el `precioMasAlto` es el primer elemento (`preciosOrdenados[0]`) y el `precioMasBajo` es el último elemento (`preciosOrdenados[preciosOrdenados.length - 1]`).

Salidas:
- Un objeto con las propiedades:
  - `ordenados`: El array de precios ordenado descendentemente.
  - `masAlto`: El precio más alto encontrado.
  - `masBajo`: El precio más bajo encontrado.
  - `error`: Un mensaje de error si alguna validación falló, o `null` si la operación fue exitosa.

Reglas de Negocio:
- Los precios deben ser valores numéricos y no negativos.
- La lista de precios no debe estar vacía para encontrar extremos (aunque se maneja el caso).
- El ordenamiento debe ser descendente.

Casos Límite:
- Array de precios vacío o nulo: La función retorna un objeto indicando una lista vacía.
- Precios inválidos (no numéricos, negativos): La función retorna un error específico y valores `null` para los resultados.
- Array con un solo precio: El precio más alto y más bajo serán el mismo.
- Todos los precios iguales: El array ordenado contendrá los mismos valores, y el más alto y más bajo serán ese valor.

Decisiones de Diseño Justificadas:
1. Inmutabilidad del array de entrada mediante la creación de una copia:
   - Por qué: Se optó por crear una copia del array `precios` utilizando el operador spread (`[...precios]`) antes de realizar cualquier modificación (como el ordenamiento). Esta es una buena práctica de programación funcional que garantiza que la función no tenga efectos secundarios inesperados en el array original que le fue pasado. El array de entrada (`precios`) permanece inalterado, lo que hace que la función sea más predecible y fácil de usar en un contexto más amplio donde el array original podría ser necesario para otras operaciones.
   - Alternativas consideradas: Modificar el array `precios` directamente. Descartado por las razones de inmutabilidad y efectos secundarios.
2. Uso de `Array.prototype.sort()` con función de comparación `(a, b) => b - a` para ordenamiento descendente:
   - Por qué: El método `sort()` de JavaScript es una herramienta incorporada y eficiente para ordenar arrays. Al proporcionarle la función de comparación `(a, b) => b - a`, se logra un ordenamiento numérico descendente de manera concisa. Este enfoque es estándar y ampliamente reconocido, lo que contribuye a la legibilidad y mantenibilidad del código. Una vez ordenado, la identificación de los valores extremos es trivial y muy eficiente (acceso directo al primer y último elemento).
   - Alternativas consideradas: Implementar un algoritmo de ordenamiento manual (como Bubble Sort, Merge Sort, etc.). Descartado por ser innecesariamente complejo para JavaScript, que ya provee una implementación optimizada y nativa a través de `sort()`. Otra alternativa podría ser encontrar `Math.max` y `Math.min` directamente sin ordenar, pero el requisito era también devolver la lista ordenada.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 4: Ordenamiento y Extremos de Precios ---");

let preciosInputValido = false;
let listaPrecios = [];

// Comentario: Bucle para solicitar y validar la entrada de precios.
// Propósito: Asegurar que el usuario ingrese una serie de números válidos y no negativos para los precios,
// separados por comas.
while (!preciosInputValido) {
    const preciosStr = prompt('Ingresa los precios separados por comas (ej. 10.5, 20, 5.25): ');
    const preciosRaw = preciosStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    listaPrecios = [];
    let todosPreciosValidos = true;

    if (preciosRaw.length === 0) {
        // Si no ingresa nada, se considera una lista vacía que la función maneja.
        console.log("No ingresaste ningún precio. La función manejará la lista vacía.");
        preciosInputValido = true;
        break;
    }

    for (const precioStr of preciosRaw) {
        const precio = Number(precioStr);
        // Validamos si es un número y si es no negativo.
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

// Llamamos a nuestra función principal para ordenar y encontrar los extremos.
const resultado = ordenarYEncontrarExtremos(listaPrecios);

// Mostramos el resultado al usuario.
if (!resultado.error) {
    console.log("Precios Ordenados (de mayor a menor):", resultado.ordenados);
    console.log("Precio Más Alto:", resultado.masAlto);
    console.log("Precio Más Bajo:", resultado.masBajo);
} else {
    // Si hubo un error de validación en la función.
    console.log(`Error: ${resultado.error}`);
}

console.log("--- Fin del Ejercicio 4 ---");
