/**
 * @file Ejercicio2.js
 * @description Módulo para calcular el inventario de un producto.
 */

/**
 * @typedef {object} ResultadoInventario
 * @property {number|null} inventarioFinal - El número de unidades restantes. Null si hay un error.
 * @property {string} estado - El estado del inventario ("Inventario crítico", "Inventario estable" o un mensaje de error).
 */

/**
 * @description Calcula el inventario final y su estado a partir de las cantidades inicial, vendida y recibida.
 * Este bloque funcional centraliza el cálculo del inventario. Se diseñó para recibir los valores numéricos
 * y devolver un objeto estructurado con los resultados, separando la lógica de negocio de la entrada/salida de datos.
 *
 * @param {number} inicial - La cantidad inicial de unidades.
 * @param {number} vendida - La cantidad de unidades vendidas.
 * @param {number} recibida - La cantidad de unidades recibidas en reposición.
 * @returns {ResultadoInventario} - Un objeto con el inventario final y el estado.
 */
export function calcularInventario(inicial, vendida, recibida) {
    // Decisión de diseño 1: Validar las entradas negativas.
    // Aunque la UI podría prevenirlo, la función debe ser robusta por sí misma. Se asegura que ninguna
    // entrada sea negativa, ya que no tienen sentido en este contexto (no se pueden vender -5 items).
    // Esto garantiza la integridad del cálculo.
    if (inicial < 0 || vendida < 0 || recibida < 0) {
        return {
            inventarioFinal: null,
            estado: "Error: Todas las cantidades deben ser números positivos."
        };
    }

    // Decisión de diseño 2: Validar la coherencia del stock.
    // Es crucial comprobar que las unidades vendidas no superen el stock disponible total (inicial + recibido).
    // Esta es una regla de negocio fundamental para cualquier sistema de inventario. Si se viola, se retorna
    // un error claro en lugar de un inventario negativo sin sentido.
    if (vendida > inicial + recibida) {
        return {
            inventarioFinal: null,
            estado: "Error: No se pueden vender más unidades de las que hay en existencia."
        };
    }

    const inventarioFinal = inicial - vendida + recibida;
    let estadoInventario;

    if (inventarioFinal < 5) {
        estadoInventario = "Inventario crítico";
    } else {
        estadoInventario = "Inventario estable";
    }

    return {
        inventarioFinal: inventarioFinal,
        estado: estadoInventario
    };
}
