class CommandController {

    constructor(obj, parser = " "){
        this.token = obj.token;
        this.team_id = obj.team_id;
        this.domain = obj.domain;
        this.enterprise_id = obj.enterprise_id;
        this.enterprise_name = obj.enterprise_name;
        this.channel = obj.channel;
        this.user_id = obj.user_id;
        this.user_name = obj.user_name;
        this.command = obj.command;
        this.text = obj.text;
        this.response_url = obj.response_url;

        this.responses = this.text.split(parser);
    }

    check(array){
        
        var checked = true;

        array.forEach((element) => {
            var flag = false;
            this.responses.forEach((response) => {

                if(element == response){
                    flag = true;
                }

            });

            if(flag == false){
                checked = false;
                return;
            }

        });

        return checked;

    }

}

module.exports = CommandController;