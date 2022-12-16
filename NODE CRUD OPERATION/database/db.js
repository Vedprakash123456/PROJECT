const mongoose = require('mongoose');


async  function dbConnect(){
    return await mongoose.connect('mongodb://127.0.0.1:27017/nimap');
}
dbConnect()
.then((res)=>{
    console.log("DB CONNECT");
})
.catch((err)=>{
    console.log(err);
})
