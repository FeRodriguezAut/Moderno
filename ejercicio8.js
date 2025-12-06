// ejercicio8.js
// Busca cursos en un catálogo usando una función de callback para definir el criterio de búsqueda.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function buscarCursos
 * @description Filtra un catálogo de cursos basándose en un criterio proporcionado por una función de callback.
 * @param {Array<Object>} catalogo - Array de objetos, donde cada objeto representa un curso.
 * @param {function(Object): boolean} callback - Función de callback que define el criterio de búsqueda.
 *   @callback callback
 *   @param {Object} curso - Objeto que representa un curso individual.
 *   @returns {boolean} - `true` si el curso cumple el criterio, `false` en caso contrario.
 *   @responsibility El `callback` implementa la lógica específica de filtrado.
 * @returns {Array<Object>} Nuevo array con los cursos que cumplen el criterio.
 */
function buscarCursos(catalogo, callback) {
    // Validar que el catálogo sea un array.
    if (!Array.isArray(catalogo)) {
        console.error("Error (buscarCursos): El catálogo debe ser un arreglo.");
        return [];
    }
    // Validar que el callback sea una función.
    if (typeof callback !== 'function') {
        console.error("Error (buscarCursos): El callback de búsqueda debe ser una función.");
        return [];
    }

    // Filtrar cursos usando el callback.
    const cursosEncontrados = catalogo.filter(callback);

    // Retornar los cursos encontrados (no modifica el catálogo original).
    return cursosEncontrados;
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 8: Búsqueda de Cursos con Callback ---");

// Catálogo de cursos de ejemplo.
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
// Solicitar opción de búsqueda al usuario.
while (!['1', '2', '3'].includes(opcionBusqueda)) {
    opcionBusqueda = prompt('Elige una opción (1, 2 o 3): ');
}

let criterioCallback; // Variable para almacenar la función de callback.

// Construir el callback de búsqueda dinámicamente.
switch (opcionBusqueda) {
    case '1':
        const palabraClave = prompt('Ingresa la palabra clave a buscar: ').trim().toLowerCase();
        // Callback para buscar por palabra clave.
        criterioCallback = (curso) => 
            curso.nombre.toLowerCase().includes(palabraClave) || 
            curso.descripcion.toLowerCase().includes(palabraClave);
        console.log(`Buscando cursos con la palabra clave: "${palabraClave}"`);
        break;

    case '2':
        let duracionMinima;
        while (true) {
            const input = prompt('Ingresa la duración mínima en horas: ');
            duracionMinima = Number(input);
            if (!isNaN(duracionMinima) && duracionMinima >= 0) break;
            console.log("Entrada inválida. Por favor, ingresa un número positivo para la duración.");
        }
        // Callback para buscar por duración mínima.
        criterioCallback = (curso) => curso.duracion >= duracionMinima;
        console.log(`Buscando cursos con duración mínima de ${duracionMinima} horas.`);
        break;

    case '3':
        // Callback para buscar cursos disponibles.
        criterioCallback = (curso) => curso.disponible === true;
        console.log("Buscando solo cursos disponibles.");
        break;
}

// Llamar a la función para buscar cursos.
const cursosFiltrados = buscarCursos(catalogoCursos, criterioCallback);

// Mostrar los resultados.
if (cursosFiltrados.length > 0) {
    console.log("\n--- Cursos Encontrados ---");
    cursosFiltrados.forEach(curso => {
        console.log(`ID: ${curso.id}, Nombre: ${curso.nombre}, Duración: ${curso.duracion}h, Disponible: ${curso.disponible}`);
    });
} else {
    console.log("\nNo se encontraron cursos que coincidan con el criterio de búsqueda.");
}

console.log("--- Fin del Ejercicio 8 ---");
