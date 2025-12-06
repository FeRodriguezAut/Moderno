// ejercicio7.js
// Este módulo permite registrar productos, asegurando que cada producto se almacene
// una única vez, ignorando diferencias de mayúsculas/minúsculas y espacios extra.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function registrarProductos
 * @description Registra una lista de productos, asegurando que solo se almacenen nombres únicos.
 *              La unicidad se determina después de normalizar los nombres (quitar espacios, minúsculas).
 *
 * @param {...string} productos - Un número variable de argumentos de tipo string, cada uno representando un producto.
 * @returns {Array<string>} Un array de strings, donde cada string es el nombre de un producto único y normalizado.
 *
 * @comment Esta función es útil para mantener un inventario o catálogo de productos sin duplicados.
 *          El uso de `Set` es la clave para la eficiencia y simplicidad en la gestión de la unicidad,
 *          mientras que la normalización asegura que "Manzana" y "manzana " se traten como el mismo producto.
 */
function registrarProductos(...productos) {
    // Comentario: Uso de 'Set' para asegurar unicidad.
    // Propósito: `Set` es una colección de valores únicos. Es perfecto para esta tarea porque
    // automáticamente previene la adición de elementos duplicados.
    const productosRegistrados = new Set();

    // Comentario: Iterar sobre productos.
    // Propósito: Procesar cada producto ingresado individualmente.
    for (const producto of productos) {
        // Comentario: Normalización de producto.
        // Propósito: Limpiar el nombre del producto eliminando espacios al inicio/final (`trim()`)
        // y convirtiéndolo a minúsculas (`toLowerCase()`). Esto garantiza que "Manzana" y "  manzana  "
        // sean tratados como el mismo producto.
        const productoNormalizado = producto.trim().toLowerCase();
        
        // Comentario: Añadir producto al Set.
        // Propósito: Agregar el producto normalizado al Set. Si el producto ya existe en el Set,
        // `add()` simplemente no hará nada, manteniendo la unicidad de forma automática.
        productosRegistrados.add(productoNormalizado);
    }

    // Comentario: Conversión de Set a Array para retorno.
    // Propósito: La función debe retornar un array. Convertimos el `Set` de productos únicos
    // de nuevo a un array para cumplir con el tipo de retorno esperado. El operador spread `...`
    // es una forma concisa de hacerlo.
    return [...productosRegistrados];
}

// --- Explicación Técnica para el Ejercicio 7 ---

/*
Entradas:
- `...productos`: Un número variable de argumentos de tipo string. Cada string es el nombre de un producto.
  El uso del operador rest (`...`) en la definición de la función permite que se le pasen múltiples argumentos
  que serán recolectados en un único array llamado `productos`.

Proceso:
1. Inicialización de `Set`: Se crea una instancia de `Set`, `productosRegistrados`. `Set` es una colección de valores únicos, lo que lo hace ideal para la tarea de eliminar duplicados.
2. Iteración y Normalización: La función itera sobre cada `producto` en el array `productos` (formado por los argumentos pasados). Para cada producto:
   a. Se normaliza el nombre del producto: `producto.trim().toLowerCase()`. Esto elimina los espacios en blanco iniciales y finales y convierte todas las letras a minúsculas, asegurando que la comparación de unicidad sea insensible a mayúsculas/minúsculas y formato de espacios.
   b. El `productoNormalizado` se añade al `productosRegistrados` `Set`. Debido a la naturaleza de `Set`, si un producto (una vez normalizado) ya existe, no se añade de nuevo, manteniendo así solo las entradas únicas.
3. Conversión a Array: Finalmente, el contenido del `productosRegistrados` `Set` se convierte de nuevo a un `Array` utilizando el operador spread (`[...]`), ya que el requisito es retornar una lista (array) de productos.

Salidas:
- Un array de strings, donde cada string es el nombre de un producto único y normalizado (minúsculas, sin espacios extra).

Reglas de Negocio:
- Los productos se consideran duplicados si, una vez normalizados (sin espacios extra y en minúsculas), sus nombres coinciden.
- La función debe aceptar un número variable de productos como entrada.

Casos Límite:
- No se pasan productos: La función retornará un array vacío `[]`.
- Productos con solo espacios o cadenas vacías: Tras la normalización, se añadirían como una cadena vacía al `Set` si es el primer caso.
- Combinación de productos con y sin espacios/mayúsculas (ej. "Manzana", "  manzana", "MANZANA "): Todos se normalizarán a "manzana" y solo se registrará una vez.

Decisiones de Diseño Justificadas:
1. Uso de `Set` para asegurar la unicidad de los productos:
   - Por qué: `Set` es una estructura de datos nativa en JavaScript diseñada específicamente para almacenar valores únicos. Su método `add()` verifica automáticamente si un elemento ya existe antes de agregarlo, lo que simplifica enormemente la lógica de deduplicación. Es altamente eficiente para esta tarea, especialmente cuando se trabaja con un gran número de elementos, en comparación con soluciones que implicarían búsquedas manuales o filtrados en arrays.
   - Alternativas consideradas: Iterar sobre un array y usar `Array.prototype.includes()` para verificar duplicados antes de añadir (menos eficiente para grandes colecciones), o usar un objeto como mapa `{'producto': true}`. `Set` es más directo y expresivo para la gestión de unicidad de valores.
2. Normalización de los nombres de productos (`trim().toLowerCase()`):
   - Por qué: Para que la deduplicación sea "intuitiva" desde la perspectiva del usuario (es decir, que "Manzana" y " manzana " se consideren el mismo producto), es crucial normalizar las entradas. `trim()` elimina cualquier espacio en blanco superfluo que el usuario pueda haber introducido accidentalmente al inicio o al final del nombre, y `toLowerCase()` asegura que la comparación no distinga entre mayúsculas y minúsculas. Juntos, estos métodos crean una representación consistente para cada nombre de producto antes de que se almacene en el `Set`, haciendo la lógica de unicidad más robusta y amigable.
   - Alternativas consideradas: No normalizar (la deduplicación sería sensible a mayúsculas y espacios, lo que no sería deseable para este caso), o usar expresiones regulares más complejas para limpiar los nombres. `trim().toLowerCase()` es una solución simple, eficaz y de fácil comprensión.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 7: Registro de Productos Únicos ---");

let productosInputValido = false;
let productosIngresados = [];

// Comentario: Bucle para solicitar y procesar la entrada de productos.
// Propósito: Obtener una lista de nombres de productos del usuario y prepararlos para la función.
while (!productosInputValido) {
    const productosStr = prompt('Ingresa los nombres de los productos (separados por comas): ');
    
    // Convertimos la cadena de entrada en un array de strings.
    // Usamos .split(',') para separar por comas y .map(s => s.trim()) para limpiar espacios extra en cada nombre.
    // filter(s => s.length > 0) para ignorar entradas completamente vacías resultantes de comas consecutivas, etc.
    const productosTemp = productosStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (productosTemp.length === 0 && productosStr.trim().length > 0) {
        // Esto captura casos donde se ingresan solo comas o espacios que resultan en un array vacío después del filter
        console.log("Entrada inválida. Por favor, ingresa al menos un nombre de producto válido.");
    } else {
        productosIngresados = productosTemp;
        productosInputValido = true;
    }
}

// Llamamos a nuestra función principal para registrar los productos.
// Usamos el operador spread (...) para pasar cada elemento del array `productosIngresados`
// como un argumento individual a la función `registrarProductos`.
const productosUnicos = registrarProductos(...productosIngresados);

// Mostramos el resultado al usuario.
if (productosUnicos.length > 0) {
    console.log("Productos únicos registrados:");
    productosUnicos.forEach(producto => console.log(`- ${producto}`));
} else {
    console.log("No se registraron productos únicos.");
}

console.log("--- Fin del Ejercicio 7 ---");