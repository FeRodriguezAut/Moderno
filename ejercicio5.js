/**
 ejercicio5.js
  Módulo de validación de acceso y permisos.
 */

/**
 * @description Valida acceso y permisos de usuario.
 */



export function validarUsuario(estado, rol) {
    // Normalización de entradas de texto.
    const estadoNormalizado = estado.trim().toLowerCase();
    const rolNormalizado = rol.trim().toLowerCase();

    if (estadoNormalizado !== 'activo') {
        return {
            accesoPermitido: false,
            mensaje: "Acceso denegado: El usuario no está activo."
        };
    }

    // Uso de 'switch' para gestión de roles.
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
