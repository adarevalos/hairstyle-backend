import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';

const app=express();

const mongoose = require('mongoose'); 
//const { Nota, Producto } = require('../models/nota.js');
//const uri = 'mongodb://localhost:27017/myappprueba';

//const uri='mongodb+srv://user_notas:A27034286j@cluster0.8evgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const uri='mongodb+srv://adarevalos:123David45@cluster0.oe9l9.mongodb.net/hair_style_DB?retryWrites=true&w=majority';

const options = {useNewUrlParser: true,  useUnifiedTopology: true}; //Nos permite generar la conexion a base de datos

mongoose.connect(uri, options).then(
    () => { console.log('Conectado a DB') },
    err => { console.log(err) } 
);



//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); 
//application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
   });
   


//configurar las rutas

app.get('/', (req, res) => {

    res.json({
        'rutaPrincipal':'GET/',
        'obtenerTodosProductos':'GET/product',
        'obtenerUnProductos':'GET/product/:id',
        ejemplo:{
            codigo:"004",
            nombre:"esmalte",
            descripcion:"Esmalte para uñas",
            cantidad:17,
            precio:12500,
            img:"url de la imagen"
        }   
    })

});


app.use('/api', require('./routes/nota')); //Aqui conectamos las rutas (del folder routes) con este app.js
app.use('/api', require('./routes/producto'));
app.use('/api', require('./routes/empleado'));

const history = require('connect-history-api-fallback'); 
app.use(history()); 
app.use(express.static(path.join(__dirname, 'public'))); //Implementa el path de nuestra aplicación -> Está apuntando hacia la carpeta public (que tiene el index)

//Puerto

app.set('puerto', process.env.PORT || 3000); 
app.listen(app.get('puerto'), function () { 
    console.log('Example app listening on port'+ app.get('puerto')); 
});