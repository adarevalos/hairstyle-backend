import express from 'express'
const router = express.Router();

//importar el modelo nota
const {Empleado} = require('../models/empleado');
//import Nota from '../models/nota';


/* ****************************
* CRUD EMPLEADO
******************************/ 

// Agregar una nota

router.post('/newemployee', async(req, res)=>{
    const body = req.body; //Obtiene toda la información y crea el doc en la DB
    try {

        const empleadoDB= await Empleado.create(body); //espera y establece la creación de un documento a través de la info que guarde en body
        res.status(200).json(empleadoDB); //se crea la respuesta //ESe 200 es que se creo el doc de manera exitosa // Creamos un json que envia una notaDB
        
    } catch (error) {

        return res.send(console.log(error));
        
    }
});

//Get con parametro

router.get('/employee/:id', async(req, res)=>{

    const _id=req.params.id;

    try {

        const empleadoDB= await Empleado.findOne({_id});
        res.json(empleadoDB);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })    
    }
});

//Get con todos los documentos

router.get('/employee',async(req,res)=>{

    try {

        const empleadoDB=await Empleado.find();
        res.json(empleadoDB);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }


});

//Delete eliminar una nota

router.delete('/employee/:id', async(req,res)=>{


    const _id=req.params.id;

    try {

        const empleadoDB=await Empleado.findByIdAndDelete({_id});
        if(!empleadoDB){ 
            return res.status(400).json({ 
                mensaje: 'No se encontró el id indicado', error 
            }) 
        } 
        res.json(empleadoDB);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }
});

//Actualizar una nota


router.put('/editemployee/:id', async(req,res)=>{

    const _id=req.params.id;
    const body =req.body;

    try {

        const empleadoDB= await Empleado.findByIdAndUpdate(_id,body,{new:true});
        res.json(empleadoDB);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }



})


//Exportacion de router
module.exports=router; //Exportamos la configuración de express app