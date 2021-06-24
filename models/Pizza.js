const { Schema, model } = require("mongoose");
const commentController = require("../controllers/comment-controller");
const dateFormat = require("../utils/dateFormat");

// define the schema
const PizzaSchema = new Schema(
	{
		pizzaName: {
			type: String,
			required: true,
			trim: true,
		},
		createdBy: {
			type: String,
			required: true,
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		size: {
			type: String,
			required: true,
			enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
			default: "Large",
		},
		toppings: [],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

PizzaSchema.virtual("commentCount").get(function () {
	return this.comments.reduce(
		(total, comments) => total + comments.replies.length + 1,
		0
	);
});

// create the pizza model using the schema
const Pizza = model("Pizza", PizzaSchema);

// export the pizza model
module.exports = Pizza;
