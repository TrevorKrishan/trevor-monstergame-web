new Vue({
    el: '#app',
    data:{
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        specialAttackRemaining: true,
        turns: [],
    },
    methods:{
        startNewGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackRemaining = true;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage();
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit monster for ' + damage,
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage();
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hit you for ' + damage,
            });

            this.checkWin();
        },
        specialAttack: function () {
            let damage = this.calculateDamage();
            this.monsterHealth -= damage;

            let totalDamage = damage;

            damage = this.calculateDamage();
            this.monsterHealth -= damage;
            
            totalDamage += damage;

            if(totalDamage < 5){
                this.monsterHealth -= 5;
                totalDamage += 5;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'You hit monster for ' + totalDamage,
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage();
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hit you for ' + damage,
            });

            this.checkWin();
            this.specialAttackRemaining = false;
        },
        heal: function () {
            if(this.playerHealth < 95){
                this.playerHealth += 5;
            }else{
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'You healed by 5',
            });

            let damage = this.calculateDamage();
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hit you for ' + damage,
            });

            this.checkWin();
        },
        quit: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function() {
            return Math.floor(Math.random() * 10);
        },
        checkWin: function() {
            let message;
            if(this.monsterHealth <= 0){
                this.monsterHealth = 0;
                message = 'Damn! You Won. Start New Game?';
            }else if(this.playerHealth <= 0){
                this.playerHealth = 0;
                message = 'HaHa! You Lost. Start New Game?';
            }else{
                return false;
            }

            this.gameIsRunning = false;
            if(confirm(message)){
                this.startNewGame();
            }

            return true;
        },
    }
});