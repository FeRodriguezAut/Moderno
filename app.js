// Importar las funciones de los módulos de ejercicios desde el archivo barril.
import { 
    verificarAsistencia,
    calcularInventario,
    calcularPromedio,
    ordenarYEncontrarExtremos,
    validarUsuario,
    calcularNomina
} from './modules.js';


// --- LÓGICA PRINCIPAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE NAVEGACIÓN ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.ejercicio');

    const showSection = (hash) => {
        const targetHash = hash || '#ejercicio1';
        sections.forEach(section => {
            section.classList.toggle('active', `#${section.id}` === targetHash);
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === targetHash);
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetHash = link.getAttribute('href');
            history.pushState(null, '', targetHash);
            showSection(targetHash);
        });
    });

    window.addEventListener('popstate', () => {
        showSection(window.location.hash);
    });

    showSection(window.location.hash);

    // --- LÓGICA DE EJERCICIOS ---

    // EJERCICIO 1
    const form1 = document.getElementById('form-ejercicio1');
    if (form1) {
        form1.addEventListener('submit', (event) => {
            event.preventDefault();
            const aprendicesInput = document.getElementById('aprendices1').value;
            const nombreInput = document.getElementById('nombre1').value;
            const resultadoDiv = document.getElementById('resultado1');
            const aprendices = aprendicesInput.split(',').map(nombre => nombre.trim());
            const estaInscrito = verificarAsistencia(aprendices, nombreInput);
            resultadoDiv.textContent = estaInscrito 
                ? `El aprendiz "${nombreInput}" SÍ está inscrito.` 
                : `El aprendiz "${nombreInput}" NO está inscrito.`;
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 2
    const form2 = document.getElementById('form-ejercicio2');
    if (form2) {
        form2.addEventListener('submit', (event) => {
            event.preventDefault();
            const inicial = parseInt(document.getElementById('inicial2').value, 10);
            const vendida = parseInt(document.getElementById('vendida2').value, 10);
            const recibida = parseInt(document.getElementById('recibida2').value, 10);
            const resultadoDiv = document.getElementById('resultado2');
            const resultado = calcularInventario(inicial, vendida, recibida);
            if (resultado.inventarioFinal !== null) {
                resultadoDiv.textContent = `Inventario final: ${resultado.inventarioFinal} unidades. Estado: ${resultado.estado}.`;
            } else {
                resultadoDiv.textContent = resultado.estado;
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 3
    const form3 = document.getElementById('form-ejercicio3');
    if (form3) {
        form3.addEventListener('submit', (event) => {
            event.preventDefault();
            const notasInput = document.getElementById('notas3').value;
            const resultadoDiv = document.getElementById('resultado3');
            const notas = notasInput.split(',')
                                  .map(n => n.trim())
                                  .filter(n => n !== '')
                                  .map(n => parseFloat(n));
            const resultado = calcularPromedio(notas);
            if (resultado.promedio !== null) {
                resultadoDiv.textContent = `Promedio final: ${resultado.promedio.toFixed(2)}. Rendimiento: ${resultado.rendimiento}.`;
            } else {
                resultadoDiv.textContent = resultado.rendimiento;
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 4
    const form4 = document.getElementById('form-ejercicio4');
    if (form4) {
        form4.addEventListener('submit', (event) => {
            event.preventDefault();
            const preciosInput = document.getElementById('precios4').value;
            const resultadoDiv = document.getElementById('resultado4');
            const precios = preciosInput.split(',')
                                      .map(p => p.trim())
                                      .filter(p => p !== '')
                                      .map(p => parseFloat(p));
            const resultado = ordenarYEncontrarExtremos(precios);
            if (resultado.error) {
                resultadoDiv.textContent = resultado.error;
            } else {
                resultadoDiv.innerHTML = `Precios ordenados (mayor a menor): ${resultado.ordenados.join(", ")}<br>
                                          Precio más alto: ${resultado.masAlto}<br>
                                          Precio más bajo: ${resultado.masBajo}`;
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 5
    const form5 = document.getElementById('form-ejercicio5');
    if (form5) {
        form5.addEventListener('submit', (event) => {
            event.preventDefault();
            const estado = document.getElementById('estado5').value;
            const rol = document.getElementById('rol5').value;
            const resultadoDiv = document.getElementById('resultado5');
            const resultado = validarUsuario(estado, rol);
            let mensaje = `Acceso: ${resultado.accesoPermitido ? 'Permitido' : 'Denegado'}.<br>`;
            mensaje += `Detalle: ${resultado.mensaje}`;
            resultadoDiv.innerHTML = mensaje;
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 6: Cálculo Modular de Nómina
    const form6 = document.getElementById('form-ejercicio6');
    if (form6) {
        form6.addEventListener('submit', (event) => {
            event.preventDefault();

            // 1. ENTRADA
            const valorHora = parseFloat(document.getElementById('valorHora6').value);
            const horasTrabajadas = parseInt(document.getElementById('horasTrabajadas6').value, 10);
            const resultadoDiv = document.getElementById('resultado6');

            // 2. PROCESO
            const resultado = calcularNomina(valorHora, horasTrabajadas);

            // 3. SALIDA
            if (resultado.error) {
                resultadoDiv.textContent = resultado.error;
            } else {
                resultadoDiv.innerHTML = `Salario Bruto: $${resultado.salarioBruto.toFixed(2)}<br>
                                          Total Deducciones (8%): $${resultado.deducciones.toFixed(2)}<br>
                                          <strong>Salario Neto: $${resultado.salarioNeto.toFixed(2)}</strong>`;
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 7: Registro dinámico de productos
    const form7 = document.getElementById('form-ejercicio7');
    if (form7) {
        form7.addEventListener('submit', (event) => {
            event.preventDefault();
            const productosInput = document.getElementById('productos7').value;
            const resultadoDiv = document.getElementById('resultado7');

            // Convertir la cadena de entrada a un array de productos, eliminando espacios y filtrando vacíos
            const productosArray = productosInput.split(',')
                                                .map(p => p.trim())
                                                .filter(p => p !== '');
            
            // Llamar a la función principal de lógica para registrar productos
            const productosUnicos = registrarProductos(...productosArray); // Usar spread para pasar como rest parameters

            // Mostrar el resultado en la interfaz
            if (productosUnicos.length > 0) {
                resultadoDiv.textContent = `Productos registrados (sin duplicados): ${productosUnicos.join(', ')}`;
            } else {
                resultadoDiv.textContent = 'No se registraron productos.';
            }
            resultadoDiv.style.display = 'block';
        });
    }
});
