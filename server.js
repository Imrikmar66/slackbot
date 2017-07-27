var express = require('express');
var bodyParser = require('body-parser')
var QuestionController = require("./QuestionController");
var ResponseController = require("./ResponseController");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// respond with "hello world" when a GET request is made to the homepage
app
    .get('/', function(req, res) {
        res.send('hello world');
    })
    .get('/the_requester', function(req, res) { //Trigger a request to slack from anywhere
        
        var ctrl = new QuestionController("test_1");
        var promise = ctrl.send();
        promise
            .then((data) => {
                res.send(data);
            })
            .catch( (msg) => {
                console.log(msg);
                res.send( "Error :" + msg );
            });
        
    })
    .post('/exia_requester', function(req, res) { //triggered by slack
        
        var ctrl = new QuestionController("test_1");
        var question = ctrl.ask();
        res.send( question );
        
    })
    .post('/the_receiver', function(req, res){ //triggered by slack
        
        var payload = req.body.payload;
        var obj = JSON.parse(payload);

        var ctrl = new ResponseController(obj);

        res.send( ctrl.answer() );
        
    });
    
var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});