const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const {} = require("mongodb");
const app = express();

// MiddleWere
app.use(cors());
app.use(express.json());

// error handling MiddleWere
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Somthing is wrong.");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w9y9xep.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  const coursesCollection = client
    .db("coursesOftechwisedude")
    .collection("courses");

    
    // Geting all data from mongodb server 
  app.get("/courses", async (req, res) => {
    const dataLimit = parseInt(req.query.limit);
    const query = {};
    if (req.query) {
      const cursor = coursesCollection.find(query).limit(dataLimit);
      const courses = await cursor.toArray();
      return res.send(courses);
    }
    const cursor=coursesCollection.find(query);
    const courses=await cursor.toArray();
    res.send(courses);
  });
};

run().catch(console.dir);

app.use("/", (req, res) => {
  res.send("The techwise dude server ");
});

app.listen(port, () => {
  console.log("server is running now".bgCyan);
});
