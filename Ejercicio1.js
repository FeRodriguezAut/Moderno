// Enunciado analítico: 
// Un instructor desea verificar la asistencia de sus aprendices a una sesión. Para ello dispone de una lista de estudiantes inscritos y necesita validar si un nombre ingresado por el usuario corresponde a un aprendiz registrado. El programa debe confirmar la asistencia o reportar que el aprendiz no está inscrito. 
// Requerimientos: 
// • Usar un arreglo donde se almacenen los nombres de los aprendices. 
// • Aplicar un método de búsqueda (find, includes o filter). 
// • Crear una función que reciba el arreglo y el nombre a validar. 
// • Retornar si el aprendiz está inscrito o no. 
// Entradas solicitadas por el programa: 
// • Cantidad de aprendices. 
// • Nombre de cada aprendiz. 
// • Nombre a validar. 
// Salidas: 
// • Mensaje indicando si el aprendiz está inscrito o no.

// Función para verificar la asistencia de un aprendiz



function verificarAsistencia(aprendices, nombre) {
  return aprendices.some(aprendiz => aprendiz() === nombre());
}


const cantidadAprendices = parseInt(prompt("Ingrese la cantidad de aprendices:"));

const listaAprendices = [];

for (let i = 0; i < cantidadAprendices; i++) {
  const nombreAprendiz = prompt(`Ingrese el nombre del aprendiz ${i + 1}:`);
  listaAprendices.push(nombreAprendiz);
}

const nombreValidar = prompt("Ingrese el nombre del aprendiz a validar:");

if (verificarAsistencia(listaAprendices, nombreValidar)) {
  alert(`El aprendiz "${nombreValidar}" sí está inscrito.`);
} else {
  alert(`El aprendiz "${nombreValidar}" no está inscrito.`);
}
