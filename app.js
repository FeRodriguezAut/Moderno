// Importación de funciones desde modules.js.
import { 
    verificarAsistencia,
    calcularInventario,
    calcularPromedio,
    ordenarYEncontrarExtremos,
    validarUsuario,
    calcularNomina
} from './modules.js';


// Lógica principal de la aplicación.

document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica de navegación.
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

    // Lógica para el manejo de ejercicios.

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

            // Manejo de entrada.
            const valorHora = parseFloat(document.getElementById('valorHora6').value);
            const horasTrabajadas = parseInt(document.getElementById('horasTrabajadas6').value, 10);
            const resultadoDiv = document.getElementById('resultado6');

            // Procesamiento de datos.
            const resultado = calcularNomina(valorHora, horasTrabajadas);

            // Visualización de salida.
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

            // Conversión de cadena a array de productos.
            const productosArray = productosInput.split(',')
                                                .map(p => p.trim())
                                                .filter(p => p !== '');
            
            // Llamada a función de registro de productos.
            const productosUnicos = registrarProductos(...productosArray); // Usar spread para pasar como rest parameters

            // Mostrar resultados en la interfaz.
            if (productosUnicos.length > 0) {
                resultadoDiv.textContent = `Productos registrados (sin duplicados): ${productosUnicos.join(', ')}`;
            } else {
                resultadoDiv.textContent = 'No se registraron productos.';
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 8: Búsqueda avanzada en un catálogo
    const form8 = document.getElementById('form-ejercicio8');
    if (form8) {
        // Catálogo de cursos.
        const miCatalogo = [
            { nombre: "Introducción a JS", categoria: "Programación", duracion: 10, etiquetas: ["frontend", "web"] },
            { nombre: "Diseño UX/UI", categoria: "Diseño", duracion: 25, etiquetas: ["usabilidad", "interfaz"] },
            { nombre: "Python para Data Science", categoria: "Programación", duracion: 40, etiquetas: ["backend", "datos"] },
            { nombre: "Fundamentos de Marketing Digital", categoria: "Marketing", duracion: 15, etiquetas: ["estrategia", "seo"] },
            { nombre: "Diseño Web Responsivo", categoria: "Diseño", duracion: 30, etiquetas: ["frontend", "css"] },
            { nombre: "Bases de Datos con SQL", categoria: "Programación", duracion: 20, etiquetas: ["backend", "datos"] },
            { nombre: "Animación 3D", categoria: "Diseño", duracion: 35, etiquetas: ["graficos", "multimedia"] },
            { nombre: "Desarrollo Móvil con React Native", categoria: "Programación", duracion: 50, etiquetas: ["movil", "frontend"] },
        ];

        const catalogoDisplayDiv = document.getElementById('catalogoDisplay8');
        // Visualización del catálogo inicial.
        const displayCatalogo = (catalogo) => {
            catalogoDisplayDiv.textContent = JSON.stringify(catalogo, null, 2);
        };
        displayCatalogo(miCatalogo);

        form8.addEventListener('submit', (event) => {
            event.preventDefault();
            const criterioTipo = document.getElementById('criterioTipo8').value;
            const criterioValor = document.getElementById('criterioValor8').value.trim();
            const resultadoDiv = document.getElementById('resultado8');

            let callbackBusqueda;
            let errorMensaje = '';

            // Construcción de callback de búsqueda.
            switch (criterioTipo) {
                case 'categoria':
                    if (criterioValor) {
                        callbackBusqueda = curso => curso.categoria.toLowerCase() === criterioValor.toLowerCase();
                    } else {
                        errorMensaje = "Por favor, ingresa una categoría para buscar.";
                    }
                    break;
                case 'duracionMayor':
                    const duracionNum = parseInt(criterioValor, 10);
                    if (!isNaN(duracionNum) && duracionNum >= 0) {
                        callbackBusqueda = curso => curso.duracion > duracionNum;
                    } else {
                        errorMensaje = "Por favor, ingresa un número válido para la duración (mayor o igual a 0).";
                    }
                    break;
                case 'nombreCoincide':
                    if (criterioValor) {
                        callbackBusqueda = curso => curso.nombre.toLowerCase().includes(criterioValor.toLowerCase());
                    } else {
                        errorMensaje = "Por favor, ingresa texto para buscar en el nombre.";
                    }
                    break;
                default:
                    errorMensaje = "Criterio de búsqueda no reconocido.";
            }

            if (errorMensaje) {
                resultadoDiv.textContent = `Error: ${errorMensaje}`;
                resultadoDiv.style.color = 'red';
            } else {
                // Llamada a función de búsqueda de cursos.
                const cursosFiltrados = buscarCursos(miCatalogo, callbackBusqueda);

                // Mostrar resultados en la interfaz.
                if (cursosFiltrados.length > 0) {
                    const formattedResults = cursosFiltrados.map(curso => `- ${curso.nombre} (${curso.categoria}, ${curso.duracion}h)`).join('\n');
                    resultadoDiv.innerHTML = `<strong>Cursos encontrados:</strong><pre>${formattedResults}</pre>`;
                    resultadoDiv.style.color = 'green';
                } else {
                    resultadoDiv.textContent = 'No se encontraron cursos que coincidan con el criterio.';
                    resultadoDiv.style.color = 'orange';
                }
            }
            resultadoDiv.style.display = 'block';
        });
    }

    // EJERCICIO 9: Procesamiento de pagos.
    const form9 = document.getElementById('form-ejercicio9');
    if (form9) {
        // Datos de pagos.
        const misPagos = [
            { id: 'P001', monto: 120, moneda: 'USD', estado: 'completado' },
            { id: 'P002', monto: 80, moneda: 'USD', estado: 'pendiente' },
            { id: 'P003', monto: 250, moneda: 'COP', estado: 'completado' },
            { id: 'P004', monto: 50, moneda: 'USD', estado: 'completado' },
            { id: 'P005', monto: 180, moneda: 'COP', estado: 'pendiente' },
            { id: 'P006', monto: 300, moneda: 'USD', estado: 'completado' },
            { id: 'P007', monto: 90, moneda: 'COP', estado: 'completado' },
        ];

        const pagosDisplayDiv = document.getElementById('pagosDisplay9');
        const displayPagos = (pagos) => {
            pagosDisplayDiv.textContent = JSON.stringify(pagos, null, 2);
        };
        displayPagos(misPagos); // Visualización de pagos iniciales.

        form9.addEventListener('submit', (event) => {
            event.preventDefault();
            const reglaTipo = document.getElementById('reglaTipo9').value;
            const reglaValor = document.getElementById('reglaValor9').value.trim();
            const resultadoAprobadosDiv = document.getElementById('resultadoAprobados9');
            const resultadoRechazadosDiv = document.getElementById('resultadoRechazados9');

            let reglaAprobacionCallback;
            let errorMensaje = '';

            switch (reglaTipo) {
                case 'montoMinimo':
                    const montoMin = parseFloat(reglaValor);
                    if (!isNaN(montoMin) && montoMin >= 0) {
                        reglaAprobacionCallback = pago => pago.monto >= montoMin && pago.estado === 'completado';
                    } else {
                        errorMensaje = "Ingresa un monto mínimo válido (número positivo).";
                    }
                    break;
                case 'monedaEspecifica':
                    if (reglaValor) {
                        reglaAprobacionCallback = pago => pago.moneda.toLowerCase() === reglaValor.toLowerCase() && pago.estado === 'completado';
                    } else {
                        errorMensaje = "Ingresa una moneda para la regla.";
                    }
                    break;
                case 'estadoCompletado':
                    reglaAprobacionCallback = pago => pago.estado === 'completado';
                    break;
                default:
                    errorMensaje = "Tipo de regla no reconocido.";
            }

            if (errorMensaje) {
                resultadoAprobadosDiv.textContent = `Error: ${errorMensaje}`;
                resultadoAprobadosDiv.style.color = 'red';
                resultadoRechazadosDiv.textContent = '';
            } else {
                const { aprobados, rechazados } = procesarPagos(misPagos, reglaAprobacionCallback);

                if (aprobados.length > 0) {
                    const formattedAprobados = aprobados.map(p => `- ${p.id}: $${p.monto} ${p.moneda} (${p.estado})`).join('\n');
                    resultadoAprobadosDiv.innerHTML = `<strong>Pagos Aprobados:</strong><pre>${formattedAprobados}</pre>`;
                    resultadoAprobadosDiv.style.color = 'green';
                } else {
                    resultadoAprobadosDiv.textContent = 'No hay pagos aprobados.';
                    resultadoAprobadosDiv.style.color = 'orange';
                }

                if (rechazados.length > 0) {
                    const formattedRechazados = rechazados.map(p => `- ${p.id}: $${p.monto} ${p.moneda} (${p.estado})`).join('\n');
                    resultadoRechazadosDiv.innerHTML = `<strong>Pagos Rechazados:</strong><pre>${formattedRechazados}</pre>`;
                    resultadoRechazadosDiv.style.color = 'red';
                } else {
                    resultadoRechazadosDiv.textContent = 'No hay pagos rechazados.';
                    resultadoRechazadosDiv.style.color = 'green';
                }
            }
            resultadoAprobadosDiv.style.display = 'block';
            resultadoRechazadosDiv.style.display = 'block';
        });
    }
});
