const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017/?connectTimeoutMS=80000&socketTimeoutMS=160000";
// const connecttoMongo=()=>{
//     mongoose.connect(mongoURI,{ 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true
//     }, () => { 
//         console.log('connected to database myDb ;)') 
//     })
    

const server='127.0.0.1:27017';
const database='enotebook';
const connecttoMongo=async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('coonected')
    }catch(err){
        console.log('failed to connect',err)

    }
}

module.exports=connecttoMongo;