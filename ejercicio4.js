
function solicitarPrecioValido(mensaje) {
  let precio;
  while (true) {
    const entrada = prompt(mensaje);
    precio = parseFloat(entrada); // parseFloat para permitir decimales

    if (isNaN(precio) || precio < 0) {
      alert("Error: Por favor, ingrese un precio válido y positivo.");
    } else {
      break; // Si el precio es válido, salimos del bucle
    }
  }
  return precio;
}


function ordenarYEncontrarExtremos(precios) {
  // Creamos una copia para no modificar el arreglo original y lo ordenamos de mayor a menor
  const preciosOrdenados = [...precios].sort((a, b) => b - a);

  // El precio más alto es el primer elemento del arreglo ordenado
  const precioMasAlto = preciosOrdenados[0];

  // El precio más bajo es el último elemento
  const precioMasBajo = preciosOrdenados[preciosOrdenados.length - 1];

  return {
    ordenados: preciosOrdenados,
    masAlto: precioMasAlto,
    masBajo: precioMasBajo
  };
}

// Función principal que orquesta el programa
function analizarPrecios() {
  // Entradas
  const cantidadPrecios = parseInt(prompt("¿Cuántos precios va a ingresar?"));
  const precios = [];

  for (let i = 0; i < cantidadPrecios; i++) {
    const precio = solicitarPrecioValido(`Ingrese el precio del producto #${i + 1}:`);
    precios.push(precio);
  }

  // Proceso
  const resultado = ordenarYEncontrarExtremos(precios);

  // Salidas
  alert(`
    Precios ordenados (mayor a menor): ${resultado.ordenados.join(", ")}
    
    Precio más alto: ${resultado.masAlto}
    Precio más bajo: ${resultado.masBajo}
  `);
}

// Iniciar el programa
analizarPrecios();
