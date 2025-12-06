// ejercicio17.js - Sistema de control de inventarios dinámicos

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Esto es necesario porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Producto
 * @property {string} id - ID único del producto.
 * @property {string} nombre - Nombre del producto.
 * @property {string} categoria - Categoría del producto (ej. "Lácteos", "Frutas", "Electrónica").
 * @property {number} stock - Cantidad en inventario.
 * @property {number} precio - Precio unitario del producto.
 * @property {boolean} perecedero - Indica si el producto es perecedero.
 * @property {Date | null} fechaVencimiento - Fecha de vencimiento si es perecedero, null si no.
 */

/**
 * Función principal para el sistema de control de inventarios dinámicos.
 * Orquesta la entrada de datos, la aplicación del callback de control y la generación del informe completo.
 */
async function sistemaControlInventarios() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 17: Sistema de control de inventarios dinámicos ---");
    console.log("Este programa analiza, clasifica y depura el inventario de una cadena de supermercados.");

    // Pregunta al usuario cuántos productos va a ingresar.
    let cantidadProductos = parseInt(prompt("Ingrese la cantidad total de productos a registrar en el inventario: "));

    // Valida que la cantidad de productos sea un número válido.
    while (isNaN(cantidadProductos) || cantidadProductos <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de productos.");
        cantidadProductos = parseInt(prompt("Ingrese la cantidad total de productos a registrar en el inventario: "));
    }

    const inventario = []; // Array para almacenar los objetos de productos.
    const hoy = new Date(); // Para comparar con fechas de vencimiento.

    // Bucle para pedir los datos de cada producto.
    for (let i = 0; i < cantidadProductos; i++) {
        console.log(`\n--- Detalles del Producto ${i + 1} ---`);
        const id = prompt("Ingrese el ID del producto: ");
        const nombre = prompt("Ingrese el nombre del producto: ");
        const categoria = prompt("Ingrese la categoría del producto (ej. Lácteos, Frutas, Electrónica): ");

        let stock = parseInt(prompt("Ingrese el stock actual del producto: "));
        while (isNaN(stock) || stock < 0) {
            console.log("Por favor, ingrese un número válido de stock (>= 0).");
            stock = parseInt(prompt("Ingrese el stock actual del producto: "));
        }

        let precio = parseFloat(prompt("Ingrese el precio unitario del producto: "));
        while (isNaN(precio) || precio <= 0) {
            console.log("Por favor, ingrese un precio válido (mayor que 0).");
            precio = parseFloat(prompt("Ingrese el precio unitario del producto: "));
        }

        let perecederoInput = prompt("¿Es un producto perecedero? (s/n): ").toLowerCase();
        const perecedero = (perecederoInput === 's');

        let fechaVencimiento = null;
        if (perecedero) {
            let fechaStr = prompt("Ingrese la fecha de vencimiento (YYYY-MM-DD): ");
            // Simple validación de formato, no es robusta.
            while (!/^\d{4}-\d{2}-\d{2}$/.test(fechaStr) || isNaN(new Date(fechaStr).getTime())) {
                console.log("Formato de fecha inválido. Use YYYY-MM-DD.");
                fechaStr = prompt("Ingrese la fecha de vencimiento (YYYY-MM-DD): ");
            }
            fechaVencimiento = new Date(fechaStr);
        }

        // Agrega el objeto de producto al arreglo.
        inventario.push({ 
            id, 
            nombre, 
            categoria: categoria.trim(), 
            stock, 
            precio, 
            perecedero, 
            fechaVencimiento 
        });
    }


    const informeInventario = procesarInventario(inventario, controlInventarioDefault);

    console.log("\n--- Informe Completo de Inventario ---");
    console.log(`Total de productos registrados: ${informeInventario.totalProductos}`);
    console.log(`Valor total económico del inventario: $${informeInventario.valorTotalInventario.toFixed(2)}`);

    console.log("\n--- Productos Agrupados por Acción Sugerida ---");
    for (const accion in informeInventario.productosPorAccion) {
        console.log(`\n** ${accion.toUpperCase()} (${informeInventario.productosPorAccion[accion].length} productos) **`);
        if (informeInventario.productosPorAccion[accion].length > 0) {
            informeInventario.productosPorAccion[accion].forEach(prod => {
                console.log(`- ID: ${prod.id}, Nombre: ${prod.nombre}, Stock: ${prod.stock}`);
            });
        } else {
            console.log("  No hay productos en esta categoría.");
        }
    }

    console.log("\n--- Productos con Mayor y Menor Stock ---");
    if (informeInventario.productoMayorStock) {
        console.log(`Mayor Stock: ${informeInventario.productoMayorStock.nombre} (ID: ${informeInventario.productoMayorStock.id}, Stock: ${informeInventario.productoMayorStock.stock})`);
    } else {
        console.log("No se pudo determinar el producto con mayor stock.");
    }
    if (informeInventario.productoMenorStock) {
        console.log(`Menor Stock: ${informeInventario.productoMenorStock.nombre} (ID: ${informeInventario.productoMenorStock.id}, Stock: ${informeInventario.productoMenorStock.stock})`);
    } else {
        console.log("No se pudo determinar el producto con menor stock.");
    }

    console.log("\n--- Productos Perecederos Próximos a Vencer ---");
    if (informeInventario.perecederosPorVencer.length > 0) {
        informeInventario.perecederosPorVencer.forEach(prod => {
            console.log(`- ID: ${prod.id}, Nombre: ${prod.nombre}, Vence: ${prod.fechaVencimiento.toLocaleDateString()}`);
        });
    } else {
        console.log("No hay productos perecederos próximos a vencer.");
    }

    console.log("\n--- Resumen por Categoría ---");
    for (const categoria in informeInventario.resumenPorCategoria) {
        const resumen = informeInventario.resumenPorCategoria[categoria];
        console.log(`- ${categoria}: ${resumen.cantidad} productos, Valor estimado: $${resumen.valor.toFixed(2)}`);
    }
}

/**
 * Procesa el inventario aplicando un callback de control y generando un informe detallado.
 * @param {Producto[]} inventario - Arreglo de objetos Producto.
 * @param {function(Producto): string} callback - La función callback que define la acción sugerida para cada producto.
 * @returns {Object} Un objeto con el informe completo del inventario.
 */
function procesarInventario(inventario, callback) {
    const informe = {
        productosPorAccion: {},
        productoMayorStock: null,
        productoMenorStock: null,
        perecederosPorVencer: [],
        resumenPorCategoria: {},
        valorTotalInventario: 0,
        totalProductos: inventario.length
    };

    // Inicializa la clasificación por acción.
    const accionesUnicas = ["ajustar precio", "retirar", "vigilar vencimiento", "vigilar stock bajo", "estable"];
    accionesUnicas.forEach(accion => {
        informe.productosPorAccion[accion] = [];
    });

    let menorStock = Infinity;
    let mayorStock = -Infinity;
    const hoy = new Date();
    const sieteDias = 7 * 24 * 60 * 60 * 1000;

    inventario.forEach(producto => {
        // 1. Aplicar el callback y clasificar productos por acción.
        const accionSugerida = callback(producto);
        if (!informe.productosPorAccion[accionSugerida]) { // Para manejar acciones no predefinidas.
            informe.productosPorAccion[accionSugerida] = [];
        }
        informe.productosPorAccion[accionSugerida].push(producto);

        // 2. Encontrar producto con mayor y menor stock.
        if (producto.stock < menorStock) {
            menorStock = producto.stock;
            informe.productoMenorStock = producto;
        }
        if (producto.stock > mayorStock) {
            mayorStock = producto.stock;
            informe.productoMayorStock = producto;
        }

        // 3. Separar productos perecederos y evaluar cuáles están próximos a vencerse.
        if (producto.perecedero && producto.fechaVencimiento) {
            const diferenciaTiempo = producto.fechaVencimiento.getTime() - hoy.getTime();
            if (diferenciaTiempo > 0 && diferenciaTiempo < sieteDias) {
                informe.perecederosPorVencer.push(producto);
            }
        }

        // 4. Generar un resumen por categoría.
        if (informe.resumenPorCategoria[producto.categoria]) {
            informe.resumenPorCategoria[producto.categoria].cantidad++;
            informe.resumenPorCategoria[producto.categoria].valor += (producto.stock * producto.precio);
        } else {
            informe.resumenPorCategoria[producto.categoria] = {
                cantidad: 1,
                valor: (producto.stock * producto.precio)
            };
        }
    });

    // 5. Calcular el valor total del inventario usando reduce().
    informe.valorTotalInventario = inventario.reduce((total, producto) => total + (producto.stock * producto.precio), 0);

    return informe;
}

/**
 * Función callback por defecto para controlar el inventario de un producto.
 * Retorna una acción sugerida basada en las características del producto.
 * @param {Producto} producto - El objeto Producto a controlar.
 * @returns {string} La acción sugerida (ej. "ajustar precio", "retirar", "vigilar", "estable").
 */
function controlInventarioDefault(producto) {
    const hoy = new Date();
    const sieteDias = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos.

    if (producto.perecedero && producto.fechaVencimiento && producto.fechaVencimiento < hoy) {
        return "retirar"; // Producto vencido.
    }
    if (producto.perecedero && producto.fechaVencimiento && (producto.fechaVencimiento.getTime() - hoy.getTime() < sieteDias)) {
        return "vigilar vencimiento"; // Producto próximo a vencer.
    }
    if (producto.stock < 10) {
        return "vigilar stock bajo"; // Stock bajo.
    }
    if (producto.stock > 100) {
        return "ajustar precio"; // Stock alto, sugerir ajuste de precio.
    }
    return "estable"; // No requiere acción especial.
}

// Ejecuta la función principal para iniciar el programa.
sistemaControlInventarios();
