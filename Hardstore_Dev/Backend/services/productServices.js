const {Product} =  require('../database/models');

const  productServices = {
    randomProducts: async function(){
        return(
            Product.findAll({
                raw: true,
                include: [{association: 'images'}]
                })
            .then((products)=>{
                let resultado = [];
                for(let i = 1; i <= 3; i++ ){
                let aleatorio = products[Math.floor(Math.random() * products.length)]
                resultado.push(aleatorio)
                }
                //console.log(resultado)
                return (resultado)
            })
        )
    }
}


module.exports = productServices