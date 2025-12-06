/**
 * @file ejercicio8.js
 * @description Módulo para realizar búsquedas avanzadas en un catálogo de cursos usando callbacks.
 */

/**
 * @typedef {object} Curso - Representa un curso individual en el catálogo.
 * @property {string} nombre - El nombre del curso.
 * @property {string} categoria - La categoría a la que pertenece el curso (ej: 'Programación', 'Diseño').
 * @property {number} duracion - La duración del curso en horas.
 * @property {string[]} etiquetas - Un arreglo de palabras clave relacionadas con el curso.
 */

/**
 * @callback CriterioBusquedaCallback
 * @description Una función de callback que define el criterio de búsqueda para un curso.
 * Recibe un objeto `Curso` y debe retornar `true` si el curso cumple el criterio, `false` en caso contrario.
 * @param {Curso} curso - El objeto curso a evaluar.
 * @returns {boolean} - `true` si el curso coincide con el criterio, `false` de lo contrario.
 */

/**
 * @description Busca cursos en un catálogo aplicando un criterio de búsqueda definido por un callback.
 * Esta función ofrece una forma flexible de filtrar cursos. Recibe el catálogo completo y una función
 * de callback que encapsula la lógica de filtrado específica (por categoría, duración, nombre, etc.).
 * Se diseñó para delegar la complejidad del criterio de búsqueda al usuario de la función, manteniendo
 * la función `buscarCursos` simple y reutilizable.
 *
 * @param {Curso[]} catalogo - Un arreglo de objetos `Curso` a buscar.
 * @param {CriterioBusquedaCallback} callback - La función que define el criterio de búsqueda.
 * @returns {Curso[]} - Un arreglo de objetos `Curso` que cumplen con el criterio.
 */
export function buscarCursos(catalogo, callback) {
    // Decisión de diseño 1: Usar `Array.prototype.filter()` para aplicar el criterio.
    // El método `filter()` es ideal para este escenario porque su propósito exacto es crear
    // un nuevo arreglo con todos los elementos que pasan una prueba implementada por la función
    // proporcionada (el callback). Esto es declarativo, conciso y fácil de entender,
    // eliminando la necesidad de un bucle manual.
    if (!Array.isArray(catalogo)) {
        console.error("El catálogo debe ser un arreglo.");
        return [];
    }
    if (typeof callback !== 'function') {
        console.error("El callback de búsqueda debe ser una función.");
        return [];
    }

    const cursosEncontrados = catalogo.filter(callback);

    // Decisión de diseño 2: La función `buscarCursos` es una función pura que no modifica el catálogo original.
    // `filter()` por naturaleza devuelve un nuevo arreglo, asegurando que el `catalogo` original
    // permanece inalterado. Esto es una buena práctica en programación funcional, previene efectos secundarios
    // y hace que la función sea más predecible y fácil de depurar.
    return cursosEncontrados;
}

// Ejemplo de uso (puede ser usado para pruebas o demostraciones internas)
/*
const miCatalogo = [
    { nombre: "Introducción a JS", categoria: "Programación", duracion: 10, etiquetas: ["frontend", "web"] },
    { nombre: "Diseño UX/UI", categoria: "Diseño", duracion: 25, etiquetas: ["usabilidad", "interfaz"] },
    { nombre: "Python para Data Science", categoria: "Programación", duracion: 40, etiquetas: ["backend", "datos"] },
    { nombre: "Fundamentos de Marketing Digital", categoria: "Marketing", duracion: 15, etiquetas: ["estrategia", "seo"] },
    { nombre: "Diseño Web Responsivo", categoria: "Diseño", duracion: 30, etiquetas: ["frontend", "css"] },
];

// Criterio: Cursos de "Programación"
const cursosProgramacion = buscarCursos(miCatalogo, curso => curso.categoria === "Programación");
console.log("Cursos de Programación:", cursosProgramacion);

// Criterio: Cursos con duración mayor a 20 horas
const cursosLargos = buscarCursos(miCatalogo, curso => curso.duracion > 20);
console.log("Cursos Largos:", cursosLargos);

// Criterio: Cursos con "Diseño" en el nombre (insensible a mayúsculas/minúsculas)
const cursosConDiseno = buscarCursos(miCatalogo, curso => curso.nombre.toLowerCase().includes("diseño"));
console.log("Cursos con 'Diseño' en el nombre:", cursosConDiseno);
*/
