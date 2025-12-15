export interface Variable {
  name: string;
  value: string | number | boolean | null | undefined;
  type: 'primitive' | 'reference';
  refId?: string; // If type is reference, this points to a HeapObject id
  changed?: boolean; // For highlighting changes
}

export interface StackFrame {
  id: string;
  name: string; // Function name like "main()" or "calculate()"
  variables: Variable[];
  active: boolean;
  isClosing?: boolean; // For animation out
}

export interface HeapObject {
  id: string;
  className: string; // "Object", "Array", "User", etc.
  properties: Variable[];
  highlight?: boolean;
}

export interface Step {
  stepId: number;
  line: number; // The line number in the code that is currently executing
  stack: StackFrame[];
  heap: HeapObject[];
  explanation: string; // What is happening right now?
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  code: string;
  steps: Step[];
}
