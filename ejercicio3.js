// Esta función pide una nota y se asegura de que sea un número válido entre 0 y 5.
function solicitarNotaValida(mensaje) {
  let nota;
  while (true) {
    const entrada = prompt(mensaje);
    nota = parseFloat(entrada); // Usamos parseFloat para permitir decimales

    if (isNaN(nota) || nota < 0 || nota > 5) {
      alert("Error: Por favor, ingrese una nota válida entre 0 y 5.");
    } else {
      break; // Si la nota es válida, salimos del bucle
    }
  }
  return nota;
}

// Función principal para calcular el promedio y el rendimiento
function calcularPromedio() {
  // Entradas
  const cantidadNotas = parseInt(prompt("¿Cuántas notas va a ingresar?"));
  const notas = [];
  let sumaNotas = 0;

  // Usar un ciclo para pedir cada nota
  for (let i = 0; i < cantidadNotas; i++) {
    const nota = solicitarNotaValida(`Ingrese la nota #${i + 1}:`);
    notas.push(nota);
  }

  // Usar otro ciclo para sumar las notas del arreglo
  for (let i = 0; i < notas.length; i++) {
    sumaNotas += notas[i];
  }

  // Calcular el promedio
  const promedio = sumaNotas / notas.length;

  // Usar condicionales para determinar el rendimiento
  let rendimiento = "";
  if (promedio >= 4.0) {
    rendimiento = "Alto";
  } else if (promedio >= 3.0) {
    rendimiento = "Medio";
  } else {
    rendimiento = "Bajo";
  }

  // Salidas
  alert(`
    Promedio final: ${promedio.toFixed(2)}
    Rendimiento: ${rendimiento}
  `);

  // Retornar los valores (como pide el requerimiento)
  return { promedio: promedio, rendimiento: rendimiento };
}

// Llamamos a la función para que inicie el programa
calcularPromedio();