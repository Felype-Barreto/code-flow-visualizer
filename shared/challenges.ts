export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  category: string;
  problem: string;
  testCases: Array<{
    input: any;
    output: any;
    description: string;
  }>;
  hints: string[];
  solution: string;
  baseXP: number;
  timeLimit?: number; // em segundos
  prerequisites?: string[]; // IDs de challenges que devem ser feitos antes
}

export const CHALLENGES: Challenge[] = [
  // BEGINNER - Variables & Types
  {
    id: 'var-01',
    title: 'Variable Declaration',
    description: 'Declare a variable and assign a value',
    difficulty: 'beginner',
    category: 'Variables',
    problem: `Crie uma variável chamada "name" e atribua o valor "Code Flow" a ela. Retorne a variável.`,
    testCases: [
      {
        input: undefined,
        output: 'Code Flow',
        description: 'Declare and return name variable',
      },
    ],
    hints: [
      'Use const ou let para declarar variáveis',
      'A variável deve ser atribuída antes de retornar',
    ],
    solution: `const name = "Code Flow"; return name;`,
    baseXP: 10,
  },

  {
    id: 'var-02',
    title: 'Number Operations',
    description: 'Perform basic arithmetic operations',
    difficulty: 'beginner',
    category: 'Variables',
    problem: `Crie uma função que recebe dois números (a, b) e retorna a soma deles.`,
    testCases: [
      { input: [5, 3], output: 8, description: '5 + 3 = 8' },
      { input: [10, 20], output: 30, description: '10 + 20 = 30' },
      { input: [0, 0], output: 0, description: '0 + 0 = 0' },
    ],
    hints: [
      'Use o operador + para somar',
      'A função deve retornar o resultado',
    ],
    solution: `function sum(a, b) { return a + b; }`,
    baseXP: 15,
  },

  {
    id: 'var-03',
    title: 'String Concatenation',
    description: 'Combine strings together',
    difficulty: 'beginner',
    category: 'Variables',
    problem: `Crie uma função que recebe dois nomes (firstName, lastName) e retorna o nome completo combinado com um espaço.`,
    testCases: [
      {
        input: ['John', 'Doe'],
        output: 'John Doe',
        description: 'Combine John e Doe',
      },
      {
        input: ['Jane', 'Smith'],
        output: 'Jane Smith',
        description: 'Combine Jane e Smith',
      },
    ],
    hints: [
      'Use + para concatenar strings',
      'Adicione um espaço entre os nomes',
    ],
    solution: `function fullName(firstName, lastName) { return firstName + " " + lastName; }`,
    baseXP: 15,
  },

  // BEGINNER - Conditionals
  {
    id: 'cond-01',
    title: 'Simple If Statement',
    description: 'Check if a number is positive',
    difficulty: 'beginner',
    category: 'Conditionals',
    problem: `Crie uma função que retorna "positivo" se o número for maior que 0, caso contrário retorna "não positivo".`,
    testCases: [
      { input: [5], output: 'positivo', description: '5 é positivo' },
      { input: [0], output: 'não positivo', description: '0 não é positivo' },
      { input: [-3], output: 'não positivo', description: '-3 não é positivo' },
    ],
    hints: [
      'Use if para checar se n > 0',
      'Use else para o caso contrário',
    ],
    solution: `function checkPositive(n) { return n > 0 ? "positivo" : "não positivo"; }`,
    baseXP: 20,
  },

  {
    id: 'cond-02',
    title: 'Even or Odd',
    description: 'Determine if a number is even or odd',
    difficulty: 'beginner',
    category: 'Conditionals',
    problem: `Crie uma função que retorna "par" se o número é par, ou "ímpar" se for ímpar.`,
    testCases: [
      { input: [4], output: 'par', description: '4 é par' },
      { input: [7], output: 'ímpar', description: '7 é ímpar' },
      { input: [0], output: 'par', description: '0 é par' },
    ],
    hints: [
      'Use o operador % (módulo) para checar o resto',
      'Se n % 2 === 0, o número é par',
    ],
    solution: `function evenOrOdd(n) { return n % 2 === 0 ? "par" : "ímpar"; }`,
    baseXP: 20,
  },

  // BEGINNER - Loops
  {
    id: 'loop-01',
    title: 'Count to N',
    description: 'Use a loop to count',
    difficulty: 'beginner',
    category: 'Loops',
    problem: `Crie uma função que retorna um array com números de 1 até n (inclusive).`,
    testCases: [
      { input: [3], output: [1, 2, 3], description: 'Count to 3' },
      { input: [5], output: [1, 2, 3, 4, 5], description: 'Count to 5' },
    ],
    hints: [
      'Use um loop for',
      'Use .push() para adicionar números ao array',
    ],
    solution: `function countToN(n) { const arr = []; for(let i = 1; i <= n; i++) arr.push(i); return arr; }`,
    baseXP: 25,
  },

  {
    id: 'loop-02',
    title: 'Sum Array Elements',
    description: 'Calculate the sum of array elements',
    difficulty: 'beginner',
    category: 'Loops',
    problem: `Crie uma função que retorna a soma de todos os elementos em um array.`,
    testCases: [
      { input: [[1, 2, 3]], output: 6, description: 'Sum of [1, 2, 3]' },
      { input: [[5, 10, 15]], output: 30, description: 'Sum of [5, 10, 15]' },
      { input: [[0]], output: 0, description: 'Sum of [0]' },
    ],
    hints: [
      'Comece com sum = 0',
      'Use um loop para adicionar cada elemento',
    ],
    solution: `function sumArray(arr) { let sum = 0; for(let i = 0; i < arr.length; i++) sum += arr[i]; return sum; }`,
    baseXP: 25,
  },

  // INTERMEDIATE - Arrays
  {
    id: 'arr-01',
    title: 'Find Maximum',
    description: 'Find the largest number in an array',
    difficulty: 'intermediate',
    category: 'Arrays',
    problem: `Crie uma função que retorna o maior número em um array.`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], output: 9, description: 'Max of [1, 5, 3, 9, 2]' },
      { input: [[10]], output: 10, description: 'Max of [10]' },
      { input: [[-5, -1, -10]], output: -1, description: 'Max of [-5, -1, -10]' },
    ],
    hints: [
      'Comece com max = arr[0]',
      'Compare cada elemento com o max',
    ],
    solution: `function findMax(arr) { let max = arr[0]; for(let i = 1; i < arr.length; i++) if(arr[i] > max) max = arr[i]; return max; }`,
    baseXP: 35,
  },

  {
    id: 'arr-02',
    title: 'Filter Even Numbers',
    description: 'Create an array with only even numbers',
    difficulty: 'intermediate',
    category: 'Arrays',
    problem: `Crie uma função que retorna um array contendo apenas os números pares.`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6]], output: [2, 4, 6], description: 'Filter [1, 2, 3, 4, 5, 6]' },
      { input: [[1, 3, 5]], output: [], description: 'No even numbers' },
    ],
    hints: [
      'Use filter() ou crie um novo array',
      'Verifique se cada número é par (n % 2 === 0)',
    ],
    solution: `function filterEven(arr) { return arr.filter(n => n % 2 === 0); }`,
    baseXP: 40,
  },

  {
    id: 'arr-03',
    title: 'Map to Squares',
    description: 'Create array with squared numbers',
    difficulty: 'intermediate',
    category: 'Arrays',
    problem: `Crie uma função que retorna um array com cada número elevado ao quadrado.`,
    testCases: [
      { input: [[1, 2, 3]], output: [1, 4, 9], description: 'Square [1, 2, 3]' },
      { input: [[2, 4]], output: [4, 16], description: 'Square [2, 4]' },
    ],
    hints: [
      'Use .map() ou um loop for',
      'Multiplique cada número por si mesmo',
    ],
    solution: `function mapToSquares(arr) { return arr.map(n => n * n); }`,
    baseXP: 40,
  },

  // INTERMEDIATE - Objects
  {
    id: 'obj-01',
    title: 'Create User Object',
    description: 'Create an object with user properties',
    difficulty: 'intermediate',
    category: 'Objects',
    problem: `Crie uma função que recebe nome, idade e email e retorna um objeto com essas propriedades.`,
    testCases: [
      {
        input: ['John', 30, 'john@email.com'],
        output: { name: 'John', age: 30, email: 'john@email.com' },
        description: 'Create user object',
      },
    ],
    hints: [
      'Use const ou let para criar o objeto',
      'Use chaves {} para definir as propriedades',
    ],
    solution: `function createUser(name, age, email) { return { name, age, email }; }`,
    baseXP: 45,
  },

  {
    id: 'obj-02',
    title: 'Object Property Access',
    description: 'Access and modify object properties',
    difficulty: 'intermediate',
    category: 'Objects',
    problem: `Crie uma função que recebe um objeto e retorna a propriedade "status" do objeto.`,
    testCases: [
      { input: [{ status: 'active', id: 1 }], output: 'active', description: 'Get status' },
    ],
    hints: [
      'Use objeto.propriedade ou objeto["propriedade"]',
    ],
    solution: `function getStatus(obj) { return obj.status; }`,
    baseXP: 35,
  },

  // INTERMEDIATE - Strings
  {
    id: 'str-01',
    title: 'Reverse String',
    description: 'Reverse a string',
    difficulty: 'intermediate',
    category: 'Strings',
    problem: `Crie uma função que retorna a string invertida.`,
    testCases: [
      { input: ['hello'], output: 'olleh', description: 'Reverse hello' },
      { input: ['abc'], output: 'cba', description: 'Reverse abc' },
    ],
    hints: [
      'Use .split("") para converter em array',
      'Use .reverse() para inverter',
      'Use .join("") para converter de volta',
    ],
    solution: `function reverseString(str) { return str.split("").reverse().join(""); }`,
    baseXP: 40,
  },

  {
    id: 'str-02',
    title: 'Count Characters',
    description: 'Count specific character occurrences',
    difficulty: 'intermediate',
    category: 'Strings',
    problem: `Crie uma função que conta quantas vezes um caractere aparece em uma string.`,
    testCases: [
      { input: ['hello', 'l'], output: 2, description: 'Count l in hello' },
      { input: ['mississippi', 's'], output: 4, description: 'Count s in mississippi' },
    ],
    hints: [
      'Use um loop ou .split()',
      'Compare cada caractere com o alvo',
    ],
    solution: `function countChar(str, char) { let count = 0; for(let c of str) if(c === char) count++; return count; }`,
    baseXP: 40,
  },

  // ADVANCED - Functions
  {
    id: 'func-01',
    title: 'Higher Order Function',
    description: 'Create a function that returns a function',
    difficulty: 'advanced',
    category: 'Functions',
    problem: `Crie uma função que retorna uma função que adiciona um número n.`,
    testCases: [
      { input: [5], output: 8, description: 'addN(5)(3) = 8' },
      { input: [10], output: 15, description: 'addN(10)(5) = 15' },
    ],
    hints: [
      'A função deve retornar outra função',
      'Use closures para acessar a variável n',
    ],
    solution: `function addN(n) { return function(x) { return x + n; }; }`,
    baseXP: 55,
  },

  {
    id: 'func-02',
    title: 'Compose Functions',
    description: 'Combine multiple functions',
    difficulty: 'advanced',
    category: 'Functions',
    problem: `Crie uma função que compõe duas funções f e g, retornando uma função que faz f(g(x)).`,
    testCases: [
      {
        input: [
          (x: number) => x * 2,
          (x: number) => x + 3,
          5,
        ],
        output: 16,
        description: '(5 + 3) * 2 = 16',
      },
    ],
    hints: [
      'Crie uma função que recebe duas funções',
      'Retorne uma função que aplica g primeiro, depois f',
    ],
    solution: `function compose(f, g) { return function(x) { return f(g(x)); }; }`,
    baseXP: 60,
  },

  // ADVANCED - Recursion
  {
    id: 'rec-01',
    title: 'Factorial',
    description: 'Calculate factorial recursively',
    difficulty: 'advanced',
    category: 'Recursion',
    problem: `Crie uma função que calcula o fatorial de n recursivamente.`,
    testCases: [
      { input: [5], output: 120, description: '5! = 120' },
      { input: [3], output: 6, description: '3! = 6' },
      { input: [0], output: 1, description: '0! = 1' },
    ],
    hints: [
      'Caso base: se n === 0 ou n === 1, retorne 1',
      'Caso recursivo: retorne n * factorial(n - 1)',
    ],
    solution: `function factorial(n) { if(n <= 1) return 1; return n * factorial(n - 1); }`,
    baseXP: 60,
  },

  {
    id: 'rec-02',
    title: 'Fibonacci',
    description: 'Generate fibonacci sequence',
    difficulty: 'advanced',
    category: 'Recursion',
    problem: `Crie uma função que retorna o n-ésimo número de fibonacci.`,
    testCases: [
      { input: [6], output: 8, description: 'fib(6) = 8' },
      { input: [7], output: 13, description: 'fib(7) = 13' },
    ],
    hints: [
      'Caso base: fib(0) = 0, fib(1) = 1',
      'Caso recursivo: fib(n) = fib(n-1) + fib(n-2)',
    ],
    solution: `function fibonacci(n) { if(n <= 1) return n; return fibonacci(n-1) + fibonacci(n-2); }`,
    baseXP: 65,
  },

  // ADVANCED - Algorithms
  {
    id: 'alg-01',
    title: 'Binary Search',
    description: 'Implement binary search algorithm',
    difficulty: 'advanced',
    category: 'Algorithms',
    problem: `Crie uma função que realiza uma busca binária em um array ordenado e retorna o índice do alvo ou -1.`,
    testCases: [
      { input: [[1, 3, 5, 7, 9], 5], output: 2, description: 'Find 5 at index 2' },
      { input: [[1, 3, 5, 7, 9], 1], output: 0, description: 'Find 1 at index 0' },
      { input: [[1, 3, 5, 7, 9], 10], output: -1, description: 'Not found returns -1' },
    ],
    hints: [
      'Mantenha left e right pointers',
      'Calcule mid e compare com o alvo',
      'Ajuste os pointers baseado na comparação',
    ],
    solution: `function binarySearch(arr, target) { let left = 0, right = arr.length - 1; while(left <= right) { const mid = Math.floor((left + right) / 2); if(arr[mid] === target) return mid; if(arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }`,
    baseXP: 70,
  },

  // ADVANCED - Complex Data Structures
  {
    id: 'ds-01',
    title: 'Flatten Nested Array',
    description: 'Flatten a deeply nested array',
    difficulty: 'advanced',
    category: 'Data Structures',
    problem: `Crie uma função que achata um array aninhado em uma única dimensão.`,
    testCases: [
      { input: [[1, [2, [3, 4]], 5]], output: [1, 2, 3, 4, 5], description: 'Flatten nested' },
    ],
    hints: [
      'Use recursão ou um loop com pilha',
      'Verifique se cada elemento é um array',
    ],
    solution: `function flatten(arr) { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []); }`,
    baseXP: 65,
  },

  // EXPERT - Challenging
  {
    id: 'exp-01',
    title: 'Longest Substring Without Repeat',
    description: 'Find longest substring without repeating characters',
    difficulty: 'expert',
    category: 'Strings',
    problem: `Crie uma função que retorna o comprimento da substring mais longa sem caracteres repetidos.`,
    testCases: [
      { input: ['abcabcbb'], output: 3, description: 'abc or bca or cab' },
      { input: ['bbbbb'], output: 1, description: 'b' },
      { input: ['pwwkew'], output: 3, description: 'wke' },
    ],
    hints: [
      'Use uma janela deslizante (sliding window)',
      'Mantenha um Set dos caracteres na janela atual',
      'Expanda e contraia a janela conforme necessário',
    ],
    solution: `function lengthOfLongestSubstring(s) { let max = 0, start = 0, charSet = new Set(); for(let i = 0; i < s.length; i++) { while(charSet.has(s[i])) charSet.delete(s[start++]); charSet.add(s[i]); max = Math.max(max, i - start + 1); } return max; }`,
    baseXP: 80,
  },

  {
    id: 'exp-02',
    title: 'Merge Sorted Arrays',
    description: 'Merge two sorted arrays efficiently',
    difficulty: 'expert',
    category: 'Algorithms',
    problem: `Crie uma função que mescla dois arrays ordenados em um único array ordenado.`,
    testCases: [
      { input: [[1, 3, 5], [2, 4, 6]], output: [1, 2, 3, 4, 5, 6], description: 'Merge sorted arrays' },
    ],
    hints: [
      'Use dois pointers, um para cada array',
      'Compare e adicione o menor elemento',
    ],
    solution: `function mergeSorted(arr1, arr2) { let result = []; let i = 0, j = 0; while(i < arr1.length && j < arr2.length) { result.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]); } return result.concat(arr1.slice(i)).concat(arr2.slice(j)); }`,
    baseXP: 85,
  },

  {
    id: 'exp-03',
    title: 'Valid Parentheses',
    description: 'Check if parentheses are balanced',
    difficulty: 'expert',
    category: 'Data Structures',
    problem: `Crie uma função que verifica se os parênteses, colchetes e chaves são balanceados.`,
    testCases: [
      { input: ['()[]{}'], output: true, description: 'Valid' },
      { input: ['([{}])'], output: true, description: 'Valid nested' },
      { input: ['({)}'], output: false, description: 'Invalid order' },
      { input: ['(]'], output: false, description: 'Mismatched' },
    ],
    hints: [
      'Use uma pilha (stack)',
      'Adicione abertura, remova quando fechar',
      'Verifique se a pilha está vazia ao final',
    ],
    solution: `function isValid(s) { const stack = []; const pairs = {'(': ')', '[': ']', '{': '}'}; for(let c of s) { if(pairs[c]) stack.push(c); else { if(stack.pop() !== Object.keys(pairs).find(k => pairs[k] === c)) return false; } } return stack.length === 0; }`,
    baseXP: 90,
  },

  // MAIS CHALLENGES INTERMEDIÁRIOS E AVANÇADOS
  {
    id: 'arr-04',
    title: 'Remove Duplicates',
    description: 'Remove duplicate elements from array',
    difficulty: 'intermediate',
    category: 'Arrays',
    problem: `Crie uma função que remove elementos duplicados de um array.`,
    testCases: [
      { input: [[1, 2, 2, 3, 3, 3]], output: [1, 2, 3], description: 'Remove duplicates' },
    ],
    hints: [
      'Use Set para rastrear únicos',
      'Retorne um array novo',
    ],
    solution: `function removeDuplicates(arr) { return [...new Set(arr)]; }`,
    baseXP: 40,
  },

  {
    id: 'str-03',
    title: 'Palindrome Check',
    description: 'Check if string is a palindrome',
    difficulty: 'intermediate',
    category: 'Strings',
    problem: `Crie uma função que verifica se uma string é um palíndromo.`,
    testCases: [
      { input: ['racecar'], output: true, description: 'Is palindrome' },
      { input: ['hello'], output: false, description: 'Not palindrome' },
    ],
    hints: [
      'Compare a string com sua versão invertida',
    ],
    solution: `function isPalindrome(str) { const reversed = str.split("").reverse().join(""); return str === reversed; }`,
    baseXP: 40,
  },

  {
    id: 'obj-03',
    title: 'Object to Entries',
    description: 'Convert object to key-value pairs',
    difficulty: 'intermediate',
    category: 'Objects',
    problem: `Crie uma função que converte um objeto em um array de pares [chave, valor].`,
    testCases: [
      {
        input: [{ a: 1, b: 2 }],
        output: [['a', 1], ['b', 2]],
        description: 'Convert to entries',
      },
    ],
    hints: [
      'Use Object.entries()',
    ],
    solution: `function objectToEntries(obj) { return Object.entries(obj); }`,
    baseXP: 35,
  },

  {
    id: 'arr-05',
    title: 'Rotate Array',
    description: 'Rotate array elements',
    difficulty: 'intermediate',
    category: 'Arrays',
    problem: `Crie uma função que rotaciona um array k posições para a direita.`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], output: [4, 5, 1, 2, 3], description: 'Rotate 2 positions' },
    ],
    hints: [
      'Use slice() para dividir o array',
      'Concatene as partes na ordem correta',
    ],
    solution: `function rotateArray(arr, k) { k = k % arr.length; return arr.slice(-k).concat(arr.slice(0, -k)); }`,
    baseXP: 45,
  },

  {
    id: 'func-03',
    title: 'Memoization',
    description: 'Implement function memoization',
    difficulty: 'advanced',
    category: 'Functions',
    problem: `Crie uma função que retorna uma versão memorizada de uma função (cache de resultados).`,
    testCases: [
      {
        input: [(x: number) => x * x, 5],
        output: 25,
        description: 'Memoized function call',
      },
    ],
    hints: [
      'Use um objeto para armazenar resultados',
      'Retorne o valor em cache se existir',
    ],
    solution: `function memoize(fn) { const cache = {}; return function(arg) { if(arg in cache) return cache[arg]; const result = fn(arg); cache[arg] = result; return result; }; }`,
    baseXP: 70,
  },

  {
    id: 'rec-03',
    title: 'Sum Tree Nodes',
    description: 'Sum all values in a tree structure',
    difficulty: 'advanced',
    category: 'Recursion',
    problem: `Crie uma função que soma todos os valores em uma estrutura de árvore aninhada.`,
    testCases: [
      {
        input: [{ value: 1, children: [{ value: 2 }, { value: 3 }] }],
        output: 6,
        description: '1 + 2 + 3 = 6',
      },
    ],
    hints: [
      'Use recursão para processar cada nó',
      'Processe os filhos recursivamente',
    ],
    solution: `function sumTree(node) { let sum = node.value; if(node.children) { for(let child of node.children) sum += sumTree(child); } return sum; }`,
    baseXP: 65,
  },

  {
    id: 'alg-02',
    title: 'Bubble Sort',
    description: 'Implement bubble sort algorithm',
    difficulty: 'advanced',
    category: 'Algorithms',
    problem: `Crie uma função que ordena um array usando bubble sort.`,
    testCases: [
      { input: [[5, 2, 8, 1, 9]], output: [1, 2, 5, 8, 9], description: 'Sorted array' },
    ],
    hints: [
      'Use loops aninhados',
      'Compare elementos adjacentes',
      'Troque se estiverem fora de ordem',
    ],
    solution: `function bubbleSort(arr) { const n = arr.length; for(let i = 0; i < n; i++) { for(let j = 0; j < n - i - 1; j++) { if(arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } return arr; }`,
    baseXP: 60,
  },

  {
    id: 'ds-02',
    title: 'Implement Stack',
    description: 'Create a stack data structure',
    difficulty: 'advanced',
    category: 'Data Structures',
    problem: `Crie uma classe Stack com métodos push, pop, e peek.`,
    testCases: [
      {
        input: undefined,
        output: undefined,
        description: 'Stack operations',
      },
    ],
    hints: [
      'Use um array interno para armazenar dados',
      'push() adiciona ao topo',
      'pop() remove do topo',
    ],
    solution: `class Stack { constructor() { this.items = []; } push(x) { this.items.push(x); } pop() { return this.items.pop(); } peek() { return this.items[this.items.length - 1]; } }`,
    baseXP: 60,
  },

  {
    id: 'exp-04',
    title: 'Implement Queue',
    description: 'Create a queue data structure',
    difficulty: 'expert',
    category: 'Data Structures',
    problem: `Crie uma classe Queue com métodos enqueue, dequeue, e peek (FIFO).`,
    testCases: [
      {
        input: undefined,
        output: undefined,
        description: 'Queue operations',
      },
    ],
    hints: [
      'Use um array interno',
      'enqueue() adiciona no final',
      'dequeue() remove do início',
    ],
    solution: `class Queue { constructor() { this.items = []; } enqueue(x) { this.items.push(x); } dequeue() { return this.items.shift(); } peek() { return this.items[0]; } }`,
    baseXP: 65,
  },

  {
    id: 'exp-05',
    title: 'Deep Clone Object',
    description: 'Create a deep copy of an object',
    difficulty: 'expert',
    category: 'Objects',
    problem: `Crie uma função que faz uma cópia profunda de um objeto (incluindo objetos aninhados).`,
    testCases: [
      {
        input: [{ a: 1, b: { c: 2 } }],
        output: { a: 1, b: { c: 2 } },
        description: 'Deep clone object',
      },
    ],
    hints: [
      'Use JSON.parse e JSON.stringify ou recursão',
      'Copie as propriedades recursivamente',
    ],
    solution: `function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }`,
    baseXP: 75,
  },

  {
    id: 'cond-03',
    title: 'Grade Evaluator',
    description: 'Evaluate student grade',
    difficulty: 'beginner',
    category: 'Conditionals',
    problem: `Crie uma função que retorna a nota (A, B, C, D, F) baseada na pontuação (0-100).`,
    testCases: [
      { input: [90], output: 'A', description: '90+ = A' },
      { input: [80], output: 'B', description: '80-89 = B' },
      { input: [70], output: 'C', description: '70-79 = C' },
    ],
    hints: [
      'Use if/else ou switch',
      '90+ = A, 80-89 = B, etc',
    ],
    solution: `function getGrade(score) { if(score >= 90) return 'A'; if(score >= 80) return 'B'; if(score >= 70) return 'C'; if(score >= 60) return 'D'; return 'F'; }`,
    baseXP: 25,
  },
];

// Calcula XP baseado na dificuldade
export function getBaseXP(difficulty: ChallengeDifficulty): number {
  const xpMap = {
    beginner: 20,
    intermediate: 45,
    advanced: 65,
    expert: 85,
  };
  return xpMap[difficulty];
}

// Calcula XP reduzido quando usa dica
export function getXPWithHint(baseXP: number, hintCount: number): number {
  return Math.max(Math.floor(baseXP * 0.7) - hintCount * 5, 5);
}

// Calcula XP muito reduzido quando vê solução
export function getXPWithSolution(baseXP: number): number {
  return Math.max(Math.floor(baseXP * 0.2), 2);
}

// Bonus XP para daily challenge
export function getDailyBonusXP(baseXP: number): number {
  return Math.floor(baseXP * 1.5);
}
