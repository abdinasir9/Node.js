const express = require('express');
const { json } = require('express/lib/response');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log('App listening on port' + PORT);
}) 

