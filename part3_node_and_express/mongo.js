require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[2],
  number: process.argv[3],
});

// uncomment if you want to save a new person to mongodb cloud:
// person.save().then((result) => {
//   console.log('res', result);
//   console.log('person saved!');
//   mongoose.connection.close();
// });

Person.find({}).then((result) => {
  result.forEach((element) => {
    console.log(element);
  });
  mongoose.connection.close();
});
