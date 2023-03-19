const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer')
const dotenv =  require('dotenv');
const { json } = require('express/lib/response');
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json())
app.use(express.urlencoded({extended:true}))

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
    
})



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
