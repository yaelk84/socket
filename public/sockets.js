const io = require('./server').io;
const Players= require('./model/Player');
const LiveGames = require('./model/LiveGames');
var fs = require('fs');
var games= new LiveGames();
var players = new Players();

module.exports = io;

io.on('connection', (socket) => {

    console.log('connect');
    // create the player
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socket.on('getAllGame', (cb) => {
             fs.readFile('./stubs/quizes', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            cb(obj)
        });



    })
    //When host connects for the first time
    socket.on('host-join', (id) =>{
        fs.readFile('./stubs/quizes', 'utf8', function (err,data) {
            const result = JSON.parse(data);

            const gameData = result.Games.filter(x=> x.id === id);

                //A kahoot was found with the id passed in url
                if(gameData[0] !== undefined){
                    var gamePin = Math.floor(Math.random()*90000) + 10000; //new pin for game

                    games.addGame(gamePin,  false, {playersAnswered: 0, questionLive: false, gameid: id, question: 1,gameQ:gameData[0].gameData}); //Creates a game with pin and host id

                    var game = games.getGame(gamePin); //Gets the game data

                    socket.join(game.pin);//The host is joining a room based on the pin

                    //Sending game pin to host so they can display it for players to join
                    socket.emit('showGamePin', {
                        pin: game.pin
                    });
                }else{
                    socket.emit('noGameFound');
                }

            });


    });
    //When the host connects from the game view
    socket.on('host-join-game', (data) => {
        var pin = data.pin;
        var game = games.getGame(pin);//Gets game with old host id
        var playerData = players.getPlayers(game.pin);//Gets player in game
        if(game){

            var question = game.gameData.gameQ.Questions[0].question;
            var answers =  game.gameData.gameQ.Questions[0].answers;
            var correctAnswer =  game.gameData.gameQ.Questions[0].correctAnswer;

                    socket.emit('gameQuestions', {
                        q1: question,
                       a:answers,
                        correct: correctAnswer,
                        playersInGame: playerData.length
                    });

            io.to(game.pin).emit('gameStartedPlayer');
            game.gameData.questionLive = true;
        }else{
            socket.emit('noGameFound');//No game was found, redirect user
        }
    });
;    socket.on('timeUp', function(data){
        var game = games.getGame(data.pin);
        game.gameData.questionLive = false;
        var playerData = players.getPlayers(data.pin);
        var gameQuestion = game.gameData.question;
         var correctAnswer = game.gameData.gameQ.Questions[gameQuestion-1].correct;
         io.to(game.pin).emit('questionOver', playerData, correctAnswer);
         var playersInGame = players.getPlayers(data.pin)
        socket.emit('updatePlayerLobby',{player:playersInGame})

            })
    socket.on('nextQuestion', function(data){
        var playerData = players.getPlayers(data.pin);
        //Reset players current answer to 0
        for(var i = 0; i < Object.keys(players.players).length; i++){
            if(players.players[i].pin == data.pin){
                players.players[i].gameData.answer = 0;
            }
        }

        var game = games.getGame(data.pin);
        game.gameData.playersAnswered = 0;
        game.gameData.questionLive = true;
        game.gameData.question += 1;

                if (game.gameData.gameQ.Questions.length >= game.gameData.question){
                    var questionNum = game.gameData.question;
                    questionNum = questionNum - 1;
                    var question = game.gameData.gameQ.Questions[questionNum].question;
                    var answers =  game.gameData.gameQ.Questions[questionNum].answers;
                    var correctAnswer =  game.gameData.gameQ.Questions[questionNum].correctAnswer;

                    socket.emit('gameQuestions', {
                        q1: question,
                        a:answers,
                        correct: correctAnswer,
                        playersInGame: playerData.length
                    });

                    io.to(game.pin).emit('nextQuestionPlayer');

                }else{
                    var playersInGame = players.getPlayers(game.pin);
            playersInGame.forEach(element =>{
                      element.sortBy = element.gameData.score;
                  });
                  var   newPlayers = playersInGame.sort((a, b) => a.sortBy > b.sortBy ? -1 : a.sortBy > b.sortBy ? 1 : 0)
                    io.to(game.pin).emit('GameOver', {newPlayers:newPlayers });
                }




    });

    //Sets data in player class to answer from player
    socket.on('playerAnswer', function(num){

        var player = players.getPlayer(socket.id);
        console.log(player);
        var pin = player.pin;
        var playerNum = players.getPlayers(pin);
        var game = games.getGame(pin);
        console.log("game",game)
        if(game.gameData.questionLive == true){//if the question is still live
            console.log("is alive")
            player.gameData.answer = num;
            game.gameData.playersAnswered += 1;

            var gameQuestion = game.gameData.question;
            var gameid = game.gameData.gameid;


console.log("GAME",game.gameData.gameQ.Questions,gameQuestion)

                    var correctAnswer = game.gameData.gameQ.Questions[gameQuestion - 1].correctAnswer;
                    //Checks player answer with correct answer
console.log("next", gameQuestion,game.gameData.gameQ.Questions)
                    if(num == correctAnswer){
                        player.gameData.score += 100;
                        socket.emit('answerResult', true);
                        var playersInGame = players.getPlayers(pin)
                      /*  io.to(game.pin).emit('updatePlayerLobby',playersInGame)*/
                    }

                    //Checks if all players answered
                    if(game.gameData.playersAnswered == playerNum.length){

                        game.gameData.questionLive = false; //Question has been ended bc players all answered under time
                        var playerData = players.getPlayers(game.pin);
                          io.to(game.pin).emit('questionOver', {playerData:playerData, correctAnswer:correctAnswer});//Tell everyone that question is over
                    }else{
                        console.log("not all players answered")
                        //update host screen of num players answered
                        io.to(game.pin).emit('updatePlayersAnswered', {
                            playersInGame: playerNum.length,
                            playersAnswered: game.gameData.playersAnswered
                        });


                    }






        }
    });

    //When player connects for the first time
    socket.on('player-join', (params) => {
        var gameFound = false; //If a game is found with pin provided by player
        //For each game in the Games class
        for(var i = 0; i < games.games.length; i++){
            //If the pin is equal to one of the game's pin
            if(params.pin == games.games[i].pin){
                players.addPlayer( params.name, params.pin, socket.id, {score: 0, answer: 0}); //add player to game
                socket.join(params.pin); //Player is joining room based on pin
                var playersInGame = players.getPlayers(params.pin); //Getting all players in game
                io.to(params.pin).emit('updatePlayerLobby', playersInGame);//Sending host player data to display
                gameFound = true; //Game has been found
            }
        }

        //If the game has not been found
        if(gameFound == false){
            socket.emit('noGameFound'); //Player is sent back to 'join' page because game was not found with pin
        }


    })


});
