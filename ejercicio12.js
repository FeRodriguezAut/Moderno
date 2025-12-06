// ejercicio12.js - Gestión de pacientes por prioridad

// Importa dinámicamente 'prompt-sync' para manejar entradas de usuario en la consola.
// Usamos import dinámico porque este archivo se ejecuta como un módulo ES (debido a "type": "module" en package.json)
// y 'prompt-sync' es un módulo CommonJS.
const promptPromise = import('prompt-sync');

/**
 * @typedef {Object} Paciente
 * @property {string} nombre - Nombre del paciente.
 * @property {number} edad - Edad del paciente.
 * @property {number} prioridad - Nivel de prioridad (un número más alto indica mayor prioridad).
 */

/**
 * Función principal para gestionar pacientes por prioridad.
 * Esta función orquesta la entrada de datos, el procesamiento y la salida.
 */
async function gestionarPacientesPorPrioridad() {
    // Espera a que prompt-sync se cargue dinámicamente.
    const prompt = (await promptPromise).default({ sigint: true });

    console.log("--- Ejercicio 12: Gestión de pacientes por prioridad ---");
    console.log("Este programa ayuda a un centro médico a identificar al paciente con mayor prioridad para ser atendido.");
    console.log("Si varios tienen la misma prioridad, se selecciona al de mayor edad.");

    // Pide al usuario la cantidad de pacientes que se van a ingresar.
    let cantidadPacientes = parseInt(prompt("Ingrese la cantidad de pacientes a gestionar: "));

    // Asegura que la cantidad de pacientes sea un número válido.
    while (isNaN(cantidadPacientes) || cantidadPacientes <= 0) {
        console.log("Por favor, ingrese un número válido mayor que cero para la cantidad de pacientes.");
        cantidadPacientes = parseInt(prompt("Ingrese la cantidad de pacientes a gestionar: "));
    }

    const pacientes = []; // Array para almacenar los datos de los pacientes.

    // Bucle para pedir los datos de cada paciente.
    for (let i = 0; i < cantidadPacientes; i++) {
        console.log(`\n--- Datos del Paciente ${i + 1} ---`);
        const nombre = prompt("Ingrese el nombre del paciente: ");

        let edad = parseInt(prompt("Ingrese la edad del paciente: "));
        // Valida que la edad sea un número positivo.
        while (isNaN(edad) || edad <= 0) {
            console.log("Por favor, ingrese una edad válida (número positivo).");
            edad = parseInt(prompt("Ingrese la edad del paciente: "));
        }

        let prioridad = parseInt(prompt("Ingrese la prioridad del paciente (1-10, donde 10 es la más alta): "));
        // Valida que la prioridad esté en el rango de 1 a 10.
        while (isNaN(prioridad) || prioridad < 1 || prioridad > 10) {
            console.log("Por favor, ingrese una prioridad válida (número entre 1 y 10).");
            prioridad = parseInt(prompt("Ingrese la prioridad del paciente (1-10, donde 10 es la más alta): "));
        }

        // Agrega el paciente al arreglo.
        pacientes.push({ nombre, edad, prioridad });
    }


    let pacienteSeleccionado = null; // Variable para guardar el paciente que cumple los criterios.

    // Itera sobre el arreglo de pacientes para encontrar el de mayor prioridad.
    for (const paciente of pacientes) {
        // Si aún no hay un paciente seleccionado, el primero se convierte en el seleccionado.
        if (pacienteSeleccionado === null) {
            pacienteSeleccionado = paciente;
        } else {
            // Compara la prioridad del paciente actual con la del paciente seleccionado.
            if (paciente.prioridad > pacienteSeleccionado.prioridad) {
                // Si el paciente actual tiene mayor prioridad, se convierte en el nuevo seleccionado.
                pacienteSeleccionado = paciente;
            } else if (paciente.prioridad === pacienteSeleccionado.prioridad) {
                // Si las prioridades son iguales, se desempata por edad (mayor edad gana).
                if (paciente.edad > pacienteSeleccionado.edad) {
                    pacienteSeleccionado = paciente;
                }
            }
        }
    }
    // Muestra la información del paciente seleccionado o un mensaje si no hay pacientes.
    if (pacienteSeleccionado) {
        console.log("\n--- Paciente Seleccionado para Atención ---");
        console.log(`Nombre: ${pacienteSeleccionado.nombre}`);
        console.log(`Edad: ${pacienteSeleccionado.edad} años`);
        console.log(`Prioridad: ${pacienteSeleccionado.prioridad}`);
    } else {
        console.log("\nNo se ingresaron pacientes, por lo tanto, no hay paciente para seleccionar.");
    }
}

// Ejecuta la función principal para iniciar el programa.
gestionarPacientesPorPrioridad();
