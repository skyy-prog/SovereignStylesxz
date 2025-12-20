import mongoose from "mongoose";

const ConnectDB = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('connected to the database')
    })
    await mongoose.connect(`${process.env.MONGODBURL}/e-commerce`)
}

export default ConnectDB