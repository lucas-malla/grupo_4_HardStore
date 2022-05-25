window.onload = function(){
     
            let form = document.querySelector("#formModification");
            let name = document.querySelector("#inputName");
            let brand = document.querySelector("#inputBrand");
            let model = document.querySelector("#inputModel");
            let color = document.querySelector("#prodColor");
            let price = document.querySelector("#inputPrice");
            let dto = document.querySelector("#inputDto");
            let stock = document.querySelector('#inputStock');
            let descrip = document.querySelector('#inputDescrip')
            let file = document.querySelector('#formFile');


            form.addEventListener('submit', (e) => {
            let errors = [];
                
        
        if (name.value === '') {
                    errors.push('Ingrese un nombre de producto');
                    name.classList.add('is-invalid');
                } else if(name.value.length <5) {
                    errors.push('El nombre debe tener al menos 5 caracteres');  
                    name.classList.add('is-invalid');  
                }else{
                    name.classList.add('is-valid');
                    name.classList.remove('is-invalid');
                     form.brand.focus();
                }

                if (brand.value === '') {
                    errors.push('Ingrese una marca');
                    brand.classList.add('is-invalid');
                } else {
                    brand.classList.add('is-valid');
                    brand.classList.remove('is-invalid');
                    form.model.focus();
                };

                if (model.value === '') {
                    errors.push('Ingrese un modelo');
                    model.classList.add('is-invalid');
                } else {
                    model.classList.add('is-valid');
                    model.classList.remove('is-invalid');
                    form.color.focus();
                };
                if (color.value === "") {
                    errors.push('Ingrese un color');
                    color.classList.add('is-invalid');
                } else {
                    color.classList.add('is-valid');
                    color.classList.remove('is-invalid');
                    form.price.focus();
                };
                
                 if (price.value === '') {
                    errors.push('Ingrese un precio');
                    price.classList.add('is-invalid');
                } else {
                    price.classList.add('is-valid');
                    price.classList.remove('is-invalid');
                    form.dto.focus();
                };

                if (dto.value === '') {
                    errors.push('Ingrese un descuento');
                    dto.classList.add('is-invalid');
                } else {
                    dto.classList.add('is-valid');
                    dto.classList.remove('is-invalid');
                    form.stock.focus();
                };

                if (stock.value === '') {
                    errors.push('Ingrese el stock');
                    stock.classList.add('is-invalid');
                } else {
                    stock.classList.add('is-valid');
                    stock.classList.remove('is-invalid');
                };

                if (descrip.value === '') {
                    errors.push('Ingrese la descrpcion');
                    descrip.classList.add('is-invalid');
                } else {
                    descrip.classList.add('is-valid');
                    descrip.classList.remove('is-invalid');
                };
               
                // if (file.value === '') {
                //     errors.push('Ingrese una imagen');
                //     file.classList.add('is-invalid');
                // } else {
                //     file.classList.add('is-valid');
                //     file.classList.remove('is-invalid');
                // }

        if (errors.length > 0) {
                    e.preventDefault();
                    let ulErrors = document.querySelector('.errores');
                    ulErrors.classList.add('alert-warning');
                    ulErrors.innerHTML = '';
                    for (let i = 0; i < errors.length; i++) {
                        ulErrors.innerHTML += `<li>${errors[i]} </li>`;
                    };
                }else{
                    form.submit();
                }
        
            });

}