// ejercicio14.js - Evaluación de proyectos colaborativos

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Esto es necesario porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Proyecto
 * @property {string} nombre - Nombre del proyecto.
 * @property {string} estado - Estado del proyecto (ej. "activo", "inactivo").
 * @property {number} participantes - Número de participantes en el proyecto.
 */

/**
 * Función principal para la evaluación de proyectos.
 * Orquesta la entrada de datos, el procesamiento y la generación de informes.
 */
async function evaluarProyectosColaborativos() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 14: Evaluación de proyectos colaborativos ---");
    console.log("Este programa analiza el estado de proyectos, identificando activos, contando participantes y evaluando necesidades de refuerzo.");

    // Pregunta al usuario cuántos proyectos va a ingresar.
    let numeroProyectos = parseInt(prompt("Ingrese la cantidad de proyectos a evaluar: "));

    // Valida que la cantidad de proyectos sea un número válido.
    while (isNaN(numeroProyectos) || numeroProyectos <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de proyectos.");
        numeroProyectos = parseInt(prompt("Ingrese la cantidad de proyectos a evaluar: "));
    }

    const proyectos = []; // Array para almacenar los objetos de proyectos.

    // Bucle para pedir los datos de cada proyecto.
    for (let i = 0; i < numeroProyectos; i++) {
        console.log(`\n--- Detalles del Proyecto ${i + 1} ---`);
        const nombre = prompt("Ingrese el nombre del proyecto: ");

        let estado = prompt("Ingrese el estado del proyecto (activo/inactivo): ").toLowerCase();
        // Valida que el estado sea "activo" o "inactivo".
        while (estado !== 'activo' && estado !== 'inactivo') {
            console.log("Por favor, ingrese un estado válido: 'activo' o 'inactivo'.");
            estado = prompt("Ingrese el estado del proyecto (activo/inactivo): ").toLowerCase();
        }

        let participantes = parseInt(prompt("Ingrese el número de participantes del proyecto: "));
        // Valida que el número de participantes sea un número positivo.
        while (isNaN(participantes) || participantes <= 0) {
            console.log("Por favor, ingrese un número válido mayor que cero para los participantes.");
            participantes = parseInt(prompt("Ingrese el número de participantes del proyecto: "));
        }

        // Agrega el objeto de proyecto al arreglo.
        proyectos.push({ nombre, estado, participantes });
    }


    console.log("\n--- Informe de Proyectos ---");

    if (proyectos.length === 0) {
        console.log("No se ingresaron proyectos para evaluar.");
        return; // Sale de la función si no hay proyectos.
    }

    // Filtra y muestra los proyectos activos.
    const proyectosActivos = filtrarActivos(proyectos);
    console.log(`\nProyectos activos (${proyectosActivos.length}):`);
    if (proyectosActivos.length > 0) {
        proyectosActivos.forEach(p => console.log(`- ${p.nombre}`));
    } else {
        console.log("No hay proyectos activos.");
    }

    console.log("\n--- Detalles y Evaluación por Proyecto ---");
    proyectos.forEach(proyecto => {
        const numParticipantes = contarParticipantes(proyecto);
        const necesitaRefuerzo = evaluarProyecto(proyecto, necesitaRefuerzoCallback); // Usa el callback por defecto.

        console.log(`\nProyecto: ${proyecto.nombre}`);
        console.log(`  Estado: ${proyecto.estado}`);
        console.log(`  Participantes: ${numParticipantes}`);
        console.log(`  Necesita refuerzo: ${necesitaRefuerzo ? 'Sí' : 'No'}`);
    });
}

/**
 * Filtra una lista de proyectos y retorna solo los que están en estado "activo".
 * @param {Proyecto[]} proyectos - Un arreglo de objetos Proyecto.
 * @returns {Proyecto[]} Un nuevo arreglo con solo los proyectos activos.
 */
function filtrarActivos(proyectos) {
    return proyectos.filter(proyecto => proyecto.estado === 'activo');
}

/**
 * Retorna el número de participantes de un proyecto dado.
 * @param {Proyecto} proyecto - El objeto Proyecto del cual se quieren contar los participantes.
 * @returns {number} El número de participantes del proyecto.
 */
function contarParticipantes(proyecto) {
    return proyecto.participantes;
}

/**
 * Función callback por defecto para evaluar si un proyecto necesita refuerzo.
 * Considera que un proyecto necesita refuerzo si tiene menos de 5 participantes.
 * @param {Proyecto} proyecto - El objeto Proyecto a evaluar.
 * @returns {boolean} True si el proyecto necesita refuerzo, false en caso contrario.
 */
function necesitaRefuerzoCallback(proyecto) {
    return proyecto.participantes < 5;
}

/**
 * Evalúa un proyecto utilizando una función callback provista.
 * @param {Proyecto} proyecto - El objeto Proyecto a evaluar.
 * @param {function(Proyecto): boolean} callback - La función callback que define la lógica de evaluación.
 * @returns {boolean} El resultado de la evaluación del callback.
 */
function evaluarProyecto(proyecto, callback) {
    return callback(proyecto);
}


// Ejecuta la función principal para iniciar el programa.
evaluarProyectosColaborativos();


