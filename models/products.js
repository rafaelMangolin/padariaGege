var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({
	name: String,
	descricao: String,
	price: Number,
	quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);