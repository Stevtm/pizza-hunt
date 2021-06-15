const { Pizza } = require("../models");

const pizzaController = {
	// get all pizzas
	getAllPizza(req, res) {
		Pizza.find({})
			.then((dbPizzaData) => {
				res.status(200).json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get one pizza by id
	getPizzaById({ params }, res) {
		Pizza.findOne({ _id: params.id })
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(400).json({ message: "No pizza found with this id" });
					return;
				}

				res.status(200).json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// create pizza
	createPizza({ body }, res) {
		Pizza.create(body)
			.then((dbPizzaData) => res.status(200).json(dbPizzaData))
			.catch((err) => res.status(400).json(err));
	},

	// update pizza by id
	updatPizza({ params, body }, res) {
		Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.status(404).json({ message: "No pizza found with this id" });
					return;
				}

				res.status(200).json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// delete pizza
	deletePizza({ params }, res) {
		Pizza.findOneAndDelete({ _id: params.id })
			.then((dbPizzaData) => {
				if (!dbPizzaData) {
					res.json(404).json({ message: "No pizza dound with this id" });
				}

				res.json(200).json(dbPizzaData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = pizzaController;