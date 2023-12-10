const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
morgan.token('postData', (req, res) => {
    if (req.method === 'POST') {
      return JSON.stringify(req.body);
    }
    return '';
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.use(express.json())

let persons = 
[
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const timeStamp = new Date()
    const numberOfPerson = persons.length

    const infoText = `<p>Phonebook has info for ${numberOfPerson} people</p>
    <p>${timeStamp}</p>`

    response.send(infoText)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end('Not Found')
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
  })
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'Name or number is missing' 
      })
    }

    const nameExist = persons.some(person => person.name === body.name)
    if (nameExist) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }
  
    const newPerson = {
        id: Math.floor(Math.random()*10000),
        name: body.name,
        number: body.number,      
    }
  
    persons = persons.concat(newPerson) 
    response.json(newPerson)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

