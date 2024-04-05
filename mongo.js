const mongoose = require('mongoose');

// username: dbUser1
// password: WedvtOsX5VsgQmCs

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://dbUser1:${password}@cluster0.qhkx5ox.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 3) {
    console.log("phonebook:");
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    })
} else {
    const person = new Person({
        name: name,
        number: number
    });
    
    person.save().then(res => {
        console.log(`Added ${person.name} number ${person.number} to the phonebook`);
        mongoose.connection.close();
    });    
}