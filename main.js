const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._locationY = 0;
        this._locationX = 0;
        this._field[0][0] = pathCharacter;
    }

    runGame() {
        while (true) {
            console.log(myField.print());

            const direction = prompt('Which way?');
            
            if (!this.movePosition(direction)) {
                break;
            }

            const initialSymbol = this._field[this._locationY][this._locationX];

            if (this.isHat(initialSymbol)) {
                console.log("YOU WIN!!!!\nHere's your imaginary cup!\n");
                break;
            }

            if (this.isHole(initialSymbol)) {
                console.log("You lost.\nYou fell into the hole.");
                break;
            }

            this._field[this._locationY][this._locationX] = pathCharacter;
        }        
    }

    print() {
        const joinedLine = this._field.map(line => {
            return line.join("");
        });
        return joinedLine.join("\n");
    }

    movePosition (direction) {
        let outsideTheField = false;

        switch (direction) {
            case "s":
                outsideTheField = ++this._locationY > this._field.length-1;
                break;
            case "d":
                outsideTheField = ++this._locationX > this._field[this._locationY].length-1;
                break;
            case "a":
                outsideTheField = --this._locationX < 0;
                break;
            case "w":
                outsideTheField = --this._locationY < 0;
                break;
            default:
                console.log("Not a valid move. Use letters a,w,s,d to move around.");
                return false;
        }

        if (outsideTheField) {
            console.log("You can only move inside the field.");
            return false;
        }

        return true;
    }

    isHat(symbol) {
        return symbol === hat;
    }

    isHole(symbol) {
        return symbol === hole;
    }

    static generateHatLocation = (height, width) => {
        const y = Math.floor(Math.random() * height);
        const x = Math.floor(Math.random() * width);

        if (y === 0 && x === 0) {
            return this.generateHatLocation();
        }

        return [y, x];
    };

    static generateField(height, width, percentOfHoles) {
        const YXOfHat = this.generateHatLocation(height, width);
        const YOfHat = YXOfHat[0];
        const XOfHat = YXOfHat[1];

        let result = [];
        for (let i = 0 ; i < height; i++) {
            result[i] = [];
            for (let j = 0; j < width; j++) {
                if (i === YOfHat && j === XOfHat) {
                    result[i][j] = hat;
                } else {
                    result[i][j] = Math.random()*100 < percentOfHoles ? hole : fieldCharacter;
                }
            }
        }
        return result;
    }
    
}

//Uncomment to generate a new field to the console
//console.log(Field.generateField(10,10, 20));

const myField = new Field([
    ["░", "░", "░", "O", "O", "░", "░", "░", "O", "░"],
    ["░", "░", "░", "░", "O", "░", "░", "O", "O", "░"],
    ["░", "░", "O", "░", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "░", "░", "O", "░"],
    ["O", "O", "░", "O", "O", "O", "░", "O", "░", "░"],
    ["░", "░", "░", "░", "░", "O", "░", "O", "░", "░"],
    ["░", "O", "░", "░", "░", "O", "^", "O", "░", "░"],
    ["░", "░", "░", "░", "O", "░", "░", "░", "░", "O"],
    ["O", "░", "O", "O", "░", "░", "░", "░", "░", "░"],
    ["░", "░", "░", "░", "░", "░", "O", "░", "O", "░"],
]);

myField.runGame();