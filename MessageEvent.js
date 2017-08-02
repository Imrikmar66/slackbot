class MessageEvent {

    constructor(obj){

        this.botMention = "<@U6G93RL6L>";

        this.token = obj.token;
        this.team_id = obj.team_id;
        this.api_app_id = obj.api_app_id;
        this.event = obj.event;
        this.type = obj.type;
        this.authed_users = obj.authed_users;
        this.event_id = obj.event_id;
        this.event_time = obj.event_time;
    }

    isMentionned(){
        var mention = this.event.text.toLowerCase().search(this.botMention.toLowerCase());
        if(mention > -1){
            return true;
        }
        else {
            return false;
        }
    }

    contains(strings){

        var checked = true;
        strings.forEach((string) => {

            if(this.event.text.toLowerCase().search(string.toLowerCase()) < 0)
                checked = false;

        });

        return checked;

    }

}

module.exports = MessageEvent;