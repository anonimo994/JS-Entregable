function mostrarHistorial(historial) {
    const lista = document.getElementById('historial');
    lista.innerHTML = '';
    
    if (historial.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>No hay transacciones registradas</p>
            </div>
        `;
        return;
    }
    
    historial.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        let nombre = item.fuente || item.tipo;
        let icono = '';
        
        // Asignar iconos según el tipo
        switch(item.tipo) {
            case 'Ingreso':
                icono = '<i class="fas fa-arrow-up text-success me-2"></i>';
                break;
            case 'Gasto':
                icono = '<i class="fas fa-arrow-down text-danger me-2"></i>';
                break;
            case 'Eliminado Ingreso':
                icono = '<i class="fas fa-trash-alt text-warning me-2"></i>';
                break;
            case 'Eliminado Gasto':
                icono = '<i class="fas fa-trash-alt text-warning me-2"></i>';
                break;
            default:
                icono = '<i class="fas fa-circle text-info me-2"></i>';
        }
        
        li.innerHTML = `
            <div class="d-flex align-items-center">
                ${icono}
                <div class="flex-grow-1">
                    <strong>${item.tipo}</strong> - ${nombre}
                    <div class="d-flex align-items-center mt-1">
                        <span class="badge bg-primary me-2">$${item.monto}</span>
                        <span class="badge bg-secondary me-2">${item.categoria || ''}</span>
                        <small class="text-muted">${item.fecha}</small>
                    </div>
                </div>
            </div>
        `;
        lista.appendChild(li);
    });
}
// Funciones de interacción con el DOM para el simulador
function mostrarIngresos(ingresos) {
    const lista = document.getElementById('lista-ingresos');
    lista.innerHTML = '';
    
    if (ingresos.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-wallet"></i>
                <p>No hay ingresos registrados</p>
            </div>
        `;
        return;
    }
    
    ingresos.forEach((ing, i) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-arrow-up text-success me-2"></i>
                <div>
                    <div class="fw-bold">${ing.fuente}</div>
                    <small class="text-muted">${ing.categoria}</small>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="badge bg-success me-2">$${ing.monto}</span>
                <button class='btn btn-sm btn-outline-danger' onclick='eliminarIngreso(${i})' title="Eliminar ingreso">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function mostrarGastos(gastos) {
    const lista = document.getElementById('lista-gastos');
    lista.innerHTML = '';
    
    if (gastos.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No hay gastos registrados</p>
            </div>
        `;
        return;
    }
    
    gastos.forEach((g, i) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-arrow-down text-danger me-2"></i>
                <div>
                    <div class="fw-bold">${g.tipo}</div>
                    <small class="text-muted">${g.categoria}</small>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="badge bg-danger me-2">$${g.monto}</span>
                <button class='btn btn-sm btn-outline-danger' onclick='eliminarGasto(${i})' title="Eliminar gasto">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function mostrarResumen(ahorroMensual, ahorroAnual) {
    const resumen = document.getElementById('resumen');
    
    // Determinar el color y mensaje según el resultado
    let colorClass = 'text-success';
    let mensaje = '';
    
    if (ahorroMensual > 0) {
        colorClass = 'text-success';
        mensaje = '<i class="fas fa-smile me-2"></i>¡Excelente! Estás ahorrando dinero.';
    } else if (ahorroMensual === 0) {
        colorClass = 'text-warning';
        mensaje = '<i class="fas fa-meh me-2"></i>Estás en equilibrio. Considera ahorrar más.';
    } else {
        colorClass = 'text-danger';
        mensaje = '<i class="fas fa-frown me-2"></i>Estás gastando más de lo que ganas. Revisa tus gastos.';
    }
    
    resumen.innerHTML = `
        <div class="text-center">
            <div class="mb-3">
                <i class="fas fa-chart-line ${colorClass}" style="font-size: 2rem;"></i>
            </div>
            <div class="mb-3 ${colorClass}">
                ${mensaje}
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="summary-item">
                        <div class="summary-label">Ahorro Mensual</div>
                        <div class="summary-value ${colorClass}">$${ahorroMensual.toFixed(2)}</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="summary-item">
                        <div class="summary-label">Ahorro Anual</div>
                        <div class="summary-value ${colorClass}">$${ahorroAnual.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
