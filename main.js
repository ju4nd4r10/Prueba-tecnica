document.addEventListener("DOMContentLoaded", () => {

    // === Datos quemados ===
    const tiposIdentificacion = ["Cédula de Ciudadanía", "Tarjeta de Identidad", "Cédula de Extranjería", "Pasaporte"];
    const paises = ["Colombia", "Perú", "Panamá"];
    const departamentos = {
        "Colombia": ["Antioquia", "Cundinamarca", "Valle del Cauca"],
        "Perú": ["Lima", "Arequipa", "Cusco"],
        "Panamá": ["Panamá", "Colón", "Chiriquí"]
    };
    const ciudades = {
        "Antioquia": ["Medellín", "Envigado", "Bello"],
        "Cundinamarca": ["Bogotá", "Soacha", "Chía"],
        "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
        "Lima": ["Lima", "Callao"],
        "Arequipa": ["Arequipa", "Camana"],
        "Cusco": ["Cusco", "Urubamba"],
        "Panamá": ["Ciudad de Panamá", "San Miguelito"],
        "Colón": ["Colón"],
        "Chiriquí": ["David"]
    };

    // === Funciones ===
    const cargarOpciones = (selectId, lista) => {
        const select = document.getElementById(selectId);
        select.innerHTML = `<option value="">Seleccione...</option>`;
        lista.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item;
            opt.textContent = item;
            select.appendChild(opt);
        });
    };

    const mostrarError = (input, mensaje) => {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error");
            input.insertAdjacentElement("afterend", errorSpan);
        }
        errorSpan.textContent = mensaje;
        input.style.borderColor = "red";
    };

    const limpiarError = (input) => {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
        input.style.borderColor = "#ccc";
    };

    const validarEdad = (fecha) => {
        const fechaNacimiento = new Date(fecha);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) edad--;
        return edad >= 18;
    };

    const validarInput = (input, regex, mensaje) => {
        if (!regex.test(input.value)) {
            mostrarError(input, mensaje);
            return false;
        } else {
            limpiarError(input);
            return true;
        }
    };

    // === Cargar selects iniciales ===
    cargarOpciones("tipo_identificacion", tiposIdentificacion);
    cargarOpciones("pais", paises);

    // === Dependencias país -> departamento -> ciudad ===
    document.getElementById("pais").addEventListener("change", e => {
        const pais = e.target.value;
        cargarOpciones("departamento", departamentos[pais] || []);
        document.getElementById("ciudad").innerHTML = `<option value="">Seleccione...</option>`;
    });

    document.getElementById("departamento").addEventListener("change", e => {
        const depto = e.target.value;
        cargarOpciones("ciudad", ciudades[depto] || []);
    });

    // === Validaciones en tiempo real ===
    document.getElementById("numero_identificacion").addEventListener("input", e => {
        validarInput(e.target, /^[0-9]{5,}$/, "Debe tener al menos 5 números.");
    });

    document.getElementById("nombres").addEventListener("input", e => {
        validarInput(e.target, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras permitidas.");
    });

    document.getElementById("apellidos").addEventListener("input", e => {
        validarInput(e.target, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras permitidas.");
    });

    document.getElementById("fecha_nacimiento").addEventListener("change", e => {
        if (!validarEdad(e.target.value)) {
            mostrarError(e.target, "Debes ser mayor de 18 años.");
        } else {
            limpiarError(e.target);
        }
    });

    // === Manejo del submit ===
    const form = document.getElementById("registroForm");
    form.addEventListener("submit", e => {
        e.preventDefault();

        const inputs = ["numero_identificacion","nombres","apellidos","fecha_nacimiento"]
            .map(id => document.getElementById(id));

        let hayErrores = inputs.some(input => input.nextElementSibling?.textContent !== "");

        if (hayErrores) {
            Swal.fire({
                title: "Error",
                text: "Corrige los errores antes de registrar.",
                icon: "error",
                confirmButtonColor: "#007bff"
            });
            return;
        }

        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Tu inscripción en el programa de fidelidad ha sido guardada.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#007bff"
        }).then(() => form.reset());
    });
});
