console.log("Js Register is Linked!")

window.onload = function(){
    let form = document.querySelector("#formRegister")
    let usuario =  document.querySelector("#username")
    let email =  document.querySelector("#email")
    let password =  document.querySelector("#password")
    let passwordReapeat =  document.querySelector("#passwordRepeat")
    let file = document.querySelector("#file")

    let usuarioError =  document.querySelector(".nameError")
    let emailError =  document.querySelector(".emailError")
    let passwordError =  document.querySelector(".passwordError")
    let passwordReapeatError =  document.querySelector(".passwordRepeatnameError")
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


    password.addEventListener('keyup',(event)=>{
        if  ((password.value.length >= 8 &&
            (new RegExp(/[A-Z]/)).test(password.value) &&
            (new RegExp(/[0-9]/)).test(password.value) &&
            (new RegExp(/[¡¿?!&#%]/)).test(password.value)) ){
            // Valid Password
            validateField(password, passwordError)
            delete errorsFront.password
        }else{
            password.classList.remove("validInput")
        }
    })
    password.addEventListener('blur',(event)=>{
        if (password.value.length >= 8 &&
            (new RegExp(/[A-Z]/)).test(password.value) &&
            (new RegExp(/[0-9]/)).test(password.value) &&
            (new RegExp(/[¡¿?!&#%]/)).test(password.value)){
                validateField(password, passwordError)
        }else{
            rejectField(password, "password")
            passwordError.innerHTML =
            "<div>" + 
            "<p>La contraseña debe contener:</p>" + 
            "<ul>" +
            "<li>Un caracter numérico</li>" + 
            "<li>Una letra mayuscula</li>" +
            "<li>Un caracter especial</li>" +
            "</ul>"+
            "</div>"
        }
    })    
    password.addEventListener('focus',(event)=>{
        password.classList.remove("validInput", "nonValidInput")
    })

    passwordReapeat.addEventListener('keyup',(event)=>{
        if (passwordReapeat.value == password.value && passwordReapeat.value.length != 0){
            //Valid passwordReapeat
            validateField(passwordReapeat, passwordReapeatError)
        }
    })
    passwordReapeat.addEventListener('blur',(event)=>{
        if (passwordReapeat.value == password.value && passwordReapeat.value.length != 0){
            delete errorsFront.passwordReapeat
            validateField(passwordReapeat, passwordReapeatError)
        }else{
            passwordReapeatError.innerHTML = "Las contraseñas ingresadas no coinciden"
            rejectField(passwordReapeat, "passwordReapeat")
        }
    })
    passwordReapeat.addEventListener('focus',(event)=>{
        passwordReapeat.classList.remove("validInput", "nonValidInput")
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
        if (password.value.length == 0){
            password.classList.add("nonValidInput")
        }
        if (passwordReapeat.value.length == 0){
            passwordReapeat.classList.add("nonValidInput")
        }

        if (Object.keys(errorsFront).length != 0 ||
            usuario.value.length == 0 ||
            email.value.length == 0 ||
            password.value.length == 0 ||
            passwordReapeat.value.length == 0
        ){
            //presence of errorsFront
            event.preventDefault()
            alert("Algunos campos poseen errores o estan incompletos")
        }
    })
}
