
data_base =[
    {
        'prod_id': 5,
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_category': 'monitores',
        'prod_img':"/images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_id': 6,
        'prod_name': "Notebook DELL i5",
        'prod_category': 'notebook',
        'prod_img':"/images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_id': 7,
        'prod_name': "Auriculares",
        'prod_category': 'headsets',
        'prod_img':"/images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_id': 8,
        'prod_name': "Silla Gamer ROJA",
        'prod_category': 'sillas',
        'prod_img':"/images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]

const controller = {
    galery: function(req, res){
        // req.query.search     es el input del usuario al buscar un producto (GET)
        // req.params.filter    es el parametro pasado por url si se abre una categoria

        //Busqueda en  Base de Datos
        let filter = req.query.search || req.params.filter
        let results = []
        if (filter){
            results = data_base.filter(producto => 
                producto.prod_category == filter
            )
        }else{
            results = data_base
        }

        res.render("products_galery",
        {
            'results':results
        })
    },
    detail: function(req, res){
        res.render("detail")
    }
}

module.exports = controller
