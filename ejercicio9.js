// ejercicio9.js
// Este módulo se encarga de procesar una lista de pagos, clasificándolos como
// "aprobados" o "rechazados" según una regla de aprobación definida por un callback.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function procesarPagos
 * @description Procesa un array de pagos, aplicando una función de callback para determinar
 *              si cada pago es aprobado o rechazado. Retorna dos arrays: uno con pagos aprobados
 *              y otro con pagos rechazados. Los pagos originales no son mutados; se añade un
 *              estado de aprobación a copias de los objetos de pago.
 *
 * @param {Array<Object>} pagos - Un array de objetos, donde cada objeto representa un pago.
 *                                Se espera que cada pago tenga propiedades como 'id', 'monto', 'cliente', etc.
 * @param {function(Object): boolean} callback - Una función de callback que actúa como la regla de aprobación.
 *   @callback callback
 *   @param {Object} pago - Un objeto que representa un pago individual de la lista.
 *                          Ej: `{ id: 'P001', monto: 120, cliente: 'Juan Perez', fecha: '2025-11-20' }`
 *   @returns {boolean} - Debe retornar `true` si el pago cumple la regla de aprobación y es aprobado,
 *                        `false` en caso contrario (rechazado).
 *   @responsibility El `callback` es el encargado de contener la lógica específica que define si un pago
 *                   es válido o no, permitiendo una gran flexibilidad en las políticas de aprobación.
 *
 * @returns {Object} Un objeto con dos propiedades:
 *                   - aprobados: Array de pagos que fueron aprobados, cada uno con una propiedad `aprobacionEstado: 'aprobado'`.
 *                   - rechazados: Array de pagos que fueron rechazados, cada uno con una propiedad `aprobacionEstado: 'rechazado'`.
 *                   Retorna arrays vacíos si la lista de pagos no es válida o si el callback no es una función.
 *
 * @comment Esta función demuestra el poder de los callbacks para implementar lógicas de negocio
 *          variables. La función `procesarPagos` se encarga de la iteración y clasificación, 
 *          mientras que el `callback` define la "inteligencia" de la aprobación, haciendo
 *          el sistema modular y fácil de extender para nuevas reglas.
 */
function procesarPagos(pagos, callback) {
    // Comentario: Validación de entrada 'pagos'.
    // Propósito: Asegurar que la lista de pagos sea un array. Un input no array impediría la iteración.
    if (!Array.isArray(pagos)) {
        console.error("Error (procesarPagos): La lista de pagos debe ser un arreglo.");
        return { aprobados: [], rechazados: [] };
    }
    // Comentario: Validación de entrada 'callback'.
    // Propósito: Asegurar que la regla de aprobación sea una función válida.
    // Un callback no funcional causaría un error al intentar llamarlo.
    if (typeof callback !== 'function') {
        console.error("Error (procesarPagos): El callback de regla de aprobación debe ser una función.");
        return { aprobados: [], rechazados: [] };
    }

    const aprobados = [];
    const rechazados = [];

    // Comentario: Iteración inmutable aplicando el callback.
    // Propósito: Recorrer cada pago, aplicar la regla de aprobación y clasificarlo.
    // Se crea una copia del objeto pago para añadir el estado sin modificar el original.
    pagos.forEach(pago => {
        // Comentario: Creación de copia del pago para añadir estado.
        // Propósito: Utilizar el operador spread `{ ...pago }` crea una copia superficial del objeto `pago`.
        // Esto permite añadir la propiedad `aprobacionEstado` sin alterar el objeto de pago original
        // que se encuentra en el array `pagos`, manteniendo la inmutabilidad de los datos de entrada.
        const pagoConEstado = { ...pago }; 
        if (callback(pago)) { // La función callback recibe el pago original para su evaluación.
            pagoConEstado.aprobacionEstado = 'aprobado';
            aprobados.push(pagoConEstado);
        } else {
            pagoConEstado.aprobacionEstado = 'rechazado';
            rechazados.push(pagoConEstado);
        }
    });

    // Comentario: Retorno de pagos aprobados y rechazados.
    // Propósito: Devolver un objeto que contiene ambos arrays resultantes de la clasificación.
    return { aprobados, rechazados };
}

// --- Explicación Técnica para el Ejercicio 9 ---

/*
Entradas:
- pagos: Un array de objetos, donde cada objeto representa un pago. Se espera que cada pago tenga propiedades relevantes como `id`, `monto`, `cliente`, `fecha`, etc.
- callback: Una función. Esta función se utiliza como la "regla de aprobación". Recibe un objeto `pago` como argumento y debe retornar un valor booleano (`true` para aprobado, `false` para rechazado).

Proceso:
1. Validaciones Iniciales: La función `procesarPagos` verifica que `pagos` sea un array y que `callback` sea una función. Si alguna validación falla, retorna un objeto con arrays `aprobados` y `rechazados` vacíos y un mensaje de error por consola.
2. Inicialización de Arrays de Resultados: Se crean dos arrays vacíos, `aprobados` y `rechazados`, para almacenar los pagos clasificados.
3. Iteración y Clasificación: La función itera sobre cada `pago` en el array `pagos` utilizando `forEach`. Para cada pago:
   a. Se crea una copia superficial del objeto `pago` (`pagoConEstado`) usando el operador spread. Esto asegura que no se modifique el objeto `pago` original.
   b. Se ejecuta el `callback` (la regla de aprobación) pasando el `pago` original como argumento.
   c. Dependiendo del valor booleano retornado por el `callback`, se añade una propiedad `aprobacionEstado` ('aprobado' o 'rechazado') a `pagoConEstado`.
   d. El `pagoConEstado` modificado se añade al array `aprobados` o `rechazados` correspondiente.
4. Retorno: La función retorna un objeto que contiene los dos arrays, `aprobados` y `rechazados`.

Salidas:
- Un objeto que contiene:
  - `aprobados`: Un array de pagos que cumplieron la `callback`, cada uno con `aprobacionEstado: 'aprobado'`.
  - `rechazados`: Un array de pagos que no cumplieron la `callback`, cada uno con `aprobacionEstado: 'rechazado'`.

Reglas de Negocio:
- La lógica de aprobación o rechazo de un pago es externa y se inyecta a través de una función `callback`.
- Los objetos de pago originales en el array de entrada (`pagos`) no deben ser mutados; los resultados deben contener copias con un nuevo estado de aprobación.

Casos Límite:
- `pagos` vacío o no un array: Retorna `{ aprobados: [], rechazados: [] }`.
- `callback` no es una función: Retorna `{ aprobados: [], rechazados: [] }`.
- Todos los pagos aprobados/rechazados: Uno de los arrays de resultado estará vacío.
- Pagos con propiedades faltantes: La `callback` debe ser robusta para manejar propiedades `undefined` si los pagos pueden variar.

Decisiones de Diseño Justificadas:
1. Uso de `callback` para la regla de aprobación (`reglaDeAprobacionCallback`):
   - Por qué: Esta es una implementación clave del patrón Strategy. La función `procesarPagos` se centra en la orquestación (iterar, clasificar, construir resultados), mientras que el `callback` proporciona la estrategia específica para determinar la aprobación. Esto hace que `procesarPagos` sea altamente reutilizable y flexible. Se pueden definir y pasar diferentes reglas de aprobación sin modificar el código principal de procesamiento, lo que facilita el mantenimiento y la extensibilidad del sistema. Es ideal para situaciones donde la lógica de negocio puede cambiar con frecuencia o donde se necesitan múltiples lógicas de aprobación.
   - Alternativas consideradas: Implementar las reglas de aprobación directamente dentro de `procesarPagos` con `if/else if` o `switch`. Descartada por la rigidez que esto introduciría, haciendo la función menos adaptable a nuevas reglas sin modificar su código interno.
2. Inmutabilidad de los objetos de pago de entrada (`{ ...pago }`):
   - Por qué: Al crear una copia superficial de cada objeto `pago` usando el operador spread (`{ ...pago }`) antes de añadir la propiedad `aprobacionEstado`, la función garantiza que los objetos de pago originales en el array de entrada no sean modificados. Esta práctica de inmutabilidad es crucial para prevenir efectos secundarios no deseados en otras partes del programa que puedan estar usando los mismos objetos de pago. Mejora la previsibilidad del código, facilita la depuración y contribuye a un diseño más robusto.
   - Alternativas consideradas: Mutar directamente el objeto `pago` añadiendo `pago.aprobacionEstado`. Descartada por las desventajas de la mutación de estado compartido y los efectos secundarios.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 9: Procesamiento de Pagos con Callbacks ---");

// Comentario: Definición de una lista de pagos de ejemplo.
// Propósito: Proporcionar datos de prueba para la función `procesarPagos`.
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
// Comentario: Bucle para solicitar una opción de regla de aprobación válida.
// Propósito: Guiar al usuario para que elija cómo clasificar los pagos.
while (!['1', '2', '3'].includes(opcionRegla)) {
    opcionRegla = prompt('Elige una opción (1, 2 o 3): ');
}

let reglaDeAprobacionCallback; // Esta variable almacenará la función de callback.

// Comentario: Construcción dinámica del callback basado en la opción del usuario.
// Propósito: Crear la función específica que `procesarPagos` usará para aprobar/rechazar.
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
        // Convertimos la fecha de comparación para poder comparar correctamente.
        const fechaLimite = new Date('2025-12-01T00:00:00.000Z'); // Usar UTC para evitar problemas de zona horaria
        reglaDeAprobacionCallback = (pago) => {
            const fechaPago = new Date(pago.fecha + 'T00:00:00.000Z'); // Asumimos que la fecha del pago es al inicio del día en UTC
            return fechaPago < fechaLimite;
        };
        console.log("Regla: Aprobando pagos realizados ANTES del 1 de Diciembre de 2025.");
        break;
}

// Llamamos a nuestra función principal `procesarPagos` con la lista de pagos y el callback generado.
const resultadoProcesamiento = procesarPagos(listaDePagos, reglaDeAprobacionCallback);

// Mostramos los resultados.
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