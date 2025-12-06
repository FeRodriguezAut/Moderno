// ejercicio8.js
// Este módulo implementa una función genérica para buscar cursos en un catálogo
// utilizando una función de callback para definir el criterio de búsqueda.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function buscarCursos
 * @description Filtra un catálogo de cursos basándose en un criterio proporcionado por una función de callback.
 *              Esta función es "pura" en el sentido de que no modifica el catálogo original.
 *
 * @param {Array<Object>} catalogo - Un array de objetos, donde cada objeto representa un curso.
 *                                   Se espera que cada curso tenga propiedades como 'nombre', 'descripcion', etc.
 * @param {function(Object): boolean} callback - Una función de callback que define el criterio de búsqueda.
 *   @callback callback
 *   @param {Object} curso - Un objeto que representa un curso individual del catálogo.
 *                          Ej: `{ id: 1, nombre: "Introducción a JavaScript", duracion: 10, disponible: true }`
 *   @returns {boolean} - Debe retornar `true` si el curso cumple con el criterio de búsqueda, `false` en caso contrario.
 *   @responsibility El `callback` es el encargado de implementar la lógica específica de filtrado. Recibe cada curso
 *                   del catálogo y decide, basándose en sus propiedades, si ese curso debe ser incluido en los resultados.
 *
 * @returns {Array<Object>} Un nuevo array que contiene solo los cursos que cumplen con el criterio del callback.
 *                          Retorna un array vacío si el catálogo no es válido o si el callback no es una función.
 *
 * @comment Esta función es un ejemplo clásico de cómo se pueden utilizar los callbacks para hacer que el código
 *          sea más flexible y reutilizable. La lógica de búsqueda es "inyectada" desde fuera, permitiendo
 *          diferentes tipos de filtrado sin modificar la función principal `buscarCursos`.
 */
function buscarCursos(catalogo, callback) {
    // Comentario: Validación de entrada 'catalogo'.
    // Propósito: Asegurar que el catálogo sea realmente un array. Si no lo es, no se puede filtrar.
    if (!Array.isArray(catalogo)) {
        console.error("Error (buscarCursos): El catálogo debe ser un arreglo.");
        return [];
    }
    // Comentario: Validación de entrada 'callback'.
    // Propósito: Asegurar que se ha proporcionado una función como callback.
    // Un callback no funcional haría que 'filter' falle.
    if (typeof callback !== 'function') {
        console.error("Error (buscarCursos): El callback de búsqueda debe ser una función.");
        return [];
    }

    // Comentario: Uso de 'filter()' para aplicar criterio.
    // Propósito: `filter()` es el método de array ideal para crear un nuevo array
    // con todos los elementos que pasen la prueba implementada por la función 'callback'.
    const cursosEncontrados = catalogo.filter(callback);

    // Comentario: Función pura: no modifica el catálogo original.
    // Propósito: La función `buscarCursos` no altera el array `catalogo` original.
    // Esto es una buena práctica de programación que previene efectos secundarios.
    return cursosEncontrados;
}

// --- Explicación Técnica para el Ejercicio 8 ---

/*
Entradas:
- catalogo: Un array de objetos. Cada objeto representa un curso y debe contener propiedades relevantes para la búsqueda (ej., `nombre`, `descripcion`, `duracion`, `disponible`).
- callback: Una función. Esta función se aplicará a cada elemento del `catalogo` y debe retornar `true` si el elemento debe ser incluido en el resultado, o `false` en caso contrario.

Proceso:
1. Validaciones Iniciales: La función `buscarCursos` verifica que `catalogo` sea un array y que `callback` sea una función. Si alguna de estas condiciones no se cumple, retorna un array vacío y un mensaje de error por consola.
2. Aplicación del Callback: Utiliza el método `Array.prototype.filter()` del array `catalogo`. `filter()` itera sobre cada curso del catálogo y le pasa cada curso a la `callback` proporcionada.
3. Construcción del Resultado: `filter()` construye un nuevo array que solo contiene los cursos para los cuales el `callback` retornó `true`.
4. Retorno: La función `buscarCursos` retorna este nuevo array de cursos filtrados. El `catalogo` original no se modifica.

Salidas:
- Un array de objetos curso, que son un subconjunto del catálogo original, conteniendo solo aquellos cursos que satisfacen el criterio definido por el `callback`.

Reglas de Negocio:
- El criterio de búsqueda es completamente flexible y definido por la función `callback`.
- La función debe ser "pura", es decir, no debe modificar el catálogo de cursos original.

Casos Límite:
- `catalogo` vacío o no un array: Retorna `[]`.
- `callback` no es una función: Retorna `[]`.
- Ningún curso cumple el criterio: Retorna `[]`.
- Todos los cursos cumplen el criterio: Retorna una copia del `catalogo`.

Decisiones de Diseño Justificadas:
1. Uso de `Array.prototype.filter()` y un `callback` para la lógica de búsqueda:
   - Por qué: Esta es la decisión de diseño central. `filter()` es el método idiomático en JavaScript para crear un nuevo array con elementos que cumplen una condición. Al delegar la condición a un `callback` (función que se pasa como argumento), `buscarCursos` se vuelve altamente reusable y flexible. No necesita saber cómo filtrar; solo necesita saber que se le dará una función que lo hará. Esto desacopla la lógica de filtrado de la lógica de iteración, siguiendo el principio de inversión de control.
   - Alternativas consideradas: Implementar la lógica de filtrado directamente dentro de `buscarCursos` con múltiples `if/else if` o un `switch` para diferentes tipos de búsqueda. Descartada por su falta de flexibilidad y por no permitir criterios de búsqueda dinámicos o personalizados.
2. Preservación de la inmutabilidad del catálogo original:
   - Por qué: La función `buscarCursos` retorna un *nuevo* array con los resultados filtrados en lugar de modificar o operar sobre el `catalogo` de entrada directamente. Esta práctica de inmutabilidad es fundamental para crear código más predecible, más fácil de depurar y más seguro en entornos complejos. Asegura que el estado del catálogo original permanezca intacto para otras operaciones.
   - Alternativas consideradas: Modificar el catálogo de entrada (ej., eliminando cursos que no cumplen). Descartada por introducir efectos secundarios y hacer el código más difícil de razonar y mantener.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 8: Búsqueda de Cursos con Callback ---");

// Comentario: Definición de un catálogo de cursos de ejemplo.
// Propósito: Proporcionar datos de prueba para la función `buscarCursos`.
const catalogoCursos = [
    { id: 1, nombre: "Introducción a JavaScript", descripcion: "Fundamentos de programación con JS", duracion: 10, disponible: true },
    { id: 2, nombre: "Programación Orientada a Objetos en Python", descripcion: "Clases y objetos en Python", duracion: 15, disponible: false },
    { id: 3, nombre: "Bases de Datos SQL", descripcion: "Diseño y consulta de bases de datos", duracion: 8, disponible: true },
    { id: 4, nombre: "Desarrollo Web con React", descripcion: "Construcción de interfaces de usuario", duracion: 20, disponible: true },
    { id: 5, nombre: "Introducción a Machine Learning", descripcion: "Conceptos básicos de ML", duracion: 12, disponible: false }
];

console.log("\nCatálogo de Cursos Disponible:");
catalogoCursos.forEach(curso => console.log(`- ${curso.nombre} (${curso.duracion}h) [ID: ${curso.id}, Disponible: ${curso.disponible}]`));

console.log("\nOpciones de búsqueda:");
console.log("1. Buscar por palabra clave en nombre/descripción");
console.log("2. Buscar por duración mínima");
console.log("3. Buscar cursos disponibles");

let opcionBusqueda;
// Comentario: Bucle para solicitar una opción de búsqueda válida.
// Propósito: Guiar al usuario para que elija una forma de filtrar los cursos.
while (!['1', '2', '3'].includes(opcionBusqueda)) {
    opcionBusqueda = prompt('Elige una opción (1, 2 o 3): ');
}

let criterioCallback; // Esta variable almacenará la función de callback que se usará para filtrar.

// Comentario: Construcción dinámica del callback basado en la opción del usuario.
// Propósito: Generar la función de filtrado adecuada según lo que el usuario quiera buscar.
switch (opcionBusqueda) {
    case '1':
        const palabraClave = prompt('Ingresa la palabra clave a buscar: ').trim().toLowerCase();
        // Callback para buscar por palabra clave:
        // Recibe un curso y retorna true si el nombre o la descripción (normalizados) incluyen la palabra clave.
        criterioCallback = (curso) => 
            curso.nombre.toLowerCase().includes(palabraClave) || 
            curso.descripcion.toLowerCase().includes(palabraClave);
        console.log(`Buscando cursos con la palabra clave: "${palabraClave}"`);
        break;

    case '2':
        let duracionMinima;
        // Bucle para validar la duración mínima ingresada.
        while (true) {
            const input = prompt('Ingresa la duración mínima en horas: ');
            duracionMinima = Number(input);
            if (!isNaN(duracionMinima) && duracionMinima >= 0) break;
            console.log("Entrada inválida. Por favor, ingresa un número positivo para la duración.");
        }
        // Callback para buscar por duración mínima:
        // Recibe un curso y retorna true si la duración del curso es mayor o igual a la duración mínima.
        criterioCallback = (curso) => curso.duracion >= duracionMinima;
        console.log(`Buscando cursos con duración mínima de ${duracionMinima} horas.`);
        break;

    case '3':
        // Callback para buscar cursos disponibles:
        // Recibe un curso y retorna true si la propiedad 'disponible' es verdadera.
        criterioCallback = (curso) => curso.disponible === true;
        console.log("Buscando solo cursos disponibles.");
        break;
}

// Llamamos a nuestra función principal `buscarCursos` con el catálogo y el callback generado.
const cursosFiltrados = buscarCursos(catalogoCursos, criterioCallback);

// Mostramos los resultados.
if (cursosFiltrados.length > 0) {
    console.log("\n--- Cursos Encontrados ---");
    cursosFiltrados.forEach(curso => {
        console.log(`ID: ${curso.id}, Nombre: ${curso.nombre}, Duración: ${curso.duracion}h, Disponible: ${curso.disponible}`);
    });
} else {
    console.log("\nNo se encontraron cursos que coincidan con el criterio de búsqueda.");
}

console.log("--- Fin del Ejercicio 8 ---");