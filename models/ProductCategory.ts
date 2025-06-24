import mongoose from "mongoose";
// @ts-expect-error - No type definitions available for mongoose-slug-updater
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
	title: String,
	parent_id: {
		type: String,
		default: ""
	},
	description: String,
	thumbnail: String,
	status: String,
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

const ProductCategory = mongoose.models.ProductCategory || mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;