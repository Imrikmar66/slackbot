class ResponseController {
    
    constructor(obj){
        this.obj = obj; 
    }

    /**
     * @description return response string for slack
     * @return {string}
     */
    answer(){
       return this[this.obj.callback_id]();
    }

    /**
     * @description search if response exist in received json-object
     * @param {string} searchedResponse 
     * @returns {string | Boolean}
     */
    searchForResponse(searchedResponse){
        var response = false;
        this.obj.actions.forEach( (action, key) => {
            if(action.name == searchedResponse){
                response = action.value;
                return;
            }
        });
        return response;
    }

    /**
     * @description main parts of controllers - associated actions methods
     * @return {string}
     */
    test_1(){
        
        var response = this.searchForResponse("choice");
        if(!response){
            return "Je pense qu'il y a eu un problème lors de votre réponse :neutral_face:";
        }
        else if(response == "do_something") {
            return "C'est parti :smiley:";
        }
        else {
            return "Bon ben tant pis :sweat_smile:";
        }
    }

}

module.exports = ResponseController;