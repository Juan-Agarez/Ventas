const listados = [
  { cliente: "Suministros Occidente", departamento: "Cundinamarca", ciudad: "Madrid", ordenCompra: "OC12345", codigoSIGO: "SIGO001", requerimiento: "Compra de equipos", referencia: "REF123", cantidadReservada: 10, despacho: 5, pendiente: 5, fechaEntrega: "2025-06-10", gestion: "En proceso" },
  { cliente: "Capital Expres", departamento: "Antioquia", ciudad: "Medellin", ordenCompra: "OC67890", codigoSIGO: "SIGO002", requerimiento: "Reabastecimiento", referencia: "REF456", cantidadReservada: 20, despacho: 15, pendiente: 5, fechaEntrega: "2025-06-15", gestion: "Entregado" },
  { cliente: "Transportes Garcia", departamento: "Bolivar", ciudad: "Cartagena", ordenCompra: "OC13579", codigoSIGO: "SIGO003", requerimiento: "Pedido especial", referencia: "REF789", cantidadReservada: 30, despacho: 10, pendiente: 20, fechaEntrega: "2025-06-20", gestion: "Pendiente" },
  { cliente: "Transportes Garcia", departamento: "Bolivar", ciudad: "Cartagena", ordenCompra: "OC16379", codigoSIGO: "SIG7603", requerimiento: "Pedido especial", referencia: "RETF789", cantidadReservada: 30, despacho: 10, pendiente: 20, fechaEntrega: "2025-06-30", gestion: "Pendiente" },
  { cliente: "Suministros Occidente", departamento: "Cundinamarca", ciudad: "Madrid", ordenCompra: "OC34345", codigoSIGO: "SIGO086", requerimiento: "Compra de equipos", referencia: "REF123", cantidadReservada: 10, despacho: 5, pendiente: 5, fechaEntrega: "2025-06-05", gestion: "En proceso" },
  { cliente: "Logística Express", departamento: "Valle del Cauca", ciudad: "Cali", ordenCompra: "OC98765", codigoSIGO: "SIGO004", requerimiento: "Suministro urgente", referencia: "REF654", cantidadReservada: 25, despacho: 20, pendiente: 5, fechaEntrega: "2025-06-18", gestion: "En tránsito" },
  { cliente: "Distribuciones del Norte", departamento: "Santander", ciudad: "Bucaramanga", ordenCompra: "OC11223", codigoSIGO: "SIGO005", requerimiento: "Inventario mensual", referencia: "REF321", cantidadReservada: 40, despacho: 35, pendiente: 5, fechaEntrega: "2025-06-25", gestion: "Pendiente" },
  { cliente: "Empaque Total", departamento: "Atlántico", ciudad: "Barranquilla", ordenCompra: "OC44556", codigoSIGO: "SIGO006", requerimiento: "Pedido especial", referencia: "REF963", cantidadReservada: 15, despacho: 5, pendiente: 10, fechaEntrega: "2025-06-22", gestion: "En proceso" },
  { cliente: "Servicios Integrados", departamento: "Risaralda", ciudad: "Pereira", ordenCompra: "OC77889", codigoSIGO: "SIGO007", requerimiento: "Reposición", referencia: "REF852", cantidadReservada: 18, despacho: 18, pendiente: 0, fechaEntrega: "2025-06-12", gestion: "Entregado" },
  { cliente: "Almacenadora Central", departamento: "Tolima", ciudad: "Ibagué", ordenCompra: "OC99001", codigoSIGO: "SIGO008", requerimiento: "Stock bodega", referencia: "REF147", cantidadReservada: 22, despacho: 12, pendiente: 10, fechaEntrega: "2025-06-28", gestion: "En proceso" }
];


function generarID(item) {
  return `${item.ordenCompra}-${item.codigoSIGO}`;
}


let seleccionActiva = false;
const datosSeleccionados = new Map(); 



const camposFiltroListado = ['cliente', 'departamento', 'ciudad', 'ordenCompra', 'referencia', 'fechaEntrega'];
const filtrosActivosListado = {};
const panelFiltrosListado = document.getElementById('panelFiltrosListado');
const tbodyListado = document.getElementById('tablaListadosBody');

// Crear filtros
camposFiltroListado.forEach(campo => {
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

    if (campo === 'fechaEntrega') {
    const inputRango = document.createElement('input');
    inputRango.type = 'text';
    inputRango.placeholder = 'Rango de fechas';
    inputRango.style.width = '100%';

    flatpickr(inputRango, {
        mode: 'range',
        dateFormat: 'Y-m-d',
        onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
            const [desde, hasta] = selectedDates;
            filtrosActivosListado[campo] = { desde, hasta };
        } else {
            delete filtrosActivosListado[campo];
        }
        aplicarFiltrosListado(seleccionActiva);
        }
    });

    contenedorCheckboxes.appendChild(inputRango);
    }

   else {
    const valoresUnicos = [...new Set(listados.map(item => item[campo]))];
    valoresUnicos.forEach(valor => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = valor;
      checkbox.name = campo;

      checkbox.addEventListener('change', () => {
        if (!filtrosActivosListado[campo]) filtrosActivosListado[campo] = new Set();
        if (checkbox.checked) {
          filtrosActivosListado[campo].add(valor);
        } else {
          filtrosActivosListado[campo].delete(valor);
          if (filtrosActivosListado[campo].size === 0) delete filtrosActivosListado[campo];
        }
        aplicarFiltrosListado(seleccionActiva);
      });

      const label = document.createElement('label');
      label.style.display = 'block';
      label.style.fontSize = '14px';
      label.style.marginBottom = '4px';
      label.appendChild(checkbox);
      label.append(` ${valor}`);

      contenedorCheckboxes.appendChild(label);
    });
  }

  contenedor.appendChild(boton);
  contenedor.appendChild(contenedorCheckboxes);
  panelFiltrosListado.appendChild(contenedor);
});





function aplicarFiltrosListado(modoSeleccion = false) {
  tbodyListado.innerHTML = '';
  let datosFiltrados = [...listados];

  Object.keys(filtrosActivosListado).forEach(campo => {
    if (campo === 'fechaEntrega') {
      const { desde, hasta } = filtrosActivosListado[campo];
      datosFiltrados = datosFiltrados.filter(item => {
        const fecha = new Date(item.fechaEntrega);
        return fecha >= desde && fecha <= hasta;
      });
    } else {
      datosFiltrados = datosFiltrados.filter(item =>
        filtrosActivosListado[campo].has(item[campo])
      );
    }
  });

  if (datosFiltrados.length === 0) {
    tbodyListado.innerHTML = `<tr><td colspan="${modoSeleccion ? 13 : 12}" style="text-align:center; color:#999; padding:12px;">No hay datos que coincidan con los filtros</td></tr>`;
    return;
  }

  datosFiltrados.forEach(item => {
    const fila = document.createElement('tr');
    fila.style.background = '#f9f9f9';

    let html = `
      <td style="padding: 12px; border: 1px solid #ccc;">${item.cliente}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.departamento}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.ciudad}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.ordenCompra}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.codigoSIGO}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.requerimiento}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.referencia}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.cantidadReservada}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.despacho}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.pendiente}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.fechaEntrega}</td>
      <td style="padding: 12px; border: 1px solid #ccc;">${item.gestion}</td>
    `;

    if (modoSeleccion) {
      const id = generarID(item);
      const yaSeleccionado = datosSeleccionados.has(id);

      html += `
        <td style="text-align:center; border: 1px solid #ccc;">
          <input type="checkbox" style="width: 22px; height: 22px; cursor: pointer;" onchange="toggleSeleccionRequerimiento('${id.replace(/'/g, "\\'")}', this.checked)" ${yaSeleccionado ? 'checked' : ''}>
        </td>
      `;

    }


    fila.innerHTML = html;
    tbodyListado.appendChild(fila);
  });
}








function toggleSeleccionRequerimiento(id, checked) {
  const item = listados.find(i => generarID(i) === id);
  if (!item) return;

  if (checked) {
    datosSeleccionados.set(id, item);
  } else {
    datosSeleccionados.delete(id);
  }

  const btn = document.getElementById('btnEnviarRequerimientos');
  btn.style.display = datosSeleccionados.size > 0 ? 'inline-block' : 'none';
}

















function toggleModoRequerimientos() {
  seleccionActiva = !seleccionActiva;

  const theadRow = document.querySelector('#tablaListadosBody').parentElement.querySelector('thead tr');

  // Agregar o remover columna de acción
  if (seleccionActiva) {
    // Evita duplicar si ya existe
    if (!theadRow.querySelector('.th-accion')) {
      const thAccion = document.createElement('th');
      thAccion.textContent = 'Acción';
      thAccion.classList.add('th-accion');
      thAccion.style.padding = '12px';
      thAccion.style.border = '1px solid #ccc';
      thAccion.style.background = '#f1f7fe';
      theadRow.appendChild(thAccion);
    }

    if (!document.getElementById('btnEnviarRequerimientos')) {
      const btnEnviar = document.createElement('button');
      btnEnviar.id = 'btnEnviarRequerimientos';
      btnEnviar.innerHTML = '<i class="fa-solid fa-share" style="margin-right: 6px;"></i> Preparación';
      btnEnviar.style = `
        margin-top: 16px;
        background-color:rgb(116, 206, 74);
        color: white;
        border: 3px solid rgb(47, 136, 5);
        border-radius: 20px;
        padding: 9px 20px;
        font-size: 18px;
        cursor: pointer;
        display: none;
        margin-left: 20px;
      `;

      btnEnviar.onclick = () => {
        abrirPanelRequerimientos();
      };


      document.getElementById('tablaListadosContainer').appendChild(btnEnviar);
    }
  } else {
    // Eliminar columna "Acción"
    const thAccion = theadRow.querySelector('.th-accion');
    if (thAccion) thAccion.remove();

    // Ocultar botón enviar
    const btn = document.getElementById('btnEnviarRequerimientos');
    if (btn) btn.style.display = 'none';

    datosSeleccionados.clear(); // limpiar selección
  }

  aplicarFiltrosListado(seleccionActiva);
}





function abrirPanelRequerimientos() {
  const panel = document.getElementById('panelRequerimientos');
  const contenido = document.getElementById('contenidoRequerimientos');
  contenido.innerHTML = '';

  const seleccion = Array.from(datosSeleccionados.values());

  if (seleccion.length === 0) {
    contenido.innerHTML = '<p style="color:#666;">No hay requerimientos seleccionados.</p>';
    return;
  }

  seleccion.forEach(item => {
    const contenedor = document.createElement('div');
    contenedor.style.border = '3px solid #829eba';
    contenedor.style.borderRadius = '8px';
    contenedor.style.padding = '12px 14px';
    contenedor.style.marginBottom = '16px';
    contenedor.style.background = '#f5faff';

    contenedor.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 4px; font-size: 19px; ">${item.referencia} - ${item.cliente}</div>
      <div style="font-size: 17px; color: #444; font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">${item.ordenCompra} &middot; ${item.requerimiento}</div>
      <label style="display:block; margin-top: 8px; font-size: 15px; color: #333;">Observaciones:</label>
      <textarea rows="3" style="width: 100%; margin-top: 4px; padding: 6px; border-radius: 6px; border: 2px solid #ccc;" data-id="${generarID(item)}"></textarea>
    `;

    contenido.appendChild(contenedor);
  });

  panel.style.display = 'block';
}



function cerrarPanelRequerimientos() {
  document.getElementById('panelRequerimientos').style.display = 'none';
}



function enviarRequerimientos() {
  const textareas = document.querySelectorAll('#contenidoRequerimientos textarea');
  const resultadoFinal = [];

  textareas.forEach(textarea => {
    const id = textarea.getAttribute('data-id');
    const observacion = textarea.value.trim();
    const item = datosSeleccionados.get(id);
    if (item) {
      resultadoFinal.push({ ...item, observacion });
    }
  });

  console.log('✅ Envío final:', resultadoFinal);
  alert(`${resultadoFinal.length} requerimiento(s) enviado(s) con observaciones.`);

  cerrarPanelRequerimientos();
  datosSeleccionados.clear();

  // Desactivar modo selección completamente
  seleccionActiva = false;

  // Volver a aplicar filtros y actualizar tabla
  aplicarFiltrosListado(seleccionActiva);

  // Ocultar botón
  const btn = document.getElementById('btnEnviarRequerimientos');
  if (btn) btn.style.display = 'none';

  // Quitar columna "Acción"
  const thAccion = document.querySelector('.th-accion');
  if (thAccion) thAccion.remove();
}










aplicarFiltrosListado(false);
