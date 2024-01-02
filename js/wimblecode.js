class Player {
    constructor(name) {
        this.name = name;
        this.winner = false;
        this.games = 0;
        this.rounds = 0;
        this.points = '0';
        this.score = [];
    }

    addPoint(player2, verbose=false) {
        if (verbose) console.log(`${this.name} wins the point!`);

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
                this.addRound(player2, verbose);
            }
        } else if (this.points === 'Adv') {
            this.addRound(player2, verbose);
        }
    }

    addRound(player2, verbose=false) {
        if (verbose) console.log(`${this.name} wins the round!`);
        this.points = '0';
        player2.points = '0';
        this.rounds++;

        const difference = Math.abs(this.rounds - player2.rounds);
        if ((this.rounds >= 4 && difference >= 2) || (this.rounds === 7)) {
            this.addGame(player2, verbose);
        }
    }

    addGame(player2, verbose=false) {
        if (verbose) console.log(`${this.name} wins the game!`);
        this.score.push(this.rounds);
        player2.score.push(player2.rounds);

        this.rounds = 0;
        player2.rounds = 0;
        this.games++;

        if (this.games === 2) {
            this.addWinner(player2);
        }
    }

    addWinner(player2, verbose=false) {
        if (verbose) console.log(`${this.name} wins the match!`);
        this.games = 0;
        player2.games = 0;
        this.winner = true;
    }
};

class Match {
    constructor(player1, player2) {
        if (typeof player1 === 'string' || typeof player2 === 'string') {
            player1 = new Player(player1);
            player2 = new Player(player2);
        }
        this.player1 = player1;
        this.player2 = player2;
        this.player1.winner = false;
        this.player2.winner = false;
        this.player1.score = [];
        this.player2.score = [];
    }

    pointWonBy(playerNumber, verbose=false) {
        if (playerNumber === 1) {
            this.player1.addPoint(this.player2, verbose);
        } else if (playerNumber === 2) {
            this.player2.addPoint(this.player1, verbose);
        }
    }

    getScore() {
        if (!this.player1.winner && !this.player2.winner) {
            console.log(`${'Player'.padEnd(17)} | Games | Rounds | Points\n${this.player1.name.padEnd(17)} |   ${this.player1.games}   |   ${this.player1.rounds}    |   ${this.player1.points}\n${this.player2.name.padEnd(17)} |   ${this.player2.games}   |   ${this.player2.rounds}    |   ${this.player2.points}`);
        } else {
            this.getFinalScore();
            console.log(`%c${this.player1.winner ? this.player1.name.toUpperCase() : this.player2.name.toUpperCase()}%c is the winner of this match!`, 'font-weight: bold;', 'font-weight: initial;');
        }
    }

    getFinalScore() {
        let finalScore = `Final score:\n${this.player1.name} `;
        for (let i=0; i<this.player1.score.length; i++) {
            finalScore += (i===0 ? `${this.player1.score[i]}-${this.player2.score[i]}` : `, ${this.player1.score[i]}-${this.player2.score[i]}`);
        }
        finalScore += ` ${this.player2.name}`;
        console.log(finalScore);
    }
}

const createTournament = (...newPlayersNames) => {
    console.log('The tournament is about to start!');
    const NUMBER_OF_PLAYERS = 4;
    const players = newPlayersNames.length === NUMBER_OF_PLAYERS ? newPlayersNames.map(name => new Player(name)) : [];
    const matches = [];

    if (players.length === 0) {
        throw new Error(`In order to create a tournament there has to be exactly ${NUMBER_OF_PLAYERS} players.`);
    }

    const createMatches = () => {
        console.log('Running the draw to set the starting matches for the tournament...');
        const randomIndexes = [];
        while (randomIndexes.length < NUMBER_OF_PLAYERS) {
            const randomIndex = Math.floor(Math.random() * NUMBER_OF_PLAYERS);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        for (let i=0; i<(NUMBER_OF_PLAYERS/2) ; i++) {
            const newMatch = new Match(players[randomIndexes.at(i)], players[randomIndexes.at(-1-i)]);
            matches.push(newMatch);
        }
        console.log('The draw left the following matches: ', matches.reduce((accum, match) => accum += `\n-${match.player1.name} vs. ${match.player2.name}`, ''));
    };

    const start = (verbose=false) => {
        const winners = [];
        if (matches.length === 0) {
            throw new Error(`Can't start the tournament without running the draw to set the starting matches.`);
        }

        for (let i=0; i<matches.length ; i++) {
            const winner = simulateMatch(matches[i], verbose);
            winners.push(winner);
        }

        console.log('---------------------------------------------------------------------');
        console.log(`Congratulations to the winners of the first round!\n%c${winners.map(winner => winner.name).join(' and ')} %cwill play in the final.`, 'font-weight: bold;', 'font-weight: initial;');
        console.log('---------------------------------------------------------------------');
        
        const finalMatch = new Match(winners[0], winners[1]);
        const champion = simulateMatch(finalMatch, verbose);
        console.log('---------------------------------------------------------------------');
        console.log(`Congratulations to %c${champion.name.toUpperCase()}%c, the CHAMPION of this tournament!`, 'font-weight: bold;', 'font-weight: initial;');
        console.log('---------------------------------------------------------------------');
    };

    const simulateMatch = (match, verbose=false) => {
        const player1 = match.player1;
        const player2 = match.player2;
        console.log('---------------------------------------------------------------------');
        console.log(`The match between %c${player1.name.toUpperCase()} and ${player2.name.toUpperCase()}%c starts now!`, 'font-weight: bold;', 'font-weight: initial;');

        while (!player1.winner && !player2.winner) {
            const randomPlayerNumber = Math.floor(Math.random() * 2) + 1;
            match.pointWonBy(randomPlayerNumber, verbose);
            if (verbose) match.getScore();
        }
        if (!verbose) match.getScore();

        return player1.winner ? player1 : player2;
    };

    return { players, createMatches, start };
};

console.clear();

try {
    const tournament = createTournament('Alberto Casero', 'David Jiménez', 'Javier de Miguel', 'Eduardo Aguilar');
    tournament.createMatches();
    tournament.start(true);
} catch(e) {
    console.error(e);
}
