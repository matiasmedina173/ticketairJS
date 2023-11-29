document.addEventListener("DOMContentLoaded", function () {
  // Función para registrar un usuario y mostrar un mensaje
  window.registrarUsuario = function () {
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");

    const nombre = nombreInput.value;
    const email = emailInput.value;

    // Ocultar el mensaje de error antes de validar
    ocultarMensajeError();

    // Validar que se ingresen datos
    if (nombre && email) {
      // Crear un objeto de usuario
      const usuario = {
        nombre,
        email,
      };

      // Convertir el objeto a JSON y almacenar en localStorage
      const usuarioJSON = JSON.stringify(usuario);
      localStorage.setItem("usuario", usuarioJSON);

      // Ocultar el mensaje de error después del registro
      ocultarMensajeError();

      // Mostrar el mensaje de bienvenida en el DOM
      mostrarMensajeBienvenida();

      // Ocultar el formulario de registro y el encabezado después de 0 segundos (0 milisegundos)
      setTimeout(() => {
        const registroForm = document.getElementById("registroForm");
        registroForm.style.display = "none";

        const encabezadoRegistro =
          document.getElementById("encabezadoRegistro");
        encabezadoRegistro.style.display = "none";
      }, 0);
    } else {
      mostrarMensajeError("Por favor, ingrese todos los campos.");
    }
  };

  // Función para realizar la búsqueda
  function realizarBusqueda(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const origen = document.getElementById("origin").value;
    const destino = document.getElementById("destination").value;
    const fechaSalida = document.getElementById("departureDate").value;
    const fechaRegreso = document.getElementById("returnDate").value;

    // Ocultar el mensaje de error antes de validar
    ocultarMensajeError();

    if (origen && destino && fechaSalida && fechaRegreso) {
      // Guardar la búsqueda en localStorage
      const busqueda = {
        origen,
        destino,
        fechaSalida,
        fechaRegreso,
      };

      const busquedaJSON = JSON.stringify(busqueda);
      localStorage.setItem("ultimaBusqueda", busquedaJSON);

      // Mostrar resultados de búsqueda (simulado)
      mostrarResultadosBusqueda(busqueda);
    } else {
      // Determinar qué campo falta completar
      let mensaje = "Por favor, complete ";

      if (!origen) mensaje += "el campo de Origen. ";
      if (!destino) mensaje += "el campo de Destino. ";
      if (!fechaSalida) mensaje += "el campo de Fecha de Salida. ";
      if (!fechaRegreso) mensaje += "el campo de Fecha de Regreso. ";

      // Mostrar mensaje de error en el DOM
      mostrarMensajeError(mensaje);
    }
  }

  // Función para ocultar el mensaje de error en el DOM
  function ocultarMensajeError() {
    const mensajeErrorDiv = document.getElementById("mensajeError");
    mensajeErrorDiv.style.display = "none";
  }

  // Función para mostrar un mensaje de error en el DOM
  function mostrarMensajeError(mensaje) {
    const mensajeErrorDiv = document.getElementById("mensajeError");
    mensajeErrorDiv.innerHTML = `<strong>${mensaje}</strong>`;
    mensajeErrorDiv.style.display = "block";
  }

  // Función para mostrar un mensaje de error en el DOM
  function mostrarMensajeError(mensaje) {
    const mensajeErrorDiv = document.getElementById("mensajeError");
    mensajeErrorDiv.innerHTML = `<strong>${mensaje}</strong>`;
    mensajeErrorDiv.style.display = "block";
  }

  // Función para mostrar un mensaje temporal de bienvenida en el DOM
  function mostrarMensajeBienvenida() {
    const mensajeBienvenidaDiv = document.getElementById("mensajeBienvenida");
    mensajeBienvenidaDiv.innerHTML =
      "<strong>¡Usuario registrado correctamente! Bienvenido.</strong>";
    mensajeBienvenidaDiv.style.display = "block";
  }

  // Función para mostrar un mensaje de error en el DOM
  function mostrarMensajeError(mensaje) {
    const mensajeErrorDiv = document.getElementById("mensajeError");
    mensajeErrorDiv.innerHTML = "<strong>" + mensaje + "</strong>";
    mensajeErrorDiv.style.display = "block";
  }

  // Agregar el evento submit al formulario de búsqueda
  const formularioBusqueda = document.querySelector(".search-form form");
  formularioBusqueda.addEventListener("submit", realizarBusqueda);

  // Cargar la última búsqueda al cargar la página
  const ultimaBusquedaGuardada = localStorage.getItem("ultimaBusqueda");
  if (ultimaBusquedaGuardada) {
    const ultimaBusqueda = JSON.parse(ultimaBusquedaGuardada);
    mostrarResultadosBusqueda(ultimaBusqueda);
  }
});
