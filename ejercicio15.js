// ejercicio15.js - Sistema inteligente de recomendación de cursos

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Esto es necesario porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Curso
 * @property {string} nombre - Nombre del curso.
 * @property {number} calificacion - Calificación final obtenida en el curso (0-100).
 * @property {number} horas - Horas dedicadas al curso.
 * @property {number} intentos - Número de intentos para completar el curso.
 * @property {boolean} finalizado - Indica si el curso fue finalizado.
 */

/**
 * Función principal para generar recomendaciones de cursos.
 * Orquesta la entrada de datos, la aplicación del callback de recomendación y la presentación de resultados.
 */
async function sistemaRecomendacionCursos() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 15: Sistema inteligente de recomendación de cursos ---");
    console.log("Este programa recomienda cursos basados en tu comportamiento académico y criterios personalizados.");

    // Pregunta al usuario cuántos cursos ha completado o iniciado.
    let numeroCursos = parseInt(prompt("Ingrese la cantidad de cursos a registrar: "));

    // Valida que la cantidad de cursos sea un número válido.
    while (isNaN(numeroCursos) || numeroCursos <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de cursos.");
        numeroCursos = parseInt(prompt("Ingrese la cantidad de cursos a registrar: "));
    }

    const cursosCompletados = []; // Array para almacenar los objetos de cursos.

    // Bucle para pedir los datos de cada curso.
    for (let i = 0; i < numeroCursos; i++) {
        console.log(`\n--- Detalles del Curso ${i + 1} ---`);
        const nombre = prompt("Ingrese el nombre del curso: ");

        let calificacion = parseInt(prompt("Ingrese la calificación final (0-100): "));
        // Valida que la calificación esté dentro del rango.
        while (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
            console.log("Por favor, ingrese una calificación válida (0-100).");
            calificacion = parseInt(prompt("Ingrese la calificación final (0-100): "));
        }

        let horas = parseInt(prompt("Ingrese las horas dedicadas al curso: "));
        // Valida que las horas sean un número positivo.
        while (isNaN(horas) || horas < 0) {
            console.log("Por favor, ingrese un número válido de horas (positivo).");
            horas = parseInt(prompt("Ingrese las horas dedicadas al curso: "));
        }

        let intentos = parseInt(prompt("Ingrese el número de intentos para completar el curso: "));
        // Valida que los intentos sean un número positivo.
        while (isNaN(intentos) || intentos < 0) {
            console.log("Por favor, ingrese un número válido de intentos (positivo).");
            intentos = parseInt(prompt("Ingrese el número de intentos para completar el curso: "));
        }

        let finalizadoInput = prompt("¿El curso fue finalizado? (s/n): ").toLowerCase();
        let finalizado = (finalizadoInput === 's');

        // Agrega el objeto de curso al arreglo.
        cursosCompletados.push({ nombre, calificacion, horas, intentos, finalizado });
    }


    const recomendaciones = generarRecomendaciones(cursosCompletados, evaluarRecomendacionDefault);

    console.log("\n--- Recomendaciones de Cursos ---");
    if (recomendaciones.length === 0) {
        console.log("No se encontraron recomendaciones de cursos.");
    } else {
        recomendaciones.forEach(rec => {
            console.log(`\nCurso: ${rec.curso.nombre}`);
            console.log(`  Prioridad: ${rec.prioridad}`);
            console.log(`  Razón: ${rec.razon}`);
            console.log(`  Calificación: ${rec.curso.calificacion}, Horas: ${rec.curso.horas}, Intentos: ${rec.curso.intentos}, Finalizado: ${rec.curso.finalizado ? 'Sí' : 'No'}`);
        });
    }
}

/**
 * Genera una lista de cursos recomendados aplicando un callback de evaluación.
 * Utiliza métodos de orden superior para procesar, filtrar y ordenar los cursos.
 * @param {Curso[]} cursos - Un arreglo de objetos Curso completados por el aprendiz.
 * @param {function(Curso): {prioridad: number, razon: string}} callback - La función callback que define los criterios de recomendación.
 * @returns {{curso: Curso, prioridad: number, razon: string}[]} Un arreglo de cursos recomendados, ordenados por prioridad.
 */
function generarRecomendaciones(cursos, callback) {
    // 1. Recorrer el arreglo y aplicar el callback a cada curso.
    const cursosEvaluados = cursos.map(curso => {
        const evaluacion = callback(curso);
        return {
            curso: curso,
            prioridad: evaluacion.prioridad,
            razon: evaluacion.razon
        };
    });

    // 2. Filtrar únicamente los cursos con prioridad mayor a cero.
    const recomendacionesFiltradas = cursosEvaluados.filter(item => item.prioridad > 0);

    // 3. Ordenarlos de mayor a menor prioridad.
    recomendacionesFiltradas.sort((a, b) => b.prioridad - a.prioridad);

    return recomendacionesFiltradas;
}

/**
 * Función callback por defecto para evaluar la recomendación de un curso.
 * Asigna una prioridad numérica y una razón basada en criterios predefinidos.
 * @param {Curso} curso - El objeto Curso a evaluar.
 * @returns {{prioridad: number, razon: string}} Un objeto con la prioridad (0 = no recomendado) y la razón.
 */
function evaluarRecomendacionDefault(curso) {
    if (!curso.finalizado) {
        // Recomendar cursos que el aprendiz haya dejado sin finalizar (prioridad media).
        return { prioridad: 3, razon: "Curso sin finalizar" };
    }
    if (curso.calificacion < 70 && curso.finalizado) {
        // Recomendar cursos donde el aprendiz obtuvo una calificación baja (refuerzo - alta prioridad).
        return { prioridad: 5, razon: `Reforzar conocimientos (Calificación: ${curso.calificacion})` };
    }
    if (curso.horas < 10 && curso.calificacion >= 80 && curso.finalizado) {
        // Recomendar cursos donde dedicó pocas horas, pero obtuvo buen resultado (baja prioridad, para expandir).
        return { prioridad: 2, razon: `Demostró eficiencia (Horas: ${curso.horas}, Calificación: ${curso.calificacion})` };
    }
    // Si no cumple ningún criterio específico, no se recomienda.
    return { prioridad: 0, razon: "No aplica para recomendación" };
}

// Ejecuta la función principal para iniciar el programa.
sistemaRecomendacionCursos();

