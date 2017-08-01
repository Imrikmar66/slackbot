var request = require("./request");
var MessageLib = require("./message");

class QuestionController {

    constructor(question, hook = QuestionController.WEBHOOKS.apptest ){
        this.question = question; 
        
        this.host = 'https://hooks.slack.com/services/';
        this.path = hook;
    }

    /**
     * @description return json-formatted question for slack
     * @returns {string}
     */
    ask(){
       return this[this.question]();
    }

    /**
     * @description send json-formatted question to slack API
     * @returns {Promise}
     */
    send() {
        var promise = request.post(this.host, this.path, this.ask());
        return promise;
    }

    /**
     * @description main parts of controllers - associated actions methods
     * @returns {Object}
     */
    test_1(){
         
        var action_1 = new MessageLib.ActionButton("choice", "Do something", "do_something");
        var action_2 = new MessageLib.ActionButton("choice", "Do nothing", "do_nothing");
        var action_3 = new MessageLib.ActionButton("choice", "Suicide Shamp", "suicide_shamp");

        var attachment = new MessageLib.Attachment("Choisissez", "Problème lors du choix", "test_1");
        attachment.addAction(action_1);
        attachment.addAction(action_2);
        attachment.addAction(action_3);

        var message = new MessageLib.Message("Que voulais vous faire ?");
        message.addAttachement(attachment);

        return message.get();
    }

}

QuestionController.WEBHOOKS = {
    general : 'T6CV9UT5H/B6E02PUNR/Y3Dl71hessdcNL1rpKZaaXTN',
    apptest: 'T6CV9UT5H/B6EC97CAY/jK4GUQcjRE8wcLtAvZWBXfKJ'
};

module.exports = QuestionController;
