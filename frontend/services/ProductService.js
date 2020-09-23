
class ProductService {
    constructor() {
        this.URI = 'http://localhost:3000/api'
        this.SHOPIFY = 'http://localhost:3000/api/shop'
    }

    async getProducts(){
        const response = await fetch(`${this.URI}`)
        const data = await response.json()
        console.log(data)
    }

    // Obtener data de un producto desde el FRONT
    async getProduct(sku){
       const response = await fetch(`${this.URI}/${sku}`)
       const product = await response.json();
       return product;
    }

    // Actualiza en nuestra base de datos MONGO
    async updateProductMongo(sku, inventory){
        await fetch(`${this.URI}/${sku}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'inventory_quantity': inventory
                })
            })
    }

    // Hace las llamadas a nuestro servidor para enviarse y recibirlas desde -> Shopify
    async updateShopify(inventory, itemId){
      const response = await fetch(`${this.SHOPIFY}/${itemId}`)
      const reg = await response.json();
      const location = reg.inventory_levels[0].location_id;
      const updateInv = await fetch(`${this.SHOPIFY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "location_id": location,
                "inventory_item_id": itemId,
                "available": inventory
            })
        })
        const jsonInv = await updateInv.json();
        console.log(jsonInv);
    }

    
}

module.exports = ProductService