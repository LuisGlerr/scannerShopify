const {Router, response} = require('express');
const router = Router();
const fetch = require('node-fetch');

// Requerir el modelo para grabar datos en MONGO
const Product = require('../models/Products');

const urlBase = `https://${process.env.API_SHOPIFY}:${process.env.PASS_SHOPIFY}@${process.env.SHOP}`

// Obtener catalogo Shopify y guardarlo en Mongo
router.get('/sync', async (req, res, next)=>{
    try{
        const respuesta = await fetch(`${urlBase}/admin/api/2020-07/products.json?fields=id,title, variants&limit=250`)
        const respuestaJson = await respuesta.json();
        const respuestaOk = respuestaJson.products;
        const array = []
        for(producto of respuestaOk){
            let prodId = producto.id;
            let prodTitle = producto.title;
            let objVariants = producto.variants;
            for(variante of objVariants){
                let {id, title, price, sku, inventory_item_id, inventory_quantity} = variante
                let product = {prodId, prodTitle, id, title, price, sku, inventory_item_id, inventory_quantity}
                array.push(product);
                const newProduct = new Product(product);
                newProduct.save();
            }
        }
        console.log(array.length+' Productos agregados a Mongo');
        res.redirect('/');
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }
    
});

// Obtener productos de Mongo
router.get('/', async (req, res, next)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }
    
});

// Obtener 1 producto de Mongo
router.get('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params
        const product = await Product.findOne({sku: id})
        res.status(200).json(product)
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        });
        next(e)
    }
});

// Crear 1 producto en Mongo
router.post('/', async (req, res, next)=>{
    try {
        const data = req.body;
        const reg = await Product.create(data)
        res.status(200).json(reg)

    } catch(e) {
        res.status(500).send({
            message: 'Ocurrio un error'
        });
        next(e);
    }
})

// Actualizar 1 producto en Mongo
router.put('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        const reg = await Product.updateOne({sku: id}, data)
        res.status(200).json(reg)
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }   
    
})

// Eliminar un producto de Mongo
router.delete('/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const reg = await Product.deleteOne({sku: id})
        res.status(200).json(reg)
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }
    
})

// Obtener el Location_Id de Shopify para en la proxima ruta actualizarlo
router.get('/shop/:id', async (req, res, next)=>{
    try{
        const {id} = req.params;
        const response = await fetch(`${urlBase}/admin/api/2020-07/inventory_levels.json?inventory_item_ids=${id}`)
        const reg = await response.json();
        res.status(200).json(reg)
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }
})

/* Actualizar inventario en Shopify >> Estos metodos se definieron aqui y se realiza el FETCH a Shopify desde
aqui debido a que no se pueden realizar peticiones FETCH directo a shopify desde el Frontend 
por ello hago las peticiones a mi servidor -> y mi servidor a Shopify */
router.post('/shop', async (req, res, next)=>{
    try{
        const response = await fetch(`${urlBase}/admin/api/2020-07/inventory_levels/set.json`, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        res.status(200).json(response)
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        })
        next(e)
    }
})

module.exports = router;