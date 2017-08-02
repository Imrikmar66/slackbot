var request = require("./request");
var MessageLib = require("./Message");
var ResponseController = require("./ResponseController");
var MusicManager = require("./MusicManager");

class QuestionController {

    constructor(question, event ){
        this.question = question; 
        
        this.host = 'https://hooks.slack.com/services/';
        this.event = event;
        this.channel = event.channel;
        
    }

    /**
     * @description requesting server with question-formatted
     * @returns {Promise}
     */
    send(){  
        const promise = request.postFormEncoded("https://slack.com/api", "/chat.postMessage", this.ask());
        return promise;
    }

    /**
     * @description return json-formatted question for slack
     * @returns {string}
     */
    ask(){
       return this[this.question]();
    }

    add_type(){

        let index = this.event.text.toLowerCase().search('#');
        if(index < 0){
            var message = new MessageLib.Message("Il manque le type à ajouter avec hash '#' :thinking_face:");
            return message.get(this.channel);
        }

        var type = this.event.text.substr(index, this.event.text.length);
        type = type.split(" ")[0];

        let musicM = new MusicManager();
        musicM.addType(type);

        var answer = "";
        if(musicM.register())
            answer = "Type de musique ajouté " + type + " :sunglasses:";
        else
            answer = "Probleme pendant l'ajout ... :confused:";

        return new MessageLib.Message(answer).get(this.channel);
    }

    add_music(){

        let index = this.event.text.toLowerCase().search("http");
        if(index < 0){
            var message = new MessageLib.Message("Il manque un lien pour que j'ajoute une musique :thinking_face:");
            return message.get(this.channel);
        }

        var link = this.event.text.substr(index, this.event.text.length);
        link = link.split(">")[0];

        var attachment = new MessageLib.Attachment("Choisissez", "Problème lors du choix", "music|"+link);

        let musics = new MusicManager().musics;

        let action = new MessageLib.ActionSelector("music_type", "Type");
        Object.keys(musics).forEach((element) => {
            
            let uper = element.charAt(0).toUpperCase() + element.slice(1);
            action.addOption(uper, element);

        });

        attachment.addAction(action);
        
        var message = new MessageLib.Message("Quel type de musique ?");
        message.addAttachement(attachment);

        return message.get(this.channel);
    
    }

    listen(){

        var action = new MessageLib.ActionSelector("music", "I need some music");
        
        let musics = new MusicManager().musics;
        Object.keys(musics).forEach((element) => {
            let uper = element.charAt(0).toUpperCase() + element.slice(1);
            action.addOption(uper, element);
        });

        var attachment = new MessageLib.Attachment("Choisissez", "Problème lors du choix", "listen_music");
        attachment.addAction(action);

        var message = new MessageLib.Message("On écoute quoi ? :smiley:");
        message.addAttachement(attachment);

        return message.get(this.channel);
    }

}

module.exports = QuestionController;