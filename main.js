const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function flattenMatrix(matrix) {
    let flattenedString = '';
    let x = 0, y = 0; // Starting position (i.e., '>' character)

    let direction = 'right'; // Initial traversal direction
    let currentChar = matrix[x][y];
    flattenedString += currentChar;

    while (currentChar !== 's') {
        // Note: a turn is specified to be a letter or a '+', doesn't specify whether it must be a capital letter
        if (/[A-Za-z+]/.test(currentChar)) {
            if (direction === 'up' || direction === 'down') {
                if (matrix[x][y + 1] !== undefined && matrix[x][y + 1] === '-') direction = 'right';
                else if (matrix[x][y - 1] !== undefined && matrix[x][y - 1] === '-') direction = 'left';
            } else if (direction === 'left' || direction === 'right') {
                if (matrix[x + 1] !== undefined && matrix[x + 1][y] === '|') direction = 'down';
                else if (matrix[x - 1] !== undefined && matrix[x - 1][y] === '|') direction = 'up';
            }
        }

        if (direction === 'right') {
            y++;
        } else if (direction === 'left') {
            y--;
        } else if (direction === 'up') {
            x--;
        } else if (direction === 'down') {
            x++;
        }

        currentChar = matrix[x][y];
        flattenedString += currentChar;
    }

    return flattenedString;
}

function extractLetters(string) {
    const caps = string.match(/[A-Z]/g) || [];
    return caps.join(''); // Return a string of all the capital letters
}

const inputMatrix = [];

console.log('Enter the matrix, then press Ctrl + D to close input: ');

rl.on('line', line => {
    inputMatrix.push(line.split(''));
});

rl.on('close', () => {
    console.log('Path: ');
    const flattenedString = flattenMatrix(inputMatrix);
    console.log(flattenedString);
    console.log('Letters: ');
    console.log(extractLetters(flattenedString));
});


