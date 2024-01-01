class Player {
    constructor(name) {
        this.name = name;
        this.winner = false;
        this.games = 0;
        this.rounds = 0;
        this.points = '0';
    }

    addPoint(player2) {
        console.log(`${this.name} wins the point!`);

        if (this.points === '0') {
            this.points = '15';
        } else if (this.points === '15') {
            this.points = '30';
        } else if (this.points === '30') {
            this.points = '40';
        } else if (this.points === '40') {
            if (player2.points === '40') {
                this.points = 'Adv';
            } else if (player2.points === 'Adv') {
                this.points = '40';
                player2.points = '40';
            } else {
                this.addRound(player2);
            }
        } else if (this.points === 'Adv') {
            this.addRound(player2);
        }
    }

    addRound(player2) {
        console.log(`${this.name} wins the round!`);
        this.points = '0';
        player2.points = '0';
        this.rounds++;

        const difference = Math.abs(this.rounds - player2.rounds);
        if ((this.rounds >= 4 && difference >= 2) || (this.rounds === 7)) {
            this.addGame(player2);
        }
    }

    addGame(player2) {
        console.log(`${this.name} wins the game!`);
        this.rounds = 0;
        player2.rounds = 0;
        this.games++;

        if (this.games === 2) {
            this.addWinner(player2);
        }
    }

    addWinner(player2) {
        console.log(`${this.name} wins the match!`);
        this.games = 0;
        player2.games = 0;
        this.winner = true;
    }
};

const createMatch = (player1Name, player2Name) => {
    const player1 = new Player(player1Name);
    const player2 = new Player(player2Name);
    console.log(`The match between ${player1.name} and ${player2.name} starts now!`);
    
    const pointWonBy = (playerNumber) => {
        if (playerNumber === 1) {
            player1.addPoint(player2);
        } else if (playerNumber === 2) {
            player2.addPoint(player1);
        }
    };

    const getScore = () => {
        if (!player1.winner && !player2.winner) {
            console.log(`Player | Games | Rounds | Points\n${player1.name}   |   ${player1.games}   |   ${player1.rounds}    |   ${player1.points}\n${player2.name}   |   ${player2.games}   |   ${player2.rounds}    |   ${player2.points}`);
        } else if (player1.winner) {
            console.log(`${player1.name} is the winner of this match!`);
        }
    };

    const getRoundsScore = () => {
        console.log(`${player1.name} | ${player1.rounds} | ${player1.points}\n${player2.name} | ${player2.rounds} | ${player2.points}`);
    };

    const getCurrentRoundScore = () => {
        console.log(`${player1.name} | ${player1.points}\n${player2.name} | ${player2.points}`);
    };


    return { pointWonBy, getScore, getRoundsScore, getCurrentRoundScore };
};


console.clear();

const match1 = createMatch('José', 'Luis');

match1.pointWonBy(1);
match1.pointWonBy(1);
match1.pointWonBy(2);
match1.pointWonBy(2);
match1.pointWonBy(1);
match1.pointWonBy(2);
match1.pointWonBy(1);
match1.pointWonBy(2);
match1.pointWonBy(2);
match1.pointWonBy(1);
match1.pointWonBy(2);
match1.pointWonBy(2);
match1.getScore();
