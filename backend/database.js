const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res)=>{
        console.log('DB Conectada');
    })
    .catch((err)=>{
        console.log(err)
    })