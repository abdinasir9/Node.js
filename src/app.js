const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Customer = require('./models/customer')
const dotenv =  require('dotenv');
const { json } = require('express/lib/response');
const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const PORT = process.env.PORT || 3000;

const CONNECTION = process.env.CONNECTION;


// const customer = new Customer({
//     name:'nasir',
//     industry:'Service desk'
// })

 
app.get('/', (req,res ) => {
    res.send("Welcome");
})  

app.get('/api/customers', async (req,res)  =>{
    try{
        const result = await Customer.find();
        res.send({"customers":result});
    }catch(e){
        res.statusCode(500).json({error: e.message})
    }
   
});

app.get('/api/customers/:id', async (req,res) =>{
    try{
        const {id:customerId} =  req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if(!customer){
            res.status(404).json({error:'user not found'})
        }else{
            res.json({customer});
        }
   
    }catch(e){
        res.status(500).json({e:'somthing went wrong'});
    }
    
})



app.post('/api/customers',(req,res) => {
    try{
        console.log(req.body);
    const myNewCus = new Customer(req.body);
    myNewCus.save();
    res.status(201).json({myNewCus})
    }catch(e){
        res.status(400).json({error:e.message})
    }
    
});

app.put('/api/customers/:id', async (req,res) =>{
    try{
        const customerId= req.params.id;
        const result = await Customer.replaceOne({_id: customerId}, req.body);
        console.log(result);
        res.json({updatedCount: result.modifiedCount});
    }catch(e){
        res.status(500).json({error: 'something went wrong'});
    };
    
});

app.delete('/api/customers/:id', async (req,res) =>{
    try{
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id: customerId});
        console.log(result);
        res.json({deleteCount: result.deletedCount});
    }catch(e){
        res.status(500).json({error: 'something went wrong'});
    }
    
});



const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
    
        app.listen(PORT, () => {
            console.log('App listening on port' + PORT);
        }) ;
    }catch(e){
        console.log(e.message)
    }
    
}

start();
