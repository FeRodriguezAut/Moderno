// ejercicio16.js - Sistema de alerta temprana para una red social

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Esto es necesario porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Usuario
 * @property {string} id - ID único del usuario.
 * @property {string} nombre - Nombre de usuario.
 * @property {string[]} publicaciones - Arreglo de publicaciones (simulado como strings de contenido).
 * @property {string[]} reportes - Arreglo de reportes recibidos (simulado como strings de motivo).
 * @property {Date} fechaRegistro - Fecha de registro del usuario.
 * @property {string} estado - Estado actual del usuario (ej. "activo", "suspendido").
 */

/**
 * Función principal para el sistema de alerta temprana de red social.
 * Orquesta la entrada de datos, la aplicación del callback de análisis y la generación del informe global.
 */
async function sistemaAlertaTemprana() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 16: Sistema de alerta temprana para una red social ---");
    console.log("Este programa detecta usuarios que podrían estar infringiendo las normas de la comunidad.");

    // Pregunta al usuario cuántos usuarios va a ingresar.
    let numeroUsuarios = parseInt(prompt("Ingrese la cantidad de usuarios a registrar: "));

    // Valida que la cantidad de usuarios sea un número válido.
    while (isNaN(numeroUsuarios) || numeroUsuarios <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de usuarios.");
        numeroUsuarios = parseInt(prompt("Ingrese la cantidad de usuarios a registrar: "));
    }

    const usuariosRedSocial = []; // Array para almacenar los objetos de usuarios.
    const hoy = new Date(); // Para simular la fecha actual y calcular antigüedad.

    // Bucle para pedir los datos de cada usuario.
    for (let i = 0; i < numeroUsuarios; i++) {
        console.log(`\n--- Detalles del Usuario ${i + 1} ---`);
        const id = prompt("Ingrese el ID del usuario: ");
        const nombre = prompt("Ingrese el nombre del usuario: ");

        let numPublicaciones = parseInt(prompt("Ingrese el número de publicaciones del usuario: "));
        while (isNaN(numPublicaciones) || numPublicaciones < 0) {
            console.log("Por favor, ingrese un número válido de publicaciones (>= 0).");
            numPublicaciones = parseInt(prompt("Ingrese el número de publicaciones del usuario: "));
        }

        let inapropiadasInput = prompt("¿Tiene publicaciones marcadas como inapropiadas? (s/n): ").toLowerCase();
        const tieneInapropiadas = (inapropiadasInput === 's');

        let numReportes = parseInt(prompt("Ingrese el número de reportes recibidos por el usuario: "));
        while (isNaN(numReportes) || numReportes < 0) {
            console.log("Por favor, ingrese un número válido de reportes (>= 0).");
            numReportes = parseInt(prompt("Ingrese el número de reportes recibidos por el usuario: "));
        }
        
        // Simulación de fecha de registro: preguntar por días desde el registro.
        let diasDesdeRegistro = parseInt(prompt("Ingrese los días transcurridos desde el registro del usuario: "));
        while (isNaN(diasDesdeRegistro) || diasDesdeRegistro < 0) {
            console.log("Por favor, ingrese un número válido de días (>= 0).");
            diasDesdeRegistro = parseInt(prompt("Ingrese los días transcurridos desde el registro del usuario: "));
        }
        const fechaRegistro = new Date(hoy);
        fechaRegistro.setDate(hoy.getDate() - diasDesdeRegistro);

        let estado = prompt("Ingrese el estado del usuario (activo, suspendido, inactivo): ").toLowerCase();
        while (!['activo', 'suspendido', 'inactivo'].includes(estado)) {
            console.log("Por favor, ingrese un estado válido: 'activo', 'suspendido' o 'inactivo'.");
            estado = prompt("Ingrese el estado del usuario (activo, suspendido, inactivo): ").toLowerCase();
        }

        // Agrega el objeto de usuario al arreglo.
        usuariosRedSocial.push({ 
            id, 
            nombre, 
            publicaciones: Array(numPublicaciones).fill('publicacion'), // Simplificado
            tieneInapropiadas, // Nueva propiedad para simplificar el callback
            reportes: Array(numReportes).fill('reporte'), // Simplificado
            fechaRegistro, 
            estado 
        });
    }


    const informeGlobalRiesgo = analizarUsuarios(usuariosRedSocial, analizarRiesgoDefault);

    console.log("\n--- Informe Global de Riesgo ---");

    const imprimirCategoriaRiesgo = (categoria, usuarios) => {
        console.log(`\n${categoria} (${usuarios.length} usuarios):`);
        if (usuarios.length > 0) {
            usuarios.forEach(user => {
                console.log(`- ID: ${user.id}, Nombre: ${user.nombre}`);
                console.log(`  Nivel de riesgo: ${user.evaluacion.nivel}`);
                console.log(`  Motivo: ${user.evaluacion.motivo}`);
            });
        } else {
            console.log("  No hay usuarios en esta categoría.");
        }
    };

    imprimirCategoriaRiesgo("Bajo Riesgo", informeGlobalRiesgo.bajoRiesgo);
    imprimirCategoriaRiesgo("Medio Riesgo", informeGlobalRiesgo.medioRiesgo);
    imprimirCategoriaRiesgo("Alto Riesgo", informeGlobalRiesgo.altoRiesgo);
}

/**
 * Analiza un arreglo de usuarios aplicando un callback para determinar su riesgo.
 * Clasifica a los usuarios en categorías de riesgo (Bajo, Medio, Alto).
 * @param {Usuario[]} usuarios - Arreglo de objetos Usuario a analizar.
 * @param {function(Usuario): {sospechoso: boolean, nivel: number, motivo: string}} callback - Función callback para evaluar el riesgo de cada usuario.
 * @returns {{bajoRiesgo: any[], medioRiesgo: any[], altoRiesgo: any[]}} Un objeto con los usuarios clasificados por nivel de riesgo.
 */
function analizarUsuarios(usuarios, callback) {
    // Aplica el callback a cada usuario para obtener su evaluación de riesgo.
    const usuariosConRiesgo = usuarios.map(usuario => {
        const evaluacionRiesgo = callback(usuario);
        return {
            ...usuario, // Mantiene todas las propiedades originales del usuario
            evaluacion: evaluacionRiesgo // Agrega el resultado de la evaluación
        };
    });

    // Clasifica a los usuarios por nivel de riesgo.
    const informeRiesgo = {
        bajoRiesgo: [],
        medioRiesgo: [],
        altoRiesgo: []
    };

    usuariosConRiesgo.forEach(usuario => {
        if (usuario.evaluacion.nivel <= 2) { // Niveles 1-2: Bajo riesgo
            informeRiesgo.bajoRiesgo.push(usuario);
        } else if (usuario.evaluacion.nivel <= 4) { // Niveles 3-4: Medio riesgo
            informeRiesgo.medioRiesgo.push(usuario);
        } else { // Nivel 5: Alto riesgo
            informeRiesgo.altoRiesgo.push(usuario);
        }
    });

    return informeRiesgo;
}

/**
 * Función callback por defecto para analizar el riesgo de un usuario.
 * Determina si un usuario es sospechoso, su nivel de riesgo y el motivo principal.
 * @param {Usuario} usuario - El objeto Usuario a evaluar.
 * @returns {{sospechoso: boolean, nivel: number, motivo: string}} Objeto con el resultado del análisis de riesgo.
 */
function analizarRiesgoDefault(usuario) {
    let nivelRiesgo = 1; // Nivel de riesgo inicial (bajo).
    let motivos = [];
    let sospechoso = false;

    // Regla 1: Un usuario con más de 5 reportes tiene riesgo mínimo de nivel 3.
    if (usuario.reportes.length > 5) {
        nivelRiesgo = Math.max(nivelRiesgo, 3);
        motivos.push(`${usuario.reportes.length} reportes`);
        sospechoso = true;
    }

    // Regla 2: Si tiene publicaciones marcadas como inapropiadas, el riesgo aumenta.
    if (usuario.tieneInapropiadas) {
        nivelRiesgo = Math.min(nivelRiesgo + 1, 5); // Aumenta 1 nivel, máximo 5.
        motivos.push("Publicaciones inapropiadas");
        sospechoso = true;
    }

    // Regla 3: Si es nuevo (menos de 30 días) y acumula reportes, su riesgo aumenta aún más.
    const hoy = new Date();
    const treintaDias = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos.
    const esNuevo = (hoy.getTime() - usuario.fechaRegistro.getTime()) < treintaDias;

    if (esNuevo && usuario.reportes.length > 0) {
        nivelRiesgo = Math.min(nivelRiesgo + 2, 5); // Aumenta 2 niveles, máximo 5.
        motivos.push("Usuario nuevo con reportes");
        sospechoso = true;
    }

    // Si el usuario está suspendido o inactivo, se considera bajo riesgo o no sospechoso por ahora
    // ya que ya ha sido gestionado. Pero si la regla es monitorearlos igual, se puede ajustar.
    if (usuario.estado !== 'activo') {
        // Podríamos reducir el riesgo si ya está inactivo/suspendido, o mantenerlo si se quiere el historial.
        // Por este ejercicio, mantendremos el riesgo calculado, pero el "motivo" puede reflejar su estado.
        // No cambia la sospecha inicial, solo el contexto.
        // nivelRiesgo = Math.max(1, nivelRiesgo - 1); // Podría bajar el riesgo si ya está gestionado
        // motivos.push(`Estado: ${usuario.estado}`);
    }


    // Si no hay motivos para sospechar, se reinicia el nivel a 1 y sospechoso a false
    if (motivos.length === 0) {
        nivelRiesgo = 1;
        sospechoso = false;
        motivos.push("No se detectaron irregularidades");
    }

    return {
        sospechoso: sospechoso,
        nivel: nivelRiesgo,
        motivo: motivos.join(", ")
    };
}

// Ejecuta la función principal para iniciar el programa.
sistemaAlertaTemprana();

