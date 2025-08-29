import { consumirAPI } from "./consumo.js"

//Referencias al formulario
let tipo_identificacion=document.getElementById("tipo_identificacion")
let numero_identificacion=document.getElementById("numero_identificacion")
let nombres=document.getElementById("nombres")
let apellidos=document.getElementById("apellidos")
let fecha_nacimiento=document.getElementById("fecha_nacimiento")
let direccion=document.getElementById("direccion")
let pais=document.getElementById("pais")
let departamento=document.getElementById("departamento")
let ciudad=document.getElementById("ciudad")
let marca=document.getElementById("marca")

//Detecto el evento de hacerle clic al boton
botonFormulario.addEventListener("click",function(evento){
    evento.preventDefault()
    
let datosQueVoyAEnviarAlBack={
        "tipo_identificacion":tipo_identificacion.value,
        "numero_identificacion":numero_identificacion.value,
        "nombres":nombres.value,
        "apellidos":apellidos.value,
        "fecha_nacimiento":fecha_nacimiento.value,
        "direccion":direccion.value,
        "pais":pais.value,
        "departamento":departamento.value,
        "ciudad":ciudad.value,
        "marca":marca.value,
    }
    let datosListosParaViajar=JSON.stringify(datosQueVoyAEnviarAlBack)

    //LLAMO AL CONSUMO
    consumirAPI(datosListosParaViajar)
    .then(function(respuesta){

        Swal.fire({
        title: "Buen Trabajo!",
        text: "Hemos registrado el perosnaje con exito",
        icon: "success"
        });
        
    })

})