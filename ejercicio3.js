// ejercicio3.js
// Calcula el promedio de calificaciones y determina el rendimiento académico.

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * @function calcularPromedio
 * @description Calcula el promedio de un array de notas y asigna un nivel de rendimiento.
 * @param {Array<number>} notas - Un array de calificaciones (números entre 0 y 5).
 * @returns {Object} { promedio: number | null, rendimiento: string }.
 */
function calcularPromedio(notas) {
    // Validar que cada nota sea un número entre 0 y 5.
    for (const nota of notas) {
        if (typeof nota !== 'number' || isNaN(nota) || nota < 0 || nota > 5) {
            return {
                promedio: null,
                rendimiento: `Error: La nota "${nota}" no es un número válido entre 0 y 5.`
            };
        }
    }
    
    // Manejar caso de lista de notas vacía.
    if (notas.length === 0) {
        return {
            promedio: 0,
            rendimiento: "No se ingresaron notas."
        };
    }

    // Calcular la suma total de las notas.
    const sumaNotas = notas.reduce((acumulador, notaActual) => acumulador + notaActual, 0);
    
    // Calcular el promedio.
    const promedio = sumaNotas / notas.length;

    let rendimiento;
    // Determinar el rendimiento según el promedio.
    if (promedio >= 4.0) {
        rendimiento = "Alto";
    } else if (promedio >= 3.0) {
        rendimiento = "Medio";
    } else {
        rendimiento = "Bajo";
    }

    // Retornar el promedio y rendimiento.
    return {
        promedio: promedio,
        rendimiento: rendimiento
    };
}

// --- Interacción con el usuario en la terminal ---

console.log("--- Ejercicio 3: Análisis de Calificaciones ---");

let notasInputValido = false;
let listaNotas = [];

// Solicitar y validar las notas ingresadas por el usuario.
while (!notasInputValido) {
    const notasStr = prompt('Ingresa las calificaciones separadas por comas (0-5): ');
    const notasRaw = notasStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    listaNotas = [];
    let todasNotasValidas = true;

    if (notasRaw.length === 0) {
        console.log("No ingresaste ninguna nota. El promedio será 0.");
        notasInputValido = true;
        break;
    }

    for (const notaStr of notasRaw) {
        const nota = Number(notaStr);
        // Validar cada nota individual.
        if (isNaN(nota) || nota < 0 || nota > 5) {
            console.log(`Error: "${notaStr}" no es una nota válida. Debe ser un número entre 0 y 5.`);
            todasNotasValidas = false;
            break;
        }
        listaNotas.push(nota);
    }

    if (todasNotasValidas) {
        notasInputValido = true;
    } else {
        console.log("Por favor, vuelve a ingresar las notas correctamente.");
    }
}

// Llamar a la función para calcular promedio.
const resultado = calcularPromedio(listaNotas);

// Mostrar el resultado.
if (resultado.promedio !== null) {
    console.log(`Promedio: ${resultado.promedio.toFixed(2)}`);
    console.log(`Rendimiento: ${resultado.rendimiento}`);
} else {
    console.log(`Error en el cálculo: ${resultado.rendimiento}`);
}

console.log("--- Fin del Ejercicio 3 ---");
