
// --- Simulador de Ahorro Mensual con DOM, Eventos y Storage ---
const MESES = 12;
let ingresos = obtenerDeStorage('ingresos');
let gastos = obtenerDeStorage('gastos');

// Mostrar datos iniciales
mostrarIngresos(ingresos);
mostrarGastos(gastos);

// Evento para agregar ingreso
document.getElementById('form-ingreso').addEventListener('submit', function(e) {
    e.preventDefault();
    const fuente = document.getElementById('fuente-ingreso').value.trim();
    const monto = parseFloat(document.getElementById('monto-ingreso').value);
    if (fuente && monto >= 0) {
        ingresos.push({ fuente, monto });
        guardarEnStorage('ingresos', ingresos);
        mostrarIngresos(ingresos);
        this.reset();
    }
});

// Evento para agregar gasto
document.getElementById('form-gasto').addEventListener('submit', function(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo-gasto').value.trim();
    const monto = parseFloat(document.getElementById('monto-gasto').value);
    if (tipo && monto >= 0) {
        gastos.push({ tipo, monto });
        guardarEnStorage('gastos', gastos);
        mostrarGastos(gastos);
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
    ingresos.splice(index, 1);
    guardarEnStorage('ingresos', ingresos);
    mostrarIngresos(ingresos);
}

window.eliminarGasto = function(index) {
    gastos.splice(index, 1);
    guardarEnStorage('gastos', gastos);
    mostrarGastos(gastos);
}
