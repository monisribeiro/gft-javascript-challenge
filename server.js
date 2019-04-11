const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
const path = require('path');

const mentees = require('./data/Mentees.json');
const employees = require('./data/Employees.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/mentees', (req, res) => {
	res.send(mentees);
});

app.get('/api/employees', (req, res) => {
	res.send(employees);	
});

const menteesFeedbacks = {};

for(let i = 0; i < 20; i++) {
	const response = [];
	for(let j = 0; j < 5; j++){
		const feedback = {
			id: i,
			employeeId: Math.floor(Math.random() * 10) + 1,
			date: new Date(), 
			feedback: "Kharkov unrecallable barneveldt catapult strainlessly propel transactional tartuffery bendable nondistracting anoesis antipatriotically teredines flensing. Lithuania imparadised inglenook extractive rerose kennewick gree downrightly lapwing nicely acquired branchiae lecher whammo. Stylising fuelled exile haemoptysis presentimental compressive caramelised overaccelerated philolaus nongerminal pallbearer overdramatically destructiveness lyre."
		};
		response.push(feedback);
	}
	menteesFeedbacks[i] = response;
}
	
app.get('/api/mentees-feedbacks/:id', (req, res) => {
	res.send(menteesFeedbacks[req.params.id]);		
});

const myFeedbacks = [];

for(let i = 0; i < 10; i++) {
	const feedback = {
		id: i,
		employeeId: Math.floor(Math.random() * 10) + 1,
		date: new Date(), 
		feedback: "Kharkov unrecallable barneveldt catapult strainlessly propel transactional tartuffery bendable nondistracting anoesis antipatriotically teredines flensing. Lithuania imparadised inglenook extractive rerose kennewick gree downrightly lapwing nicely acquired branchiae lecher whammo. Stylising fuelled exile haemoptysis presentimental compressive caramelised overaccelerated philolaus nongerminal pallbearer overdramatically destructiveness lyre."
	};
	myFeedbacks.push(feedback);
}

app.get('/api/my-feedbacks', (req, res) => {
	res.send(myFeedbacks);		
	
});

app.post('/api/send-feedback', (req, res) => {
	menteesFeedbacks[+req.body.employee].unshift({
		id: menteesFeedbacks[req.body.employee].length+1,
		employeeId: 1,
		date: new Date(), 
		feedback: req.body.feedback
	});
	res.send(true);
});

app.listen(port, () => console.log(`Listening on port ${port}`));