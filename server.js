const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://akuakkonadu8:akuakonadu@cluster0.mi368ld.mongodb.net/?retryWrites=true&w=majority'



MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('ADO-Tech-quotes')
    const quotesCollection = db.collection('quotes')
    
    app.use(bodyParser.urlencoded({ extended: true }))
    
    
    
    app.get('/',  (request, response) => {
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            console.log(results)
          })
          .catch(error => console.error(error))
         console.log(cursor)
        response.sendFile(__dirname + '/index.html')
      })
      
      
      
      app.post('/quotes',(request,response)=>{
        quotesCollection
        .insertOne(request.body)
        .then(result => {
         response.redirect('/')
          console.log(result)
        })
        .catch(error => console.error(error))
    })
    
    
    
    
    app.listen(3000, function () {
        console.log('listening on 3000')
      })
  })
  .catch(error => console.error(error))




