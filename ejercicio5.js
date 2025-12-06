// ejercicio5.js
// Este módulo se encarga de validar el acceso de un usuario y determinar sus permisos
// basándose en su estado (activo/inactivo) y su rol (admin, editor, lector).

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function validarUsuario
 * @description Valida el acceso de un usuario basado en su estado y rol, y retorna los permisos asociados.
 *              Las entradas de texto se normalizan para asegurar la consistencia.
 *
 * @param {string} estado - El estado del usuario (ej. "Activo", "Inactivo").
 * @param {string} rol - El rol del usuario (ej. "Admin", "Editor", "Lector").
 * @returns {Object} Un objeto con dos propiedades:
 *                   - accesoPermitido: Booleano que indica si el usuario tiene acceso.
 *                   - mensaje: Una cadena de texto con el mensaje de acceso/denegación y los permisos.
 *
 * @comment Esta función es clave para la seguridad y la gestión de la lógica de negocio de permisos.
 *          Su diseño prioriza la claridad en la determinación del acceso y la asignación de mensajes
 *          específicos, utilizando normalización de entradas para robustez.
 */
function validarUsuario(estado, rol) {
    // Comentario: Normalización de entradas de texto.
    // Propósito: Convertir el estado y el rol a minúsculas y eliminar espacios extra.
    // Esto asegura que la comparación sea insensible a mayúsculas/minúsculas y formatos de entrada.
    const estadoNormalizado = estado.trim().toLowerCase();
    const rolNormalizado = rol.trim().toLowerCase();

    // Comentario: Verificación del estado del usuario.
    // Propósito: La primera regla de acceso es que el usuario debe estar "activo".
    // Si no lo está, se deniega el acceso inmediatamente, sin revisar el rol.
    if (estadoNormalizado !== 'activo') {
        return {
            accesoPermitido: false,
            mensaje: "Acceso denegado: El usuario no está activo."
        };
    }

    // Comentario: Uso de 'switch' para gestión de roles y asignación de permisos.
    // Propósito: Determinar los permisos específicos del usuario de una forma estructurada y legible
    // una vez que se ha confirmado que el usuario está activo. 'switch' es adecuado para múltiples condiciones
    // basadas en un único valor (el rol).
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
            // Si el rol no es reconocido, se deniega el acceso.
            return {
                accesoPermitido: false,
                mensaje: "Acceso denegado: Rol no reconocido. Contacta al administrador."
            };
    }

    // Comentario: Retorno de acceso permitido y mensaje de permisos.
    // Propósito: Si el usuario está activo y su rol es reconocido, se concede el acceso
    // y se describe el nivel de permisos que posee.
    return {
        accesoPermitido: true,
        mensaje: mensajePermisos
    };
}

// --- Explicación Técnica para el Ejercicio 5 ---

/*
Entradas:
- estado: Un string que representa el estado actual del usuario (ej., "activo", "inactivo").
- rol: Un string que representa el rol asignado al usuario (ej., "admin", "editor", "lector").

Proceso:
1. Normalización de Entradas: Tanto el `estado` como el `rol` de entrada se limpian de espacios en blanco (`trim()`) y se convierten a minúsculas (`toLowerCase()`). Esto garantiza que las comparaciones posteriores sean robustas e insensibles a variaciones en la capitalización o formato.
2. Validación de Estado del Usuario: La primera y más crítica verificación es si el `estadoNormalizado` es "activo". Si no lo es, la función termina inmediatamente, denegando el acceso y proporcionando un mensaje claro.
3. Evaluación del Rol: Si el usuario está "activo", se utiliza una estructura `switch` para evaluar el `rolNormalizado`:
   - 'admin': Se le asignan permisos de "Acceso total".
   - 'editor': Se le asignan permisos de "Acceso parcial".
   - 'lector': Se le asignan permisos de "Acceso de solo lectura".
   - Cualquier otro rol: Se considera un rol no reconocido y se deniega el acceso.
4. Construcción del Mensaje y Retorno: Dependiendo del rol y si el acceso fue concedido, se construye un mensaje descriptivo que detalla los permisos o la razón de la denegación. La función retorna un objeto con un booleano (`accesoPermitido`) y este `mensaje`.

Salidas:
- Un objeto con las propiedades `accesoPermitido` (booleano) y `mensaje` (string).

Reglas de Negocio:
- Solo los usuarios "activos" pueden tener acceso.
- Los roles definidos son "admin", "editor", "lector". Cualquier otro rol es inválido.
- Cada rol tiene un conjunto predefinido de permisos.

Casos Límite:
- Estado vacío o con solo espacios: Tras la normalización, sería una cadena vacía y resultaría en "Acceso denegado: El usuario no está activo."
- Rol vacío o con solo espacios: Tras la normalización, sería una cadena vacía y resultaría en "Acceso denegado: Rol no reconocido."
- Estado o rol con mayúsculas/minúsculas mezcladas (ej. "ActIVo", "AdMin"): Manejado correctamente gracias a la normalización.
- Rol no existente (ej. "invitado"): Resultará en "Acceso denegado: Rol no reconocido."

Decisiones de Diseño Justificadas:
1. Normalización explícita de entradas (`trim().toLowerCase()`):
   - Por qué: Esta decisión se tomó para aumentar la robustez de la función frente a errores de entrada del usuario. Al convertir el `estado` y el `rol` a un formato consistente (minúsculas y sin espacios superfluos), se elimina la necesidad de que el usuario ingrese la información de una manera específica (ej. siempre con la primera letra en mayúscula). Esto hace que la función sea más tolerante a las variaciones de entrada y reduce la probabilidad de que un usuario legítimo sea denegado por un simple error de formato.
   - Alternativas consideradas: Realizar comparaciones sensibles a mayúsculas/minúsculas o asumir un formato fijo. Descartadas porque harían la función menos "humana" y más propensa a fallos por formato.
2. Uso de una estructura `switch` para la gestión de roles:
   - Por qué: Una instrucción `switch` es una forma clara y eficiente de manejar múltiples rutas de ejecución basadas en el valor de una única variable (en este caso, el `rolNormalizado`). Para la asignación de permisos específicos a cada rol, `switch` ofrece una lectura limpia y permite añadir nuevos roles fácilmente sin una anidación excesiva de `if/else if`. La cláusula `default` maneja elegantemente los roles no definidos, mejorando la robustez.
   - Alternativas consideradas: Una serie de sentencias `if/else if`. Descartadas porque, si bien funcionales, `switch` es más idiomático y legible para la evaluación de múltiples casos discretos de una misma variable. También se podría usar un objeto de mapeo (ej., `{ 'admin': 'Permisos de admin' }`), pero el `switch` permite una lógica más compleja (ej., múltiples condiciones o validaciones) por cada caso si fuera necesario en el futuro, sin perder la legibilidad.

*/

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 5: Validación de Acceso y Permisos ---");

let estadoUsuario = '';
// Comentario: Bucle para solicitar un estado de usuario válido.
// Propósito: Asegurar que el estado ingresado sea "activo" o "inactivo".
while (estadoUsuario.trim().toLowerCase() !== 'activo' && estadoUsuario.trim().toLowerCase() !== 'inactivo') {
    estadoUsuario = prompt('Ingresa el estado del usuario (activo/inactivo): ');
    if (estadoUsuario.trim().length === 0) {
        console.log("El estado no puede estar vacío.");
    } else if (estadoUsuario.trim().toLowerCase() !== 'activo' && estadoUsuario.trim().toLowerCase() !== 'inactivo') {
        console.log("Estado inválido. Por favor, ingresa 'activo' o 'inactivo'.");
    }
}

let rolUsuario = '';
// Comentario: Bucle para solicitar un rol de usuario válido.
// Propósito: Asegurar que el rol ingresado sea "admin", "editor" o "lector".
while (rolUsuario.trim().toLowerCase() !== 'admin' && rolUsuario.trim().toLowerCase() !== 'editor' && rolUsuario.trim().toLowerCase() !== 'lector') {
    rolUsuario = prompt('Ingresa el rol del usuario (admin/editor/lector): ');
    if (rolUsuario.trim().length === 0) {
        console.log("El rol no puede estar vacío.");
    } else if (rolUsuario.trim().toLowerCase() !== 'admin' && rolUsuario.trim().toLowerCase() !== 'editor' && rolUsuario.trim().toLowerCase() !== 'lector') {
        console.log("Rol inválido. Por favor, ingresa 'admin', 'editor' o 'lector'.");
    }
}

// Llamamos a nuestra función principal para validar el usuario.
const resultado = validarUsuario(estadoUsuario, rolUsuario);

// Mostramos el resultado al usuario.
if (resultado.accesoPermitido) {
    console.log("Acceso concedido.");
}
console.log(resultado.mensaje);

console.log("--- Fin del Ejercicio 5 ---");