require('dotenv').config()
const {connect} = require('mongoose')
 
const connectDB = async(req, res)=>{
 try {
  const Connect = await connect(process.env.MongoURI, {
   useUnifiedTopology: true,
   useCreateIndex: true,
   useNewUrlParser: true,
   useFindAndModify: false
  })
  console.log(`SMS DB connected @ ${Connect.connection.host}`)
 } catch (error) {
  console.log(`SMS DB connection failed ${error}`)
  process.exit(1)
 }
}

module.exports = connectDB
