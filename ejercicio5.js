// Enunciado analítico: (los comentarios de los requerimientos se mantienen aquí...)

function validarUsuario() {
  // Entradas
  const nombre = prompt("Ingrese su nombre de usuario:");
  // Se corrige el prompt para que muestre las opciones correctas
  const estado = prompt("¿Cuál es su estado? (activo / inactivo)");
  const rol = prompt("¿Cuál es su rol? (admin / editor / lector)");

  let permisos = "";
  let accesoPermitido = false;

  // 1. CORRECCIÓN: Se añade la validación principal del estado
  if (estado && estado === "activo") {
    
    // 2. CORRECCIÓN: Se usa toLowerCase y trim para validar el rol
    const rolNormalizado = rol ? rol.toLowerCase().trim() : "";

    if (rolNormalizado === "admin") {
      permisos = "Permisos de administrador: Acceso total (Crear, Leer, Actualizar, Borrar)";
      accesoPermitido = true;
    } else if (rolNormalizado === "editor") {
      permisos = "Permisos de editor: Acceso parcial (Crear, Leer, Actualizar)";
      accesoPermitido = true;
    } else if (rolNormalizado === "lector") {
      permisos = "Permisos de lector: Acceso de solo lectura (Leer)";
      accesoPermitido = true;
    } else {
      // 3. CORRECCIÓN: Se da un mensaje de error claro para roles no válidos
      permisos = "Rol no reconocido.";
      accesoPermitido = false;
    }
  } else {
    // 4. CORRECCIÓN: Mensaje claro si el usuario está inactivo
    permisos = "El usuario no está activo.";
    accesoPermitido = false;
  }

  // Salidas (esta parte estaba bien, pero ahora recibe mensajes de error más claros)
  if (accesoPermitido) {
    alert(`¡Bienvenido, ${nombre}!\nAcceso permitido.\n\n${permisos}`);
  } else {
    alert(`Acceso denegado para ${nombre}.\nMotivo: ${permisos}`);
  }

  return permisos;
}

// 5. CORRECCIÓN: Se llama a la función para que el programa se ejecute
validarUsuario();