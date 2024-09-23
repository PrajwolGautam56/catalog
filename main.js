const fs = require('fs');

function readInput(fileName) {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
}

function decodeY(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        let li = 1;
        let yi = points[i].y;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }

        c += li * yi;
    }

    return c;
}

function main(input) {
 
     

    const n = input.keys.n;  
    const k = input.keys.k;  

    const points = [];
    const keys = Object.keys(input).filter(key => !isNaN(key)); 

    keys.forEach((key) => {
        const x = parseInt(key);
        const base = parseInt(input[key].base); 
        const value = input[key].value; 
        const y = decodeY(base, value); 
        points.push({ x, y });
    });

    points.sort((a, b) => a.x - b.x);

    const constantTerm = lagrangeInterpolation(points, k);

    console.log("The constant term (c) is:", constantTerm);
}
const input1 = readInput('secondInput.json');
 
main(input1);
 

