const express = require('express');
const app = express();

app.use(express.json());

const persons = [
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
  const result = persons.find((person) => person.id === id);

  if (result) {
    persons.splice(persons.indexOf(result), 1);
  }

  return res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);

console.log(`App running on http://localhost:${PORT}`);
