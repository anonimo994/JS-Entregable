// Simulador de Ahorro Mensual

const MESES = 12;
let ingresos = [];
let gastos = [];

// Datos de ingresos
function ingresarIngresos() {
    let cantidad = parseInt(prompt("¿Cuántas fuentes de ingreso tienes?"));
    for (let i = 0; i < cantidad; i++) {
        let fuente = prompt(`Nombre de la fuente de ingreso #${i+1}:`);
        let monto = parseFloat(prompt(`Monto mensual de ${fuente}:`));
        ingresos.push({ fuente, monto });
    }
    console.log("Ingresos registrados:", ingresos);
}

// Datos de gastos
function ingresarGastos() {
    let cantidad = parseInt(prompt("¿Cuántos tipos de gasto tienes?"));
    for (let i = 0; i < cantidad; i++) {
        let tipo = prompt(`Nombre del gasto #${i+1}:`);
        let monto = parseFloat(prompt(`Monto mensual de ${tipo}:`));
        gastos.push({ tipo, monto });
    }
    console.log("Gastos registrados:", gastos);
}

// Calculadora ahorro mensual y anual
function calcularAhorro() {
    let totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
    let totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
    let ahorroMensual = totalIngresos - totalGastos;
    let ahorroAnual = ahorroMensual * MESES;

    let mensaje = `Tus ingresos mensuales son: $${totalIngresos.toFixed(2)}\n` +
                  `Tus gastos mensuales son: $${totalGastos.toFixed(2)}\n` +
                  `Ahorro mensual estimado: $${ahorroMensual.toFixed(2)}\n` +
                  `Ahorro anual estimado: $${ahorroAnual.toFixed(2)}`;
    alert(mensaje);
    console.log(mensaje);
}

// Simulador
function simuladorAhorro() {
    alert("Bienvenido al Simulador de Ahorro Mensual.\nSigue las instrucciones en los cuadros de diálogo y revisa la consola para más detalles.");
    ingresarIngresos();
    ingresarGastos();
    calcularAhorro();
    let repetir = confirm("¿Deseas realizar otra simulación?");
    if (repetir) {
        // Reiniciar datos y volver a ejecutar
        ingresos = [];
        gastos = [];
        simuladorAhorro();
    } else {
        alert("¡Gracias por usar el simulador!");
    }
}

// Llamada al simulador
simuladorAhorro();
