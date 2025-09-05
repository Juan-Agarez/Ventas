







function mostrarInventario() {
  document.getElementById('tablaInventarioContainer').style.display = 'block';
  // Ocultar otras tablas por si están abiertas
  document.getElementById('tablaPedidosContainer').style.display = 'none';
  document.getElementById('tablaListadosContainer').style.display = 'none';
}

function closeTablaInventario() {
  document.getElementById('tablaInventarioContainer').style.display = 'none';
}

function toggleExpandTablaInventario() {
  const container = document.getElementById('tablaInventarioContainer');
  const icon = document.getElementById('iconExpandirTablaInventario');

  container.classList.toggle('expanded');

  // Cambiar icono según estado
  if (container.classList.contains('expanded')) {
    icon.classList.remove('fa-expand');
    icon.classList.add('fa-compress');
  } else {
    icon.classList.remove('fa-compress');
    icon.classList.add('fa-expand');
  }
}

















function mostrarRequerimiento() {
  document.getElementById('tablaRequerimientoContainer').style.display = 'block';
}

function closeTablaRequerimiento() {
  document.getElementById('tablaRequerimientoContainer').style.display = 'none';
}

function toggleExpandTablaRequerimiento() {
  const contenedor = document.getElementById('tablaRequerimientoContainer');
  contenedor.classList.toggle('expanded');
  const icono = document.getElementById('iconExpandirTablaRequerimiento');
  icono.classList.toggle('fa-compress');
}






