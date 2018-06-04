const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

let app = express();


const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Started on port ${port}`)
});




console.log(__dirname+'../public');
console.log(publicPath);