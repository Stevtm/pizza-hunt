const { Schema, model } = require("mongoose");

// define the schema
const PizzaSchema = new Schema({
	pizzaName: {
		type: String,
	},
	createdBy: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	size: {
		type: String,
		default: "Large",
	},
	toppings: [],
});

// create the pizza model using the schema
const Pizza = model("Pizza", PizzaSchema);

// export the pizza model
module.exports = Pizza;
