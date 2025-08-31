// Funciones de interacción con el DOM para el simulador
function mostrarIngresos(ingresos) {
    const lista = document.getElementById('lista-ingresos');
    lista.innerHTML = '';
    ingresos.forEach((ing, i) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `<span>${ing.fuente}: $${ing.monto}</span>` +
            `<button class='btn btn-sm btn-outline-danger' onclick='eliminarIngreso(${i})'>Eliminar</button>`;
        lista.appendChild(li);
    });
}

function mostrarGastos(gastos) {
    const lista = document.getElementById('lista-gastos');
    lista.innerHTML = '';
    gastos.forEach((g, i) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `<span>${g.tipo}: $${g.monto}</span>` +
            `<button class='btn btn-sm btn-outline-danger' onclick='eliminarGasto(${i})'>Eliminar</button>`;
        lista.appendChild(li);
    });
}

function mostrarResumen(ahorroMensual, ahorroAnual) {
    const resumen = document.getElementById('resumen');
    resumen.innerHTML = `<strong>Ahorro mensual estimado:</strong> $${ahorroMensual.toFixed(2)}<br><strong>Ahorro anual estimado:</strong> $${ahorroAnual.toFixed(2)}`;
}
