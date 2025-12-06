// Script para el cálculo de inventario.
function solicitarNumeroValido(mensaje) {
  let numero;
  while (true) {
    const entrada = prompt(mensaje);
    numero = parseInt(entrada);

    // Validación de entrada numérica.
    if (isNaN(numero) || numero < 0) {
      alert("Error: Por favor, ingrese un número válido y positivo.");
    } else {
      // Ruptura de bucle para número válido.
      break;
    }
  }
  return numero;
}

function calcularInventario() {
  // 1. Solicitud de entradas.
  const cantidadInicial = solicitarNumeroValido("Ingrese la cantidad inicial del inventario:");
  const cantidadVendida = solicitarNumeroValido("Ingrese la cantidad de unidades vendidas:");
  const cantidadRecibida = solicitarNumeroValido("Ingrese la cantidad de unidades recibidas en reposición:");

  // 2. Validación de ventas vs stock.
  if (cantidadVendida > cantidadInicial + cantidadRecibida) {
    alert("Error: No se pueden vender más unidades de las que hay en existencia.");
    return;
  }

  // 3. Cálculo de inventario final.
  const inventarioFinal = cantidadInicial - cantidadVendida + cantidadRecibida;

  // 4. Determinación de estado crítico.
  let estadoInventario;
  if (inventarioFinal < 5) {
    estadoInventario = "Inventario crítico";
  } else {
    estadoInventario = "Inventario estable";
  }

  // 5. Presentación de resultados.
  alert(`El inventario final es de: ${inventarioFinal} unidades.\nEstado: ${estadoInventario}`);
}

// Ejecución de la función principal.
calcularInventario();
