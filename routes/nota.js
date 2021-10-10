import express from 'express'
const router = express.Router();

//importar el modelo nota
const {Nota} = require('../models/nota');
//import Nota from '../models/nota';

// Agregar una nota

router.post('/nueva-nota', async(req, res)=>{

const body = req.body; //Obtiene toda la información y crea el doc en la DB
try {

    const notaDB= await Nota.create(body); //espera y establece la creación de un documento a través de la info que guarde en body
    res.status(200).json(notaDB); //se crea la respuesta //ESe 200 es que se creo el doc de manera exitosa // Creamos un json que envia una notaDB
    
} catch (error) {

    return res.status(500).json({  //Este error es que paila

        mensaje:'Ocurrio un error',
        error
    })
    
}


});

//Get con parametro

router.get('/nota/:id', async(req, res)=>{

    const _id=req.params.id;

    try {

        const notaDb= await Nota.findOne({_id});
        res.json(notaDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }



});

//Get con todos los documentos

router.get('/nota',async(req,res)=>{

    try {

        const notaDb=await Nota.find();
        res.json(notaDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }


});

//Delete eliminar una nota

router.delete('/nota/:id', async(req,res)=>{


    const _id=req.params.id;

    try {

        const notaDb=await Nota.findByIdAndDelete({_id});
        if(!notaDb){ 
            return res.status(400).json({ 
                mensaje: 'No se encontró el id indicado', error 
            }) 
        } 
        res.json(notaDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }
});

//Actualizar una nota

router.put('/nota/:id', async(req,res)=>{

    const _id=req.params.id;
    const body =req.body;

    try {

        const notaDb= await Nota.findByIdAndUpdate(_id,body,{new:true});
        res.json(notaDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }



})



/*******************************************************************
 *  CRUD PRODUCTO 
 *********************************************************************/
// Agregar un producto

router.post('/nuevo-producto', async(req, res)=>{

    const body = req.body; //Obtiene toda la información y crea el doc en la DB
    try {
    
        const prodcutoDB= await Producto.create(body); //espera y establece la creación de un documento a través de la info que guarde en body
        res.status(200).json(prodcutoDB); //se crea la respuesta //ESe 200 es que se creo el doc de manera exitosa // Creamos un json que envia una notaDB
        
    } catch (error) {
    
        return res.status(500).json({  //Este error es que paila
    
            mensaje:'Ocurrio un error',
            error
        })
        
    }
    
    
    });
    















//Exportacion de router
module.exports=router; //Exportamos la configuración de express app