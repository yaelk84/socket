
class Player {
    constructor() {
        this.players = [];


    }

    addPlayer(name,pin, socketId,gameData) {
        var player = {socketId, name,pin, gameData};
        console.log(player)
        this.players.push(player);

    }

    removePlayer(playerId) {
        var player = this.getPlayer(playerId);

        if (player) {
            this.players = this.players.filter((player) => player.playerId !== playerId);
        }
        return player;
    }

    getPlayer(playerId) {
        return this.players.filter((player) => player.socketId === playerId)[0]
    }

    getPlayers(pin) {
        return this.players.filter((player) => player.pin === pin);
    }


}

module.exports =  Player;
