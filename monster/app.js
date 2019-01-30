new Vue({
    el: '#app',
    data: {
      gameInProgress: false,
      playerHealth: 75,
      monsterHealth: 30,
      eventLog: [],
    },
    methods:{
        startGame: function () {
            // setup buttons
            // starting strength
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameInProgress = true;
            this.eventLog = [];
        },
        playerHealthChange: function(points){
            this.playerHealth = (this.playerHealth + points > 100 ? 100 : this.playerHealth + points);
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
                alert("You Lose!")
                this.gameInProgress = false;
            }
        },
        monsterHealthChange: function(points){
            this.monsterHealth = (this.monsterHealth + points > 100 ? 100 : this.monsterHealth + points);
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
                alert("You Win with " + this.playerHealth + " health points!");
                this.gameInProgress = false;
            }
        },
        
        onAttack: function () {
            var monsterPain = Math.round(Math.random() * 10);
            this.monsterHealthChange(-monsterPain);
            this.eventLog.push({log: 'Player hits Monster for ' + monsterPain,
                                turnStyle: 'player-turn'});
            var playerPain = Math.round(Math.random() * 10);
            this.playerHealthChange(-playerPain);
            this.eventLog.push({log: 'Monster hits Player for ' + playerPain,
                                turnStyle: 'monster-turn'});

        },
        onSpecialAttack: function () {  
            var monsterPain = Math.round(Math.random() * 10) + 10;
            this.eventLog.push({log: 'Player hits Monster for ' + monsterPain,
                                turnStyle: 'player-turn'});
            this.monsterHealthChange(-monsterPain);
            var playerPain = Math.round(Math.random() * 10) + 10;
            this.eventLog.push({log: 'Monster hits Player for ' + playerPain,
                                turnStyle: 'monster-turn'});
            this.playerHealthChange(-playerPain);
        },
        onHeal: function() {
            var playerHeal = 10;
            this.playerHealthChange(playerHeal);
            this.eventLog.push({log: 'Player heals himself for ' + playerHeal,
                                turnStyle: 'player-turn'});
            var playerPain = Math.round(Math.random() * 10);
            this.playerHealthChange(-playerPain);
            this.eventLog.push({log: 'Monster hits Player for ' + playerPain,
                                turnStyle: 'monster-turn'});
        },
        onGiveUp: function() {
            this.gameInProgress = false;
        }


    }
});
  