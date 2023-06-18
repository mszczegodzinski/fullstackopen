const express = require('express');
const app = express();

app.use(express.json());

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
  res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = persons.find((person) => person.id === id);
  console.log(result);

  if (!result) {
    return res.status(404).send('Person not found');
  }

  return res.send(result);
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
    return res.status(400).send('Name and number are required');
  }
  const id = Math.floor(Math.random() * 1000);
  const isUniqueName = persons.find((person) => person.name === name) ? false : true;

  if (!isUniqueName) {
    return res.status(400).send({ error: 'Name must be unique' });
  }

  const person = {
    id,
    name,
    number,
  };
  persons = persons.concat(person);

  return res.send(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`App running on http://localhost:${PORT}`);
