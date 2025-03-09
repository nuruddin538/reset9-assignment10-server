const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g53hh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const visaCollection = client.db("visaDB").collection("visa");
    const applicationsCollection = client
      .db("visaDB")
      .collection("applications");

    // Get all visas
    app.get("/visa", async (req, res) => {
      const cursor = visaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get a single visa by ID
    app.get("/visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await visaCollection.findOne(query);
      res.send(result);
    });

    // Add a new visa
    app.post("/visa", async (req, res) => {
      const addVisa = req.body;
      // console.log(addVisa);
      const result = await visaCollection.insertOne(addVisa);
      res.send(result);
    });

    // Submit a visa application
    app.post("/apply-visa", async (req, res) => {
      const application = req.body;
      const result = await applicationsCollection.insertOne(application);
      res.send(result);
    });

    // Fetch visas added by the logged-in user
    app.get("/my-visas", async (req, res) => {
      const email = req.query.email;
      const query = { addedBy: email };

      const cursor = visaCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Delete a visa
    app.delete("/visa/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await visaCollection.deleteOne(query);
      res.send(result);
    });

    // Get all visa applications for a user
    app.get("/my-applications", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const cursor = applicationsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("visa navigator is running");
});

app.listen(port, () => {
  console.log(`visa navigator is running on port: ${port}`);
});
