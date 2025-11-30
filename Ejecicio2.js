// Enunciado analítico:
// Una tienda en línea requiere conocer el inventario actualizado de un producto. Se debe calcular el inventario final según la cantidad inicial, las unidades vendidas y las unidades recibidas en reposición. Además, se debe identificar si el inventario queda en estado crítico.
// ... (mismos requerimientos y salidas)

/**
}
 */
function solicitarNumeroValido(mensaje) {
  let numero;
  while (true) {
    const entrada = prompt(mensaje);
    numero = parseInt(entrada);

    // Verificamos si la entrada NO es un número O si es un número negativo.
    if (isNaN(numero) || numero < 0) {
      alert("Error: Por favor, ingrese un número válido y positivo.");
    } else {
      // Si el número es válido, rompemos el bucle.
      break;
    }
  }
  return numero;
}

function calcularInventario() {
  // 1. Entradas solicitadas por el programa (usando la nueva función con bucle)
  const cantidadInicial = solicitarNumeroValido("Ingrese la cantidad inicial del inventario:");
  const cantidadVendida = solicitarNumeroValido("Ingrese la cantidad de unidades vendidas:");
  const cantidadRecibida = solicitarNumeroValido("Ingrese la cantidad de unidades recibidas en reposición:");

  // 2. Validar que las ventas no superen el stock
  if (cantidadVendida > cantidadInicial + cantidadRecibida) {
    alert("Error: No se pueden vender más unidades de las que hay en existencia.");
    return;
  }

  // 3. Usar operadores matemáticos para calcular el inventario final
  const inventarioFinal = cantidadInicial - cantidadVendida + cantidadRecibida;

  // 4. Indicar si el inventario es crítico
  let estadoInventario;
  if (inventarioFinal < 5) {
    estadoInventario = "Inventario crítico";
  } else {
    estadoInventario = "Inventario estable";
  }

  // 5. Salidas
  alert(`El inventario final es de: ${inventarioFinal} unidades.\nEstado: ${estadoInventario}`);
}

// Llamamos a la función para que se ejecute
calcularInventario();
