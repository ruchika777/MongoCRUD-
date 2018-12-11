var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var path = require('path');
var Router = express.Router();
//var bodyParser = express.bodyParser();
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

// const port = 3000;

app.listen(3000);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
 
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.methodOverride());
//app.use(app.router);


app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/EmployeeDB', {useNewUrlParser: true}, function(err, db){
	if(err){
	console.log(err);
	}
	else
	console.log("Connected...");
});

var mySchema = new mongoose.Schema({
     id : String,
     name : String,
     age : Number
});

var user = mongoose.model('Employee', mySchema);

// var user1 = new user({
//      id: 1,
//      name: 'text',
//      age: 25

// });

// app.get('/', (req, res)=>{
// 	res.send("Hey!");
// });

// app.post('/addEmp', (req, res)=>{

// 	console.log(req.body);
// 	var emp = new user({
// 		id : req.body.id,
// 		name : req.body.name,
// 		age : req.body.age
// 	});

// 	console.log(req.body);


// 	emp.save(function(req, res){
// 	if(err){
// 		res.send(err);
// 	}
// 	else{
// 		res.send("Successfully Inserted...");
// 	}
// });

// });

// app.get('/employees', function(req, res)=>{

// })


user1.save(function(err, result){
	console.log("Create Document..");
	if(err){
		console.log(err);
	}
	else{
		console.log("Successfully Inserted...");
		user.find({}).exec(function(err,doc){
				if(err){
					console.log(err);

				}
				else{
					console.log("In find");
					console.log(doc);


					user.findOneAndUpdate({id:1},{$set:{age:26}},{new:true}).exec(function(err,result){
						if(err){
							console.log(err);

						}
						else{
								console.log("In update query");
								console.log(err);
								console.log(result)						
						}

						user.findOneAndRemove({id:2}).exec(function(err,result){
							if(err){
								console.log(err);
							}
							else{
								console.log("In Delete query");
								console.log(err);
								console.log(result);
							}


						})

					})

				}
		})
	}

});
