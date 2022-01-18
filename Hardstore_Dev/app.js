const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.resolve(__dirname, './public')))

let PORT = 3000
app.listen(PORT, () => console.log("server: ON  Port:", PORT))

//HOME
app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})
