
   
    const nombreNormalizado = nombre.trim().toLowerCase();
    
    // Método `includes()` para verificación de existencia.
    const listaNormalizada = aprendices.map(a => a.trim().toLowerCase());
    
    return listaNormalizada.includes(nombreNormalizado);
}