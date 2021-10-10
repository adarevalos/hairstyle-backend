import express from 'express'
const router = express.Router();

//importar el modelo nota
const {Producto} = require('../models/producto');
//import Nota from '../models/nota';

// Agregar una nota

router.post('/newproduct', async(req, res)=>{

const body = req.body; //Obtiene toda la información y crea el doc en la DB
try {

    const productoDB= await Producto.create(body); //espera y establece la creación de un documento a través de la info que guarde en body
    res.status(200).json(productoDB); //se crea la respuesta //ESe 200 es que se creo el doc de manera exitosa // Creamos un json que envia una notaDB
    
} catch (error) {

    return res.send(console.log(error));
    
    
}


});

//Get con parametro

router.get('/product/:id', async(req, res)=>{

    const _id=req.params.id;

    try {

        const productoDb= await Producto.findOne({_id});
        res.json(productoDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }



});

//Get con todos los documentos

router.get('/product',async(req,res)=>{

    try {

        const productoDb=await Producto.find();
        res.json(productoDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }


});

//Delete eliminar una nota

router.delete('/product/:id', async(req,res)=>{


    const _id=req.params.id;

    try {

        const productoDb=await Producto.findByIdAndDelete({_id});
        if(!productoDb){ 
            return res.status(400).json({ 
                mensaje: 'No se encontró el id indicado', error 
            }) 
        } 
        res.json(productoDb);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
        
    }
});

//Actualizar una nota

router.put('/product/:id', async(req,res)=>{

    const _id=req.params.id;
    const body =req.body;

    try {

        const productoDb= await Producto.findByIdAndUpdate(_id,body,{new:true});
        res.json(productoDb);
        
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