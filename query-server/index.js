require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const secret = process.env.JWTSECRET || 'secret';
const bcrypt = require('bcrypt');

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://progheroa11.web.app",
    "https://progheroa11.firebaseapp.com",
  ], 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Todo : Remove Numbers
const verifyToken = (req,res,next)=>{
  console.log('Inside the verifyToken');
  const token = req?.cookies?.token;
  console.log(`Cookie:`, token); 
  if(!token){
    return res.status(401).send({message:'Unauthorized Access 1!'});
  }
  jwt.verify(token,secret,(err,decoded)=>{
    if(err){
      return res.status(401).send({message:'Unauthorized Access 2!'});
    }
    //
    req.user = decoded;
    // console.log(decoded);
    next();
  })
}

// Database
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Cookie Defaults
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  };

// MongoDB Starts 
const uri = `mongodb+srv://${dbUser}:${dbPassword}@crudnodejs.33uff.mongodb.net/?retryWrites=true&w=majority&appName=crudNodeJs`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // DB Collections
    const userCollection = client.db(dbName).collection("users");
    const categoryCollection = client.db(dbName).collection("category");
    const queryCollection = client.db(dbName).collection("query");
    const activityCollection = client.db(dbName).collection("activity");
    const recommendationCollection = client.db(dbName).collection("recommendation");
    // Auth Related
    // Auth/Login Token
    app.post('/jwt',async (req,res)=>{
      const user = req.body;
      const token = jwt.sign(user, secret, { expiresIn: '1h' });
      res
      .cookie('token',token,cookieOptions)
      .send({success:true});
    })
    // Logout and Clear Token
    app.post('/logout', async(req,res)=>{
      res
      .clearCookie('token',{
        httpOnly:true,
        secure:false
      })
      .send({success:true});
    })
    // Get Achievment Counts
    app.get('/counts', async(req,res)=>{
      const queryCount = await queryCollection.countDocuments(); 
      const recommendationCount = await recommendationCollection.countDocuments();  
      const activityCount = await activityCollection.countDocuments(); 
      const userCount = await userCollection.countDocuments();
      const result = {queryCount,recommendationCount,activityCount,userCount};
      console.log(`All Counts Fetched !`);
      res.send(result);
    });

    // User Routes
      //Get All Users
      app.get('/users', async(req,res)=>{
          const result = await userCollection.find().toArray();
          console.log(`All Users Fetched!`);
          res.send(result);
      });
      //Add New User , Register
      app.post('/users', async(req,res)=>{
        const { email, password, ...otherDetails } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = {
          email,
          password: hashedPassword,
          ...otherDetails,
        };
        const result = await userCollection.insertOne(newUser);
        // Generate JWT Token
        // const token = jwt.sign({ email: newUser.email },secret,{ expiresIn: '1h' });
        console.log(`New User Added to Mongo DB`,newUser.email);
        res.send(result);
      });
      // Update User info Using Patch
      app.patch('/userUpdate',verifyToken,async (req,res)=>{
        const { email, name,photo } = req.body;
        const filter = { email };
        const updatedUserInfo = {
          $set: {}
        };
        //if data provided then update
        if (name) {
          updatedUserInfo.$set.name = name;
        }
        if (photo) {
          updatedUserInfo.$set.photo = photo;
        }
        //
        const result = await userCollection.updateOne(filter,updatedUserInfo);
        console.log('Updated Info of User',updatedUserInfo.$set);
        res.send(result);
      })
      // Update Login info Using Patch
      app.patch('/users',async (req,res)=>{
        const {  lastSignInTime,email, name,photo } = req.body;
        const filter = { email };
        const updatedUserInfo = {
          $set: {}
        };
        //if data provided then update
        if (name) {
          updatedUserInfo.$set.name = name;
        }
        if (photo) {
          updatedUserInfo.$set.photo = photo;
        }
        if (lastSignInTime) {
          updatedUserInfo.$set.lastSignInTime = lastSignInTime;
        }
        //
        const result = await userCollection.updateOne(filter,updatedUserInfo);
        console.log('Updated Info of User',updatedUserInfo.$set);
        res.send(result);
      })
      // Get User
      app.get('/user',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        
        const query = { email: email };
        const result = await userCollection.findOne(query);
      
        console.log('Inside the USER API');
      
        res.send(result);
      });
    //Category Routes
      // Get all category
      app.get('/category', async(req,res)=>{
        const cursor = categoryCollection.find();
        const result = await cursor.toArray();
        console.log(`All Categories Fetched!`);
        res.send(result);
      });
      //View Category
      app.get('/category/:id',async (req,res)=>{
        const id = req.params.id;
        // const query = { _id: id };
        const query = { _id: new ObjectId(id) };
        const result = await categoryCollection.findOne(query);
        console.log('View Category',result);
        // console.log(query._id);
        res.send(result);
      })
    //Query
        //Get Most Viewed Queries
        app.get('/queriesByView', async(req,res)=>{
          const result = await queryCollection.find().limit(6).sort({ views: -1 }).toArray();
          console.log(`All Queries Fetched By Page!`);
          res.send(result);
        });
        //Get All Queries
        app.get('/queries', async(req,res)=>{
          const page = parseInt(req.query.page);
          const size = parseInt(req.query.size);
          const result = await queryCollection.find().skip(page * size).limit(size).sort({ _id: -1 }).toArray();
          console.log(`All Queries Fetched By Page!`, page, size);
          res.send(result);
        });
        //Get Simillar Category Equipments Data
        app.get('/querySameCategory/:id', async(req,res)=>{
          const categoryId = parseInt(req.params.id);
          const query = {categoryId};
          const result = await queryCollection.find({categoryId}).sort({ _id: -1 }).toArray();
          console.log(`Simillar Category Queries Fetched!`);
          res.send(result);
        });
      // Get My Query
      app.get('/query',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        const query = { userEmail: email };
        const result = await queryCollection.find(query).skip(page * size).limit(size).sort({ _id: -1 }).toArray();
      
        console.log('USER Query Fetched and Page by Page');
      
        res.send(result);
      });
      // Get Single Query
      app.get('/query/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await queryCollection.findOne(query);
        console.log('Single Query Fetched');
        // Update View
        const updatedQueryInfo = {
          $set: {}
        };
        updatedQueryInfo.$set.views = result.views+1;
        const result2 = await queryCollection.updateOne(query,updatedQueryInfo);
        //
        res.send(result);
      });

      // Search
      app.get('/querySearch', async (req, res) => {
        const { name } = req.query; 
        let filter = {productName: { $regex: name, $options: 'i' } };
        try {
          const result = await queryCollection.find(filter).sort({ _id: -1 }).toArray();
          console.log(`Queries Fetched! Filter:`);
          res.send(result);
        } catch (error) {
          console.error('Error fetching queries:', error);
          res.status(500).send({ message: 'Internal Server Error' });
        }
      });
      // Queries Count
      app.get('/queriesCount', async (req, res) => {
        const count = await queryCollection.estimatedDocumentCount();
        res.send({ count });
      })
      // My Queries Count
      app.get('/myQueriesCount',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        
        const query = { userEmail: email };
        const count = await queryCollection.countDocuments(query);;
        res.send({ count });
      })

      //Add New Query
      app.post('/query',verifyToken, async(req,res)=>{
        const newQuery = req.body;
        const result = await queryCollection.insertOne(newQuery);
        //activity
        const activity = {
          email : newQuery.userEmail,
          title : newQuery.queryTitle,
          type : 'query',
          id : result.insertedId,
          createdAt : newQuery.createdAt,
        }
        const result2 = await activityCollection.insertOne(activity);
        console.log(`New Query and Activity Added to Mongo DB!`);
        res.send(result);
      });
      // Delete Query
      app.delete('/query/:id',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await queryCollection.deleteOne(query);
        //Activity Delete
        const query2 = { id: new ObjectId(id) };
        const result2 = await activityCollection.deleteOne(query2);
        console.log('Delete Query and Activity',query);
        res.send(result);
      })
      // Get Single Query For Update
      app.get('/queryu/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await queryCollection.findOne(query);
        console.log('Single Query Fetched');
        res.send(result);
      });
      // Update Single Query 
      app.patch('/query/update/:id',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        const id = req.params.id;
        const options = { upsert: true };
        const query = req.body;
        const filter = { _id: new ObjectId(id) };
        const updatedQuery = {
          $set: {
            queryTitle:query.queryTitle,
            boycottReason:query.boycottReason,
            productName:query.productName,
            productBrand:query.productBrand,
            image:query.image,
            categoryId:query.categoryId,
            category:query.category,
            userEmail:query.userEmail,
            userName:query.userName,
            userPhoto:query.userPhoto,
            updatedAt:query.updatedAt,
          }
        };
        const result = await queryCollection.updateOne(filter,updatedQuery,options);
        console.log('Query Updated!');
        //
        res.send(result);
      });

      // Recommendation Routes
        // Get All Recommendations Based On Query
        app.get('/recommendations/:id', async(req,res)=>{
          const id = req.params.id;
          const query = { queryId: id };
          const result = await recommendationCollection.find(query).sort({ _id: -1 }).toArray();
          console.log(`All Recommendations of the Query Fetched!`);
          res.send(result);
        });
        // Get All My Recommendations
        app.get('/recommendations', verifyToken, async (req, res) => {
          const { email } = req.query; 
          if (!email) {
            return res.status(400).send({ error: 'Email is required' });
          }
          if(req.user.email !== req.query.email){
            return res.status(403).send({message:'Forbidden Access!'});
          }
          const query = { recommenderEmail: email };
          const page = parseInt(req.query.page);
          const size = parseInt(req.query.size);
          const result = await recommendationCollection.find(query).skip(page * size).limit(size).sort({ _id: -1 }).toArray();
          console.log(`All My Recommendations Fetched and Paginated!`);
          res.send(result);
        });
        // My Recommendations Count
        app.get('/myRecommendationsCount',verifyToken, async (req, res) => {
          const { email } = req.query; 
          if (!email) {
            return res.status(400).send({ error: 'Email is required' });
          }
          if(req.user.email !== req.query.email){
            return res.status(403).send({message:'Forbidden Access!'});
          }
          
          const query = { recommenderEmail: email };
          const count = await recommendationCollection.countDocuments(query);;
          res.send({ count });
        })
        // Get All Recommendations For Me
        app.get('/recommendationsforme', verifyToken, async (req, res) => {
          const { email } = req.query; 
          if (!email) {
            return res.status(400).send({ error: 'Email is required' });
          }
          if(req.user.email !== req.query.email){
            return res.status(403).send({message:'Forbidden Access!'});
          }
          const query = { userEmail: email };
          const page = parseInt(req.query.page);
          const size = parseInt(req.query.size);
          const result = await recommendationCollection.find(query).skip(page * size).limit(size).sort({ _id: -1 }).toArray();
          console.log(`All Recommendations for Me Fetched and Paginated!`);
          res.send(result);
        });
        // Recommendations For Me Count
        app.get('/recommendationsForMeCount',verifyToken, async (req, res) => {
          const { email } = req.query; 
          if (!email) {
            return res.status(400).send({ error: 'Email is required' });
          }
          if(req.user.email !== req.query.email){
            return res.status(403).send({message:'Forbidden Access!'});
          }
          
          const query = { userEmail: email };
          const count = await recommendationCollection.countDocuments(query);;
          res.send({ count });
        })
        //Add New Recommendation
        app.post('/recommendation',verifyToken, async(req,res)=>{
          const newRecommendation = req.body;
          const result = await recommendationCollection.insertOne(newRecommendation);
          console.log(`New Recommendation Added to Mongo DB!`);
          res.send(result);
        });
        // Increase Query Recommendation Count
        app.patch('/recommendation/query/:id',verifyToken, async (req, res) => {
          const id = req.params.id;
          const options = { upsert: true };
          const query = req.body;
          const filter = { _id: new ObjectId(id) };
          const updatedQuery = {
            $set: {
              recommendationCount:query.recommendationCount,
            }
          };
          const result = await queryCollection.updateOne(filter,updatedQuery,options);
          console.log('Query Recommendation Count Updated!');
          //
          res.send(result);
        });
        // Delete Recommendation
        app.delete('/recommendation/:id',verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await recommendationCollection.deleteOne(query);
        console.log('Query Recommendation Deleted!');
        res.send(result);
      });
      // Decrease Query Recommendation Count - Executes After Delete
      app.patch('/recommendation/querycountrem/:id',verifyToken, async (req, res) => {
        const id = req.params.id;
        const options = { upsert: true };
        const queryFilter = { _id: new ObjectId(id) };
        const query = await queryCollection.findOne(queryFilter);
        const filter = { _id: new ObjectId(id) };
        const updatedQuery = {
          $set: {
            recommendationCount:query.recommendationCount-1,
          }
        };
        const result = await queryCollection.updateOne(filter,updatedQuery,options);
        console.log('Query Recommendation Count Decreased!');
        //
        res.send(result);
      });
      // Get All Activity
      app.get('/activity', verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        const query = { email };
        const result = await activityCollection.find(query).limit(10).sort({ _id: -1 }).toArray();
        console.log(`All Activity Fetched!`);
        res.send(result);
      });
      // Get All Users Activity Count
      app.get('/countUsers', verifyToken, async (req, res) => {
        const { email } = req.query; 
        if (!email) {
          return res.status(400).send({ error: 'Email is required' });
        }
        if(req.user.email !== req.query.email){
          return res.status(403).send({message:'Forbidden Access!'});
        }
        const query = {userEmail: email };
        const query2 = {recommenderEmail: email };
        const queryCount = await queryCollection.countDocuments(query); 
        const recommendationCount = await recommendationCollection.countDocuments(query2);  
        console.log(`All Activity Counts Fetched!`);
        const result = {queryCount,recommendationCount};
        res.send(result);
      });

  } finally {
    // Ensures that the client will close when you finish/error
    // console.log("Finally Executed!");
  }
}
run().catch(console.dir);
// MongoDB Ends

// Initial Setup
app.get('/', (req,res)=>{res.send(`PHA11 Server is Running!`)})
app.listen(port, ()=>{
    console.log(`PHA11 Server is Running on Port : ${port} and Secret : ${secret}`);
})