const express = require('express');
require('./database/db');
var cors = require('cors');
const bodyParser = require('body-parser');
const productModel = require('./models/productModel');
const catModel = require('./models/categoryModel');

const app = express();
app.use(cors());
app.use(bodyParser.json()) 




//LOGIC FOR CODE

app.get("/api/show-category/:id" , async(req,res)=>{
    var ans_cat  = await catModel.findById(req.params.id);
    res.send(ans_cat);
})

app.get("/api/show-category" , async(req,res)=>{
    var ans_cat  = await catModel.find();
    res.send(ans_cat);
})

app.delete("/api/delete-product/:productid" , async(req,res)=>{
    console.log(req.params); // 

    
    var ans_product  = await productModel.findByIdAndRemove(req.params.productid);
    console.log(ans_product);
    res.send({msg:true})
})





app.get("/api/show-product" , async(req,res)=>{
    var ans_count = await productModel.countDocuments();
    var ans_product  = await productModel.aggregate([
        { "$lookup": {
            "let": { "catid": { "$toObjectId": "$catid" } },
            "from": "categories",
            "pipeline": [
            { "$match": { "$expr": { "$eq": [ "$_id", "$$catid" ] } } }
            ],
            "as": "catvalues"
        }},
        { "$skip": 0 },
        { "$limit": 10 }
        ]);

    console.log(ans_product);
    console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})
app.get("/api/get-product-category/:id" , async(req,res)=>{
    var ans_product_by_id  = await productModel.findById(req.params.id);
    var ans_cat  = await catModel.find();
    res.send({
        catRecord:ans_cat,
        productRec:ans_product_by_id
    });
})


app.get("/api/show-product/:skipvalue/:limitdata" , async(req,res)=>{
    var ans_count = await productModel.countDocuments();

    var ans_product  = await productModel.aggregate([
        { "$lookup": {
            "let": { "catid": { "$toObjectId": "$catid" } },
            "from": "categories",
            "pipeline": [
            { "$match": { "$expr": { "$eq": [ "$_id", "$$catid" ] } } }
            ],
            "as": "catvalues"
        }},
        { "$skip":Number(req.params.skipvalue) },
        { "$limit": Number(req.params.limitdata) }
        ]);

    res.send({
        ans_product,
        ans_count
    });
})


app.put('/api/update-product/:productid' , async(req,res)=>{
    console.log(req.body);
    console.log(req.params);


    var ans_product  = await productModel.findByIdAndUpdate(req.params.productid , req.body);
    res.send({msg:true})
})



app.post("/api/add-product" , async(req,res)=>{
    console.log(req.body); 
    const instance = new productModel(req.body);
    app.delete("/api/delete-category/:myid" , async(req,res)=>{
    
        console.log(req.params);
        
        var ans_cat  = await catModel.findByIdAndRemove(req.params.myid);
        res.send({msg:true})
    })
    const ans_insert = await instance.save();
    
    res.send({msg:"PRODUCT Added"});
});



app.put('/api/update-category/:categoryid' , async(req,res)=>{
    console.log(req.body);
    console.log(req.params);


    var ans_product  = await catModel.findByIdAndUpdate(req.params.categoryid , req.body);
    console.log(ans_product);
    res.send({msg:true})
})



app.post("/api/add-category" , async(req,res)=>{
    console.log(req.body); 
    const instance = new catModel(req.body);
    const ans_insert = await instance.save();
    console.log("After Insert");
    console.log(ans_insert);
    res.send({msg:"CATEGORY POST ROUTE CALLED"});
});

app.listen(9000);