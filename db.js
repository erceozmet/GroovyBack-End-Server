const mongoose = require('mongoose');
const User  = require('./models/usersModel.js')

const connectDB = async () => {
    try {
        //database Name
        const databaseName= 'userDB';
        const con = await mongoose.connect(`mongodb+srv://erce_admin:999044270981Za%21@groovydb.0wvyu.mongodb.net/userDB?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports = connectDB;