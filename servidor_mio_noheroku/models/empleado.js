import  mongoose  from "mongoose";
const Schema=mongoose.Schema;


const empleadoSchema=new Schema({

    codigo:Number,
    nombre:String,
    apellido:String,
    direccion:String,
    cargo:String
    
});

//convertir a modelo
const Empleado=mongoose.model('Empleado',empleadoSchema); //Convierto ese esquema a un modelo de nombre nota

module.exports = {
    Empleado
}