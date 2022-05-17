console.log("Js Login is Linked!")

window.onload = function(){
    let form = document.querySelector("#formLogin")
    let usuario =  document.querySelector("#userName")
    let password =  document.querySelector("#password")

    let usuarioError =  document.querySelector(".nameError")
    let passwordError =  document.querySelector(".passwordError")
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
            //UNCOMMENT FOR DEPLOY!!!
            
            // rejectField(password, "password") 
            // passwordError.innerHTML =
            // "<div>" + 
            // "<p>La contraseña debe contener:</p>" + 
            // "<ul>" +
            // "<li>Un caracter numérico</li>" + 
            // "<li>Una letra mayuscula</li>" +
            // "<li>Un caracter especial</li>" +
            // "</ul>"+
            // "</div>"
        }
    })    
    password.addEventListener('focus',(event)=>{
        password.classList.remove("validInput", "nonValidInput")
    })


    form.addEventListener('submit',(event)=>{
        //fields validations
        if (usuario.value.length == 0){
            usuario.classList.add("nonValidInput")
        }
        if (password.value.length == 0){
            password.classList.add("nonValidInput")
        }
        console.log(errorsFront)
        if (Object.keys(errorsFront).length != 0 ||
            usuario.value.length == 0 ||
            password.value.length == 0
        ){
            //presence of errorsFront
            event.preventDefault()
            alert("Usuario o contraseña invalida")
        }
    })

}