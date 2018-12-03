var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000);

mongoose.connect('mongodb://localhost/EmployeeDB', {useNewUrlParser : true}, function(err, db){
	if(err){
		console.log(err);
	}

	else console.log("Connected...");
});

var mySchema = new mongoose.Schema({
     id : String,
     name : String,
     age : Number
});

var user = mongoose.model('Employee', mySchema);
app.get('/', (req, res)=>{
	res.send("Hey!");
});

app.post('/addEmp', (req, res)=>{

	//console.log(req.body);
	var emp = new user({
		id : req.body.id,
		name : req.body.name,
		age : req.body.age
	});

	console.log(req.body);


	emp.save(function(err, db){
	if(err){
		res.send(err);
	}
	else{
		res.send("Successfully Inserted...");
	}
});

});

app.get('/allEmps', (req, res)=>{
	user.find().then(emps => {
		res.send(emps);
	});
});

app.put('/updateEmp/:empId', (req, res)=>{
	user.findOneAndUpdate({id:req.params.empId}, {$set:{
		name : req.body.name,
		age : req.body.age
	}}, {new : true}).then(emp1 => {
		if(!emp1){
			return res.status(404).send({
                message: "Employee not found with id " + req.params.empId
            });

		}

		else res.send(emp1);
		console.log(req.body);
	});
});


// app.delete('/deleteEmp/:empId', (req, res)=>{
// 	user.remove({id:req.params.empId}).then(emp1 =>{
// 		if(!emp1){
// 			return res.status(404).send({
// 				message: "Employee not found with id " + req.params.empId
// 			});
// 		}

// 		else res.send("Deleted...");
// 	});
// });