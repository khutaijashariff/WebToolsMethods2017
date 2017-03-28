//Tested against this server
var bodyParser = require('body-parser');  
var express = require('express');
var app = express();

app.use(bodyParser.json());  
app.use(express.static('public'));

app.get('/names', function(req,res) {
		 res.send(JSON.stringify( {names: ['Joseph', 'Thelma'] } ) ); 
});
app.get('/names/:name', function(req,res) {
		 res.send(JSON.stringify( {gender: "F", count: 5, firstYear: 1993, recentYear: 2016}  ) ); 
});
app.get('/gender/:gender/names', function(req, res) {
	res.send(JSON.stringify({names: ['Thelma', 'Joseph'] }));
});
app.get('/gender/:gender/names/:name', function(req, res) {
		 res.send(JSON.stringify( {gender: "M", count: 1, firstYear: 1991, recentYear: 2016} ) ); 	
});

app.post('/names', function (req, res) {  
  var record = req.body;
  res.send(record);
  console.log(record);
});

app.listen(8000, () => {
	console.log("Express is now listening on port 8000");
});