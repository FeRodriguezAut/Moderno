/**
 * @file ejercicio5.js
 * @description Módulo para validar el acceso y los permisos de un usuario.
 */

/**
 * @typedef {object} ResultadoValidacion
 * @property {boolean} accesoPermitido - `true` si el usuario puede acceder, `false` en caso contrario.
 * @property {string} mensaje - El mensaje detallado sobre los permisos o el motivo del rechazo.
 */

/**
 * @description Valida si un usuario tiene acceso al sistema y qué permisos posee según su estado y rol.
 * Este bloque funcional determina los permisos de un usuario. Se diseñó para recibir el estado y el rol
 * como strings y devolver un objeto claro con el estado del acceso y un mensaje descriptivo.
 *
 * @param {string} estado - El estado del usuario ('activo' o 'inactivo').
 * @param {string} rol - El rol del usuario ('admin', 'editor', 'lector').
 * @returns {ResultadoValidacion} - Un objeto con el resultado de la validación.
 */
export function validarUsuario(estado, rol) {
    // Decisión de diseño 1: Normalizar las entradas de texto.
    // Se utilizan `trim()` y `toLowerCase()` para limpiar y estandarizar los strings de entrada.
    // Esto hace que la validación no sea sensible a mayúsculas/minúsculas (ej: "Admin" o " admin ")
    // y a espacios en blanco, lo que aumenta la robustez y previene errores inesperados.
    const estadoNormalizado = estado.trim().toLowerCase();
    const rolNormalizado = rol.trim().toLowerCase();

    if (estadoNormalizado !== 'activo') {
        return {
            accesoPermitido: false,
            mensaje: "Acceso denegado: El usuario no está activo."
        };
    }

    // Decisión de diseño 2: Usar una declaración `switch` para manejar los roles.
    // En lugar de una cadena de `if/else if`, un `switch` es más legible y organizado cuando se
    // comprueba una sola variable contra múltiples valores posibles (en este caso, el rol).
    // El caso `default` maneja elegantemente cualquier rol no reconocido, cubriendo un caso límite importante.
    let mensajePermisos;
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
                mensaje: "Acceso denegado: Rol no reconocido."
            };
    }

    return {
        accesoPermitido: true,
        mensaje: mensajePermisos
    };
}
