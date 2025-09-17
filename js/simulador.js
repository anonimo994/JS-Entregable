
// --- Simulador de Ahorro Mensual con DOM, Eventos y Storage ---

const MESES = 12;
let ingresos = obtenerDeStorage('ingresos');
let gastos = obtenerDeStorage('gastos');
let historial = obtenerDeStorage('historial');

// Si no hay datos en localStorage, cargar desde JSON simulado
if (ingresos.length === 0 && gastos.length === 0) {
    fetch('js/datos.json')
        .then(res => res.json())
        .then(data => {
            ingresos = data.ingresos.map(i => ({...i, categoria: 'Salario'}));
            gastos = data.gastos.map(g => ({...g, categoria: 'Vivienda'}));
            guardarEnStorage('ingresos', ingresos);
            guardarEnStorage('gastos', gastos);
            mostrarIngresos(ingresos);
            mostrarGastos(gastos);
            mostrarHistorial(historial);
        });
} else {
    mostrarIngresos(ingresos);
    mostrarGastos(gastos);
    mostrarHistorial(historial);
}

// Evento para agregar ingreso
document.getElementById('form-ingreso').addEventListener('submit', function(e) {
    e.preventDefault();
    const fuente = document.getElementById('fuente-ingreso').value.trim();
    const monto = parseFloat(document.getElementById('monto-ingreso').value);
    const categoria = document.getElementById('categoria-ingreso').value;
    if (fuente && monto >= 0 && categoria) {
        const ingreso = { fuente, monto, categoria };
        ingresos.push(ingreso);
        guardarEnStorage('ingresos', ingresos);
        historial.push({ tipo: 'Ingreso', ...ingreso, fecha: new Date().toLocaleString() });
        guardarEnStorage('historial', historial);
        mostrarIngresos(ingresos);
        mostrarHistorial(historial);
        Toastify({
            text: `Ingreso agregado: ${fuente} ($${monto})`,
            duration: 2000,
            gravity: "top",
            position: "right",
            backgroundColor: "#198754"
        }).showToast();
        this.reset();
    }
});

// Evento para agregar gasto
document.getElementById('form-gasto').addEventListener('submit', function(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo-gasto').value.trim();
    const monto = parseFloat(document.getElementById('monto-gasto').value);
    const categoria = document.getElementById('categoria-gasto').value;
    if (tipo && monto >= 0 && categoria) {
        const gasto = { tipo, monto, categoria };
        gastos.push(gasto);
        guardarEnStorage('gastos', gastos);
        historial.push({ tipo: 'Gasto', ...gasto, fecha: new Date().toLocaleString() });
        guardarEnStorage('historial', historial);
        mostrarGastos(gastos);
        mostrarHistorial(historial);
        Toastify({
            text: `Gasto agregado: ${tipo} ($${monto})`,
            duration: 2000,
            gravity: "top",
            position: "right",
            backgroundColor: "#dc3545"
        }).showToast();
        this.reset();
    }
});

// Evento para calcular ahorro
document.getElementById('btn-calcular').addEventListener('click', function() {
    const totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
    const totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
    const ahorroMensual = totalIngresos - totalGastos;
    const ahorroAnual = ahorroMensual * MESES;
    mostrarResumen(ahorroMensual, ahorroAnual);
});

// Funciones globales para eliminar ingresos y gastos
window.eliminarIngreso = function(index) {
    const eliminado = ingresos[index];
    ingresos.splice(index, 1);
    guardarEnStorage('ingresos', ingresos);
    historial.push({ tipo: 'Eliminado Ingreso', ...eliminado, fecha: new Date().toLocaleString() });
    guardarEnStorage('historial', historial);
    mostrarIngresos(ingresos);
    mostrarHistorial(historial);
    Toastify({
        text: `Ingreso eliminado: ${eliminado.fuente} ($${eliminado.monto})`,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ffc107"
    }).showToast();
}

window.eliminarGasto = function(index) {
    const eliminado = gastos[index];
    gastos.splice(index, 1);
    guardarEnStorage('gastos', gastos);
    historial.push({ tipo: 'Eliminado Gasto', ...eliminado, fecha: new Date().toLocaleString() });
    guardarEnStorage('historial', historial);
    mostrarGastos(gastos);
    mostrarHistorial(historial);
    Toastify({
        text: `Gasto eliminado: ${eliminado.tipo} ($${eliminado.monto})`,
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ffc107"
    }).showToast();
}

// Exportar datos a JSON
document.getElementById('btn-exportar').addEventListener('click', function() {
    const datos = {
        ingresos,
        gastos,
        historial
    };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulador_datos.json';
    a.click();
    URL.revokeObjectURL(url);
});
