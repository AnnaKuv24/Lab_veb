// --- Завдання 1: Залишок секунд ---
function seconds(total) {
    return total % 60;
}
console.log("Завдання 1 (100с):", seconds(100));

// --- Завдання 2: Периметр багатокутника ---
function perimeter(side, count) {
    return side * count;
}
console.log("Завдання 2 (сторона 5, кутів 6):", perimeter(5, 6));

// --- Завдання 3: FizzBuzz ---
function fizzBuzz(n) {
    console.log("Завдання 3 (FizzBuzz):");
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) console.log("fizzbuzz");
        else if (i % 3 === 0) console.log("fizz");
        else if (i % 5 === 0) console.log("buzz");
        else console.log(i);
    }
}
fizzBuzz(15);

// --- Завдання 4: Середнє арифметичне ---
function Calculate(a, b, c) {
    let avg = (a + b + c) / 3;
    console.log(`Завдання 4: Середнє чисел ${a}, ${b}, ${c} = ${avg}`);
}
Calculate(10, 20, 30);

// --- Завдання 5: isDivisible (три варіанти) ---

// 1. З допомогою конструкції if
function isDivisibleIf(n, x, y) {
    if (n % x === 0 && n % y === 0) {
        return true;
    } else {
        return false;
    }
}

// 2. З використанням тернарного оператору
function isDivisibleTernary(n, x, y) {
    return (n % x === 0 && n % y === 0) ? true : false;
}

// 3. Без використання конструкції if і тернарного оператора
function isDivisiblePure(n, x, y) {
    // Оператор && сам по собі повертає результат логічного виразу (true або false)
    return (n % x === 0 && n % y === 0);
}

// Перевірка в консолі
console.log("Завдання 5 (if):", isDivisibleIf(12, 3, 4));
console.log("Завдання 5 (тернарний):", isDivisibleTernary(12, 3, 5));
console.log("Завдання 5 (без if):", isDivisiblePure(10, 2, 5));


// --- Завдання 6: Одновимірний масив ---
let N = 5;
let arr = Array.from({length: N}, () => Math.floor(Math.random() * 20));
console.log("Завдання 6 (Масив):", arr);
console.log("Max:", Math.max(...arr), "Min:", Math.min(...arr));
console.log("Сума:", arr.reduce((a, b) => a + b, 0));
console.log("Непарні:", arr.filter(n => n % 2 !== 0));

// --- Завдання 7: Матриця 5х5 ---
console.log("Завдання 7 (Матриця 5x5):");
let matrix = [];
for (let i = 0; i < 5; i++) {
    matrix[i] = [];
    for (let j = 0; j < 5; j++) {
        matrix[i][j] = Math.floor(Math.random() * 10) - 5;
        if (i === j) {
            matrix[i][j] = matrix[i][j] < 0 ? 0 : 1; // Заміна на діагоналі
        }
    }
}
console.table(matrix);

// --- Завдання 8: Арифметичний калькулятор ---
// Функції для арифметичних операцій
function Add(a, b) {
    console.log(`Результат додавання: ${a + b}`);
}

function Sub(a, b) {
    console.log(`Результат віднімання: ${a - b}`); 
}

function Mul(a, b) {
    console.log(`Результат множення: ${a * b}`); 
}

function Div(a, b) {
    if (b === 0) {
        console.log("Помилка: Ділення на нуль неможливе!"); 
    } else {
        console.log(`Результат ділення: ${a / b}`); 
    }
}

// Взаємодія з користувачем
console.log("Завдання 8 (Арифметичний калькулятор):");
function runCalculator() {
    let x = parseFloat(prompt("Завдання 8: Введіть перше число:")); 
    let y = parseFloat(prompt("Завдання 8: Введіть друге число:"));
    let operation = prompt("Оберіть операцію (Add, Sub, Mul, Div):"); 

    switch (operation.toLowerCase()) {
        case 'add': Add(x, y); break;
        case 'sub': Sub(x, y); break;
        case 'mul': Mul(x, y); break;
        case 'div': Div(x, y); break;
        default: console.log("Невідома операція");
    }
}
 runCalculator();

// --- Завдання 9: Аналіз числа ---
function analyzeNumber(num) {
    console.log(`--- Завдання 9: Аналіз числа ${num} ---`); 

    // 1. Позитивне чи негативне
    if (num > 0) console.log("Число є позитивним."); 
    else if (num < 0) console.log("Число є негативним."); 
    else console.log("Число є нулем.");

    // 2. Чи є число простим (ділиться тільки на 1 і на себе)
    let isPrime = num > 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }
    console.log(`Чи є число простим: ${isPrime}`); 

    // 3. Подільність на 2, 5, 3, 6, 9 без залишку
    let divisors = [2, 5, 3, 6, 9];
    divisors.forEach(d => {
        if (num % d === 0) {
            console.log(`Число ділиться на ${d} без залишку.`); 
        }
    });
}

// Перевірка
analyzeNumber(15); 
analyzeNumber(7);

// --- Завдання 10: Перевернутий масив квадратів ---
function processArray(arr) {
    let reversedArray = arr.slice().reverse();
    let result = reversedArray.map(function(item) {
        // Перевіряємо, чи є елемент числом
        if (typeof item === 'number') {
            return item * item; // Або item ** 2
        } else {
            return item; 
        }
    });

    return result;
}

// Перевірка роботи коду
const testArray = [1, "привіт", 3, true, 4];
const processed = processArray(testArray);

console.log("Завдання 10 (Перевернутий масив квадратів):");
console.log("Оригінальний масив:", testArray);
console.log("Результат завдання 10:", processed); 
