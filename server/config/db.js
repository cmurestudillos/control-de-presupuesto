const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Conexion a BBDD realizada.');
    } catch (error) {
        console.log('Ha ocurrido un error.')
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;