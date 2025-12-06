/**
 *Ejercicio2.js
 * Módulo de cálculo de inventario.
 * Calcula inventario final y estado.*
 * 
 */
export function calcularInventario(inicial, vendida, recibida) {
    // Validación de entradas negativas.
    if (inicial < 0 || vendida < 0 || recibida < 0) {
        return {
            inventarioFinal: null,
            estado: "Error: Todas las cantidades deben ser números positivos."
        };
    }

    // Validación de coherencia del stock.
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
