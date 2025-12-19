import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Brain,
  Workflow,
  Target,
  Trophy,
  BookOpen,
  Code2,
  Flame,
  ClipboardCheck,
  Box,
  ListChecks,
  Hammer,
  Terminal,
  Play,
  Pause,
} from "lucide-react";
import { AlgorithmsRoadmap, FrontendRoadmap, PerformanceRoadmap, DataStructuresRoadmap } from "@/components/guided-path";
import CallStack from "@/components/visualizer/call-stack";
import HeapMemory from "@/components/visualizer/heap-memory";
import { StackFrame, HeapObject } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface LearningPath {
  id: string;
  title: string;
  progress: number;
  steps: string[];
}

const samplePaths: LearningPath[] = [
  {
    id: "frontend",
    title: "Frontend Track",
    progress: 35,
    steps: ["JS Essentials", "React Basics", "State & Hooks", "Routing", "Testing"],
  },
  {
    id: "backend",
    title: "Backend Track",
    progress: 20,
    steps: ["Node APIs", "Auth & JWT", "Databases", "Caching", "Observability"],
  },
  {
    id: "algorithms",
    title: "Algorithms Track",
    progress: 50,
    steps: ["Complexity", "Arrays", "Trees/Graphs", "DP", "System Design"],
  },
];

const dailyChallenge = {
  title: "Daily Challenge: Two Sum Variations",
  desc: "Resolva em O(n) com hash map e depois tente uma versao com dois ponteiros.",
  difficulty: "Intermediate",
  reward: "+25 XP",
};

const templateSteps: Record<string, string[]> = {
  "Todo App": ["Criar estrutura", "Configurar auth", "Persistir tarefas", "Deploy"],
  "E-commerce": ["Catálogo", "Carrinho", "Checkout", "Pagamentos"],
  "Blog": ["CMS", "SEO", "Comentários", "Deploy"],
};

const templateList = ["Todo App", "E-commerce", "Blog"];

const marketplaceTemplates = [
  { name: "Auth Starter", tag: "Next.js", price: "$0" },
  { name: "Stripe SaaS", tag: "Node", price: "$5" },
  { name: "Landing Pro", tag: "React", price: "$2" },
];

const reviewRules = [
  "Verifique nome de variaveis descritivas",
  "Evite efeitos colaterais invisiveis",
  "Garanta tratamento de erros",
  "Cubra caminhos criticos com testes",
];

const cloneStack = (stack: StackFrame[]) => stack.map((f, idx) => ({
  ...f,
  active: idx === stack.length - 1,
  variables: f.variables.map((v) => ({ ...v })),
}));

const cloneHeap = (heap: HeapObject[]) => heap.map((h) => ({
  ...h,
  properties: h.properties?.map((p) => ({ ...p })) || [],
}));

const createFibFrames = (n: number) => {
  const frames: { stack: StackFrame[]; heap: HeapObject[] }[] = [];
  const callStack: StackFrame[] = [];
  const heap: HeapObject[] = [{ id: "memo", className: "Array", properties: [] }];
  const pushState = () => {
    frames.push({ stack: cloneStack(callStack), heap: cloneHeap(heap) });
  };

  const fib = (value: number, depth: number): number => {
    const frame: StackFrame = {
      id: `${depth}-${callStack.length}-${value}`,
      name: `fib(${value})`,
      active: true,
      variables: [{ name: "n", value, type: "primitive" }],
    };
    callStack.push(frame);
    pushState();

    if (value <= 1) {
      frame.variables.push({ name: "result", value: 1, type: "primitive", changed: true });
      pushState();
      callStack.pop();
      pushState();
      return 1;
    }

    const a: number = fib(value - 1, depth + 1);
    frame.variables.push({ name: "a", value: a, type: "primitive", changed: true });
    pushState();

    const b: number = fib(value - 2, depth + 1);
    frame.variables.push({ name: "b", value: b, type: "primitive", changed: true });
    pushState();

    const result: number = a + b;
    const idx = heap[0].properties?.length || 0;
    heap[0].properties = [...(heap[0].properties || []), { name: String(idx), value: result, type: "primitive", changed: true }];
    frame.variables.push({ name: "result", value: result, type: "primitive", changed: true });
    pushState();
    callStack.pop();
    pushState();
    return result;
  };

  const clamped = Math.min(Math.max(1, n), 7);
  fib(clamped, 0);
  return frames;
};

const createFactorialFrames = (n: number) => {
  const frames: { stack: StackFrame[]; heap: HeapObject[] }[] = [];
  const callStack: StackFrame[] = [];
  const heap: HeapObject[] = [];
  const pushState = () => {
    frames.push({ stack: cloneStack(callStack), heap: cloneHeap(heap) });
  };

  const factorial = (value: number, depth: number): number => {
    const frame: StackFrame = {
      id: `${depth}-factorial-${value}`,
      name: `factorial(${value})`,
      active: true,
      variables: [{ name: "n", value, type: "primitive" }],
    };
    callStack.push(frame);
    pushState();

    if (value <= 1) {
      frame.variables.push({ name: "result", value: 1, type: "primitive", changed: true });
      pushState();
      callStack.pop();
      pushState();
      return 1;
    }

    const result = value * factorial(value - 1, depth + 1);
    frame.variables.push({ name: "result", value: result, type: "primitive", changed: true });
    pushState();
    callStack.pop();
    pushState();
    return result;
  };

  const clamped = Math.min(Math.max(1, n), 7);
  factorial(clamped, 0);
  return frames;
};

const createSumArrayFrames = (n: number) => {
  const frames: { stack: StackFrame[]; heap: HeapObject[] }[] = [];
  const callStack: StackFrame[] = [];
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const heap: HeapObject[] = [{ id: "arr", className: "Array", properties: arr.map((v, i) => ({ name: String(i), value: v, type: "primitive" })) }];
  const pushState = () => {
    frames.push({ stack: cloneStack(callStack), heap: cloneHeap(heap) });
  };

  const frame: StackFrame = {
    id: "sumArray",
    name: "sumArray(arr)",
    active: true,
    variables: [
      { name: "arr", value: "arr@heap", type: "reference" },
      { name: "sum", value: 0, type: "primitive" },
    ],
  };
  callStack.push(frame);
  pushState();

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    frame.variables.push({ name: "i", value: i, type: "primitive", changed: true });
    pushState();
    sum += arr[i];
    frame.variables = frame.variables.filter(v => v.name !== "sum");
    frame.variables.push({ name: "sum", value: sum, type: "primitive", changed: true });
    pushState();
  }

  frame.variables.push({ name: "result", value: sum, type: "primitive", changed: true });
  pushState();
  callStack.pop();
  pushState();
  return frames;
};

const createNestedLoopsFrames = (n: number) => {
  const frames: { stack: StackFrame[]; heap: HeapObject[] }[] = [];
  const callStack: StackFrame[] = [];
  const heap: HeapObject[] = [];
  const pushState = () => {
    frames.push({ stack: cloneStack(callStack), heap: cloneHeap(heap) });
  };

  const frame: StackFrame = {
    id: "nestedLoops",
    name: `nestedLoops(${n})`,
    active: true,
    variables: [{ name: "n", value: n, type: "primitive" }],
  };
  callStack.push(frame);
  pushState();

  for (let i = 0; i < n; i++) {
    frame.variables = frame.variables.filter(v => !v.name.startsWith("i") && !v.name.startsWith("j"));
    frame.variables.push({ name: "i", value: i, type: "primitive", changed: true });
    pushState();
    for (let j = 0; j < n; j++) {
      frame.variables = frame.variables.filter(v => v.name !== "j");
      frame.variables.push({ name: "j", value: j, type: "primitive", changed: true });
      pushState();
    }
  }

  callStack.pop();
  pushState();
  return frames;
};

export function ProAdvancedFeatures() {
  const { t } = useLanguage();
  // Removido: AI Code Mentor e Project Builder (conforme solicitado)

  const [challengeAccepted, setChallengeAccepted] = useState(false);

  const [paths, setPaths] = useState<LearningPath[]>(samplePaths);

  const [genPrompt, setGenPrompt] = useState("Create a debounce function in JavaScript");
  const [genLanguage, setGenLanguage] = useState("JavaScript");
  const [genResult, setGenResult] = useState<string>("");
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  
  const genExamples = [
    { label: "Debounce", prompt: "Create a debounce function in JavaScript", lang: "JavaScript" },
    { label: "Deep Clone", prompt: "Create a function to deep clone an object", lang: "JavaScript" },
    { label: "Binary Search", prompt: "Implement binary search algorithm", lang: "Python" },
    { label: "Throttle", prompt: "Create a throttle function with leading/trailing options", lang: "JavaScript" },
  ];

  const [reviewInput, setReviewInput] = useState("function add(a,b){return a+b}");
  const [reviewFindings, setReviewFindings] = useState<string[]>([]);

  const [liveFrameIdx, setLiveFrameIdx] = useState(0);
  const [livePlaying, setLivePlaying] = useState(true);
  const [liveIntervalMs, setLiveIntervalMs] = useState(1100);
  const [liveInputN, setLiveInputN] = useState(5);
  const [liveFrames, setLiveFrames] = useState<Array<{ stack: StackFrame[]; heap: HeapObject[] }>>(() => createFibFrames(5));
  const [selectedExample, setSelectedExample] = useState<string>("fib");
  
  const realtimeExamples = [
    { id: "fib", label: "Fibonacci", desc: "Recursão clássica que mostra múltiplas chamadas empilhadas", n: 5 },
    { id: "factorial", label: "Fatorial", desc: "Recursão simples com uma chamada por vez", n: 5 },
    { id: "sum", label: "Soma Array", desc: "Loop que percorre elementos somando valores", n: 4 },
    { id: "nested", label: "Loops Aninhados", desc: "Veja como loops se comportam quando um está dentro do outro", n: 3 },
  ];
  
  const liveSampleScript = selectedExample === "fib" ? [
    "function fib(n){",
    "  if(n <= 1) return 1;",
    "  const a = fib(n-1);",
    "  const b = fib(n-2);",
    "  return a + b;",
    "}",
    "fib(5);",
  ].join("\n") : selectedExample === "factorial" ? [
    "function factorial(n){",
    "  if(n <= 1) return 1;",
    "  return n * factorial(n-1);",
    "}",
    "factorial(5);",
  ].join("\n") : selectedExample === "sum" ? [
    "function sumArray(arr){",
    "  let sum = 0;",
    "  for(let i=0; i<arr.length; i++){",
    "    sum += arr[i];",
    "  }",
    "  return sum;",
    "}",
    "sumArray([1,2,3,4]);",
  ].join("\n") : [
    "function nestedLoops(n){",
    "  for(let i=0; i<n; i++){",
    "    for(let j=0; j<n; j++){",
    "      console.log(i,j);",
    "    }",
    "  }",
    "}",
    "nestedLoops(3);",
  ].join("\n");

  useEffect(() => {
    if (!livePlaying) return;
    const total = liveFrames.length;
    const interval = Math.max(400, liveIntervalMs);
    const id = setInterval(() => {
      setLiveFrameIdx((prev) => {
        const next = prev + 1;
        if (next >= total) {
          setLivePlaying(false);
          return total - 1;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [livePlaying, liveFrames.length, liveIntervalMs]);

  const regenerateFrames = () => {
    let frames;
    switch (selectedExample) {
      case "fib":
        frames = createFibFrames(liveInputN);
        break;
      case "factorial":
        frames = createFactorialFrames(liveInputN);
        break;
      case "sum":
        frames = createSumArrayFrames(liveInputN);
        break;
      case "nested":
        frames = createNestedLoopsFrames(liveInputN);
        break;
      default:
        frames = createFibFrames(liveInputN);
    }
    setLiveFrames(frames);
    setLiveFrameIdx(0);
    setLivePlaying(true);
  };

  // Mentor & Builder removidos

  const incrementPath = (id: string) => {
    setPaths((prev) =>
      prev.map((p) => (p.id === id ? { ...p, progress: Math.min(100, p.progress + 10) } : p))
    );
  };

  const generateCode = async () => {
    setGenLoading(true);
    setGenError(null);
    try {
      // Simulação de API (em produção, fazer chamada real para AI)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const lang = genLanguage;
      const base = genPrompt.toLowerCase();
      
      if (base.includes("debounce")) {
        setGenResult(`// ${lang} debounce implementation\nfunction debounce(fn, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      fn(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}\n\n// Example usage:\nconst debouncedSearch = debounce((query) => {\n  console.log('Searching for:', query);\n}, 300);`);
      } else if (base.includes("throttle")) {
        setGenResult(`// ${lang} throttle implementation\nfunction throttle(fn, wait, options = {}) {\n  let timeout;\n  let previous = 0;\n  const { leading = true, trailing = true } = options;\n  \n  return function(...args) {\n    const now = Date.now();\n    if (!previous && !leading) previous = now;\n    const remaining = wait - (now - previous);\n    \n    if (remaining <= 0 || remaining > wait) {\n      if (timeout) {\n        clearTimeout(timeout);\n        timeout = null;\n      }\n      previous = now;\n      fn(...args);\n    } else if (!timeout && trailing) {\n      timeout = setTimeout(() => {\n        previous = leading ? Date.now() : 0;\n        timeout = null;\n        fn(...args);\n      }, remaining);\n    }\n  };\n}`);
      } else if (base.includes("clone") || base.includes("deep")) {
        setGenResult(`// ${lang} deep clone implementation\nfunction deepClone(obj, hash = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof RegExp) return new RegExp(obj);\n  if (hash.has(obj)) return hash.get(obj);\n  \n  const clone = Array.isArray(obj) ? [] : {};\n  hash.set(obj, clone);\n  \n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = deepClone(obj[key], hash);\n    }\n  }\n  \n  return clone;\n}\n\n// Example:\nconst original = { a: 1, b: { c: 2 }, d: [3, 4] };\nconst cloned = deepClone(original);`);
      } else if (base.includes("binary") && base.includes("search")) {
        setGenResult(`# ${lang} binary search\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    \n    return -1\n\n# Example:\narray = [1, 3, 5, 7, 9, 11, 13]\nresult = binary_search(array, 7)\nprint(f"Index: {result}")  # Output: 3`);
      } else if (base.includes("api") || base.includes("fetch")) {
        setGenResult(`// ${lang} robust fetch with error handling\nasync function fetchData(url, options = {}) {\n  try {\n    const response = await fetch(url, {\n      headers: {\n        'Content-Type': 'application/json',\n        ...options.headers,\n      },\n      ...options,\n    });\n    \n    if (!response.ok) {\n      throw new Error(\`HTTP error! status: \${response.status}\`);\n    }\n    \n    return await response.json();\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}\n\n// Usage:\nfetchData('/api/users')\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`);
      } else {
        setGenResult(`// ${lang} implementation\n// TODO: Specify your requirements more clearly\n// Examples:\n// - "Create a debounce function"\n// - "Implement binary search"\n// - "Deep clone object"\n\nfunction solution() {\n  // Your implementation here\n}`);
      }
    } catch (error) {
      setGenError("Erro ao gerar código. Tente novamente.");
    } finally {
      setGenLoading(false);
    }
  };

  const reviewCode = () => {
    const findings: string[] = [];
    if (!/test|assert/i.test(reviewInput)) findings.push("Adicione testes para cobrir casos base e bordas");
    if (/var\s+/.test(reviewInput)) findings.push("Prefira const/let no lugar de var");
    if (/console\.log/.test(reviewInput)) findings.push("Remova logs em producao");
    if (findings.length === 0) findings.push("Nenhum problema critico encontrado");
    setReviewFindings(findings);
  };

  const renderPath = (p: LearningPath) => (
    <Card key={p.id} className="p-4 bg-slate-900/60 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white font-semibold">
          <BookOpen className="w-4 h-4 text-amber-300" />
          {p.title}
        </div>
        <span className="text-xs text-amber-200">{p.progress}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded">
        <div
          className="h-2 bg-amber-400 rounded"
          style={{ width: `${p.progress}%` }}
        />
      </div>
      <ul className="mt-3 text-xs text-gray-300 space-y-1">
        {p.steps.map((s, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ListChecks className="w-3 h-3 text-amber-200" />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end">
        <Button size="sm" variant="outline" className="border-amber-300/40" onClick={() => incrementPath(p.id)}>
          Marcar progresso +10%
        </Button>
      </div>
    </Card>
  );

  const flameData = useMemo(
    () => [
      { name: "main", pct: 40 },
      { name: "parseInput", pct: 25 },
      { name: "compute", pct: 20 },
      { name: "format", pct: 15 },
    ],
    []
  );

  return (
    <div className="space-y-8">
      {/* Mentor & Builder removidos */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Challenges Arena */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-amber-300" />
            <h3 className="text-lg font-semibold text-white">Challenges Arena</h3>
          </div>
          <p className="text-sm text-gray-200">{dailyChallenge.title}</p>
          <p className="text-xs text-gray-400 mt-1">{dailyChallenge.desc}</p>
          <div className="text-xs text-gray-300 mt-2">{dailyChallenge.difficulty} • {dailyChallenge.reward}</div>
          <Button className="mt-3" size="sm" onClick={() => setChallengeAccepted(true)}>
            {challengeAccepted ? "Em andamento" : "Aceitar desafio"}
          </Button>
        </Card>

        {/* Learning Paths */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <h3 className="text-lg font-semibold text-white">Learning Paths</h3>
          </div>
          <div className="space-y-3">
            {paths.map((p) => renderPath(p))}
          </div>
        </Card>

        {/* AI Code Generator */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-cyan-300" />
            <h3 className="text-lg font-semibold text-white">AI Code Generator</h3>
          </div>
          <input
            className="w-full text-sm bg-black/50 border border-cyan-400/30 rounded px-3 py-2 text-white"
            value={genPrompt}
            onChange={(e) => setGenPrompt(e.target.value)}
          />
          <div className="flex gap-2 mt-2 text-sm text-white">
            <select
              value={genLanguage}
              onChange={(e) => setGenLanguage(e.target.value)}
              className="bg-black/50 border border-cyan-400/30 rounded px-2 py-1"
            >
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>Python</option>
            </select>
            <Button size="sm" onClick={generateCode}>Gerar</Button>
          </div>
          <pre className="mt-3 bg-black/60 text-xs text-cyan-100 rounded p-3 h-32 overflow-auto">{genResult}</pre>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Profiler Pro */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-amber-300" />
            <h3 className="text-lg font-semibold text-white">{t.perfProfilerTitle}</h3>
          </div>
          <p className="text-sm text-gray-200">{t.perfProfilerDesc}</p>
          <div className="space-y-2 mt-3">
            {flameData.map((f) => (
              <div key={f.name} className="text-xs text-gray-200">
                <span className="text-amber-300 font-semibold">{f.name}</span> — {f.pct}%
                <div className="h-2 bg-black/40 rounded mt-1">
                  <div className="h-2 bg-amber-400 rounded" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Realtime Code Visualizer */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-cyan-300" />
            <h3 className="text-lg font-semibold text-white">{t.realtimeVisualizerTitle || "Realtime Code Visualizer"}</h3>
          </div>
          <p className="text-sm text-gray-200 mb-3">{t.realtimeVisualizerDesc || "See call stack and heap updating in real time during recursion (fibonacci)."}</p>
          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-cyan-50">
            <span className={`px-2 py-1 rounded-full border shadow-[0_0_0_1px_rgba(34,211,238,0.25)] ${livePlaying ? "border-emerald-300/60 bg-emerald-700/40 text-emerald-50" : "border-cyan-300/60 bg-cyan-800/40 text-cyan-50"}`}>
              {livePlaying ? (t.realTimeExecution || t.play || "playing") : (t.pause || "paused")}
            </span>
            <div className="inline-flex items-center gap-2">
              <span className="text-cyan-100/80">{t.exampleLabel || "Example:"}</span>
              <select
                className="px-2 py-1 rounded border border-cyan-400/40 bg-slate-950/70 text-cyan-50"
                value={selectedExample}
                onChange={(e) => setSelectedExample(e.target.value)}
              >
                {realtimeExamples.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.id === "fib" ? (t.realtimeExampleFib || ex.label) :
                     ex.id === "factorial" ? (t.realtimeExampleFactorial || ex.label) :
                     ex.id === "sum" ? (t.realtimeExampleSum || ex.label) :
                     ex.id === "nested" ? (t.realtimeExampleNested || ex.label) : ex.label}
                  </option>
                ))}
              </select>
            </div>
            <Button size="sm" variant="outline" className="border-cyan-300/70 text-cyan-50 hover:bg-cyan-500/15" onClick={() => setLivePlaying((p) => !p)}>
              {livePlaying ? <><Pause className="w-3 h-3 mr-1" /> {t.pause}</> : <><Play className="w-3 h-3 mr-1" /> {t.play}</>}
            </Button>
            <Button size="sm" variant="ghost" className="text-cyan-100 hover:bg-cyan-500/10" onClick={() => { setLiveFrameIdx(0); setLivePlaying(true); }}>
              {t.restart}
            </Button>
            <div className="flex items-center gap-1 ml-auto">
              {[800, 1100, 1500].map((ms) => (
                <button
                  key={ms}
                  onClick={() => setLiveIntervalMs(ms)}
                  className={`px-2 py-1 rounded border text-[11px] ${liveIntervalMs === ms ? "bg-cyan-500/20 border-cyan-300/60 text-cyan-50" : "bg-slate-900/60 border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/10"}`}
                >
                  {ms}ms
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <input
                type="number"
                min={1}
                max={7}
                value={liveInputN}
                onChange={(e) => setLiveInputN(Math.min(7, Math.max(1, Number(e.target.value) || 1)))}
                className="w-16 rounded border border-cyan-400/40 bg-slate-950/70 text-cyan-50 text-xs px-2 py-1"
                aria-label={t.realtimeFibInputLabel || "Fib input"}
              />
              <Button size="sm" variant="outline" className="border-emerald-300/60 text-emerald-50 hover:bg-emerald-500/15" onClick={regenerateFrames}>
                {t.proGenerateFrames || "Generate frames"}
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-cyan-950/40 rounded-lg border border-cyan-300/35 shadow-[0_0_0_1px_rgba(34,211,238,0.15)] p-3 max-h-72 overflow-auto">
              <CallStack stack={liveFrames[liveFrameIdx].stack} />
            </div>
            <div className="bg-emerald-950/40 rounded-lg border border-emerald-300/35 shadow-[0_0_0_1px_rgba(16,185,129,0.18)] p-3 max-h-72 overflow-auto">
              <HeapMemory heap={liveFrames[liveFrameIdx].heap} />
            </div>
          </div>
          <div className="mt-3 bg-slate-950/70 border border-cyan-400/25 rounded-lg p-3">
            <div className="text-xs text-cyan-100 mb-2">{t.proFramesScriptDesc || "Script that generates frames (simulated local execution)"}</div>
            <pre className="text-[11px] leading-relaxed text-cyan-50 font-mono overflow-auto bg-black/40 border border-cyan-400/20 rounded p-3 max-h-40">
{liveSampleScript}
            </pre>
          </div>
        </Card>

        {/* Code Review Bot */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="w-4 h-4 text-green-300" />
            <h3 className="text-lg font-semibold text-white">{t.codeReviewBotTitle}</h3>
          </div>
          <textarea
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            className="w-full h-24 bg-black/50 border border-green-400/30 rounded p-2 text-sm text-white"
          />
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={reviewCode}>{t.codeReviewBotAnalyze}</Button>
          </div>
          <ul className="mt-3 text-sm text-green-100 space-y-1">
            {reviewFindings.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ListChecks className="w-3 h-3 text-green-300" />
                {f}
              </li>
            ))}
            {reviewFindings.length === 0 && <li className="text-gray-400 text-sm">{t.codeReviewBotEmpty}</li>}
          </ul>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Debug 3D Visualization */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-300" />
            <h3 className="text-lg font-semibold text-white">{t.debug3dTitle}</h3>
          </div>
          <p className="text-sm text-gray-200">{t.debug3dDesc}</p>
          <div className="mt-3 h-32 bg-black/40 rounded flex items-center justify-center text-xs text-gray-400">
            {t.debug3dPlaceholder}
          </div>
        </Card>

        {/* Templates Marketplace */}
        <Card className="p-4 bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Box className="w-4 h-4 text-blue-300" />
            <h3 className="text-lg font-semibold text-white">{t.templatesMarketplaceTitle}</h3>
          </div>
          <div className="space-y-2">
            {marketplaceTemplates.map((tpl) => (
              <Card key={tpl.name} className="p-3 bg-black/40 border border-blue-400/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">
                    <span className="font-semibold">{tpl.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{tpl.tag}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-blue-200">{tpl.price}</span>
                    <Button size="sm" variant="outline" className="border-blue-300/40 text-blue-100">
                      <Terminal className="w-3 h-3 mr-1" /> {t.templatesUseTemplate}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Guided Roadmaps */}
      <div className="grid md:grid-cols-2 gap-6">
        <AlgorithmsRoadmap />
        <FrontendRoadmap />
        <PerformanceRoadmap />
        <DataStructuresRoadmap />
      </div>
    </div>
  );
}
