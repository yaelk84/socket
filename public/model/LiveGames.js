class LiveGames {
    constructor () {
        this.games = [];
    }
    addGame(pin, gameLive, gameData){
        var game = {pin, gameLive, gameData};
        this.games.push(game);
        return game;
    }
    removeGame(hostId){
        var game = this.getGame(hostId);
        
        if(game){
            this.games = this.games.filter((game) => game.hostId !== hostId);
        }
        return game;
    }
    getGame(pin){
        return this.games.filter((game) => game.pin === pin)[0]
    }
}

module.exports = LiveGames;
