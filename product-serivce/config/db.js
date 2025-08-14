import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log();
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Db connected ');
        
    } catch (error) {
        console.log(error);

    }
}
export default connectDB