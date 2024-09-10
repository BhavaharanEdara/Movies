const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://neoGStudent:nVEGuN4TkI0jsnta@neog.e9n25sz.mongodb.net/?retryWrites=true&w=majority&appName=neoG";
const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log('Connected Successfully');
    }
  } catch (error) {
    console.log('Connection Failed', error);
  }
}

module.exports = { initializeDatabase };