const path = require('path')


//LO MAS VENDIDO
mostSold = [
    {
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_name': "Notebook DELL i5",
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_name': "Auriculares",
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_name': "Silla Gamer ROJA",
        'prod_img':"images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]
//NUESTRA SELECCION
ourSelection =[
    {
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_name': "Notebook DELL i5",
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_name': "Auriculares",
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_name': "Silla Gamer ROJA",
        'prod_img':"images/silla.jpg",
        'price':"$10.000",
        'price_dto':"$8.800",
        'dto':"5%OFF",
    }
]
//OFERTAS
offers =[
    {
        'prod_name': "Monitor Curvo Led 27 Samsung F390",
        'prod_img':"images/monitor.webp",
        'price':"$36.000",
        'price_dto':"$28.800",
        'dto':"20%OFF",
    },
    {
        'prod_name': "Notebook DELL i5",
        'prod_img':"images/note.png",
        'price':"$35.000",
        'price_dto':"$27.800",
        'dto':"15%OFF",
    },
    {
        'prod_name': "Auriculares",
        'prod_img':"images/auris.png",
        'price':"$26.000",
        'price_dto':"$18.800",
        'dto':"10%OFF",
    },
    {
        'prod_name': "Silla Gamer ROJA",
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
