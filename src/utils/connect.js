import mongoose from 'mongoose';

const connect = DB => mongoose.connect(`${process.env.DB_URI}/${DB}`, { // set the DB_URI in .env file
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connect;