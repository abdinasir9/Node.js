const express = require('express');
const mongoose = require('mongoose');
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

const  customers =  [
    {
        "name": "Nasir",
        "industry" : "lemon peeler"

    },
    {
        "name": "Faiza",
        "industry" : "tictoc watcher"
    },
    {
        "name": "joe",
        "industry" : "gum chewer"

    }
]


app.get('/', (req,res ) => {
    res.send({"customers":customers[0].name})
})  

app.post('/' ,(req,res) => {
    res.send()
})

app.post('/api/customers',(req,res) => {
    console.log(req.body);
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
