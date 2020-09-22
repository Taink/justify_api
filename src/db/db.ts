import mongoose from 'mongoose';
import { format } from 'util';

const MONGO_URI = format(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

export default async function initMongoDb(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('App successfully connected to the database');
    } catch(e) {
        console.log(e);
        throw e;
    }
}
