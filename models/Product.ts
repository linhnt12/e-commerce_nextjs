import mongoose from "mongoose";
// @ts-expect-error - No type definitions available for mongoose-slug-updater
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
	title: String,
	product_category_id: {
		type: String,
		default: ""
	},
	description: String,
	price: Number,
	discountPercentage: Number,
	stock: Number,
	thumbnail: String,
	status: String,
	feature: String,
	position: Number,
	slug: {
		type: String,
		slug: "title",
		unique: true,
	},
	createdBy: {
		account_id: String,
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	deleted: {
		type: Boolean,
		default: false
	},
	deletedBy: {
		account_id: String,
		deletedAt: Date,
	},
	updatedBy: {
		account_id: String,
		updatedAt: Date,
	}
}, {
	timestamps: true
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;