
window.onload = function(){
    let form = document.querySelector(".formCreation")
    let prodName = document.querySelector(".prodName")
    let category = document.querySelector("#categoria")
    let brand = document.querySelector("#prodBrand")
    let model = document.querySelector("#prodModel")
    let color = document.querySelector("#prodColor")
    let price = document.querySelector("#prodPrice")
    let desc = document.querySelector("#prodDesc")
    let stock = document.querySelector("#prodStock")
    let descrip = document.querySelector("#prodDescrip")
    let file = document.querySelector("#formFile")

    

    
    const setError = (element, message) =>{
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error')
        errorDisplay.innerText = message
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error')
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error')
    }

    form.addEventListener('submit', e => {
       
        const errores = [];

        const prodNameValue = prodName.value.trim();
        const categoryValue = category.value.trim();
        const brandValue = brand.value.trim();
        const modelValue = model.value.trim();
        const colorValue = color.value.trim();
        const priceValue = price.value.trim();
        const descValue = desc.value.trim();
        const stockValue = stock.value.trim();
        const descripValue = descrip.value.trim();
        const fileValue = file.value
    
        if(prodNameValue === ''){
            setError(prodName, 'Ingrese un nombre de producto')
            errores.push('error')
        }
        else if(prodNameValue.length < 5){
            setError(prodName, 'El nombre debe tener al menos 5 caracteres')
            errores.push('error')
        }
        else{
            setSuccess(prodName)
        }

        if(categoryValue === ''){
            setError(category, 'Seleccione una categoria')
            errores.push('error')
        }else{
            setSuccess(category)
        }
        
        if(brandValue === ''){
            setError(brand, 'Ingrese una marca')
            errores.push('error')
        }else{
            setSuccess(brand)
        }

        if(modelValue === ''){
            setError(model, 'Ingrese un modelo')
            errores.push('error')
        }else{
            setSuccess(model)
        }

        if(colorValue === ''){
            setError(color, 'Ingrese un color')
            errores.push('error')
        }else{
            setSuccess(color)
        }

        if(priceValue === ''){
            setError(price, 'Ingrese un precio')
            errores.push('error')
        }else{
            setSuccess(price)
        }

        if(descValue === ''){
            setError(desc, 'Ingrese un valor')
            errores.push('error')
        }else{
            setSuccess(desc)
        }

        if(stockValue === ''){
            setError(stock, 'Ingrese el stock')
            errores.push('error')
        }else{
            setSuccess(stock)
        }

        if(descripValue === ''){
            setError(descrip, 'Ingrese una descripción')
            errores.push('error')
        } 
        else if(descripValue.length < 20){
            setError(descrip, 'La decripción debe tener al menos 20 carácteres')
            errores.push('error')
        }
        else{
            setSuccess(descrip)
        }

        if(fileValue === ''){
            setError(file, 'Ingrese una imagen')
            errores.push('error')
        }
        else if(fileValue != ""){
            const whitelist = ['png', 'jpeg', 'jpg', 'webp']   
            if (!whitelist.includes(fileValue.split(".")[1])){
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

    });

}