apellido.addEventListener('keyup',(event)=>{
    if (apellido.value.length  >= 2){
        validateField(apellido, apellidoError)
         delete errorsFront.apellido
    }else{
        apellido.classList.remove("validInput")
    }
})
apellido.addEventListener('blur',(event)=>{
    if (apellido.value.length  < 2){
        rejectField(apellido, "apellido")
        apellidoError.innerHTML = "El apellido debe poseer al menos 2 caracteres"
    }else{
        apellido.classList.add("validInput")
    }
})
apellido.addEventListener('focus',(event)=>{
    apellido.classList.remove("validInput", "nonValidInput")
})