var MusicManager = require('./MusicManager')

class ResponseController {
    
    constructor(obj){
        this.actions = obj.actions;
        this.token = obj.token;
        this.user_id = obj.user.id;

        this.generateCallback_id(obj.callback_id);
    }

    generateCallback_id(callback_id){
        this.extras = callback_id.split("|"); 
        this.callback_id = this.extras[0];
        this.extras.shift();
    }

    /**
     * @description return response string for slack
     * @return {string}
     */
    answer(){
       return this[this.callback_id]();
    }

    /**
     * @description search if response exist in received json-object -> Action button
     * @param {string} searchedResponse 
     * @returns {string | Boolean}
     */
    searchForButtonResponse(searchedResponse){
        var response = false;
        this.actions.forEach( (action) => {
            if(action.name == searchedResponse){
                response = action.value;
                return;
            }
        });
        return response;
    }

    /**
     * @description search if response exist in received json-object -> Action selector
     * @param {string} searchedResponse 
     * @returns {string | Boolean}
     */
    searchForSelectorResponse(searchedResponse){
        var responses = false;
        this.actions.forEach( (action) => {
            if(action.name == searchedResponse){
                if(action.selected_options.length) {
                    responses = [];
                    action.selected_options.forEach((selected) => {
                        responses.push(selected.value);
                    });
                    return;
                }
            }
        });
        return responses;
    }

    listen_music(){
        
        var choice = this.searchForSelectorResponse("music");
        if(!choice){
            return "Je pense qu'il y a eu un problème lors de votre réponse :neutral_face:";
        }
        else {
            const musics = new MusicManager().musics;
            const type = musics[choice[0]];

            if(type.length) {
                const index = Math.floor(Math.random() * type.length );
                return "C'est parti pour du " + choice[0] + " :sunglasses: <" + type[index] + ">";
            }
            else {
                return "I don't find this kind of music :thinking_face:";
            }
        }
    }

    music(){

        var response = this.searchForSelectorResponse("music_type")[0];

        if(!response){
            return "Je pense qu'il y a eu un problème lors de votre réponse :neutral_face:";
        }
        else {
            var link = false;
            if(link = this.extras[0]){

                let musicM = new MusicManager();
                musicM.addMusic(response, link);
                
                if(musicM.register())
                    return "La musique a été ajoutée ! :punch:";
                else 
                    return "Probleme pendant l'ajout ... :confused:";
            }
            else {
                return "Je ne trouve plus le lien à ajouter :confused: ...";
            }
        }

    }

}
ResponseController.savedElements = [];

module.exports = ResponseController;