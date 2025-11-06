const datosClientes = {
      cliente1: { contacto: "Juan Pérez", telefono: "321-456-7890" },
      cliente2: { contacto: "Laura Gómez", telefono: "322-555-1234" },
      cliente3: { contacto: "Carlos Ruiz", telefono: "300-789-4561" }
    };

    function openSection(seccion) {
      const container = document.getElementById('entregasContainer');
      const contenido = document.getElementById('contenido-modal');

      if (seccion === 'pedidos') {
        contenido.innerHTML = `
        <div class="formulario-pedido">
          <h2>Información de Pedido</h2>

          <div class="form-grupo">
            <label for="ordenCompra">
              <i class="fas fa-receipt"></i> Orden de Compra:
            </label>
            <input type="text" id="ordenCompra" placeholder="10740" oninput="validarCamposDestino()">
          </div>

          <div class="form-grupo">
            <label for="fechaOrden">
              <i class="fas fa-calendar-alt"></i> Fecha de Orden:
            </label>
            <input type="text" id="fechaOrden" oninput="validarCamposDestino()">
          </div>

          <div class="form-grupo">
            <label for="numeroSIGO">
              <i class="fas fa-file-alt"></i> Codigo Siigo:
            </label>
            <input type="text" id="numeroSIGO" placeholder="1269876" oninput="validarCamposDestino()">
          </div>

          <div class="form-grupo">
            <label for="clienteSelect">
              <i class="fas fa-users"></i> Cliente:
            </label>
            <select id="clienteSelect" onchange="actualizarContacto(); validarCamposDestino()">
              <option value="">Seleccione un cliente</option>
              <option value="cliente1">Empresa Alfa</option>
              <option value="cliente2">Comercial Beta</option>
              <option value="cliente3">Distribuidora Gamma</option>
            </select>
          </div>

          <div class="form-grupo">
            <label for="contacto">
              <i class="fas fa-user"></i> Contacto:
            </label>
            <input type="text" id="contacto" readonly>
          </div>

          <div class="form-grupo">
            <label for="telefono">
              <i class="fas fa-phone-alt"></i> Teléfono:
            </label>
            <input type="text" id="telefono" readonly>
          </div>

          <button class="btn-destino" onclick="mostrarDestino()">
            <i class="fas fa-map-marker-alt"></i>+ Destino
          </button>
        </div>

        <div class="formulario-destino" id="formularioDestino">
          <h2>Información de Despacho</h2>

          <div class="form-grupo" style="position: relative;">
            <label for="departamentoEntrega">
              <i class="fas fa-map"></i> Departamento:
            </label>
            <input type="text" id="departamentoEntrega" placeholder="Selecciona un departamento..." oninput="filtrarDepartamentos()" autocomplete="off">
            <ul id="sugerenciasDepartamentos" class="sugerencias oculto"></ul>
          </div>


          <div class="form-grupo" id="contenedorCiudad" style="display: none; position: relative;">
            <label for="ciudadEntrega">
              <i class="fas fa-city"></i> Ciudad:
            </label>
            <input type="text" id="ciudadEntrega" placeholder="Ciudad" oninput="filtrarCiudades()" onblur="setTimeout(validarCiudadAlSalir, 200)"  autocomplete="off">
            <ul id="sugerenciasCiudades" class="sugerencias oculto" style="position: absolute; background: white; border: 1px solid #ccc; width: 100%; max-height: 150px; overflow-y: auto; z-index: 10;"></ul>
          </div>



          <div class="form-grupo">
            <label for="telefonoDestino">
              <i class="fas fa-phone-alt"></i> Teléfono:
            </label>
            <input type="text" id="telefonoDestino" placeholder="Teléfono" oninput="validarCamposDestino()">
          </div>

          <div class="form-grupo">
            <label for="contactoDestino">
              <i class="fas fa-user"></i> Contacto:
            </label>
            <input type="text" id="contactoDestino" placeholder="Nombre contacto" oninput="validarCamposDestino()">
          </div>

          <div class="form-grupo">
            <label for="direccionEntrega">
              <i class="fas fa-map-marked-alt"></i> Dirección:
            </label>
            <input type="text" id="direccionEntrega" placeholder="Calle, número, etc." oninput="validarCamposDestino()">
          </div>

          <!-- Botón visible pero deshabilitado hasta que los campos estén completos -->
          <button id="btnGuardar" disabled style="margin-top: 15px;" onclick="guardarDatos(event)">
            <i class="fas fa-save"></i> Guardar
          </button>

          <button id="btnVerPedidos" class="btn-accion" onclick="mostrarTablaPedidos()">
            <i class="fas fa-table"></i> Ver pedidos
          </button>

          <button id="btnMinimizar" style="background-color: #F6791D; color: white; border: none; padding: 12px; border-radius: 50%; font-weight: 600; font-size: 20px; cursor: pointer; display: flex; justify-content: center; align-items: center; width: 50px; height: 50px; margin-top: 60px;" onclick="toggleMinimizado()">
            <i class="fas fa-arrow-left" style="font-size: 18px;"></i>
          </button>


      </div>


        `;
        container.classList.add('show');
        flatpickr("#fechaOrden", {
          dateFormat: "Y-m-d",
          locale: "es"
        });

      }
    }

    function closeSection() {
      document.getElementById('entregasContainer').classList.remove('show');
    }

    function actualizarContacto() {
        const cliente = document.getElementById("clienteSelect").value;
        const contacto = document.getElementById("contacto");
        const telefono = document.getElementById("telefono");

        if (datosClientes[cliente]) {
            contacto.value = datosClientes[cliente].contacto;
            telefono.value = datosClientes[cliente].telefono;
        } else {
            contacto.value = "";
            telefono.value = "";
        }

        validarCamposDestino();
    }

    function validarCamposDestino() {
        const ordenCompra = document.getElementById('ordenCompra')?.value.trim();
        const fechaOrden = document.getElementById('fechaOrden')?.value.trim();
        const clienteSelect = document.getElementById('clienteSelect')?.value.trim();
        const contacto = document.getElementById('contacto')?.value.trim();
        const telefono = document.getElementById('telefono')?.value.trim();

        
        const departamento = document.getElementById('departamentoEntrega')?.value.trim();
        const ciudad = document.getElementById('ciudadEntrega')?.value.trim();
        const contactoDestino = document.getElementById('contactoDestino')?.value.trim();
        const telefonoDestino = document.getElementById('telefonoDestino')?.value.trim();
        const direccion = document.getElementById('direccionEntrega')?.value.trim();

        const btnGuardar = document.getElementById('btnGuardar');

       const camposLlenos =
          ordenCompra &&
          fechaOrden &&
          clienteSelect &&
          contacto &&
          telefono &&
          departamento &&
          ciudad &&
          contactoDestino &&
          telefonoDestino &&
          direccion;


        btnGuardar.disabled = !camposLlenos;
    }


    function manejarDepartamento() {
      const departamento = document.getElementById('departamentoEntrega')?.value.trim();
      const contenedorCiudad = document.getElementById('contenedorCiudad');

      if (departamento.length > 0) {
        contenedorCiudad.style.display = 'flex';
      } else {
        contenedorCiudad.style.display = 'none';
        document.getElementById('ciudadEntrega').value = ''; 
      }

      validarCamposDestino();
    }


    function mostrarTablaPedidos() {
      const tabla = document.getElementById('tablaPedidosContainer');
      if (tabla.style.display === 'none') {
        tabla.style.display = 'block';
      } else {
        tabla.style.display = 'none';
      }
    }
    


    function limpiarFormulario() {
      const camposTexto = [
        'ordenCompra', 'fechaOrden', 'numeroSIGO',
        'direccionEntrega', 'departamentoEntrega', 'ciudadEntrega',
        'contactoDestino', 'telefonoDestino'
      ];

      camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = '';
      });

      // Resetea selects
      const clienteSelect = document.getElementById('clienteSelect');
      if (clienteSelect) clienteSelect.value = '';

      // Limpia los campos readonly
      document.getElementById('contacto').value = '';
      document.getElementById('telefono').value = '';

      // Oculta formulario de destino y ciudad
      document.getElementById('contenedorCiudad').style.display = 'none';

      // Desactiva el botón Guardar
      document.getElementById('btnGuardar').disabled = true;
    }






    function mostrarDestino() {
      const destino = document.getElementById('formularioDestino');
      destino.classList.toggle('show');

    }

    window.addEventListener("DOMContentLoaded", () => {
      document.getElementById('modalConfirmacion').style.display = 'none';
    });

    function guardarDatos(event) {
      event.preventDefault();

      const orden = document.getElementById("ordenCompra").value.trim();
      const clienteId = document.getElementById("clienteSelect").value;
      let clienteNombre = "";

      if (clienteId === "cliente1") clienteNombre = "Empresa Alfa";
      else if (clienteId === "cliente2") clienteNombre = "Comercial Beta";
      else if (clienteId === "cliente3") clienteNombre = "Distribuidora Gamma";

      const resumen = document.getElementById("resumenPedidos");

      // Verificar si ya hay una orden
      const ordenExistente = resumen.querySelector("div");

      if (ordenExistente) {
        // Verificar si es la misma orden
        if (ordenExistente.textContent.includes(`Orden: ${orden} -`)) {
          document.getElementById("modalDuplicado").style.display = "flex";
          return;
        } else {
          // Reemplazar la orden existente
          ordenExistente.remove();
        }
      }

      // Crear nueva línea
      const nuevaLinea = document.createElement("div");
      nuevaLinea.textContent = `Orden: ${orden} - Cliente: ${clienteNombre}`;
      resumen.appendChild(nuevaLinea);

      // Mostrar modal de confirmación y limpiar
      document.getElementById("modalConfirmacion").style.display = "flex";
      limpiarFormulario();
    }


    function cerrarModalDuplicado() {
      document.getElementById("modalDuplicado").style.display = "none";
    }




   function cerrarModal() {
      document.getElementById('modalConfirmacion').style.display = 'none';
    }


    function closeTablaPedidos() {
      document.getElementById('tablaPedidosContainer').style.display = 'none';
    }


    let formularioMinimizado = false;
    function minimizarFormulario() {
      const container = document.getElementById('entregasContainer');
      const formularioPedido = document.querySelector('.formulario-pedido');
      const formularioDestino = document.querySelector('.formulario-destino');
      const btnMinimizar = document.getElementById('btnMinimizar');
      const closeBtn = document.querySelector('.close-btn-entregas');

      if (formularioMinimizado) {
        // Restaurar formularios
        container.classList.remove('minimized');
        formularioPedido.classList.remove('minimized');
        formularioDestino.classList.remove('minimized');

        // Mostrar botón cerrar
        closeBtn.style.display = 'block';

        // Cambiar icono a minimizar
        btnMinimizar.innerHTML = `<i class="fas fa-arrow-down" style="font-size: 18px;"></i>`;
        formularioMinimizado = false;
      } else {
        // Minimizar formularios
        container.classList.add('minimized');
        formularioPedido.classList.add('minimized');
        formularioDestino.classList.add('minimized');

        // Ocultar botón cerrar
        closeBtn.style.display = 'none';

        // Cambiar icono a maximizar
        btnMinimizar.innerHTML = `<i class="fas fa-arrow-up" style="font-size: 18px;"></i>`;
        formularioMinimizado = true;
      }
    }


    let panelMinimizado = false;
    function toggleMinimizado() {
      const container = document.getElementById('entregasContainer');
      const btnRestaurar = document.getElementById('btnRestaurarMinimizado');

      if (panelMinimizado) {
        // Restaurar el panel
        container.classList.remove('minimized');
        btnRestaurar.style.display = 'none';
        panelMinimizado = false;
      } else {
        // Minimizar el panel
        container.classList.add('minimized');
        btnRestaurar.style.display = 'block';
        panelMinimizado = true;
      }
    }


  function toggleExpandTablaPedidos() {
    const container = document.getElementById('tablaPedidosContainer');

    if (container.style.position !== 'fixed' || container.style.width !== '100vw') {
      // Expandir a fullscreen pero con espacio arriba para la X
      container.style.position = 'fixed';
      container.style.top = '70px';      // espacio arriba para que la X no quede pegada
      container.style.right = '0';
      container.style.width = '100vw';
      container.style.height = 'calc(100vh - 40px)';  // altura ajustada para no salirse
      container.style.borderRadius = '0';
      container.style.padding = '20px';
      container.style.overflow = 'auto';  // para scroll si es necesario
    } else {
      // Volver al tamaño original
      container.style.position = 'absolute';
      container.style.top = '105px';
      container.style.right = '30px';
      container.style.width = '1100px';
      container.style.height = 'auto';
      container.style.borderRadius = '20px';
      container.style.overflow = 'visible';
    }
  }







function agregarPedido() {
  const modal = document.getElementById("modalAgregarPedido");
  modal.style.display = "flex";

  flatpickr("#fechaSolicitada", {
    dateFormat: "Y-m-d"
  });
}


function cerrarModalAgregar() {
  document.getElementById("modalAgregarPedido").style.display = "none";
}




function crearPedido() {
  const codigo = document.getElementById("codigoSIGO").value.trim();
  const referencia = document.getElementById("referencia").value.trim();
  const cantidad = document.getElementById("cantidadSolicitada").value.trim();
  const unidad = document.getElementById("unidad").value;
  const metros = document.getElementById("metrosCarrete").value.trim();
  const valor = document.getElementById("valorUnitario").value.trim();
  const fecha = document.getElementById("fechaSolicitada").value.trim();
  const observaciones = document.getElementById("observaciones").value.trim();
  const ficha = document.getElementById("nombreFicha").value.trim();

  // Validar campos obligatorios
  if (!codigo || !referencia || !cantidad || !unidad || !fecha) {
    alert("Por favor completa los campos obligatorios.");
    return;
  }

  const tbody = document.getElementById("tablaPedidosBody");

  // Si hay una fila que dice "No hay pedidos registrados", la quitamos
const filaVacia = tbody.querySelector("tr td[colspan='11']");
  if (filaVacia) {
    // Elimina toda la fila que contiene ese td
    filaVacia.parentElement.remove();
  }


  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td style="padding: 12px; border: 1px solid #ccc;">${codigo}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${referencia}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${cantidad}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${unidad}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${metros}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${valor}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${fecha}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${observaciones}</td>
    <td style="padding: 12px; border: 1px solid #ccc;">${ficha}</td>
    <td style="text-align: center; border: 2px solid #ccc;">
      <input type="checkbox" class="pedido-checkbox">
    </td>

  `;

  tbody.appendChild(fila);

  cerrarModalAgregar();
  document.getElementById("modalConfirmacion").style.display = "flex";

  // Limpiar los campos del modal
  document.getElementById("codigoSIGO").value = "";
  document.getElementById("referencia").value = "";
  document.getElementById("cantidadSolicitada").value = "";
  document.getElementById("unidad").value = "metros";
  document.getElementById("metrosCarrete").value = "";
  document.getElementById("valorUnitario").value = "";
  document.getElementById("fechaSolicitada").value = "";
  document.getElementById("observaciones").value = "";
  document.getElementById("fichaTecnica").value = "";
  document.getElementById("nombreFicha").value = "";
}





function eliminarPedido() {
  const tbody = document.getElementById("tablaPedidosBody");
  const checkboxes = tbody.querySelectorAll(".pedido-checkbox:checked");

  if (checkboxes.length === 0) {
    alert("Selecciona al menos un pedido para eliminar.");
    return;
  }

  checkboxes.forEach(checkbox => {
    const fila = checkbox.closest("tr");
    if (fila) {
      fila.remove();
    }
  });

  // Si ya no hay filas, muestra la fila vacía
  if (tbody.querySelectorAll("tr").length === 0) {
    tbody.innerHTML = `
      <tr style="background:#f9f9f9;">
        <td colspan="11" style="text-align:center; color:#999; padding: 12px;">
          No hay pedidos registrados
        </td>
      </tr>
    `;
  }
}




function mostrarNombreFicha() {
  const input = document.getElementById('fichaTecnica');
  const nombre = input.files.length > 0 ? input.files[0].name : "Sin archivo seleccionado";
  document.getElementById('nombreFicha').value = nombre;
}



function mostrarListado() {
  const listado = document.getElementById('tablaListadosContainer');
  listado.style.display = 'block';
}


function closeTablaListados() {
  const listado = document.getElementById('tablaListadosContainer');
  listado.style.display = 'none';
}


function toggleExpandTablaListado() {
  const container = document.getElementById('tablaListadosContainer');

  if (container.style.position !== 'fixed' || container.style.width !== '100vw') {
    // Expandir a fullscreen con espacio arriba para la X
    container.style.position = 'fixed';
    container.style.top = '70px';      // espacio arriba para que la X no quede pegada
    container.style.right = '0';
    container.style.width = '100vw';
    container.style.height = 'calc(100vh - 40px)';  // altura ajustada para no salirse
    container.style.borderRadius = '0';
    container.style.padding = '20px';
    container.style.overflow = 'auto';  // para scroll si es necesario
  } else {
    // Volver al tamaño original
    container.style.position = 'absolute';
    container.style.top = '105px';
    container.style.right = '30px';
    container.style.width = '1600px';
    container.style.height = 'auto';
    container.style.borderRadius = '20px';
    container.style.overflow = 'visible';
  }
}





const departamentosValidos = [
  "Antioquia", "Cundinamarca", "Boyacá", "Santander", "Valle del Cauca",
  "Atlántico", "Bolívar", "Magdalena", "Caldas", "Nariño"
];

function filtrarDepartamentos() {
  const input = document.getElementById('departamentoEntrega');
  const lista = document.getElementById('sugerenciasDepartamentos');
  const valor = input.value.toLowerCase().trim();

  // Limpiar lista
  lista.innerHTML = "";

  if (valor.length === 0) {
    lista.classList.add("oculto");
    document.getElementById('contenedorCiudad').style.display = 'none';
    document.getElementById('ciudadEntrega').value = '';
    validarCamposDestino();
    return;
  }

  const resultados = departamentosValidos.filter(dep =>
    dep.toLowerCase().includes(valor)
  );

  if (resultados.length === 0) {
    lista.classList.add("oculto");
    document.getElementById('contenedorCiudad').style.display = 'none';
    document.getElementById('ciudadEntrega').value = '';
    validarCamposDestino();
    return;
  }

  resultados.forEach(dep => {
    const item = document.createElement("li");
    item.textContent = dep;
    item.onclick = () => {
      input.value = dep;
      lista.classList.add("oculto");
      document.getElementById('contenedorCiudad').style.display = 'flex';
      validarCamposDestino();
    };
    lista.appendChild(item);
  });

  lista.classList.remove("oculto");

  // Validación automática si el valor ya es exacto
  if (departamentosValidos.includes(input.value.trim())) {
    document.getElementById('contenedorCiudad').style.display = 'flex';
  } else {
    document.getElementById('contenedorCiudad').style.display = 'none';
    document.getElementById('ciudadEntrega').value = '';
  }

  validarCamposDestino();
}






// Lista de ciudades válidas por departamento
const ciudadesValidas = {
  "Antioquia": ["Medellín", "Envigado", "Bello"],
  "Cundinamarca": ["Bogotá", "Soacha", "Chía"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso"],
  "Santander": ["Bucaramanga", "Floridablanca", "Piedecuesta"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
  "Bolívar": ["Cartagena", "Magangué", "Sincelejo"],
  "Magdalena": ["Santa Marta", "Ciénaga", "El Banco"],
  "Caldas": ["Manizales", "Chinchiná", "La Dorada"],
  "Nariño": ["Pasto", "Tumaco", "Ipiales"]
};





function validarCiudad() {
  const departamento = document.getElementById('departamentoEntrega').value.trim();
  const ciudad = document.getElementById('ciudadEntrega').value.trim();

  if (!departamento || !ciudadesValidas[departamento]) {
    alert("Por favor, selecciona primero un departamento válido.");
    return false;
  }

  const ciudadesDepto = ciudadesValidas[departamento].map(c => c.toLowerCase());
  if (!ciudadesDepto.includes(ciudad.toLowerCase())) {
    alert("La ciudad ingresada no corresponde a la lista válida para el departamento seleccionado. Por favor, selecciona una ciudad válida.");
    document.getElementById('ciudadEntrega').value = '';
    return false;
  }

  return true;
}



function filtrarCiudades() {
  const departamento = document.getElementById('departamentoEntrega').value.trim();
  const ciudadInput = document.getElementById('ciudadEntrega');
  const valor = ciudadInput.value.toLowerCase();
  const listaCiudades = ciudadesValidas[departamento] || [];
  const listaSugerencias = document.getElementById('sugerenciasCiudades');

  if (!departamento || listaCiudades.length === 0) {
    listaSugerencias.classList.add('oculto');
    ciudadInput.value = '';
    validarCamposDestino();
    return;
  }

  listaSugerencias.innerHTML = '';

  if (valor.length === 0) {
    listaSugerencias.classList.add('oculto');
    validarCamposDestino();
    return;
  }

  const resultados = listaCiudades.filter(c => c.toLowerCase().includes(valor));

  resultados.forEach(c => {
    const item = document.createElement('li');
    item.textContent = c;
    item.onclick = () => {
      ciudadInput.value = c;
      listaSugerencias.classList.add('oculto');
      // Validar inmediatamente la ciudad seleccionada
      validarCiudadAlSalir();
    };

    listaSugerencias.appendChild(item);
  });

  listaSugerencias.classList.toggle('oculto', resultados.length === 0);
  validarCamposDestino();
}





// Esta función la llamas al evento blur del input ciudadEntrega
function validarCiudadAlSalir() {
  const departamento = document.getElementById('departamentoEntrega').value.trim();
  const ciudadInput = document.getElementById('ciudadEntrega');
  const ciudad = ciudadInput.value.trim();

  if (!departamento || !ciudadesValidas[departamento]) {
    alert("Por favor, selecciona primero un departamento válido.");
    ciudadInput.value = '';
    ciudadInput.focus();
    return false;
  }

  const ciudadesDepto = ciudadesValidas[departamento].map(c => c.toLowerCase());

  if (!ciudadesDepto.includes(ciudad.toLowerCase())) {
    alert(`La ciudad "${ciudad}" no pertenece al departamento "${departamento}" seleccionado.`);
    ciudadInput.value = '';
    ciudadInput.focus();
    return false;
  }

  return true;
}











