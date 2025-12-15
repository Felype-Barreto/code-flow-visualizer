import { Lesson } from "./types";

const functionLesson: Lesson = {
  id: "functions",
  title: "Como funcionam as Funções?",
  description: "Entenda o conceito de 'Escopo' e 'Call Stack' (Pilha de Chamadas). Veja como variáveis são criadas e destruídas.",
  difficulty: "Iniciante",
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
      explanation: "O programa começa. O interpretador lê as definições das funções 'somar' e 'main', mas nada é executado até chamarmos alguém."
    },
    {
      stepId: 1,
      line: 11,
      stack: [
        { id: "main", name: "main()", variables: [], active: true }
      ],
      heap: [],
      explanation: "A função 'main()' é chamada. Um novo 'Stack Frame' (quadro) é criado na pilha de memória para ela."
    },
    {
      stepId: 2,
      line: 7,
      stack: [
        { id: "main", name: "main()", variables: [{ name: "x", value: 5, type: "primitive", changed: true }], active: true }
      ],
      heap: [],
      explanation: "A variável 'x' é declarada e inicializada com o valor 5 dentro do escopo de 'main'."
    },
    {
      stepId: 3,
      line: 8,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [],
      explanation: "A variável 'y' é declarada e inicializada com o valor 3."
    },
    {
      stepId: 4,
      line: 9,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive" },
            { name: "total", value: undefined, type: "primitive" }
          ], 
          active: false 
        },
        {
          id: "somar",
          name: "somar(5, 3)",
          variables: [
            { name: "a", value: 5, type: "primitive", changed: true },
            { name: "b", value: 3, type: "primitive", changed: true }
          ],
          active: true
        }
      ],
      heap: [],
      explanation: "A função 'somar' é chamada. Um NOVO quadro é colocado NO TOPO da pilha. Os valores de x e y são copiados para os argumentos a e b."
    },
    {
      stepId: 5,
      line: 2,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive" },
            { name: "total", value: undefined, type: "primitive" }
          ], 
          active: false 
        },
        {
          id: "somar",
          name: "somar(5, 3)",
          variables: [
            { name: "a", value: 5, type: "primitive" },
            { name: "b", value: 3, type: "primitive" },
            { name: "resultado", value: 8, type: "primitive", changed: true }
          ],
          active: true
        }
      ],
      heap: [],
      explanation: "Dentro de 'somar', o cálculo é feito e armazenado na variável local 'resultado'."
    },
    {
      stepId: 6,
      line: 3,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive" },
            { name: "total", value: undefined, type: "primitive" }
          ], 
          active: false 
        },
        {
          id: "somar",
          name: "somar(5, 3)",
          variables: [
            { name: "a", value: 5, type: "primitive" },
            { name: "b", value: 3, type: "primitive" },
            { name: "resultado", value: 8, type: "primitive" }
          ],
          active: true,
          isClosing: true
        }
      ],
      heap: [],
      explanation: "A função 'somar' retorna o valor 8. O quadro da função 'somar' está prestes a ser removido (pop) da pilha."
    },
    {
      stepId: 7,
      line: 9,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive" },
            { name: "total", value: 8, type: "primitive", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [],
      explanation: "Voltamos para 'main'. O valor retornado (8) é atribuído à variável 'total'. O quadro de 'somar' desapareceu e suas variáveis foram apagadas da memória."
    },
    {
      stepId: 8,
      line: 10,
      stack: [
        { 
          id: "main", 
          name: "main()", 
          variables: [
            { name: "x", value: 5, type: "primitive" },
            { name: "y", value: 3, type: "primitive" },
            { name: "total", value: 8, type: "primitive" }
          ], 
          active: true 
        }
      ],
      heap: [],
      explanation: "O valor é exibido no console. A função main termina."
    }
  ]
};

const objectLesson: Lesson = {
  id: "objects",
  title: "Referências e Objetos",
  description: "Descubra a diferença entre a 'Pilha' (Stack) e o 'Heap' (Memória Livre). Variáveis de objeto apenas APONTAM para o objeto real.",
  difficulty: "Intermediário",
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
    {
      stepId: 0,
      line: 1,
      stack: [],
      heap: [],
      explanation: "Início do programa. Vamos ver como objetos são armazenados na memória Heap."
    },
    {
      stepId: 1,
      line: 8,
      stack: [
        { id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: true }
      ],
      heap: [],
      explanation: "Começamos a executar a linha 8. Primeiro preparamos para chamar criarUsuario."
    },
    {
      stepId: 2,
      line: 2,
      stack: [
        { id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false },
        { id: "criarUsuario", name: "criarUsuario('Ana')", variables: [{ name: "nome", value: "Ana", type: "primitive" }], active: true }
      ],
      heap: [],
      explanation: "Entramos em criarUsuario. O argumento 'nome' recebe 'Ana'."
    },
    {
      stepId: 3,
      line: 5,
      stack: [
        { id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false },
        { 
          id: "criarUsuario", 
          name: "criarUsuario('Ana')", 
          variables: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "usuario", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [
        { 
          id: "obj1", 
          className: "Object", 
          properties: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "admin", value: false, type: "primitive" }
          ],
          highlight: true
        }
      ],
      explanation: "CRUCIAL: O objeto {} é criado na HEAP (memória livre). A variável 'usuario' na Stack apenas guarda o ENDEREÇO (referência) para esse objeto."
    },
    {
      stepId: 4,
      line: 6,
      stack: [
        { id: "global", name: "Global", variables: [{ name: "u1", value: undefined, type: "primitive" }], active: false },
        { 
          id: "criarUsuario", 
          name: "criarUsuario('Ana')", 
          variables: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "usuario", value: "REF:obj1", type: "reference", refId: "obj1" }
          ], 
          active: true,
          isClosing: true
        }
      ],
      heap: [
        { 
          id: "obj1", 
          className: "Object", 
          properties: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "admin", value: false, type: "primitive" }
          ]
        }
      ],
      explanation: "A função retorna a REFERÊNCIA do objeto (o endereço), não uma cópia do objeto inteiro."
    },
    {
      stepId: 5,
      line: 8,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [{ name: "u1", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }], 
          active: true 
        }
      ],
      heap: [
        { 
          id: "obj1", 
          className: "Object", 
          properties: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "admin", value: false, type: "primitive" }
          ]
        }
      ],
      explanation: "Agora 'u1' aponta para o objeto na Heap. O quadro da função anterior sumiu."
    },
    {
      stepId: 6,
      line: 9,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [
            { name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" },
            { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [
        { 
          id: "obj1", 
          className: "Object", 
          properties: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "admin", value: false, type: "primitive" }
          ]
        }
      ],
      explanation: "ATENÇÃO: 'u2 = u1' copia apenas o endereço! Agora u1 e u2 apontam para O MESMO objeto na Heap."
    },
    {
      stepId: 7,
      line: 10,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [
            { name: "u1", value: "REF:obj1", type: "reference", refId: "obj1" },
            { name: "u2", value: "REF:obj1", type: "reference", refId: "obj1" }
          ], 
          active: true 
        }
      ],
      heap: [
        { 
          id: "obj1", 
          className: "Object", 
          properties: [
            { name: "nome", value: "Ana", type: "primitive" },
            { name: "admin", value: true, type: "primitive", changed: true }
          ],
          highlight: true
        }
      ],
      explanation: "Ao alterar 'u2.admin', mudamos o objeto na Heap. Como 'u1' aponta para o mesmo lugar, 'u1.admin' também passa a ser true."
    }
  ]
};

const classLesson: Lesson = {
  id: "classes",
  title: "Classes e Instâncias",
  description: "Aprenda como a palavra-chave 'this' funciona e como classes geram objetos.",
  difficulty: "Avançado",
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
    {
      stepId: 0,
      line: 11,
      stack: [],
      heap: [],
      explanation: "Definimos a classe 'Carro'. Agora vamos criar uma instância dela com 'new'."
    },
    {
      stepId: 1,
      line: 2,
      stack: [
        { id: "global", name: "Global", variables: [], active: false },
        { 
          id: "constructor", 
          name: "Carro.constructor", 
          variables: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "this", value: "REF:car1", type: "reference", refId: "car1", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [],
          highlight: true
        }
      ],
      explanation: "Quando usamos 'new', o JS cria um objeto vazio na Heap e o atribui à variável especial 'this' dentro do construtor."
    },
    {
      stepId: 2,
      line: 3,
      stack: [
        { id: "global", name: "Global", variables: [], active: false },
        { 
          id: "constructor", 
          name: "Carro.constructor", 
          variables: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "this", value: "REF:car1", type: "reference", refId: "car1" }
          ], 
          active: true 
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [
            { name: "modelo", value: "Fusca", type: "primitive", changed: true }
          ],
          highlight: true
        }
      ],
      explanation: "O construtor configura as propriedades do novo objeto usando 'this.modelo'."
    },
    {
      stepId: 3,
      line: 4,
      stack: [
        { id: "global", name: "Global", variables: [], active: false },
        { 
          id: "constructor", 
          name: "Carro.constructor", 
          variables: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "this", value: "REF:car1", type: "reference", refId: "car1" }
          ], 
          active: true 
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "velocidade", value: 0, type: "primitive", changed: true }
          ],
          highlight: true
        }
      ],
      explanation: "Inicializamos a velocidade como 0."
    },
    {
      stepId: 4,
      line: 11,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [
            { name: "c1", value: "REF:car1", type: "reference", refId: "car1", changed: true }
          ], 
          active: true 
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "velocidade", value: 0, type: "primitive" }
          ]
        }
      ],
      explanation: "O construtor termina e retorna a instância criada para 'c1'."
    },
    {
      stepId: 5,
      line: 12,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [
            { name: "c1", value: "REF:car1", type: "reference", refId: "car1" }
          ], 
          active: false 
        },
        {
          id: "acelerar",
          name: "c1.acelerar",
          variables: [
            { name: "this", value: "REF:car1", type: "reference", refId: "car1", changed: true }
          ],
          active: true
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "velocidade", value: 0, type: "primitive" }
          ]
        }
      ],
      explanation: "Chamamos 'c1.acelerar()'. Dentro do método, 'this' automaticamente aponta para o objeto 'c1' (fusca)."
    },
    {
      stepId: 6,
      line: 8,
      stack: [
        { 
          id: "global", 
          name: "Global", 
          variables: [
            { name: "c1", value: "REF:car1", type: "reference", refId: "car1" }
          ], 
          active: false 
        },
        {
          id: "acelerar",
          name: "c1.acelerar",
          variables: [
            { name: "this", value: "REF:car1", type: "reference", refId: "car1" }
          ],
          active: true
        }
      ],
      heap: [
        {
          id: "car1",
          className: "Carro",
          properties: [
            { name: "modelo", value: "Fusca", type: "primitive" },
            { name: "velocidade", value: 10, type: "primitive", changed: true }
          ],
          highlight: true
        }
      ],
      explanation: "O código altera 'this.velocidade', atualizando o objeto na Heap."
    }
  ]
};

export const lessons: Record<string, Lesson> = {
  functions: functionLesson,
  objects: objectLesson,
  classes: classLesson
};
