export async function consumirAPI(datosDelFormulario) {
    // intente conectar back
    let url = "http://localhost:8080/formulario";

    
    let peticion = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosDelFormulario) 
    };

    
    let respuesta = await fetch(url, peticion);

    if (!respuesta.ok) {
        throw new Error("Error en la petición: " + respuesta.status);
    }

    return await respuesta.json();
}



