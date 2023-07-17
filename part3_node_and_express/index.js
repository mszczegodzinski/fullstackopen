require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (req, res) => {
  const currentDate = new Date().toString();
  const peopleCount = `Phonebook has info for ${persons.length} people`;
  const resultString = `
    <p>${peopleCount}</p>
    <p>${currentDate}</p>
  `;
  res.send(resultString);
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = persons.find((person) => person.id !== id);
  persons = result;

  return res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  Person.findOne({ name: name }).then((persons) => {
    if (persons) {
      return res.status(400).json({ error: 'Name must be unique' });
    }
  });

  const person = new Person({
    name,
    number,
  });

  person.save().then((newPerson) => {
    res.json(newPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
