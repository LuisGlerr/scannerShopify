if(process.env.NODE_ENV !== 'production'){
    // Hacer funcionar dotenv en tu proyecto
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');


// Inicializacion DB
require('./database')


// Definir puerto
app.set('port', process.env.PORT || 3000);

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

// Importar rutas
app.use('/api', require('./routes/routes'))

// Iniciar server
app.listen(app.get('port'), ()=>{
    console.log(`http://localhost:${app.get('port')}`)
})