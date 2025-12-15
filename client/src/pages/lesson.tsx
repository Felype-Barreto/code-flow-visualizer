import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/layout";
import { lessons } from "@/lib/lessons";
import { Language } from "@/lib/types";
import CodeEditor from "@/components/code-editor";
import CallStack from "@/components/visualizer/call-stack";
import HeapMemory from "@/components/visualizer/heap-memory";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function LessonPage() {
  const [match, params] = useRoute("/lesson/:id");
  const lessonId = params?.id || "functions";
  const lesson = lessons[lessonId];
  
  const [language, setLanguage] = useState<Language>('javascript');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);

  // Get current variant based on language, fallback to javascript if not found
  const variant = lesson?.variants[language] || lesson?.variants['javascript'];
  
  const currentStep = variant?.steps[currentStepIndex] || variant?.steps[0];
  const totalSteps = variant?.steps.length || 0;

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, speed]);

  // Reset when lesson or language changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [lessonId, language]);

  if (!lesson || !variant || !currentStep) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl text-muted-foreground">Lição não encontrada ou incompleta</h1>
        </div>
      </Layout>
    );
  }

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) setCurrentStepIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 bg-card/30 flex items-center px-6 justify-between shrink-0 gap-4">
          <div className="flex items-center gap-4 flex-1">
             <h2 className="font-bold text-lg whitespace-nowrap">{lesson.title}</h2>
             
             {/* Language Selector */}
             <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
               <SelectTrigger className="w-[140px] h-8 bg-white/5 border-white/10">
                 <SelectValue placeholder="Linguagem" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="javascript">JavaScript</SelectItem>
                 <SelectItem value="csharp">C#</SelectItem>
                 <SelectItem value="java">Java</SelectItem>
                 {lesson.variants.c && <SelectItem value="c">C</SelectItem>}
               </SelectContent>
             </Select>

             <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-muted-foreground whitespace-nowrap">
               Passo {currentStepIndex + 1} / {totalSteps}
             </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleReset} title="Reiniciar">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handlePrev} disabled={currentStepIndex === 0}>
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button 
              size="icon" 
              className={isPlaying ? "bg-amber-500 hover:bg-amber-600" : "bg-primary hover:bg-primary/90"}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleNext} disabled={currentStepIndex === totalSteps - 1}>
              <SkipForward className="w-4 h-4" />
            </Button>

            <div className="w-32 ml-4 hidden md:block">
               <span className="text-[10px] text-muted-foreground mb-1 block">Velocidade</span>
               <Slider 
                 value={[3000 - speed]} 
                 min={500} 
                 max={2500} 
                 step={100} 
                 onValueChange={(v) => setSpeed(3000 - v[0])} 
               />
            </div>
          </div>
        </div>

        {/* Main Content Resizable Panels */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            
            {/* Left Panel: Code */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="h-full p-4 flex flex-col gap-4">
                <CodeEditor code={variant.code} activeLine={currentStep.line} />
                
                {/* Explanation Box */}
                <div className="bg-card/50 border border-white/10 rounded-lg p-4 flex-1 overflow-auto">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> O que está acontecendo?
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={`${language}-${currentStepIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-lg leading-relaxed font-light"
                    >
                      {currentStep.explanation}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-white/5" />

            {/* Right Panel: Visualization */}
            <ResizablePanel defaultSize={60}>
              <ResizablePanelGroup direction="vertical">
                
                {/* Top Right: Call Stack */}
                <ResizablePanel defaultSize={50} minSize={20}>
                  <div className="h-full p-4 bg-[#0d1220]/50">
                    <CallStack stack={currentStep.stack} />
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-white/5" />

                {/* Bottom Right: Heap */}
                <ResizablePanel defaultSize={50} minSize={20}>
                   <div className="h-full p-4 bg-[#0d1220]/50">
                    <HeapMemory heap={currentStep.heap} />
                  </div>
                </ResizablePanel>

              </ResizablePanelGroup>
            </ResizablePanel>

          </ResizablePanelGroup>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-white/5 w-full">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </Layout>
  );
}
