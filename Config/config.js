const mongoose= require ("mongoose")

const mongoDB= `mongodb+srv://agbakwuruoluchi29:XWdcUz35dgU2n67M@cluster1.icqdwqa.mongodb.net/Movies`

mongoose.connect(mongoDB).then(()=>{
    console.log(`This Application is connected to mongoose`);
}).catch((error)=>{
console.log(error.message);
})