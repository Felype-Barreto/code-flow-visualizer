import { Lesson } from "./types";

// ==========================================
// EXERCISES/TASKS SYSTEM WITH MULTI-LANGUAGE SUPPORT
// ==========================================

export type Language = "javascript" | "python" | "c" | "csharp" | "java";

export interface LanguageVariant {
  language: Language;
  initialCode: string;
  solution: string;
  hint?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  variants: {
    javascript?: LanguageVariant;
    python?: LanguageVariant;
    c?: LanguageVariant;
    csharp?: LanguageVariant;
    java?: LanguageVariant;
  };
  tests: {
    name: string;
    input: any[];
    expected: any;
  }[];
}

// ==========================================
// 20 EXERCISES WITH MULTI-LANGUAGE SUPPORT
// ==========================================

export const exercises: Exercise[] = [
  {
    id: "sum-two-numbers",
    title: "Sum Two Numbers",
    description: "Write a function that takes two numbers and returns their sum.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function sum(a, b) {\n  // Your code here\n  \n}`,
        solution: `function sum(a, b) {\n  return a + b;\n}`,
        hint: "Use the + operator to add the parameters",
      },
      python: {
        language: "python",
        initialCode: `def sum(a, b):\n    # Your code here\n    pass`,
        solution: `def sum(a, b):\n    return a + b`,
        hint: "Use the + operator to add the parameters",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n\nint sum(int a, int b) {\n  // Your code here\n  \n}\n\nint main() {\n  return 0;\n}`,
        solution: `#include <stdio.h>\n\nint sum(int a, int b) {\n  return a + b;\n}\n\nint main() {\n  return 0;\n}`,
        hint: "Use the + operator to add the parameters",
      },
      csharp: {
        language: "csharp",
        initialCode: `public class Program {\n  public static int sum(int a, int b) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static int sum(int a, int b) {\n    return a + b;\n  }\n}`,
        hint: "Use the + operator to add the parameters",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  public static int sum(int a, int b) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static int sum(int a, int b) {\n    return a + b;\n  }\n}`,
        hint: "Use the + operator to add the parameters",
      },
    },
    tests: [
      { name: "Sum(2, 3)", input: [2, 3], expected: 5 },
      { name: "Sum(10, 5)", input: [10, 5], expected: 15 },
      { name: "Sum(-5, 5)", input: [-5, 5], expected: 0 },
    ],
  },
  {
    id: "even-or-odd",
    title: "Even or Odd",
    description: "Write a function that checks if a number is even or odd.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function isEven(number) {\n  // Your code here\n  \n}`,
        solution: `function isEven(number) {\n  return number % 2 === 0 ? "even" : "odd";\n}`,
        hint: "Use the modulo operator (%) to get the remainder",
      },
      python: {
        language: "python",
        initialCode: `def is_even(number):\n    # Your code here\n    pass`,
        solution: `def is_even(number):\n    return "even" if number % 2 == 0 else "odd"`,
        hint: "Use the modulo operator (%) to get the remainder",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n\nchar* isEven(int number) {\n  // Your code here\n  \n}`,
        solution: `#include <stdio.h>\n\nchar* isEven(int number) {\n  return number % 2 == 0 ? "even" : "odd";\n}`,
        hint: "Use the modulo operator (%) to get the remainder",
      },
      csharp: {
        language: "csharp",
        initialCode: `public class Program {\n  public static string isEven(int number) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static string isEven(int number) {\n    return number % 2 == 0 ? "even" : "odd";\n  }\n}`,
        hint: "Use the modulo operator (%) to get the remainder",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  public static String isEven(int number) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static String isEven(int number) {\n    return number % 2 == 0 ? "even" : "odd";\n  }\n}`,
        hint: "Use the modulo operator (%) to get the remainder",
      },
    },
    tests: [
      { name: "isEven(4)", input: [4], expected: "even" },
      { name: "isEven(7)", input: [7], expected: "odd" },
      { name: "isEven(0)", input: [0], expected: "even" },
    ],
  },
  {
    id: "find-max",
    title: "Find Maximum",
    description: "Write a function that receives three numbers and returns the largest one.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function findMax(a, b, c) {\n  // Your code here\n  \n}`,
        solution: `function findMax(a, b, c) {\n  return Math.max(a, b, c);\n}`,
        hint: "Use Math.max() or compare with if statements",
      },
      python: {
        language: "python",
        initialCode: `def find_max(a, b, c):\n    # Your code here\n    pass`,
        solution: `def find_max(a, b, c):\n    return max(a, b, c)`,
        hint: "Use the max() function or compare with if statements",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n\nint findMax(int a, int b, int c) {\n  // Your code here\n  \n}`,
        solution: `#include <stdio.h>\n\nint findMax(int a, int b, int c) {\n  int max = a;\n  if (b > max) max = b;\n  if (c > max) max = c;\n  return max;\n}`,
        hint: "Compare the values using if statements",
      },
      csharp: {
        language: "csharp",
        initialCode: `public class Program {\n  public static int findMax(int a, int b, int c) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static int findMax(int a, int b, int c) {\n    return a > b ? (a > c ? a : c) : (b > c ? b : c);\n  }\n}`,
        hint: "Use ternary operators or Math.Max()",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  public static int findMax(int a, int b, int c) {\n    // Your code here\n    \n  }\n}`,
        solution: `public class Program {\n  public static int findMax(int a, int b, int c) {\n    return Math.max(a, Math.max(b, c));\n  }\n}`,
        hint: "Use nested Math.max()",
      },
    },
    tests: [
      { name: "findMax(1, 2, 3)", input: [1, 2, 3], expected: 3 },
      { name: "findMax(10, 3, 7)", input: [10, 3, 7], expected: 10 },
    ],
  },
  {
    id: "reverse-str",
    title: "Reverse String",
    description: "Write a function that reverses a string.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function reverseString(text) {\n  // Your code here\n  \n}`,
        solution: `function reverseString(text) {\n  return text.split('').reverse().join('');\n}`,
        hint: "Use split(), reverse() and join()",
      },
      python: {
        language: "python",
        initialCode: `def reverse_string(text):\n    # Your code here\n    pass`,
        solution: `def reverse_string(text):\n    return text[::-1]`,
        hint: "Use slicing with [::-1] or reversed()",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char* text) {\n  // Your code here\n  \n}\n\nint main() {\n  char text[] = "hello";\n  reverseString(text);\n  printf("%s", text);\n  return 0;\n}`,
        solution: `#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char* text) {\n  int n = strlen(text);\n  for (int i = 0; i < n / 2; i++) {\n    char temp = text[i];\n    text[i] = text[n - 1 - i];\n    text[n - 1 - i] = temp;\n  }\n}\n\nint main() {\n  char text[] = "hello";\n  reverseString(text);\n  printf("%s", text);\n  return 0;\n}`,
        hint: "Use two pointers to swap characters",
      },
      csharp: {
        language: "csharp",
        initialCode: `using System;\n\npublic class Program {\n  static string reverseString(string text) {\n    // Your code here\n    \n  }\n  \n  static void Main() {\n    Console.WriteLine(reverseString("hello"));\n  }\n}`,
        solution: `using System;\n\npublic class Program {\n  static string reverseString(string text) {\n    char[] chars = text.ToCharArray();\n    System.Array.Reverse(chars);\n    return new string(chars);\n  }\n  \n  static void Main() {\n    Console.WriteLine(reverseString("hello"));\n  }\n}`,
        hint: "Use Array.Reverse() or a loop",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  static String reverseString(String text) {\n    // Your code here\n    \n  }\n  \n  public static void main(String[] args) {\n    System.out.println(reverseString("hello"));\n  }\n}`,
        solution: `public class Program {\n  static String reverseString(String text) {\n    return new StringBuilder(text).reverse().toString();\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(reverseString("hello"));\n  }\n}`,
        hint: "Use StringBuilder.reverse()",
      },
    },
    tests: [
      { name: "reverseString('hello')", input: ["hello"], expected: "olleh" },
      { name: "reverseString('123')", input: ["123"], expected: "321" },
    ],
  },
  {
    id: "count-vowels",
    title: "Count Vowels",
    description: "Write a function that counts how many vowels exist in a string.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function countVowels(text) {\n  // Your code here\n  \n}`,
        solution: `function countVowels(text) {\n  return (text.match(/[aeiouAEIOU]/g) || []).length;\n}`,
        hint: "Use a loop or regex to check for vowels",
      },
      python: {
        language: "python",
        initialCode: `def count_vowels(text):\n    # Your code here\n    pass`,
        solution: `def count_vowels(text):\n    return sum(1 for c in text if c.lower() in 'aeiou')`,
        hint: "Use a loop or list comprehension to count vowels",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint countVowels(char* text) {\n  // Your code here\n  \n}\n\nint main() {\n  printf("%d", countVowels("hello"));\n  return 0;\n}`,
        solution: `#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint countVowels(char* text) {\n  int count = 0;\n  for (int i = 0; text[i]; i++) {\n    char c = tolower(text[i]);\n    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') count++;\n  }\n  return count;\n}\n\nint main() {\n  printf("%d", countVowels("hello"));\n  return 0;\n}`,
        hint: "Use a loop and check each character",
      },
      csharp: {
        language: "csharp",
        initialCode: `using System;\nusing System.Linq;\n\npublic class Program {\n  static int countVowels(string text) {\n    // Your code here\n    \n  }\n  \n  static void Main() {\n    Console.WriteLine(countVowels("hello"));\n  }\n}`,
        solution: `using System;\nusing System.Linq;\n\npublic class Program {\n  static int countVowels(string text) {\n    return text.Count(c => "aeiouAEIOU".Contains(c));\n  }\n  \n  static void Main() {\n    Console.WriteLine(countVowels("hello"));\n  }\n}`,
        hint: "Use LINQ Count() with a condition",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  static int countVowels(String text) {\n    // Your code here\n    \n  }\n  \n  public static void main(String[] args) {\n    System.out.println(countVowels("hello"));\n  }\n}`,
        solution: `public class Program {\n  static int countVowels(String text) {\n    int count = 0;\n    for (char c : text.toLowerCase().toCharArray()) {\n      if ("aeiou".indexOf(c) >= 0) count++;\n    }\n    return count;\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(countVowels("hello"));\n  }\n}`,
        hint: "Use a loop on the character array",
      },
    },
    tests: [
      { name: "countVowels('hello')", input: ["hello"], expected: 2 },
      { name: "countVowels('programming')", input: ["programming"], expected: 3 },
    ],
  },
  {
    id: "filter-even",
    title: "Filter Even Numbers",
    description: "Return only even numbers from an array.",
    difficulty: "Beginner",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function filterEven(array) {\n  // Your code here\n  \n}`,
        solution: `function filterEven(array) {\n  return array.filter(n => n % 2 === 0);\n}`,
        hint: "Use .filter() with a condition for even numbers",
      },
      python: {
        language: "python",
        initialCode: `def filter_even(array):\n    # Your code here\n    pass`,
        solution: `def filter_even(array):\n    return [n for n in array if n % 2 == 0]`,
        hint: "Use list comprehension or filter()",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n\nvoid filterEven(int* array, int size, int* result, int* resultSize) {\n  // Your code here\n  *resultSize = 0;\n}\n\nint main() {\n  int array[] = {1, 2, 3, 4, 5};\n  int result[5];\n  int resultSize;\n  filterEven(array, 5, result, &resultSize);\n  return 0;\n}`,
        solution: `#include <stdio.h>\n\nvoid filterEven(int* array, int size, int* result, int* resultSize) {\n  *resultSize = 0;\n  for (int i = 0; i < size; i++) {\n    if (array[i] % 2 == 0) {\n      result[(*resultSize)++] = array[i];\n    }\n  }\n}\n\nint main() {\n  int array[] = {1, 2, 3, 4, 5};\n  int result[5];\n  int resultSize;\n  filterEven(array, 5, result, &resultSize);\n  return 0;\n}`,
        hint: "Use a loop and check n % 2 == 0",
      },
      csharp: {
        language: "csharp",
        initialCode: `using System;\nusing System.Linq;\n\npublic class Program {\n  static int[] filterEven(int[] array) {\n    // Your code here\n    \n  }\n  \n  static void Main() {\n    int[] result = filterEven(new[] { 1, 2, 3, 4, 5 });\n  }\n}`,
        solution: `using System;\nusing System.Linq;\n\npublic class Program {\n  static int[] filterEven(int[] array) {\n    return array.Where(n => n % 2 == 0).ToArray();\n  }\n  \n  static void Main() {\n    int[] result = filterEven(new[] { 1, 2, 3, 4, 5 });\n  }\n}`,
        hint: "Use LINQ Where() with a condition",
      },
      java: {
        language: "java",
        initialCode: `import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Program {\n  static List<Integer> filterEven(int[] array) {\n    // Your code here\n    \n  }\n  \n  public static void main(String[] args) {\n    filterEven(new int[] { 1, 2, 3, 4, 5 });\n  }\n}`,
        solution: `import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Program {\n  static List<Integer> filterEven(int[] array) {\n    return Arrays.stream(array).filter(n -> n % 2 == 0).boxed().collect(Collectors.toList());\n  }\n  \n  public static void main(String[] args) {\n    filterEven(new int[] { 1, 2, 3, 4, 5 });\n  }\n}`,
        hint: "Use stream() with filter()",
      },
    },
    tests: [
      { name: "filterEven([1,2,3,4,5])", input: [[1, 2, 3, 4, 5]], expected: [2, 4] },
      { name: "filterEven([2,4,6])", input: [[2, 4, 6]], expected: [2, 4, 6] },
    ],
  },
  {
    id: "factorial",
    title: "Factorial",
    description: "Calculate the factorial of a number. (5! = 5×4×3×2×1 = 120)",
    difficulty: "Intermediate",
    variants: {
      javascript: {
        language: "javascript",
        initialCode: `function factorial(n) {\n  // Your code here\n  \n}`,
        solution: `function factorial(n) {\n  if (n === 0 || n === 1) return 1;\n  let result = 1;\n  for (let i = 2; i <= n; i++) result *= i;\n  return result;\n}`,
        hint: "Use recursion or a loop to multiply the numbers",
      },
      python: {
        language: "python",
        initialCode: `def factorial(n):\n    # Your code here\n    pass`,
        solution: `def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result`,
        hint: "Use recursion or a loop to multiply the numbers",
      },
      c: {
        language: "c",
        initialCode: `#include <stdio.h>\n\nint factorial(int n) {\n  // Your code here\n  \n}\n\nint main() {\n  printf("%d", factorial(5));\n  return 0;\n}`,
        solution: `#include <stdio.h>\n\nint factorial(int n) {\n  if (n == 0 || n == 1) return 1;\n  int result = 1;\n  for (int i = 2; i <= n; i++) result *= i;\n  return result;\n}\n\nint main() {\n  printf("%d", factorial(5));\n  return 0;\n}`,
        hint: "Use a loop to multiply",
      },
      csharp: {
        language: "csharp",
        initialCode: `using System;\n\npublic class Program {\n  static int factorial(int n) {\n    // Your code here\n    \n  }\n  \n  static void Main() {\n    Console.WriteLine(factorial(5));\n  }\n}`,
        solution: `using System;\n\npublic class Program {\n  static int factorial(int n) {\n    if (n == 0 || n == 1) return 1;\n    int result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n  }\n  \n  static void Main() {\n    Console.WriteLine(factorial(5));\n  }\n}`,
        hint: "Use a loop to multiply",
      },
      java: {
        language: "java",
        initialCode: `public class Program {\n  static int factorial(int n) {\n    // Your code here\n    \n  }\n  \n  public static void main(String[] args) {\n    System.out.println(factorial(5));\n  }\n}`,
        solution: `public class Program {\n  static int factorial(int n) {\n    if (n == 0 || n == 1) return 1;\n    int result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n  }\n  \n  public static void main(String[] args) {\n    System.out.println(factorial(5));\n  }\n}`,
        hint: "Use a loop to multiply",
      },
    },
    tests: [
      { name: "factorial(5)", input: [5], expected: 120 },
      { name: "factorial(0)", input: [0], expected: 1 },
      { name: "factorial(4)", input: [4], expected: 24 },
    ],
  },
];
