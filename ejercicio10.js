// ejercicio10.js
// Fusiona dos listas de usuarios, eliminando duplicados y conservando la versión con más información.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function fusionarUsuarios
 * @description Fusiona dos arrays de objetos usuario, eliminando duplicados por 'documento'
 *              y conservando la versión con más propiedades.
 * @param {Array<Object>} usuariosSistemaA - Usuarios del primer sistema.
 * @param {Array<Object>} usuariosSistemaB - Usuarios del segundo sistema.
 * @returns {Array<Object>} Lista final de usuarios únicos y completos.
 */
function fusionarUsuarios(usuariosSistemaA, usuariosSistemaB) {
    // Usar Map para almacenar usuarios únicos por documento.
    const usuariosUnicosMap = new Map();

    // Combinar listas de usuarios usando el operador spread.
    const todosLosUsuarios = [...usuariosSistemaA, ...usuariosSistemaB];

    // Iterar sobre usuarios para deduplicar y resolver conflictos.
    todosLosUsuarios.forEach(usuario => {
        // Obtener el identificador único del usuario.
        const documento = usuario.documento;

        // Si el usuario ya existe, verificar si la nueva versión tiene más información.
        if (usuariosUnicosMap.has(documento)) {
            const usuarioExistente = usuariosUnicosMap.get(documento);

            // Si la nueva versión tiene más propiedades, actualizar.
            if (Object.keys(usuario).length > Object.keys(usuarioExistente).length) {
                usuariosUnicosMap.set(documento, usuario);
            }
        } else {
            // Añadir nuevo usuario al Map.
            usuariosUnicosMap.set(documento, usuario);
        }
    });

    // Convertir Map a Array para el retorno.
    return Array.from(usuariosUnicosMap.values());
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 10: Fusión de Usuarios con Operador Spread ---");

let usuariosA = [];
let usuariosB = [];

// Función auxiliar para solicitar y validar la entrada JSON de usuarios.
const obtenerYValidarUsuarios = (nombreSistema) => {
    let inputValido = false;
    let usuarios = [];
    while (!inputValido) {
        const inputStr = prompt(`Ingresa los usuarios del ${nombreSistema} en formato JSON (ej. [{"documento":"123","nombre":"Juan"}]): `);
        try {
            const tempUsuarios = JSON.parse(inputStr || '[]');
            if (!Array.isArray(tempUsuarios)) {
                console.log("Error: La entrada debe ser un array JSON válido.");
                continue;
            }
            if (tempUsuarios.length > 0) {
                // Validar que cada usuario tenga la propiedad 'documento'.
                for (const user of tempUsuarios) {
                    if (typeof user !== 'object' || user === null || !user.hasOwnProperty('documento')) {
                        throw new Error(`Cada usuario en el ${nombreSistema} debe ser un objeto y tener una propiedad 'documento'.`);
                    }
                }
            }
            usuarios = tempUsuarios;
            inputValido = true;
        } catch (error) {
            console.log(`Error en la entrada del ${nombreSistema}: ${error.message}. Por favor, inténtalo de nuevo.`);
        }
    }
    return usuarios;
};

// Solicitar y validar usuarios del Sistema A.
usuariosA = obtenerYValidarUsuarios('Sistema A');
// Solicitar y validar usuarios del Sistema B.
usuariosB = obtenerYValidarUsuarios('Sistema B');

// Llamar a la función para fusionar usuarios.
const resultadoFusion = fusionarUsuarios(usuariosA, usuariosB);

// Mostrar el resultado de la fusión.
if (resultadoFusion.length > 0) {
    console.log("\n--- Lista Final de Usuarios Fusionados ---");
    resultadoFusion.forEach(user => {
        console.log(JSON.stringify(user));
    });
} else {
    console.log("\nNo se encontraron usuarios para fusionar o todas las listas estaban vacías.");
}

console.log("--- Fin del Ejercicio 10 ---");
