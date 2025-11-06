 document.addEventListener("DOMContentLoaded", function () {
      flatpickr("#fechaOrden", {
        dateFormat: "Y-m-d",
        locale: "es"
      });
    });

    const datosClientes = {
      cliente1: { contacto: "Ana Pérez", telefono: "3101234567" },
      cliente2: { contacto: "Luis Gómez", telefono: "3209876543" },
      cliente3: { contacto: "Marta Rojas", telefono: "3005678901" }
    };

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
      const campos = [
        document.getElementById("ordenCompra").value.trim(),
        document.getElementById("fechaOrden").value.trim(),
        document.getElementById("numeroSIGO").value.trim(),
        document.getElementById("clienteSelect").value.trim(),
        document.getElementById("departamentoEntrega").value.trim(),
        document.getElementById("ciudadEntrega").value.trim(),
        document.getElementById("telefonoDestino").value.trim(),
        document.getElementById("contactoDestino").value.trim(),
        document.getElementById("direccionEntrega").value.trim()
      ];

      const todosLlenos = campos.every(campo => campo !== "");
      document.getElementById("btnGuardar").disabled = !todosLlenos;
    }

    function guardarDatos(event) {
      event.preventDefault();
      alert(" Datos de pedido guardados exitosamente.");
    }

    function mostrarTablaPedidos() {
      alert(" Aquí iría la tabla de pedidos guardados (a implementar).");
    }

    function filtrarDepartamentos() {
      const input = document.getElementById("departamentoEntrega");
      const sugerencias = document.getElementById("sugerenciasDepartamentos");

      const departamentos = ["Antioquia", "Cundinamarca", "Valle del Cauca", "Atlántico"];
      const filtro = input.value.toLowerCase();

      const resultados = departamentos.filter(dep => dep.toLowerCase().includes(filtro));

      sugerencias.innerHTML = resultados.map(dep => `<li onclick="seleccionarDepartamento('${dep}')">${dep}</li>`).join("");
      sugerencias.classList.toggle("oculto", resultados.length === 0);
    }

    function seleccionarDepartamento(nombre) {
      document.getElementById("departamentoEntrega").value = nombre;
      document.getElementById("sugerenciasDepartamentos").classList.add("oculto");
      validarCamposDestino();
    }

    function filtrarCiudades() {
      const input = document.getElementById("ciudadEntrega");
      const sugerencias = document.getElementById("sugerenciasCiudades");

      const ciudades = ["Medellín", "Bogotá", "Cali", "Barranquilla", "Cartagena"];
      const filtro = input.value.toLowerCase();

      const resultados = ciudades.filter(ciudad => ciudad.toLowerCase().includes(filtro));

      sugerencias.innerHTML = resultados.map(ciudad => `<li onclick="seleccionarCiudad('${ciudad}')">${ciudad}</li>`).join("");
      sugerencias.classList.toggle("oculto", resultados.length === 0);
    }

    function seleccionarCiudad(nombre) {
      document.getElementById("ciudadEntrega").value = nombre;
      document.getElementById("sugerenciasCiudades").classList.add("oculto");
      validarCamposDestino();
    }





//MOSTRAR LA TABLA DE EPEDIDOS
function mostrarTablaPedidos() {
  const contenedor = document.getElementById("tablaPedidosContainer");
  contenedor.style.display = "block";
}

// Ocultar tabla pedidos
function closeTablaPedidos() {
  const contenedor = document.getElementById("tablaPedidosContainer");
  contenedor.style.display = "none";
}

// Botones para agregar, eliminar y modificar
document.getElementById("btnAgregarPedido").addEventListener("click", () => {
  abrirModalAgregar();
});


document.getElementById("btnEliminarPedido").addEventListener("click", () => {
  alert("Funcionalidad de eliminar pedido (a implementar)");
});

document.getElementById("btnModificarPedido").addEventListener("click", () => {
  alert("Funcionalidad de modificar pedido (a implementar)");
});





//AGREGAR, CREAR, ELIMINAR, MODIFICAR EL PEDIDO EN CUESTION

// Mostrar el modal de agregar pedido
function abrirModalAgregar() {
  const modal = document.getElementById('modalAgregarPedido');
  modal.style.display = 'flex'; // flex para centrar el contenido
}

// Cerrar el modal de agregar pedido
function cerrarModalAgregar() {
  const modal = document.getElementById('modalAgregarPedido');
  modal.style.display = 'none';
}

// Mostrar el nombre del archivo seleccionado en el input readonly
function mostrarNombreFicha() {
  const inputFile = document.getElementById('fichaTecnica');
  const inputTexto = document.getElementById('nombreFicha');
  if (inputFile.files.length > 0) {
    inputTexto.value = inputFile.files[0].name;
  } else {
    inputTexto.value = 'Sin archivo seleccionado';
  }
}


function crearPedido() {
  alert('Pedido creado (aquí implementa la lógica real)');
  cerrarModalAgregar(); // Cerrar modal al crear pedido
}
