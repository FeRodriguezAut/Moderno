

| ![][image1] | Centro Industrial de Mantenimiento Integral  Versión: 04 INSTRUMENTO DE EVALUACIÓN  |
| :---: | ----- |

| INFORMACIÓN GENERAL |
| :---- |
| **CODIGO PARA IDENTIFICACIÓN DEL INSTRUMENTO**: *3233198-*233104*\-3* |
| **FECHA DE APLICACIÓN:** 11-29-2025 |
| **PROGRAMA DE FORMACIÓN:** Técnico en programación de software |
| **NO DE FICHA**: 3233198 |
| **CRITERIOS DE EVALUACIÓN** Resolver procesos lógicos a través de la implementación de  Algoritmos y el lenguaje de programación seleccionado:  Solucionar problemas de lógica proposicional.  Usar estructuras secuenciales en la construcción de algoritmos.  Utilizar estructuras de control en la construcción de algoritmos.  Emplear estructuras cíclicas en la construcción de algoritmos.  Construir algoritmos con arreglos.  **INSTRUCCIONES:**  Producto entregable:   Realizar los siguientes algoritmos en JavaScript  Envío de la evidencia en digital con los ejercicios resueltos  Fecha de entrega: 11-29-2025 de noviembre de 2025   Tiempo máximo de desarrollo de la actividad: 5 horas |
| EVIDENCIA: Desempeño Producto **Conocimiento** |
| NOMBRE DEL APRENDIZ:  |
| NOMBRE DEL INSTRUCTOR- TUTOR: John Freddy Becerra Castellanos  |

**Instrucciones generales**  

**Interfaz**:  

Crear una **interfaz web** (HTML \+ CSS) en la que el usuario pueda seleccionar  **claramente** cada uno de los tres ejercicios propuestos 

o Cada ejercicio debe presentarse como un **módulo independiente** 

(sección/archivo) con su propia descripción y controles para ingresar datos de  prueba. 

o La interfaz deberá permitir ingresar datos de entrada (formularios o inputs),  ejecutar la lógica y mostrar salidas/resultado en pantalla de forma legible y  ordenada.  
**Modularidad y código**: 

• Implementar cada ejercicio en **módulos separados** (mínimo: un archivo JS por  ejercicio, y/o funciones exportadas). 

• El código debe estar claramente comentado: antes de cada bloque funcional  (función, callback, procesamiento importante) el aprendiz debe escribir un  comentario que explique en lenguaje natural **qué hace** el bloque y **por qué** se  diseñó así. 

• Los callbacks deben estar documentados: explicar qué parámetros reciben, qué  retornan y qué responsabilidad tienen dentro del flujo. 

**Explicación técnica**: 

• En cada módulo, incluir una sección (puede ser un bloque HTML o un archivo docs/)  donde el aprendiz describa **entradas**, **proceso**, **salidas**, **reglas de negocio** y  **casos límite** contemplados. 

• Debe quedar evidencia de análisis: al menos 2 decisiones de diseño justificadas por  módulo (por ejemplo: por qué se usa filter vs reduce, manejo de empates,  ordenamiento por prioridad, criterios de seguridad). 

**Publicación en GitHub**: 

• El proyecto debe subirse a un **repositorio público en GitHub**. 

• Debe compartirse **un enlace público para visualizar** (GitHub Pages o index.html directo) **y la URL para clonar** (formato https://github.com/tu-usuario/tu-repo.git). • En el README.md del repositorio deben aparecer: objetivo del proyecto,  instrucciones de instalación/ejecución, ejemplos de uso (con datos de prueba), y el  **nombre y correo** del autor (solo del estudiante que realiza la prueba). **No deben  aparecer nombres de compañeros.** 

**Control de versiones y entregables**: 

• El repositorio debe mostrar **historial de commits significativos** (mensajes claros  que indiquen avances). 

• Entregar el enlace público de visualización y la URL de clonación en la plataforma  indicada por el instructor (Classroom, correo, o sistema de gestión). 

• Opcional pero recomendado: habilitar GitHub Pages para que la interfaz sea  accesible públicamente desde el navegador.  
**Enunciados:** 

**Ejercicio 1: Validación de asistencia en un curso** 

**Enunciado analítico:** 

Un instructor desea verificar la asistencia de sus aprendices a una sesión. Para ello  dispone de una lista de estudiantes inscritos y necesita validar si un nombre ingresado por  el usuario corresponde a un aprendiz registrado. El programa debe confirmar la asistencia  o reportar que el aprendiz no está inscrito. 

**Requerimientos:** 

• Usar un arreglo donde se almacenen los nombres de los aprendices. • Aplicar un método de búsqueda (find, includes o filter). 

• Crear una función que reciba el arreglo y el nombre a validar. 

• Retornar si el aprendiz está inscrito o no. 

**Entradas solicitadas por el programa:** 

• Cantidad de aprendices. 

• Nombre de cada aprendiz. 

• Nombre a validar. 

**Salidas:** 

• Mensaje indicando si el aprendiz está inscrito o no. 

**Ejercicio 2: Actualización de inventario en tienda digital** 

**Enunciado analítico:** 

Una tienda en línea requiere conocer el inventario actualizado de un producto. Se debe  calcular el inventario final según la cantidad inicial, las unidades vendidas y las unidades  recibidas en reposición. Además, se debe identificar si el inventario queda en estado crítico. **Requerimientos:** 

• Crear una función calcularInventario(). 

• Usar operadores matemáticos. 

• Validar valores negativos con condicionales.  
• Indicar si el inventario es crítico (menor a 5 unidades). 

**Entradas solicitadas por el programa:** 

• Cantidad inicial. 

• Cantidad vendida. 

• Cantidad recibida. 

**Salidas:** 

• Inventario final. 

• Mensaje “Inventario crítico” o “Inventario estable”. 

**Ejercicio 3: Análisis de calificaciones de un aprendiz** 

**Enunciado analítico:** 

Un aprendiz recibe varias calificaciones y desea saber su rendimiento general. Se necesita  un programa que permita ingresar las notas obtenidas, calcule el promedio y determine si el  rendimiento es Alto, Medio o Bajo según rangos preestablecidos. 

**Requerimientos:** 

• Crear una función declarada calcularPromedio(). 

• Usar un ciclo para recorrer el arreglo de notas. 

• Usar condicionales para determinar rendimiento. 

• Retornar promedio y rendimiento. 

**Entradas:** 

• Cantidad de notas. 

• Cada una de las notas. 

**Salidas:** 

• Promedio final. 

• Categoría de rendimiento. 

**Ejercicio 4: Ordenamiento de precios de productos** 

**Enunciado analítico:** 

Una empresa necesita organizar los precios de sus productos para analizarlos. El programa   
debe recibir los precios registrados, ordenarlos de mayor a menor y determinar cuál es el  precio más alto y el más bajo. 

**Requerimientos:** 

• Usar un arreglo para almacenar los precios. 

• Emplear el método sort(). 

• Crear una función que retorne el arreglo ordenado y los valores extremos. **Entradas:** 

• Cantidad de precios. 

• Cada precio. 

**Salidas:** 

• Arreglo ordenado. 

• Precio más alto y más bajo. 

**Ejercicio 5: Validación de usuario y permisos** 

**Enunciado analítico:** 

Un sistema debe validar si un usuario puede acceder y qué permisos posee según su rol.  El programa recibirá los datos del usuario y evaluará si está activo y qué tipo de acceso  corresponde a su rol. 

**Requerimientos:** 

• Crear una función validarUsuario(). 

• Usar operadores lógicos y condicionales. 

• Evaluar roles: admin, editor y lector. 

• Retornar nivel de acceso. 

**Entradas:** 

• Nombre. 

• Estado (activo/inactivo). 

• Rol. 

**Salidas:** 

• Permisos asignados según el rol. 

• Mensaje de acceso permitido o denegado.  
**Ejercicio 6: Cálculo modular de nómina** 

**Enunciado analítico:** 

Una empresa requiere calcular el salario neto de un trabajador separando el proceso en  módulos independientes: salario base, deducciones y salario final. 

**Requerimientos:** 

• Crear tres funciones: calcularSalarioBase(), calcularDeducciones(), calcularNeto(). • Manejo de parámetros para conectar los módulos. 

• Aplicar operaciones matemáticas. 

• Retornar el salario final. 

**Entradas:** 

• Valor de hora. 

• Horas trabajadas. 

**Salidas:** 

• Salario base. 

• Total deducciones. 

• Salario neto. 

**Ejercicio 7: Registro dinámico de productos usando parámetros rest** 

**Enunciado analítico:** 

Una aplicación desea permitir el registro de un número indefinido de productos sin  duplicados. El programa debe almacenar los productos ingresados y evitar registros  repetidos. 

**Requerimientos:** 

• Crear una función registrarProductos(...productos). 

• Usar parámetros rest. 

• Validar duplicados. 

• Retornar la lista final de productos. 

**Entradas:** 

• Múltiples nombres de productos. 

**Salidas:** 

• Lista de productos sin duplicados.  
**Ejercicio 8: Búsqueda avanzada en un catálogo usando callbacks** 

**Enunciado analítico:** 

Un catálogo de cursos necesita un sistema flexible de búsqueda que permita filtrar según  diferentes criterios definidos por un callback (categoría, duración o coincidencia en el  nombre). 

**Requerimientos:** 

• Crear una función buscarCursos(catalogo, callback). 

• El callback debe definir el criterio de búsqueda. 

• Aplicar filter() con el callback. 

• Retornar los cursos encontrados. 

**Entradas:** 

• Cantidad de cursos. 

• Datos de cada curso. 

• Criterio definido mediante callback. 

**Salidas:** 

• Lista de cursos filtrados. 

**Ejercicio 9: Procesamiento de pagos mediante callbacks** 

**Enunciado analítico:** 

Una empresa desea automatizar la validación de pagos recibidos. Cada pago debe pasar  por un callback que determine si cumple las condiciones para ser aprobado. **Requerimientos:** 

• Crear una función procesarPagos(pagos, callback). 

• El callback define las reglas de aprobación. 

• Marcar cada pago como aprobado o rechazado. 

• Retornar el listado final. 

**Entradas:** 

• Cantidad de pagos. 

• Datos de cada pago.  
• Regla de aprobación (callback). 

**Salidas:** 

• Pagos aprobados. 

• Pagos rechazados. 

**Ejercicio 10: Fusión de usuarios con operador spread** 

**Enunciado analítico:** 

Dos sistemas diferentes entregan listas de usuarios. Se requiere fusionarlas en una sola  lista, asegurando que si un usuario aparece duplicado, se conserve la versión con mayor  información. 

**Requerimientos:** 

• Usar el operador spread. 

• Validar duplicados por documento. 

• Crear una función fusionarUsuarios(). 

• Retornar lista depurada. 

**Entradas:** 

• Arreglo de usuarios del sistema A. 

• Arreglo de usuarios del sistema B. 

**Salidas:** 

• Lista final sin duplicados. 

• Usuario conservado con mayor información. 

**Ejercicio 11: Resumen de mensajes usando destructuración** 

**Enunciado analítico:** 

Una aplicación de mensajería requiere generar un resumen rápido de cada mensaje. Se  debe extraer información puntual para mostrar un pequeño reporte al usuario. **Requerimientos:** 

• Usar destructuring para obtener remitente, contenido y fecha. 

• Crear una función generarResumen(mensaje). 

• Retornar el resumen construido.  
**Entradas:** 

• Datos completos del mensaje. 

**Salidas:** 

• Resumen: remitente, contenido breve y fecha. 

**Ejercicio 12: Gestión de pacientes por prioridad** 

**Enunciado analítico:** 

Un centro médico debe identificar al paciente con mayor prioridad para ser atendido. Si  varios tienen la misma prioridad, debe seleccionarse al de mayor edad. **Requerimientos:** 

• Usar un arreglo de pacientes. 

• Buscar el paciente con mayor prioridad. 

• Resolver empates por edad. 

• Retornar el paciente seleccionado. 

**Entradas:** 

• Cantidad de pacientes. 

• Datos de cada paciente. 

**Salidas:** 

• Paciente con mayor prioridad. 

**Ejercicio 13: Control de gastos y análisis financiero** 

**Enunciado analítico:** 

Una persona desea analizar sus gastos del mes para identificar hábitos financieros. El  programa debe calcular el total gastado, la categoría más costosa y si alguna categoría  supera el 40% del gasto total. 

**Requerimientos:** 

• Usar un arreglo con objetos de gastos. 

• Sumar montos por categoría. 

• Calcular porcentajes. 

• Retornar reporte financiero.  
**Entradas:** 

• Número de gastos. 

• Categoría y monto de cada gasto. 

**Salidas:** 

• Total gastado. 

• Categoría más costosa. 

• Alertas de desbalance financiero. 

**Ejercicio 14: Evaluación de proyectos colaborativos mediante módulos y  callbacks** 

**Enunciado analítico:** 

Una plataforma que gestiona proyectos requiere un sistema modular para analizar su  estado. Se deben identificar proyectos activos, contar participantes y determinar mediante  un callback si requieren refuerzo. 

**Requerimientos:** 

• Crear funciones independientes: filtrarActivos(), contarParticipantes(),  evaluarProyecto(callback). 

• Integrar las funciones en un módulo principal. 

• Retornar un informe por proyecto. 

**Entradas:** 

• Cantidad de proyectos. 

• Datos de cada proyecto. 

• Regla de evaluación (callback). 

**Salidas:** 

• Lista de proyectos activos. 

• Número de participantes por proyecto. 

• Estado final según el callback. 

**Ejercicio 15: Sistema inteligente de recomendación de cursos Enunciado analítico:**  
Una plataforma educativa desea implementar un sistema de recomendación para cada  aprendiz según su comportamiento académico. La plataforma almacena un arreglo de  cursos completados por el aprendiz, cada curso contiene: nombre, calificación final, horas  dedicadas y número de intentos. 

El sistema debe aplicar un **callback de recomendación**, el cual definirá la lógica para  seleccionar los cursos más adecuados para continuar su formación. 

El análisis debe considerar que el usuario puede definir distintos criterios de  recomendación, por ejemplo: 

• Recomendar cursos donde el aprendiz obtuvo una calificación baja (refuerzo). • Recomendar cursos relacionados que el aprendiz haya dejado sin finalizar. • Recomendar cursos donde dedicó pocas horas, pero obtuvo buen resultado. 

El programa debe ser capaz de aplicar **cualquier criterio definido por el callback**,  procesar la información y generar una recomendación final ordenada por prioridad. **Requerimientos:** 

• Crear una función principal **generarRecomendaciones(cursos, callback)**. • El arreglo *cursos* contendrá objetos con campos: 

{ nombre, calificacion, horas, intentos, finalizado }. 

• El callback recibirá cada curso y retornará un indicador numérico de prioridad (0 \= no  recomendado). 

• La función debe: 

1\. Recorrer el arreglo con un método de orden superior (filter, map, reduce o  combinación). 

2\. Aplicar el callback a cada curso. 

3\. Filtrar únicamente los cursos con prioridad mayor a cero. 

4\. Ordenarlos de mayor a menor prioridad. 

5\. Retornar la lista final de recomendaciones. 

**Entradas:** 

• Número de cursos completados. 

• Datos de cada curso. 

• Callback con criterios de recomendación definidos por el usuario. **Salidas:** 

• Arreglo de cursos recomendados. 

• Ordenados por nivel de prioridad.  
• Con explicación del porqué fueron recomendados (según el callback). 

**Ejercicio 16: Sistema de alerta temprana para una red social** 

**Enunciado analítico:** 

Una red social quiere detectar usuarios que podrían estar infringiendo las normas de la  comunidad. Se gestiona un arreglo de usuarios donde cada usuario contiene: { id, nombre, publicaciones: \[\], reportes: \[\], fechaRegistro, estado }. La plataforma requiere aplicar un **callback de análisis**, que debe recibir cada usuario y  devolver un objeto indicando: 

• si es sospechoso, 

• el nivel de riesgo (de 1 a 5), 

• el motivo principal. 

El programa debe procesar todos los usuarios y generar un **informe global**,  aplicando reglas como: 

• Un usuario con más de 5 reportes tiene riesgo mínimo de nivel 3\. • Si tiene publicaciones marcadas como inapropiadas, el riesgo aumenta. • Si es nuevo (menos de 30 días) y acumula reportes, su riesgo aumenta aún más. • El callback puede considerar patrones personalizados (palabras prohibidas,  comportamiento anómalo, etc.). 

**Requerimientos:** 

• Crear una función **analizarUsuarios(usuarios, callback)**. 

• El callback debe retornar un objeto como: 

{ sospechoso: true/false, nivel: 1–5, motivo }. 

• La función debe: 

1\. Recorrer el arreglo usando **un método de orden superior**. 

2\. Aplicar el callback a cada usuario. 

3\. Clasificar los usuarios por nivel de riesgo. 

4\. Crear un informe con categorías: 

▪ Bajo riesgo 

▪ Medio riesgo 

▪ Alto riesgo  
5\. Retornar el informe completo. 

**Entradas:** 

• Cantidad de usuarios. 

• Datos de cada usuario. 

• Callback de análisis de riesgo. 

**Salidas:** 

• Informe completo de riesgo. 

• Listado de usuarios clasificados. 

• Detalle de motivos por cada usuario marcado. 

**Ejercicio 17: Sistema de control de inventarios dinámicos** 

**Enunciado analítico:** 

Una cadena de supermercados necesita un sistema capaz de analizar, clasificar y depurar  su inventario. Se proporciona un arreglo con los productos registrados, cada uno en la  forma: 

{ id, nombre, categoria, stock, precio, perecedero, fechaVencimiento }. El sistema debe aplicar un **callback de control**, el cual definirá una regla personalizada  para cada producto (por ejemplo: retirar productos, ajustar precios, marcar alertas, etc.). Adicionalmente, el sistema debe realizar cálculos avanzados: 

• Encontrar el producto con menor stock y el de mayor stock. 

• Separar los productos perecederos y evaluar cuáles están próximos a vencerse. • Crear un reporte de categorías indicando cuántos productos hay en cada una. • Aplicar una función de reducción para determinar el valor total del inventario. 

El aprendiz debe analizar cuidadosamente toda la información y aplicar la lógica  indicada. 

**Requerimientos:** 

• Crear la función **procesarInventario(inventario, callback)**. 

• El callback debe recibir cada producto y retornar una acción sugerida (ejemplo:  "ajustar precio", "retirar", "vigilar", "estable"). 

• La función principal debe: 

1\. Aplicar el callback a cada producto.  
2\. Clasificar los productos según la acción recomendada. 

3\. Crear un subreporte de productos perecederos próximos a vencer. 4\. Obtener: 

▪ Producto con mayor stock 

▪ Producto con menor stock 

5\. Generar un resumen por categoría. 

6\. Calcular el valor económico total del inventario usando reduce(). 7\. Retornar un informe completo. 

**Entradas:** 

• Cantidad total de productos. 

• Datos de cada producto. 

• Callback con reglas de control del inventario. 

**Salidas:** 

• Informe completo del inventario. 

• Productos agrupados según la acción del callback. 

• Alertas de productos próximos a vencer. 

• Producto con menor y mayor stock. 

• Valor total del inventario. 

• Resumen por categorías.

[image1]: <data:image/png;base64,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>