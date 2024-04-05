const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

morgan.token("post-body", (req, res) => JSON.stringify(req.body));

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"));
app.use(cors())
app.use(express.static('dist'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})  

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);        
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random()*10000);
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    } else if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({ error: 'Name already exists in the phonebook' });
    } else {
        const person = {
            id: id,
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person);
        res.json(persons);
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})