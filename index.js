const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// define app and port
const app = express();
const port = process.env.PORT || 5000;

// database URI(Uniform Resource Identifier)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.viujuo0.mongodb.net/?retryWrites=true&w=majority`;

// middlewore
app.use(cors());
app.use(express.json());

// Database Client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


const run = async () => {
    try {
        await client.connect();


        // HTTP get request
        app.get('/users', (req, res) => {
            res.send('Server running');
        })
        

        await client.db('admin').command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}


run().catch(console.dir);
app.listen(port, () => {
    console.log(`Server Running on PORT: ${port}`);
})

