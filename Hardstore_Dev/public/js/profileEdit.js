console.log("Js profileEdit is Linked!")

window.onload = function(){
    let form = document.querySelector("#formProfileEdit")
    let usuario =  document.querySelector("#username")
    let email =  document.querySelector("#email")
    let nombre = document.querySelector("#nombre")
    let apellido = document.querySelector("#apellido")
    let file = document.querySelector("#file")


    let usuarioError =  document.querySelector(".nameError")
    let emailError =  document.querySelector(".emailError")
    let nombreError = document.querySelector(".nombreError")
    let apellidoError = document.querySelector(".apellidoError")
    let errorsFront = {}


    function validateField(selector, errorSelector ){
        console.log("validating from function")
        selector.classList.remove("nonValidInput")
        selector.classList.add("validInput")
        errorSelector.innerHTML = ""
        console.log("errorsFront", errorsFront)
    }
    function rejectField(selector, errorsFrontField ){
        selector.classList.remove("validInput")
        selector.classList.add("nonValidInput")
        errorsFront[errorsFrontField] = "Error"
        console.log("errorsFront", errorsFront)
    }

    usuario.addEventListener('keyup',(event)=>{
        if (usuario.value.length  >= 2){
            validateField(usuario, usuarioError)
             delete errorsFront.usuario
        }else{
            usuario.classList.remove("validInput")
        }
    })
    usuario.addEventListener('blur',(event)=>{
        if (usuario.value.length  < 2){
            rejectField(usuario, "usuario")
            usuarioError.innerHTML = "El usuario debe poseer al menos 2 caracteres"
        }else{
            usuario.classList.add("validInput")
        }
    })
    usuario.addEventListener('focus',(event)=>{
        usuario.classList.remove("validInput", "nonValidInput")
    })

    email.addEventListener('keyup',(event)=>{
        if ((email.value.includes("@") && email.value.includes(".com") && email.value.length > 5 )){
            validateField(email, emailError)
            delete errorsFront.email
        }else{
            email.classList.remove("validInput")
        }
    })
    email.addEventListener('blur',(event)=>{
        if (!(email.value.includes("@") && email.value.includes(".com") && email.value.length > 5 )){
            rejectField(email, "email")
            emailError.innerHTML = "El email ingresado no es valido"
        }else{
            validateField(email, emailError)
        }
    })
    email.addEventListener('focus',(event)=>{
        email.classList.remove("validInput", "nonValidInput")
    })

    nombre.addEventListener('keyup',(event)=>{
        if (nombre.value.length  >= 2){
            validateField(nombre, nombreError)
             delete errorsFront.nombre
        }else{
            nombre.classList.remove("validInput")
        }
    })
    nombre.addEventListener('blur',(event)=>{
        if (nombre.value.length  < 2){
            rejectField(nombre, "nombre")
            nombreError.innerHTML = "El nombre debe poseer al menos 2 caracteres"
        }else{
            nombre.classList.add("validInput")
        }
    })
    nombre.addEventListener('focus',(event)=>{
        nombre.classList.remove("validInput", "nonValidInput")
    })

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


    form.addEventListener('submit',(event)=>{
        //image validation
        if (file.value != ""){ //user selected a file
            const whitelist = ['png', 'jpeg', 'jpg', 'webp']   
            if (!whitelist.includes(file.value.split(".")[1])){
                event.preventDefault()
                alert("La imagen debe ser formato: \n .png , jpeg , jpg o webp")
            }
        }
        //fields validations
        if (usuario.value.length == 0){
            usuario.classList.add("nonValidInput")
        }
        if (email.value.length == 0){
            email.classList.add("nonValidInput")
        }
        if (nombre.value.length == 0){
            nombre.classList.add("nonValidInput")
        }
        if (apellido.value.length == 0){
            apellido.classList.add("nonValidInput")
        }

        if (Object.keys(errorsFront).length != 0 ||
            usuario.value.length == 0 ||
            email.value.length == 0 ||
            nombre.value.length == 0 ||
            apellido.value.length == 0
        ){
            //presence of errorsFront
            event.preventDefault()
            alert("Algunos campos poseen errores o estan incompletos")
        }
    })
}