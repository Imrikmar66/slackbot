var Files = require('fs');

class MusicManager {

    constructor(){
        if(!MusicManager.instance){ 
            this.read();
            MusicManager.instance = this;
        }
        else
            this.musics = MusicManager.instance.musics;
    }

    read(){
        this.musics = JSON.parse(Files.readFileSync('musics.json', 'utf8'));
    }

    register(){
        let retur = true;
         Files.writeFile('musics.json', JSON.stringify(this.musics), function(err) {
            retur = false;
        });

        return retur;
    }

    addType(type){
        if(!this.musics[type]){
            this.musics[type] = [];
            return true;
        }
        else
            return false;
    }

    addMusic(type, music){
        if(this.musics[type]){
            this.musics[type].push(music);
            return true;
        }
        else
            return false;
    }

}
MusicManager.instance = false;

module.exports = MusicManager;