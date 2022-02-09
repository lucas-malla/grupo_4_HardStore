//LO MAS VENDIDO
mostSold = [
    {
        'prod_id': 1,
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_category': 'monitor',
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_id': 2,
        'prod_name': "Notebook DELL i5",
        'prod_category': 'notebook',
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_id': 3,
        'prod_name': "Auriculares",
        'prod_category': 'auriculares',
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_id': 4,
        'prod_name': "Silla Gamer ROJA",
        'prod_category': 'silla',
        'prod_img':"images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]
//NUESTRA SELECCION
ourSelection =[
    {
        'prod_id': 5,
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_category': 'monitor',
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_id': 6,
        'prod_name': "Notebook DELL i5",
        'prod_category': 'notebook',
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_id': 7,
        'prod_name': "Auriculares",
        'prod_category': 'auriculares',
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_id': 8,
        'prod_name': "Silla Gamer ROJA",
        'prod_category': 'silla',
        'prod_img':"images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]
//OFERTAS
offers =[
    {
        'prod_id': 9,
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_category': 'monitor',
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_id': 10,
        'prod_name': "Notebook DELL i5",
        'prod_category': 'notebook',
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_id': 11,
        'prod_name': "Auriculares",
        'prod_category': 'auriculares',
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_id': 12,
        'prod_name': "Silla Gamer ROJA",
        'prod_category': 'silla',
        'prod_img':"images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]

const controller = {
    home: function(req, res){
        res.render("index",
        {
            'mostSold': mostSold,
            'ourSelection': ourSelection,
            'offers': offers
        })
    },
}

module.exports = controller
