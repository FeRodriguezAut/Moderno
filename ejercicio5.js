// ejercicio5.js
// Valida el acceso de un usuario y determina sus permisos según su estado y rol.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function validarUsuario
 * @description Valida el acceso de un usuario y retorna los permisos asociados.
 * @param {string} estado - Estado del usuario (ej. "Activo", "Inactivo").
 * @param {string} rol - Rol del usuario (ej. "Admin", "Editor", "Lector").
 * @returns {Object} { accesoPermitido: boolean, mensaje: string }.
 */
function validarUsuario(estado, rol) {
    // Normalizar entradas de texto.
    const estadoNormalizado = estado.trim().toLowerCase();
    const rolNormalizado = rol.trim().toLowerCase();

    // Verificar que el usuario esté activo.
    if (estadoNormalizado !== 'activo') {
        return {
            accesoPermitido: false,
            mensaje: "Acceso denegado: El usuario no está activo."
        };
    }

    let mensajePermisos;
    // Asignar permisos según el rol del usuario.
    switch (rolNormalizado) {
        case 'admin':
            mensajePermisos = "Permisos de administrador: Acceso total (Crear, Leer, Actualizar, Borrar).";
            break;
        case 'editor':
            mensajePermisos = "Permisos de editor: Acceso parcial (Crear, Leer, Actualizar).";
            break;
        case 'lector':
            mensajePermisos = "Permisos de lector: Acceso de solo lectura (Leer).";
            break;
        default:
            return {
                accesoPermitido: false,
                mensaje: "Acceso denegado: Rol no reconocido. Contacta al administrador."
            };
    }

    // Retornar resultado de acceso y mensaje.
    return {
        accesoPermitido: true,
        mensaje: mensajePermisos
    };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 5: Validación de Acceso y Permisos ---");

let estadoUsuario = '';
// Solicitar y validar el estado del usuario.
while (estadoUsuario.trim().toLowerCase() !== 'activo' && estadoUsuario.trim().toLowerCase() !== 'inactivo') {
    estadoUsuario = prompt('Ingresa el estado del usuario (activo/inactivo): ');
    if (estadoUsuario.trim().length === 0) {
        console.log("El estado no puede estar vacío.");
    } else if (estadoUsuario.trim().toLowerCase() !== 'activo' && estadoUsuario.trim().toLowerCase() !== 'inactivo') {
        console.log("Estado inválido. Por favor, ingresa 'activo' o 'inactivo'.");
    }
}

let rolUsuario = '';
// Solicitar y validar el rol del usuario.
while (rolUsuario.trim().toLowerCase() !== 'admin' && rolUsuario.trim().toLowerCase() !== 'editor' && rolUsuario.trim().toLowerCase() !== 'lector') {
    rolUsuario = prompt('Ingresa el rol del usuario (admin/editor/lector): ');
    if (rolUsuario.trim().length === 0) {
        console.log("El rol no puede estar vacío.");
    } else if (rolUsuario.trim().toLowerCase() !== 'admin' && rolUsuario.trim().toLowerCase() !== 'editor' && rolUsuario.trim().toLowerCase() !== 'lector') {
        console.log("Rol inválido. Por favor, ingresa 'admin', 'editor' o 'lector'.");
    }
}

// Llamar a la función para validar el usuario.
const resultado = validarUsuario(estadoUsuario, rolUsuario);

// Mostrar el resultado.
if (resultado.accesoPermitido) {
    console.log("Acceso concedido.");
}
console.log(resultado.mensaje);

console.log("--- Fin del Ejercicio 5 ---");
