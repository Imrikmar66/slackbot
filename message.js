class Message {

    constructor(text, attachments = []){

        this.text = text;
        this.attachments = attachments;
        this.token = "xoxb-220309870224-4e9azl0jBQPNoV92XifBaUNg";

    }

    addAttachement(attachment){
        this.attachments.push(attachment);
    }

    get(channel){
        return {
            text: this.text,
            attachments : JSON.stringify( (() => { //TEMP JSON STRINGIFY
                var arr = [];
                this.attachments.forEach(function(attachment, key) {
                    arr.push( attachment.get() );
                });
                return arr;
            })() ),
            token: this.token,
            channel: channel
        }
    }

    toJson(){
        return JSON.stringify( this.getMessage() );
    }

}
class Attachment {

     constructor(text, fallback, callback_id, color = "#000", attachment_type = "default") {

        this.text = text;
        this.fallback = fallback;
        this.callback_id = callback_id;
        this.color = color;
        this.attachment_type = attachment_type;
        this.actions = [];
        this.extra = false;

    }

    addAction(action){
        this.actions.push(action);
    }

    get(){
        return {
            text: this.text,
            fallback: this.fallback,
            callback_id: this.callback_id,
            color: this.color,
            attachment_type: this.attachment_type,
            actions: (() => {
                var arr = [];
                this.actions.forEach(function(action, key) {
                    arr.push( action.get() );
                });
                return arr;
            })()
        }
    }

}
class Action {

    constructor( type, name, text, value, confirm = {} ){
        this.name = name;
        this.text = text;
        this.type = type;
        this.value = value;
        this.confirm = confirm;
    }

    get(){
        return {
            name: this.name,
            text: this.text,
            type: this.type,
            value: this.value
        }
    }

}
class ActionButton extends Action {

    constructor(name, text, value, confirm = {}){
        super("button", name, text, value, confirm);
    }

}
class ActionSelector extends Action {

    constructor(name, text, confirm = {}){
        super("select", name, text, false, confirm);
        this.options = [];
    }

    addOption(text, value){
        let option = {
            text: text,
            value: value
        };
        this.options.push(option);
    }

    get(){
        let obj = super.get();
        delete obj.value;
        Object.assign(obj, { options: this.options } );
        return obj;
    }

}

module.exports = {
    Message: Message,
    Attachment: Attachment,
    Action: Action,
    ActionButton: ActionButton,
    ActionSelector: ActionSelector
};