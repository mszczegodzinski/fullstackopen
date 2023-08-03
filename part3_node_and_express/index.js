require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.code === 'CastError') {
    return res.status(404).send({ error: 'Person not found. Malformed id' });
  } else if (error.code === 'ValidationError') {
    console.log(error);
    return res.status(404).send({ error: error.message });
  }

  next(error.message);
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/info', (req, res, next) => {
  const currentDate = new Date().toString();
  Person.countDocuments({})
    .then((personsCount) => {
      const peopleCount = `Phonebook has info for ${personsCount} people`;
      const resultString = `
      <p>${peopleCount}</p>
      <p>${currentDate}</p>
    `;
      res.send(resultString);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
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

  person
    .save()
    .then((newPerson) => {
      res.json(newPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
