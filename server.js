var express = require('express');
var bodyParser = require('body-parser');
var request = require('./request.js');
var CommandController = require("./CommandController");
var QuestionController = require("./QuestionController");
var ResponseController = require("./ResponseController");
var MessageEvent = require("./MessageEvent");
var MusicManager = require("./MusicManager");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({  extended: false }));

// respond with "hello world" when a GET request is made to the homepage
app
    .post('/the_receiver', function(req, res){
        
        var payload = req.body.payload;
        var obj = JSON.parse(payload);

        var ctrl = new ResponseController(obj);

        res.send( ctrl.answer() );
        
    })
    .post('/eventReceiver', function(req, res){

        var payload = req.body;
        
        var MsgEvent = new MessageEvent(payload);

        if(MsgEvent.event.message || MsgEvent.event.bot_id || MsgEvent.deleted_ts ){
            res.send('');
            return;
        }

        if(MsgEvent.isMentionned() || MsgEvent.contains(['exia']) || MsgEvent.contains(['exiabot']) || MsgEvent.event.channel == "D6GCMH3LH" ) {

            var ctrl = null;

            if( MsgEvent.contains(['add', 'music', 'type']) || MsgEvent.contains(['ajouter', 'musique', 'type']) || MsgEvent.contains(['ajoute', 'musique', 'type']) )
                var ctrl = new QuestionController("add_type", MsgEvent.event);

            else if( MsgEvent.contains(['add', 'music']) || MsgEvent.contains(['ajouter', 'musique']) || MsgEvent.contains(['ajoute', 'musique']) )
                var ctrl = new QuestionController("add_music", MsgEvent.event);

            else if( MsgEvent.contains(['music']) || MsgEvent.contains(['musique']) )
                var ctrl = new QuestionController("listen", MsgEvent.event);
            
            if(ctrl instanceof QuestionController){
                ctrl.send()
                    .then( (data) => {
                        res.send(data);
                    } )
                    .catch( (error) => {
                        res.send(error);
                    } );
            }
            else {
                res.send('');
            }
        }
        else
            res.send('');

    });
    
var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
