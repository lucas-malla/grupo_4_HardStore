const fs = require('fs');
const path = require('path')

function get_next_id(data_base){
    //devuelve el proximo id de producto a crear
    return ((data_base.slice(-1))[0].prod_id)+1
}

const adminServices = {
    agregarProducto : function agregarProducto(newProduct){
        //read DB
        dataBasePath = path.join(__dirname, '../data_base/productos.json')
        data_base = fs.readFileSync(dataBasePath)
        data_base = JSON.parse(data_base)
        // Generate id and Add new Product
        newProduct["prod_id"] = get_next_id(data_base)
        data_base.push(newProduct)
        //Store DB
        data_base = JSON.stringify(data_base, null, 4) //por formato
        fs.writeFileSync( dataBasePath, data_base, "utf8" )
        return newProduct["prod_id"]
    },
    allDataBase : function allDataBase (){
        dataBasePath = path.join(__dirname, '../data_base/productos.json');
        data_base = fs.readFileSync((dataBasePath), "utf-8");
        data_base = JSON.parse(data_base);
        return data_base;
    },
    writeFile : function writeFile (array){
        dataBasePath = path.join(__dirname, '../data_base/productos.json');
        dataBase = JSON.stringify (array, null, 4);
        fs.writeFileSync (dataBasePath, dataBase );
    }
}

module.exports = adminServices
