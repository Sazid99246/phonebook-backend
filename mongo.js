const mongoose = require('mongoose')

const Person = require('./models/person')
const name = process.argv[2]
const number = process.argv[3]

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number
  })
  person.save().then(({ name, number }) => {
    console.log(`Added ${name} number ${number} to the phonebook`)
    mongoose.connection.close()
  })
}
