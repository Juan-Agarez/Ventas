const inventario = [
  { numero: 1, referencia: 'REF-001', metros: 150, peso: 35, tipoCarrete: 'Grande', reservado: 'No', ciudad: 'Bogotá', pedidoSIGO: 'SIGO1234', ordenCompra: 'OC-1001' },
  { numero: 2, referencia: 'REF-002', metros: 200, peso: 50, tipoCarrete: 'Mediano', reservado: 'Sí', ciudad: 'Medellín', pedidoSIGO: 'SIGO1235', ordenCompra: 'OC-1002' },
  { numero: 3, referencia: 'REF-003', metros: 75, peso: 20, tipoCarrete: 'Pequeño', reservado: 'No', ciudad: 'Cali', pedidoSIGO: 'SIGO1236', ordenCompra: 'OC-1003' },
  { numero: 4, referencia: 'REF-004', metros: 300, peso: 65, tipoCarrete: 'Grande', reservado: 'Sí', ciudad: 'Barranquilla', pedidoSIGO: 'SIGO1237', ordenCompra: 'OC-1004' },
  { numero: 5, referencia: 'REF-005', metros: 90, peso: 25, tipoCarrete: 'Mediano', reservado: 'No', ciudad: 'Cartagena', pedidoSIGO: 'SIGO1238', ordenCompra: 'OC-1005' },
  { numero: 6, referencia: 'REF-006', metros: 120, peso: 28, tipoCarrete: 'Pequeño', reservado: 'Sí', ciudad: 'Pereira', pedidoSIGO: 'SIGO1239', ordenCompra: 'OC-1006' },
  { numero: 7, referencia: 'REF-007', metros: 180, peso: 42, tipoCarrete: 'Grande', reservado: 'No', ciudad: 'Bucaramanga', pedidoSIGO: 'SIGO1240', ordenCompra: 'OC-1007' },
  { numero: 8, referencia: 'REF-008', metros: 220, peso: 55, tipoCarrete: 'Mediano', reservado: 'Sí', ciudad: 'Cúcuta', pedidoSIGO: 'SIGO1241', ordenCompra: 'OC-1008' },
  { numero: 9, referencia: 'REF-009', metros: 130, peso: 30, tipoCarrete: 'Pequeño', reservado: 'No', ciudad: 'Neiva', pedidoSIGO: 'SIGO1242', ordenCompra: 'OC-1009' },
  { numero: 10, referencia: 'REF-010', metros: 250, peso: 60, tipoCarrete: 'Grande', reservado: 'Sí', ciudad: 'Ibagué', pedidoSIGO: 'SIGO1243', ordenCompra: 'OC-1010' },
  { numero: 11, referencia: 'REF-011', metros: 160, peso: 40, tipoCarrete: 'Mediano', reservado: 'No', ciudad: 'Villavicencio', pedidoSIGO: 'SIGO1244', ordenCompra: 'OC-1011' },
  { numero: 12, referencia: 'REF-012', metros: 100, peso: 27, tipoCarrete: 'Pequeño', reservado: 'Sí', ciudad: 'Manizales', pedidoSIGO: 'SIGO1245', ordenCompra: 'OC-1012' }
];

const camposFiltro = ['numero', 'referencia', 'tipoCarrete', 'reservado', 'ciudad', 'ordenCompra'];
const filtrosActivos = {};
const panelFiltros = document.getElementById('panelFiltros');
const tbody = document.getElementById('tablaInventarioBody');

camposFiltro.forEach(campo => {
  const contenedor = document.createElement('div');
  contenedor.style.position = 'relative';
  contenedor.style.minWidth = '180px';

  const boton = document.createElement('button');
  boton.textContent = `▼ ${campo.charAt(0).toUpperCase() + campo.slice(1)}`;
  Object.assign(boton.style, {
    display: 'block',
    width: '100%',
    marginBottom: '6px',
    background: '#153c91',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: '10',
  });

  const contenedorCheckboxes = document.createElement('div');
  Object.assign(contenedorCheckboxes.style, {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '1000',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: '8px',
    maxHeight: '250px',
    overflowY: 'auto',
    width: 'max-content',
    minWidth: '180px',
    padding: '10px',
    display: 'none',
  });

  boton.addEventListener('click', () => {
    contenedorCheckboxes.style.display = contenedorCheckboxes.style.display === 'none' ? 'block' : 'none';
  });

  const valoresUnicos = [...new Set(inventario.map(item => item[campo]))].sort();

  // Crear checkbox "Todos"
  const checkboxTodos = document.createElement('input');
  checkboxTodos.type = 'checkbox';
  checkboxTodos.name = `todos-${campo}`;
  checkboxTodos.addEventListener('change', () => {
    const checkboxes = contenedorCheckboxes.querySelectorAll(`input[type="checkbox"][name="${campo}"]`);
    checkboxes.forEach(cb => cb.checked = checkboxTodos.checked);

    if (checkboxTodos.checked) {
      filtrosActivos[campo] = new Set(valoresUnicos);
    } else {
      delete filtrosActivos[campo];
    }
    aplicarFiltros();
  });

  const labelTodos = document.createElement('label');
  labelTodos.style.display = 'block';
  labelTodos.style.fontWeight = 'bold';
  labelTodos.style.marginBottom = '8px';
  labelTodos.appendChild(checkboxTodos);
  labelTodos.append(' Todos');

  contenedorCheckboxes.appendChild(labelTodos);

  valoresUnicos.forEach(valor => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = valor;
    checkbox.name = campo;

    checkbox.addEventListener('change', () => {
      if (!filtrosActivos[campo]) filtrosActivos[campo] = new Set();

      if (checkbox.checked) {
        filtrosActivos[campo].add(valor);
      } else {
        filtrosActivos[campo].delete(valor);
        if (filtrosActivos[campo].size === 0) delete filtrosActivos[campo];
        checkboxTodos.checked = false;
      }

      aplicarFiltros();
    });

    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.fontSize = '14px';
    label.style.marginBottom = '4px';
    label.appendChild(checkbox);
    label.append(` ${valor}`);

    contenedorCheckboxes.appendChild(label);
  });

  contenedor.appendChild(boton);
  contenedor.appendChild(contenedorCheckboxes);
  panelFiltros.appendChild(contenedor);
});

function aplicarFiltros() {
  tbody.innerHTML = '';
  let datosFiltrados = [...inventario];

  Object.keys(filtrosActivos).forEach(campo => {
    datosFiltrados = datosFiltrados.filter(item =>
      filtrosActivos[campo].has(item[campo])
    );
  });

  if (datosFiltrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#999; padding:12px;">No hay datos que coincidan con los filtros</td></tr>`;
    return;
  }

  datosFiltrados.forEach(item => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td style="padding: 12px; border: 1px solid #ccc;">${item.numero}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.referencia}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.metros}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.peso}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.tipoCarrete}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.reservado}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.ciudad}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.pedidoSIGO}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.ordenCompra}</td>
    `;
    fila.style.background = '#f9f9f9';
    tbody.appendChild(fila);
  });


  // Calcular totales
  let totalMetros = 0;
  let totalPeso = 0;

  datosFiltrados.forEach(item => {
    totalMetros += item.metros;
    totalPeso += item.peso;
  });

  // Mostrar resumen con estilo azul
  const resumenDiv = document.getElementById('resumenInventario');
  resumenDiv.innerHTML = `
    <div style="
      background: #e8f0fe;
      color: #153c91;
      padding: 12px 20px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      font-size: 20px;
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
    ">
    <span><i class="fa-solid fa-ruler-vertical"></i> <strong>Metros:</strong> ${totalMetros}</span>
    <span><i class="fas fa-weight-hanging"></i> <strong>Peso:</strong> ${totalPeso} kg</span>
    <span><i class="fa-solid fa-clipboard"></i> <strong>Items:</strong> ${datosFiltrados.length}</span>

    </div>
  `;

}

aplicarFiltros();
