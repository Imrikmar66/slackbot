class Message {

    constructor(text, attachments = []){

        this.text = text;
        this.attachments = attachments;

    }

    addAttachement(attachment){
        this.attachments.push(attachment);
    }

    get(){
        return {
            text: this.text,
            attachments : (() => {
                var arr = [];
                this.attachments.forEach(function(attachment, key) {
                    arr.push( attachment.get() );
                });
                return arr;
            })()
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
        super("button", name, text, value, confirm)
    }

}

module.exports = {
    Message: Message,
    Attachment: Attachment,
    Action: Action,
    ActionButton: ActionButton
};