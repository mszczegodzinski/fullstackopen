const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const login = process.argv[3];

const url = `mongodb+srv://${login}:${password}@fullstackopen-phonebook.3tocqj5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[4],
  number: process.argv[5],
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
