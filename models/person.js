require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGO_URI

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (v) {
				return /\d{2,3}-\d{5,15}/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
		required: [true, "User phone number required"],
	},
});

personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)