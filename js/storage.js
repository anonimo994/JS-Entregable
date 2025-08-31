// Funciones para guardar y recuperar datos en localStorage
function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDeStorage(clave) {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
}
