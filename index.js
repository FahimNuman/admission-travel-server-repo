const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//mongodb connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gzenche.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('admissiontravel').collection('service');

        app.get('/service',async (req,res)=>{
            const query ={};
            cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        })
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.post('/service', async (req, res) => {
            const addService = req.body;
            const result = await serviceCollection.insertOne(addService);
            res.send(result);
        });
        





    }
    finally {

    }
}
run().catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('Admission Travel server');
});

app.listen(port, () => {
    console.log(`Admission travel Running on the port  ${port}`);
})