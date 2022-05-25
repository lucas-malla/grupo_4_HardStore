window.onload = function(){
    let form = document.querySelector("#formModification");
    let name = document.querySelector("#inputName");
    let brand = document.querySelector("#inputBrand");
    let model = document.querySelector("#inputModel");
    let color = document.querySelector("#prodColor");
    let price = document.querySelector("#inputPrice");
    let dto = document.querySelector("#inputDto");
    let stock = document.querySelector('#inputStock');
    let categori = document.querySelector('#inputCategori')
    let file = document.querySelector('#formFile');
    let descrip =document.querySelector('#inputDescri')

    let setError = (element, message) =>{
        let inputControl = element.parentElement;
        let errorDisplay = inputControl.querySelector('.error')
        errorDisplay.innerText = message
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    };

    let setSuccess = element => {
        let inputControl = element.parentElement;
        let errorDisplay = inputControl.querySelector('.error')
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error')
    };
   
    form.addEventListener('submit', e => {
        const errores = [];
         

        if(name.value === ''){
            setError(name, 'Ingrese un nombre de producto')
            errores.push('error')
        }
        else if(name.value.length < 5){
            setError(name, 'El nombre debe tener al menos 5 caracteres')
            errores.push('error')
        }
        else{
            setSuccess(name)
        }

        if(categori.value === ''){
            setError(categori, 'Seleccione una categoria')
            errores.push('error')
        }else{
            setSuccess(categori)
        }
        
        if(brand.value === ''){
            setError(brand, 'Ingrese una marca')
            errores.push('error')
        }else{
            setSuccess(brand)
        }

        if(model.value === ''){
            setError(model, 'Ingrese un modelo')
            errores.push('error')
        }else{
            setSuccess(model)
        }

        if(color.value === ''){
            setError(color, 'Ingrese un color')
            errores.push('error')
        }else{
            setSuccess(color)
        }

        if(price.value === ''){
            setError(price, 'Ingrese un precio')
            errores.push('error')
        }else{
            setSuccess(price)
        }

        if(dto.value === ''){
            setError(desc, 'Ingrese un valor')
            errores.push('error')
        }else{
            setSuccess(dto)
        }

        if(stock.value === ''){
            setError(stock, 'Ingrese el stock')
            errores.push('error')
        }else{
            setSuccess(stock)
        }

        if(descrip.value === ''){
            setError(descrip, 'Ingrese una descripción')
            errores.push('error')
        } 
        else if(descrip.value.length < 20){
            setError(descrip, 'La decripción debe tener al menos 20 carácteres')
            errores.push('error')
        }
        else{
            setSuccess(descrip)
        }

        if(file.value === ''){
            setError(file, 'Ingrese una imagen')
            errores.push('error')
        }
        else if(file.value != ""){
            const whitelist = ['png', 'jpeg', 'jpg', 'webp']   
            if (!whitelist.includes(file.value.split(".")[1])){
                setError(file, 'La imagen debe ser formato: \n .png , jpeg , jpg o webp')
                errores.push('error')
            }
            else{
                setSuccess(file)
            }
        }

        if (errores.length > 0) {
            e.preventDefault();
        }else{
            form.submit();
        }

    
    })

}