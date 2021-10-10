import  mongoose  from "mongoose";
const Schema=mongoose.Schema;


const productoSchema=new Schema({

    codigo:String,
    nombre:String,
    descripcion:String,
    precio:Number,
    cantidad:Number,
    imagen:String
    
});

//convertir a modelo
const Producto=mongoose.model('Producto',productoSchema); //Convierto ese esquema a un modelo de nombre nota

module.exports = {
    Producto
}