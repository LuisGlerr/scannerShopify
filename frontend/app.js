require('./styles/styles.css');


import UI from './UI'
const ui = new UI();

// En App.js solo capturo los eventos para llamar los metodos de UI la cual esta conectada a -> ProductService

// Creación de variables de elementos DOM
const formularioScan = document.getElementById('form-inventory');
const botonCancel = document.getElementById('cancel');
const formularioEdit = document.getElementById('form-edit')

// Capturar el evento del formulario de SCANNER cambia min a MAY y despliega el Modal
formularioScan.addEventListener('submit', (e)=>{
    e.preventDefault();
    const valueForm = document.getElementById('sku').value;
    ui.renderForm(valueForm.toUpperCase());
    ui.showModal();
})

// Boton cancelar cuando se despliga el Modal, cierra modal y limpia Formulario SCANNER
botonCancel.addEventListener('click', (e)=>{
    ui.hideModal();
    ui.clearForm();
})

// Captura los datos del formulario Modal y los procesa al servidor
formularioEdit.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inventario = document.getElementById('valor').value;
    const sku = document.getElementById('skuValue').textContent;
    const item = document.getElementById('itemValue').textContent;
    ui.sendFormEdit(sku, inventario, item);
})