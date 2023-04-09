import mongoose from "mongoose";
// set the DB_URI in .env file
const connect = DB => mongoose.connect(`${ process.env.DB_URI }/${ DB }`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connect;