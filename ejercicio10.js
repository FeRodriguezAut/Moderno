// ejercicio10.js
// Este módulo se encarga de fusionar dos listas de usuarios provenientes de diferentes sistemas.
// Su objetivo es crear una única lista consolidada, eliminando los usuarios duplicados
// (identificados por su 'documento') y conservando la versión del usuario que contenga más información.

// Importa la librería 'prompt-sync' para poder pedir datos al usuario desde la terminal.
// { sigint: true } permite terminar el programa con Ctrl+C.
const prompt = require('prompt-sync')({ sigint: true });

/**
 * @function fusionarUsuarios
 * @description Fusiona dos arrays de objetos usuario, eliminando duplicados por su propiedad 'documento'
 *              y conservando la versión del usuario que tiene más propiedades (mayor información).
 *
 * @param {Array<Object>} usuariosSistemaA - Array de objetos que representan usuarios del primer sistema.
 * @param {Array<Object>} usuariosSistemaB - Array de objetos que representan usuarios del segundo sistema.
 * @returns {Array<Object>} Un nuevo array con la lista final de usuarios, donde cada usuario es único
 *                          y, en caso de duplicidad, se conserva la versión más completa.
 *
 * @comment Esta función es fundamental para la integración de datos de diferentes fuentes.
 *          Fue diseñada para manejar la complejidad de la deduplicación de forma eficiente
 *          y con un criterio claro para la resolución de conflictos (mayor información).
 */
function fusionarUsuarios(usuariosSistemaA, usuariosSistemaB) {
    // Comentario: Uso de Map para almacenamiento único y eficiente.
    // Propósito: `Map` es ideal para esta tarea porque permite almacenar pares clave-valor,
    // donde el 'documento' del usuario es la clave única. Esto facilita la verificación
    // y actualización de usuarios existentes de forma rápida.
    const usuariosUnicosMap = new Map();

    // Comentario: Paso 1: Combinar todas las listas de usuarios usando el operador spread.
    // Propósito: Crear una lista inicial que contenga todos los usuarios de ambos sistemas.
    // El operador spread (`...`) es una forma concisa y legible de fusionar arrays.
    const todosLosUsuarios = [...usuariosSistemaA, ...usuariosSistemaB];

    // Comentario: Paso 2: Iterar sobre la lista combinada para procesar cada usuario.
    // Propósito: Recorrer cada usuario en la lista combinada para identificar duplicados
    // y aplicar la lógica de conservación del usuario con mayor información.
    todosLosUsuarios.forEach(usuario => {
        // Obtenemos el 'documento' del usuario actual, que es nuestro identificador único.
        const documento = usuario.documento;

        // Decisión de Diseño Justificada 1: Uso de Map para deduplicación eficiente.
        // Elegimos Map sobre un objeto simple ({}) porque ofrece métodos más robustos y de mejor rendimiento
        // para manejar colecciones de claves-valor, como verificar existencia (.has), obtener (.get) y establecer (.set) elementos.
        // Además, las claves de Map pueden ser de cualquier tipo, lo que lo hace más flexible aunque aquí usemos strings.

        // Comentario: Verificación y resolución de duplicados.
        // Propósito: Si el usuario ya está en el mapa (duplicado), comparamos si el nuevo usuario
        // tiene más propiedades que el existente. Si es así, lo actualizamos.
        if (usuariosUnicosMap.has(documento)) {
            const usuarioExistente = usuariosUnicosMap.get(documento);

            // Decisión de Diseño Justificada 2: Definir