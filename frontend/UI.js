import ProductService from './services/ProductService';
const productService = new ProductService();

class UI {
    
    // renderiza el Formulario Modal y coloca la data que viene desde MONGO
    async renderForm(sku){
    const data = await productService.getProduct(sku)
    const formContainer = document.querySelector('.form-container-flex');
    let div = document.createElement('div')
    formContainer.innerHTML = '';
    div = `
        <p id="wc_id" class="invisible"></p>
        <p id="itemValue" class="invisible">${data.inventory_item_id}</p>
        <p id="skuValue" class="invisible">${data.sku}</p>
        <p>${data.prodTitle}</p>
        <p>${data.sku}</p>
        <label for="product">${data.title}</label>
        <input id="valor" type="number" name="product" value="${data.inventory_quantity}">
        
        <button class="btn" type="submit">Actualizar</button>
    `
    formContainer.innerHTML = div;
    }
    
    // Encargado de guardar en MONGO y guardar en SHOPIFY, una ves se realiza cierra Modal y resetea el formulario SCANNER
    async sendFormEdit(sku, inventario, itemId){
        await productService.updateProductMongo(sku, inventario)
        await productService.updateShopify(inventario, itemId)
        this.hideModal();
        this.clearForm();
        
    }

    // APLICA MODAL
    async showModal(){
        document.getElementById('modal-form').classList.add('active')
    }

    // Quita Modal
    async hideModal(){
        document.getElementById('modal-form').classList.remove('active')
    }

    // Borra Formulario SCANNER y pone auto-focus
    async clearForm(){
        document.getElementById('form-inventory').reset();
        document.getElementById('sku').focus();
    }

}

export default UI;