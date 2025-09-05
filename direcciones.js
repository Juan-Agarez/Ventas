const departamentos = [
  "Antioquia", "Amazonas", "Arauca", "Atlántico", "Bolívar", "Bogotá",
  "Boyacá", "Caldas", "Cauca", "Cesar", "Chocó", "Córdoba",
  "Cundinamarca", "Huila", "Nariño"
];

function manejarDepartamento() {
  const input = document.getElementById("departamentoEntrega");
  const sugerencias = document.getElementById("sugerenciasDepartamento");
  const valor = input.value.toLowerCase();

  // Limpiar sugerencias anteriores
  sugerencias.innerHTML = "";

  if (valor === "") return;

  const coincidencias = departamentos.filter(dep =>
    dep.toLowerCase().startsWith(valor)
  );

  coincidencias.forEach(dep => {
    const item = document.createElement("li");
    item.textContent = dep;
    item.style.padding = "8px";
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      input.value = dep;
      sugerencias.innerHTML = "";
    });
    sugerencias.appendChild(item);
  });
}
