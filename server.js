// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Product    = require('./models/products');



mongoose.connect('mongodb://testeApi:testeApi123@ds047571.mongolab.com:47571/gegebakery'); // connect to our database




// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/products')
.post(function(req, res) {
	var product = new Product();      
	product.name = req.body.name; 
	product.descricao =  req.body.descricao;
	product.price =  req.body.price;
	product.quantity =  req.body.quantity;

	product.save(function(err) {
		err ? res.send(err) : res.json({ message: 'Product created!' });
	});

})
.get(function(req, res) {
	Product.find(function(err, products) {
		err ? res.send(err) : res.json(products);
	});
});



router.route('/products/:product_id')
.get(function(req,res){
	Product.findById(req.params.product_id,function(err,product){
		err ? res.send(err) : res.json(product);
	})
})
.put(function(req,res){
	Product.findById(req.params.product_id,function(err,product){
		if(err)
			res.send(err)

		product.name = req.body.name; 
		product.descricao =  req.body.descricao;
		product.price =  req.body.price;
		product.quantity =  req.body.quantity;

		product.save(function(err) {
			err ? res.send(err) : res.json({ message: 'Product updated!' });
		});

	})
})
.delete(function(req,res){
	Product.remove({
		_id: req.params.product_id
	},function(err,product){
		err ? res.send(err) : res.json({ message: 'Product deleted!' });
	})
})



// REGISTER OUR ROUTES -------------------------------

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
