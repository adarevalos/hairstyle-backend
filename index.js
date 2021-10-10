const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT;
let db;
let collection;
MongoClient.connect("mongodb+srv://adarevalos:123David45@cluster0.oe9l9.mongodb.net/hair_style_DB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('hair_style_DB')
    collection = db.collection('productos')
})

//Ruta Principal pueden poner una descripcion Rutas: 
app.use(bodyParser.json());
app.get('/', (req, res) => {

    res.json({
        'rutaPrincipal':'GET/',
        'obtenerTodosProductos':'GET/productos',
        'obtenerUnProductos':'GET/productos/:codigo',
        ejemplo:{
            codigo:"004",
            nombre:"esmalte",
            descripcion:"Esmalte para uñas",
            cantidad:17,
            img:"otra_ruta_esmalte"
        },
        'crearProducto':'POST/productos',
        'ejemploCrearProducto':`{"codigo":"004","nombre":"esmalte","descripcion":"Esmalte para uñas","cantidad":17,"img":"otra_ruta_esmalte"}`,
        'editarProducto':'PUT/productos/:codigo',
        'ejemploEditarProducto':`{
            "nombre":"esmalte",
            "descripcion":"Esmalte para uñas",
            "cantidad":17,
            "img":"otra_ruta_esmalte"
        }`,
        'eliminarProducto':'DELETE/productos/:codigo',        
    })

})


app.get('/productos', (req, res) => {

    db.collection('productos').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.get('/productos/:id', (req, res) => {
    db.collection('productos').find({ codigo: req.params.id }).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/productos', (req, res) => {
    let newTodo = new todoModel();
    collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
        console.log("estoy en post desde el backend, siendo llamado desde el front");
})

app.put('/productos/:codigo', (req, res) => {
    collection.findOneAndUpdate({ codigo: req.params.codigo }, {
            $set: {

                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                img: req.body.img

            }
        }, {
            upsert: true
        }).then(result => { res.json('Updated') })
        .catch(error => console.error(error))

});

app.delete('/productos/:codigo', (req, res) => {
    collection.deleteOne({ codigo: req.params.codigo })
        .then(result => {
            res.json('Deleted')
        })
        .catch(error => console.error(error))
})

app.listen(port, function() {
    console.log('listening on ' + port)
});