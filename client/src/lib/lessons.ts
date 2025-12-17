import { Lesson } from "./types";

// ... (Previous lessons: functions, objects, classes, recursion, loops-arrays)

// I will read the file first to make sure I don't overwrite existing lessons, or I can just append/replace the export.
// Since I have the full content in my context from previous turns (I wrote it), I can recreate the file with the new lesson added.

// ==========================================
// 1. Functions Lesson
// ==========================================
const functionLesson: Lesson = {
  id: "functions",
  title: "How do Functions Work?",
  description: "Understand the concept of 'Scope' and 'Call Stack'. See how variables are created and destroyed.",
  difficulty: "Beginner",
  variants: {
    javascript: {
      code: `function somar(a, b) {
  const resultado = a + b;
  return resultado;
}

function main() {
  const x = 5;
  const y = 3;
  const total = somar(x, y);
  console.log(total);
}

main();`,
      steps: [
        {
          stepId: 0,
          line: 11,
          stack: [],
          heap: [],
          explanation: "The program starts. The interpreter reads function definitions, but nothing is executed until we call someone."
        },
        {
          stepId: 1,
          line: 11,
          stack: [{ id: "main", name: "main()", variables: [], active: true }],
          heap: [],
          explanation: "The function 'main()' is called. A new 'Stack Frame' is created for it."
        },
        {
          stepId: 2,
          line: 7,
          stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive", changed: true }], active: true }],
          heap: [],
          explanation: "Variable 'x' is declared and initialized with value 5 within 'main' scope."
        },
        {
          stepId: 3,
          line: 8,
          stack: [{ 
            id: "main", 
            name: "main()", 
            variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive", changed: true }], 
            active: true 
          }],
          heap: [],
          explanation: "Variable 'y' is declared and initialized with value 3."
        },
        {
          stepId: 4,
          line: 9,
          stack: [
            { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: undefined, type: "primitive" }], active: false },
            { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive", changed: true }, { name: "b", value: 3, type: "primitive", changed: true }], active: true }
          ],
          heap: [],
          explanation: "Function 'somar' is called. A NEW frame is pushed to the stack. Values are copied."
        },
        {
          stepId: 5,
          line: 2,
          stack: [
            { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: undefined, type: "primitive" }], active: false },
            { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive", changed: true }], active: true }
          ],
          heap: [],
          explanation: "The calculation is done and stored in the local variable 'resultado'."
        },
        {
          stepId: 6,
          line: 3,
          stack: [
            { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: undefined, type: "primitive" }], active: false },
            { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive" }], active: true, isClosing: true }
          ],
          heap: [],
          explanation: "The function returns 8. The 'somar' frame will be removed."
        },
        {
          stepId: 7,
          line: 9,
          stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive", changed: true }], active: true }],
          heap: [],
          explanation: "We return to 'main'. The returned value (8) is assigned to 'total'."
        },
        {
          stepId: 8,
          line: 10,
          stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive" }], active: true }],
          heap: [],
          explanation: "The value is displayed. Execution ends."
        }
      ]
    },
    csharp: {
      code: `using System;

class Program {
    static int Somar(int a, int b) {
        int resultado = a + b;
        return resultado;
    }

    static void Main() {
        int x = 5;
        int y = 3;
        int total = Somar(x, y);
        Console.WriteLine(total);
    }
}`,
      steps: [
        {
          stepId: 0,
          line: 9,
          stack: [],
          heap: [],
          explanation: "In C#, execution starts with the static method 'Main'. The CLR loads the program."
        },
        {
          stepId: 1,
          line: 9,
          stack: [{ id: "Main", name: "Main()", variables: [], active: true }],
          heap: [],
          explanation: "The 'Main' method is allocated on the Stack."
        },
        {
          stepId: 2,
          line: 10,
          stack: [{ id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive", changed: true }], active: true }],
          heap: [],
          explanation: "Integer variable 'x' is allocated on the Stack (Value Type)."
        },
        {
          stepId: 3,
          line: 11,
          stack: [{ id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive", changed: true }], active: true }],
          heap: [],
          explanation: "Variable 'y' is allocated."
        },
        {
          stepId: 4,
          line: 12,
          stack: [
             { id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "Somar", name: "Somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive", changed: true }, { name: "b", value: 3, type: "primitive", changed: true }], active: true }
          ],
          heap: [],
          explanation: "We call 'Somar'. A new Frame is pushed. Values are copied."
        },
        {
          stepId: 5,
          line: 5,
          stack: [
             { id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "Somar", name: "Somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive", changed: true }], active: true }
          ],
          heap: [],
          explanation: "The calculation occurs and is saved in the local variable 'resultado'."
        },
        {
          stepId: 6,
          line: 6,
          stack: [
             { id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "Somar", name: "Somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive" }], active: true, isClosing: true }
          ],
          heap: [],
          explanation: "The method returns 8 and the Frame is popped."
        },
        {
          stepId: 7,
          line: 12,
          stack: [{ id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive", changed: true }], active: true }],
          heap: [],
          explanation: "Back to Main, 'total' receives 8."
        },
         {
          stepId: 8,
          line: 13,
          stack: [{ id: "Main", name: "Main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive" }], active: true }],
          heap: [],
          explanation: "Print to console. Done."
        }
      ]
    },
    java: {
      code: `public class Main {
    public static int somar(int a, int b) {
        int resultado = a + b;
        return resultado;
    }

    public static void main(String[] args) {
        int x = 5;
        int y = 3;
        int total = somar(x, y);
        System.out.println(total);
    }
}`,
      steps: [
        {
          stepId: 0,
          line: 7,
          stack: [],
          heap: [],
          explanation: "The JVM starts execution with the 'main' method."
        },
        {
          stepId: 1,
          line: 7,
          stack: [{ id: "main", name: "main()", variables: [], active: true }],
          heap: [],
          explanation: "The main method's Stack Frame is created."
        },
        {
           stepId: 2,
           line: 8,
           stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive", changed: true }], active: true }],
           heap: [],
           explanation: "Primitive variable 'x' (int) is created on the Stack."
        },
        {
           stepId: 3,
           line: 9,
           stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive", changed: true }], active: true }],
           heap: [],
           explanation: "Primitive variable 'y' is created."
        },
        {
           stepId: 4,
           line: 10,
           stack: [
             { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive", changed: true }, { name: "b", value: 3, type: "primitive", changed: true }], active: true }
           ],
           heap: [],
           explanation: "Method 'somar' is called. New frame on the stack."
        },
        {
           stepId: 5,
           line: 3,
           stack: [
             { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive", changed: true }], active: true }
           ],
           heap: [],
           explanation: "Calculation performed and stored in 'resultado'."
        },
        {
           stepId: 6,
           line: 4,
           stack: [
             { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false },
             { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive" }], active: true, isClosing: true }
           ],
           heap: [],
           explanation: "The method returns 8 and the Frame is popped."
        },
        {
           stepId: 7,
           line: 10,
           stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive", changed: true }], active: true }],
           heap: [],
           explanation: "Back in main, value assigned to 'total'."
        },
        {
           stepId: 8,
           line: 11,
           stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive" }], active: true }],
           heap: [],
           explanation: "Print to console."
        }
      ]
    },
    c: {
      code: `#include <stdio.h>

int somar(int a, int b) {
    int resultado = a + b;
    return resultado;
}

int main() {
    int x = 5;
    int y = 3;
    int total = somar(x, y);
    printf("%d", total);
    return 0;
}`,
      steps: [
        { stepId: 0, line: 8, stack: [], heap: [], explanation: "The entry point in C is the 'main' function." },
        { stepId: 1, line: 8, stack: [{ id: "main", name: "main()", variables: [], active: true }], heap: [], explanation: "The Stack Frame for main is allocated." },
        { stepId: 2, line: 9, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Integer 'x' allocated on the stack." },
        { stepId: 3, line: 10, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Integer 'y' allocated on the stack." },
        { stepId: 4, line: 11, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false }, { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive", changed: true }, { name: "b", value: 3, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Function 'somar' is called. Arguments passed by copy." },
        { stepId: 5, line: 4, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false }, { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Local variable 'resultado' allocated in the 'somar' frame." },
        { stepId: 6, line: 5, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 0, type: "primitive" }], active: false }, { id: "somar", name: "somar(5, 3)", variables: [{ name: "a", value: 5, type: "primitive" }, { name: "b", value: 3, type: "primitive" }, { name: "resultado", value: 8, type: "primitive" }], active: true, isClosing: true }], heap: [], explanation: "Function return." },
        { stepId: 7, line: 11, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Returned value assigned to 'total' in main." },
        { stepId: 8, line: 12, stack: [{ id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive" }, { name: "y", value: 3, type: "primitive" }, { name: "total", value: 8, type: "primitive" }], active: true }], heap: [], explanation: "printf displays the result." }
      ]
    }
  }
};

// ==========================================
// 2. Objects Lesson
// ==========================================
const objectLesson: Lesson = {
  id: "objects",
  title: "References and Objects",
  description: "Discover the difference between the 'Stack' and the 'Heap' (Memory). Object variables only POINT to the real object.",
  difficulty: "Intermediate",
  variants: {
    javascript: {
      code: `function criarUsuario(nome) {
  const usuario = {
    nome: nome,
    admin: false
  };
  return usuario;
}

const u1 = criarUsuario("Ana");
const u2 = u1;
u2.admin = true;`,
      steps: [
        { stepId: 0, line: 1, stack: [], heap: [], explanation: "Program starts. Objects live in the Heap." },
        { stepId: 1, line: 8, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: true }], heap: [], explanation: "Preparing call to createUser." },
        { stepId: 2, line: 2, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false }, { id: "criarUsuario", name: "criarUsuario('Ana')", variables: [{ name: "nome", value: "Ana", type: "primitive" }], active: true }], heap: [], explanation: "We enter the function." },
        { stepId: 3, line: 5, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false }, { id: "criarUsuario", name: "criarUsuario('Ana')", variables: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "usuario", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], active: true }], heap: [{ id: "obj1", className: "Object", properties: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "admin", value: false, type: "primitive" }], highlight: true }], explanation: "Object created in HEAP. Variable on Stack stores the ADDRESS (Reference)." },
        { stepId: 4, line: 6, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false }, { id: "criarUsuario", name: "criarUsuario('Ana')", variables: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "usuario", value: "REF:obj1", type: "reference", refId: "obj1" }], active: true, isClosing: true }], heap: [{ id: "obj1", className: "Object", properties: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "admin", value: false, type: "primitive" }] }], explanation: "Returns the REFERENCE." },
        { stepId: 5, line: 8, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], active: true }], heap: [{ id: "obj1", className: "Object", properties: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "admin", value: false, type: "primitive" }] }], explanation: "'u1' points to the object in the Heap." },
        { stepId: 6, line: 9, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" }, { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], active: true }], heap: [{ id: "obj1", className: "Object", properties: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "admin", value: false, type: "primitive" }] }], explanation: "'u2 = u1' copies the address. Both point to the SAME object." },
        { stepId: 7, line: 10, stack: [{ id: "global", name: "Global", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" }, { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1" }], active: true }], heap: [{ id: "obj1", className: "Object", properties: [{ name: "nome", value: "Ana", type: "primitive" }, { name: "admin", value: true, type: "primitive", changed: true }], highlight: true }], explanation: "Modifying 'u2' affects the real object, so 'u1' also sees the change." }
      ]
    },
    csharp: {
        code: `class Usuario {
    public string Nome;
    public bool Admin;
}

class Program {
    static void Main() {
        Usuario u1 = new Usuario();
        u1.Nome = "Ana";
        
        Usuario u2 = u1;
        u2.Admin = true;
    }
}`,
        steps: [
            { stepId: 0, line: 7, stack: [], heap: [], explanation: "Início. Classes em C# são Reference Types (ficam na Heap)." },
            { stepId: 1, line: 8, stack: [{ id: "Main", name: "Main()", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], active: true }], heap: [{ id: "obj1", className: "Usuario", properties: [{ name: "Nome", value: null, type: "primitive" }, { name: "Admin", value: false, type: "primitive" }], highlight: true }], explanation: "'new Usuario()' aloca memória na Heap. 'u1' na Stack aponta para lá." },
            { stepId: 2, line: 9, stack: [{ id: "Main", name: "Main()", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" }], active: true }], heap: [{ id: "obj1", className: "Usuario", properties: [{ name: "Nome", value: "Ana", type: "primitive", changed: true }, { name: "Admin", value: false, type: "primitive" }], highlight: true }], explanation: "Atribuímos 'Ana' à propriedade Nome do objeto na Heap." },
            { stepId: 3, line: 11, stack: [{ id: "Main", name: "Main()", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" }, { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], active: true }], heap: [{ id: "obj1", className: "Usuario", properties: [{ name: "Nome", value: "Ana", type: "primitive" }, { name: "Admin", value: false, type: "primitive" }] }], explanation: "'u2 = u1' copia a referência. Agora temos duas variáveis apontando para o mesmo objeto." },
            { stepId: 4, line: 12, stack: [{ id: "Main", name: "Main()", variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" }, { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1" }], active: true }], heap: [{ id: "obj1", className: "Usuario", properties: [{ name: "Nome", value: "Ana", type: "primitive" }, { name: "Admin", value: true, type: "primitive", changed: true }], highlight: true }], explanation: "Alterar u2 altera o objeto compartilhado." }
        ]
    }
  }
};

// ==========================================
// 3. Recursion Lesson
// ==========================================
const recursionLesson: Lesson = {
    id: "recursion",
    title: "Recursion (Call Stack)",
    description: "Visualize how the call stack grows when a function calls itself.",
    difficulty: "Intermediate",
    variants: {
        javascript: {
            code: `function fatorial(n) {
  if (n === 1) return 1;
  return n * fatorial(n - 1);
}

const resultado = fatorial(3);`,
            steps: [
                { stepId: 0, line: 6, stack: [], heap: [], explanation: "Vamos calcular o fatorial de 3 recursivamente." },
                { stepId: 1, line: 6, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: true }], heap: [], explanation: "Chamada inicial: fatorial(3)." },
                { stepId: 2, line: 2, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: true }], heap: [], explanation: "n é 3, não é 1. Continua." },
                { stepId: 3, line: 3, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: false }, { id: "fat2", name: "fatorial(2)", variables: [{ name: "n", value: 2, type: "primitive" }], active: true }], heap: [], explanation: "PAUSA fatorial(3) para chamar fatorial(2). Empilha novo quadro." },
                { stepId: 4, line: 2, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: false }, { id: "fat2", name: "fatorial(2)", variables: [{ name: "n", value: 2, type: "primitive" }], active: true }], heap: [], explanation: "n é 2. Continua." },
                { stepId: 5, line: 3, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: false }, { id: "fat2", name: "fatorial(2)", variables: [{ name: "n", value: 2, type: "primitive" }], active: false }, { id: "fat1", name: "fatorial(1)", variables: [{ name: "n", value: 1, type: "primitive" }], active: true }], heap: [], explanation: "PAUSA fatorial(2) para chamar fatorial(1). A pilha cresce!" },
                { stepId: 6, line: 2, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: false }, { id: "fat2", name: "fatorial(2)", variables: [{ name: "n", value: 2, type: "primitive" }], active: false }, { id: "fat1", name: "fatorial(1)", variables: [{ name: "n", value: 1, type: "primitive" }], active: true, isClosing: true }], heap: [], explanation: "BASE CASE: n é 1. Retorna 1." },
                { stepId: 7, line: 3, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }], active: false }, { id: "fat2", name: "fatorial(2)", variables: [{ name: "n", value: 2, type: "primitive" }, { name: "return", value: 2, type: "primitive", changed: true }], active: true, isClosing: true }], heap: [], explanation: "Volta para fatorial(2). Calcula 2 * 1 = 2. Retorna 2." },
                { stepId: 8, line: 3, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "fat3", name: "fatorial(3)", variables: [{ name: "n", value: 3, type: "primitive" }, { name: "return", value: 6, type: "primitive", changed: true }], active: true, isClosing: true }], heap: [], explanation: "Volta para fatorial(3). Calcula 3 * 2 = 6. Retorna 6." },
                { stepId: 9, line: 6, stack: [{ id: "global", name: "Global", variables: [{ name: "resultado", value: 6, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Resultado final 6 armazenado." }
            ]
        }
    }
};

// ==========================================
// 4. Classes Lesson
// ==========================================
const classLesson: Lesson = {
  id: "classes",
  title: "Classes and Instances",
  description: "Learn how the 'this' keyword works and how classes create objects.",
  difficulty: "Advanced",
  variants: {
      javascript: {
          code: `class Carro {
  constructor(modelo) {
    this.modelo = modelo;
    this.velocidade = 0;
  }
  
  acelerar() {
    this.velocidade += 10;
  }
}

const c1 = new Carro("Fusca");
c1.acelerar();`,
          steps: [
            { stepId: 0, line: 11, stack: [], heap: [], explanation: "Definimos a classe. Vamos instanciar com 'new'." },
            { stepId: 1, line: 2, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "constructor", name: "Carro.constructor", variables: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "this", value: "REF:car1", type: "reference", refId: "car1", changed: true }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [], highlight: true }], explanation: "'new' cria objeto vazio na Heap e atribui a 'this'." },
            { stepId: 2, line: 3, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "constructor", name: "Carro.constructor", variables: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "this", value: "REF:car1", type: "reference", refId: "car1" }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [{ name: "modelo", value: "Fusca", type: "primitive", changed: true }], highlight: true }], explanation: "Configura 'this.modelo'." },
            { stepId: 3, line: 4, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "constructor", name: "Carro.constructor", variables: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "this", value: "REF:car1", type: "reference", refId: "car1" }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "velocidade", value: 0, type: "primitive", changed: true }], highlight: true }], explanation: "Configura 'this.velocidade'." },
            { stepId: 4, line: 11, stack: [{ id: "global", name: "Global", variables: [{ name: "c1", value: "REF:car1", type: "reference", refId: "car1", changed: true }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "velocidade", value: 0, type: "primitive" }] }], explanation: "Retorna a instância para 'c1'." },
            { stepId: 5, line: 12, stack: [{ id: "global", name: "Global", variables: [{ name: "c1", value: "REF:car1", type: "reference", refId: "car1" }], active: false }, { id: "acelerar", name: "c1.acelerar", variables: [{ name: "this", value: "REF:car1", type: "reference", refId: "car1", changed: true }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "velocidade", value: 0, type: "primitive" }] }], explanation: "Chama método. 'this' é o objeto c1." },
            { stepId: 6, line: 8, stack: [{ id: "global", name: "Global", variables: [{ name: "c1", value: "REF:car1", type: "reference", refId: "car1" }], active: false }, { id: "acelerar", name: "c1.acelerar", variables: [{ name: "this", value: "REF:car1", type: "reference", refId: "car1" }], active: true }], heap: [{ id: "car1", className: "Carro", properties: [{ name: "modelo", value: "Fusca", type: "primitive" }, { name: "velocidade", value: 10, type: "primitive", changed: true }], highlight: true }], explanation: "Atualiza propriedade na Heap." }
          ]
      }
  }
};

// ==========================================
// 5. Loops & Arrays Lesson
// ==========================================
const loopsArraysLesson: Lesson = {
  id: "loops-arrays",
  title: "Loops & Arrays",
  description: "Understand how arrays are stored and how loops traverse them index by index.",
  difficulty: "Beginner",
  variants: {
    javascript: {
      code: `const numeros = [10, 20, 30];
let soma = 0;

for (let i = 0; i < numeros.length; i++) {
  soma = soma + numeros[i];
}`,
      steps: [
        { stepId: 0, line: 1, stack: [], heap: [], explanation: "Vamos criar um array de números." },
        { stepId: 1, line: 1, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }], highlight: true }], explanation: "Array criado na Heap. 'numeros' guarda a referência." },
        { stepId: 2, line: 2, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 0, type: "primitive", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Inicializamos 'soma' com 0." },
        
        // Loop Iteration 0
        { stepId: 3, line: 4, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 0, type: "primitive" }, { name: "i", value: 0, type: "primitive", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Início do loop. 'i' é 0. 0 < 3 é verdadeiro." },
        { stepId: 4, line: 5, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 10, type: "primitive", changed: true }, { name: "i", value: 0, type: "primitive" }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive", highlight: true }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Acessamos numeros[0] (10) e somamos. soma = 0 + 10 = 10." },
        
        // Loop Iteration 1
        { stepId: 5, line: 4, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 10, type: "primitive" }, { name: "i", value: 1, type: "primitive", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Incrementamos 'i' para 1. 1 < 3 é verdadeiro." },
        { stepId: 6, line: 5, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 30, type: "primitive", changed: true }, { name: "i", value: 1, type: "primitive" }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive", highlight: true }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Acessamos numeros[1] (20). soma = 10 + 20 = 30." },
        
        // Loop Iteration 2
        { stepId: 7, line: 4, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 30, type: "primitive" }, { name: "i", value: 2, type: "primitive", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Incrementamos 'i' para 2. 2 < 3 é verdadeiro." },
        { stepId: 8, line: 5, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 60, type: "primitive", changed: true }, { name: "i", value: 2, type: "primitive" }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive", highlight: true }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Acessamos numeros[2] (30). soma = 30 + 30 = 60." },
        
        // Loop End
        { stepId: 9, line: 4, stack: [{ id: "global", name: "Global", variables: [{ name: "numeros", value: "REF:arr1", type: "reference", refId: "arr1" }, { name: "soma", value: 60, type: "primitive" }, { name: "i", value: 3, type: "primitive", changed: true }], active: true }], heap: [{ id: "arr1", className: "Array", properties: [{ name: "0", value: 10, type: "primitive" }, { name: "1", value: 20, type: "primitive" }, { name: "2", value: 30, type: "primitive" }, { name: "length", value: 3, type: "primitive" }] }], explanation: "Incrementamos 'i' para 3. 3 < 3 é FALSO. O loop termina." }
      ]
    }
  }
};

// ==========================================
// 6. Conditionals Lesson (NEW)
// ==========================================
const conditionalsLesson: Lesson = {
  id: "conditionals",
  title: "Conditionals (If/Else)",
  description: "See how the computer makes decisions and chooses which path to follow in the code.",
  difficulty: "Beginner",
  variants: {
    javascript: {
      code: `function verificarIdade(idade) {
  let status;
  
  if (idade >= 18) {
    status = "Maior de idade";
  } else {
    status = "Menor de idade";
  }
  
  return status;
}

const resultado = verificarIdade(15);`,
      steps: [
        { stepId: 0, line: 11, stack: [], heap: [], explanation: "Vamos verificar uma idade." },
        { stepId: 1, line: 11, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }], active: true }], heap: [], explanation: "Chamamos a função com idade = 15." },
        { stepId: 2, line: 2, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }, { name: "status", value: undefined, type: "primitive", changed: true }], active: true }], heap: [], explanation: "Variável 'status' é criada, mas ainda indefinida." },
        { stepId: 3, line: 4, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }, { name: "status", value: undefined, type: "primitive" }], active: true }], heap: [], explanation: "O 'if' verifica: 15 >= 18? FALSO." },
        { stepId: 4, line: 6, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }, { name: "status", value: undefined, type: "primitive" }], active: true }], heap: [], explanation: "Como foi falso, pulamos para o 'else'." },
        { stepId: 5, line: 7, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }, { name: "status", value: "Menor de idade", type: "primitive", changed: true }], active: true }], heap: [], explanation: "Executamos o bloco else. status recebe 'Menor de idade'." },
        { stepId: 6, line: 10, stack: [{ id: "global", name: "Global", variables: [], active: false }, { id: "verificar", name: "verificarIdade(15)", variables: [{ name: "idade", value: 15, type: "primitive" }, { name: "status", value: "Menor de idade", type: "primitive" }], active: true, isClosing: true }], heap: [], explanation: "Retornamos o valor." },
        { stepId: 7, line: 11, stack: [{ id: "global", name: "Global", variables: [{ name: "resultado", value: "Menor de idade", type: "primitive", changed: true }], active: true }], heap: [], explanation: "Resultado final armazenado." }
      ]
    }
  }
};

// ==========================================
// Premium Lessons (Modelos)
// ==========================================
const closuresLesson: Lesson = {
  id: "closures",
  title: "Closures (Functions and Scope)",
  description: "Understand how functions remember variables from the scope where they were created.",
  difficulty: "Intermediate",
  variants: {
    javascript: {
      code: `function criarContador() {
  let cont = 0;
  return function() {
    cont = cont + 1;
    return cont;
  }
}

const contador = criarContador();
contador();
contador();`,
      steps: [
        { stepId: 0, line: 8, stack: [], heap: [], explanation: "Definimos criarContador e criamos o contador." },
        { stepId: 1, line: 8, stack: [{ id: 'global', name: 'Global', variables: [{ name: 'contador', value: 'REF:fn1', type: 'reference', refId: 'fn1', changed: true }], active: true }], heap: [{ id: 'fn1', className: 'Function', properties: [{ name: '[[Scope]]', value: 'REF:env1', type: 'reference' }], highlight: true }], explanation: "A função retornada mantém referência ao ambiente (closure)." },
        { stepId: 2, line: 9, stack: [{ id: 'global', name: 'Global', variables: [{ name: 'contador', value: 'REF:fn1', type: 'reference', refId: 'fn1' }], active: true }], heap: [{ id: 'env1', className: 'Env', properties: [{ name: 'cont', value: 1, type: 'primitive', changed: true }] }], explanation: "Ao chamar contador(), 'cont' é incrementado e preservado na closure." },
        { stepId: 3, line: 10, stack: [{ id: 'global', name: 'Global', variables: [{ name: 'contador', value: 'REF:fn1', type: 'reference', refId: 'fn1' }], active: true }], heap: [{ id: 'env1', className: 'Env', properties: [{ name: 'cont', value: 2, type: 'primitive', changed: true }] }], explanation: "Chamar novamente aumenta cont para 2 — o estado foi mantido." }
      ]
    }
  }
};

const asyncLesson: Lesson = {
  id: "async-await",
  title: "Asynchronous: Callbacks, Promises and async/await",
  description: "Shows the difference between synchronous and asynchronous execution and how the event loop works.",
  difficulty: "Intermediate",
  variants: {
    javascript: {
      code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
      steps: [
        { stepId: 0, line: 1, stack: [], heap: [], explanation: "Execução inicial: log 'A' e agendamento de callbacks." },
        { stepId: 1, line: 1, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "Imprime 'A' imediatamente." },
        { stepId: 2, line: 4, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "Imprime 'D' em seguida (síncrono)." },
        { stepId: 3, line: 3, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "Microtasks (Promises) executam antes dos callbacks de setTimeout: imprime 'C'." },
        { stepId: 4, line: 2, stack: [], heap: [], explanation: "Por fim, event loop processa macrotasks: setTimeout imprime 'B'. Ordem: A, D, C, B." }
      ]
    }
  }
};

const debuggingLesson: Lesson = {
  id: "debugging",
  title: "Debugging and Console",
  description: "How to use logs and breakpoints to understand step by step what happens in the code.",
  difficulty: "Beginner",
  variants: {
    javascript: {
      code: `function busca(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    console.log('checando', i);
    if (arr[i] === target) return i;
  }
  return -1;
}

busca([1,2,3,4], 3);`,
      steps: [
        { stepId: 0, line: 1, stack: [], heap: [], explanation: "Chamamos busca. O loop itera e imprime cada índice para ajudar a depurar." },
        { stepId: 1, line: 3, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "checando 0" },
        { stepId: 2, line: 3, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "checando 1" },
        { stepId: 3, line: 3, stack: [{ id: 'global', name: 'Global', variables: [], active: true }], heap: [], explanation: "checando 2 -> encontramos 3 e retornamos índice 2" }
      ]
    }
  }
};

export const lessons: Record<string, Lesson> = {
  functions: functionLesson,
  objects: objectLesson,
  classes: classLesson,
  recursion: recursionLesson,
  "loops-arrays": loopsArraysLesson,
  conditionals: conditionalsLesson,
  closures: closuresLesson,
  "async-await": asyncLesson,
  debugging: debuggingLesson
};
