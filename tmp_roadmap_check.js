import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/roadmap-path.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/@fs/C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=64ed6eb1"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import __vite__cjsImport1_react from "/@fs/C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/node_modules/.vite/deps/react.js?v=64ed6eb1"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useRef = __vite__cjsImport1_react["useRef"]; const useState = __vite__cjsImport1_react["useState"];
import { Lock, Unlock } from "/@fs/C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/node_modules/.vite/deps/lucide-react.js?v=64ed6eb1";
import { useUser } from "/src/hooks/use-user.ts";
import { GuidedPath } from "/src/components/guided-path.tsx";
import ReactMarkdown from "/@fs/C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/node_modules/.vite/deps/react-markdown.js?v=64ed6eb1";
import { runTestsInWorker } from "/src/lib/testRunner.ts";
export default function RoadmapPath() {
  _s();
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLocked, setSelectedLocked] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const purchasedSet = useMemo(() => new Set(purchases), [purchases]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/roadmap");
        if (!res.ok) return;
        const j = await res.json();
        setItems(Array.isArray(j.items) ? j.items : []);
      } catch (e) {
      }
    })();
    (async () => {
      try {
        const res = await fetch("/api/monetization/purchases");
        if (!res.ok) return;
        const j = await res.json();
        if (Array.isArray(j.purchases)) setPurchases(j.purchases.map((p) => p.itemId));
      } catch (e) {
      }
    })();
  }, []);
  const paths = useMemo(() => {
    const by = {};
    for (const it of items) (by[it.pathId] ||= []).push(it);
    for (const k of Object.keys(by)) by[k].sort((a, b) => (a.order || 0) - (b.order || 0));
    return by;
  }, [items]);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!selectedSlug) {
      setSelectedItem(null);
      setSelectedLocked(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/roadmap/${encodeURIComponent(selectedSlug)}`);
        if (!res.ok) return;
        const j = await res.json();
        setSelectedItem(j.item || null);
        setSelectedLocked(Boolean(j.locked || j.item?.isPro));
      } catch (e) {
      }
    })();
  }, [selectedSlug]);
  async function startPurchase(itemId) {
    try {
      const res = await fetch("/api/monetization/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: "roadmap_item", itemId })
      });
      const j = await res.json();
      if (j?.checkoutUrl) window.location.href = j.checkoutUrl;
    } catch (e) {
      alert("Falha ao iniciar compra");
    }
  }
  return /* @__PURE__ */ jsxDEV("div", { ref: containerRef, className: "space-y-6", children: [
    Object.keys(paths).map(
      (pathId) => /* @__PURE__ */ jsxDEV("section", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold", children: pathId }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3 overflow-x-auto py-2", children: paths[pathId].map((it) => {
          const locked = it.isPro && !purchasedSet.has(`roadmap:${it.slug}`);
          return /* @__PURE__ */ jsxDEV("div", { className: "relative w-44 p-3 rounded bg-slate-800 text-white", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 flex items-center justify-center rounded bg-slate-700", children: it.icon || "•" }, void 0, false, {
                fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                lineNumber: 96,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 text-sm", children: it.title }, void 0, false, {
                fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                lineNumber: 97,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
              lineNumber: 95,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs text-slate-300", children: it.summary }, void 0, false, {
              fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
              lineNumber: 99,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-3 flex gap-2", children: [
              /* @__PURE__ */ jsxDEV("button", { className: "px-2 py-1 bg-amber-500 text-black rounded text-xs", onClick: () => setSelectedSlug(it.slug), children: "Open" }, void 0, false, {
                fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                lineNumber: 101,
                columnNumber: 21
              }, this),
              locked ? /* @__PURE__ */ jsxDEV("button", { className: "px-2 py-1 bg-slate-700 text-xs rounded flex items-center gap-1", onClick: () => startPurchase(`roadmap:${it.slug}`), children: [
                /* @__PURE__ */ jsxDEV(Lock, { size: 14 }, void 0, false, {
                  fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                  lineNumber: 103,
                  columnNumber: 154
                }, this),
                " Pro"
              ] }, void 0, true, {
                fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                lineNumber: 103,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDEV("button", { className: "px-2 py-1 bg-slate-700 text-xs rounded flex items-center gap-1", onClick: () => {
                setSelectedSlug(it.slug);
                setShowPractice(true);
              }, children: [
                /* @__PURE__ */ jsxDEV(Unlock, { size: 14 }, void 0, false, {
                  fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                  lineNumber: 105,
                  columnNumber: 168
                }, this),
                " Practice"
              ] }, void 0, true, {
                fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
                lineNumber: 105,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
              lineNumber: 100,
              columnNumber: 19
            }, this)
          ] }, it.slug, true, {
            fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this);
        }) }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 90,
          columnNumber: 11
        }, this)
      ] }, pathId, true, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 88,
        columnNumber: 7
      }, this)
    ),
    selectedSlug && selectedItem && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded w-full max-w-3xl p-6 text-white", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-bold", children: selectedItem.title }, void 0, false, {
            fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
            lineNumber: 120,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-amber-200", children: selectedItem.summary }, void 0, false, {
            fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
            lineNumber: 121,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 119,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxDEV("button", { className: "text-amber-200", onClick: () => {
          setSelectedSlug(null);
          setShowPractice(false);
        }, children: "Close" }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 124,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 123,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 118,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 prose max-w-none text-sm text-gray-200", children: selectedLocked ? /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "mb-3", children: "Conteúdo Pro — bloqueado." }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 131,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: /* @__PURE__ */ jsxDEV(ReactMarkdown, { children: selectedItem.contentPreview || selectedItem.summary || "" }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 132,
          columnNumber: 41
        }, this) }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 132,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "bg-amber-500 text-black px-3 py-2 rounded", onClick: () => startPurchase(`roadmap:${selectedItem.slug}`), children: "Comprar Pro" }, void 0, false, {
            fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
            lineNumber: 134,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("a", { className: "px-3 py-2 border rounded", href: "/signup", children: "Criar conta" }, void 0, false, {
            fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
            lineNumber: 135,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 133,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 130,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsxDEV(ReactMarkdown, { children: selectedItem.content || selectedItem.summary || "" }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 140,
          columnNumber: 53
        }, this) }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 140,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4", children: /* @__PURE__ */ jsxDEV("button", { className: "bg-emerald-500 text-black px-3 py-2 rounded", onClick: () => setShowPractice(true), children: "Praticar" }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 142,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 141,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 139,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 128,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
      lineNumber: 117,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    selectedSlug && showPractice && selectedItem && !selectedLocked && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 rounded w-full max-w-4xl p-4 text-white", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-semibold", children: [
          "Practice: ",
          selectedItem.title
        ] }, void 0, true, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 155,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { className: "text-amber-200", onClick: () => setShowPractice(false), children: "Close" }, void 0, false, {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 156,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
        lineNumber: 154,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        GuidedPath,
        {
          id: `roadmap-single-${selectedItem.slug}`,
          title: selectedItem.title,
          steps: [{
            id: selectedItem.slug,
            title: selectedItem.title,
            lesson: (selectedItem.content || selectedItem.summary || "").split("\n\n"),
            taskPrompt: selectedItem.summary || "Implemente este exercício",
            check: async (code) => {
              try {
                const starter = selectedItem.starterCode || "";
                const tests = selectedItem.tests || [];
                const res = await runTestsInWorker(starter, code, tests);
                return res;
              } catch (e) {
                return { ok: false, messages: [e?.message || String(e)] };
              }
            }
          }]
        },
        void 0,
        false,
        {
          fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
          lineNumber: 158,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}
_s(RoadmapPath, "SQ+F6lT7fg7uDtaKH1RMfAaM11k=", false, function() {
  return [useUser];
});
_c = RoadmapPath;
var _c;
$RefreshReg$(_c, "RoadmapPath");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "C:/Users/Al-inglity/Downloads/site codeflow/Code-Flow-Visualizer/client/src/components/roadmap-path.tsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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a0JBQWtCTCxhQUFhb0QsSUFBSTtBQUFBLFVBQ3ZDLE9BQU9wRCxhQUFhc0Q7QUFBQUEsVUFDcEIsT0FBTyxDQUFDO0FBQUEsWUFDTkksSUFBSTFELGFBQWFvRDtBQUFBQSxZQUNqQkUsT0FBT3RELGFBQWFzRDtBQUFBQSxZQUNwQkssU0FBUzNELGFBQWF5RCxXQUFXekQsYUFBYXVELFdBQVcsSUFBSUssTUFBTSxNQUFNO0FBQUEsWUFDekVDLFlBQVk3RCxhQUFhdUQsV0FBVztBQUFBLFlBQ3BDTyxPQUFPLE9BQU9DLFNBQWlCO0FBQzdCLGtCQUFJO0FBQ0Ysc0JBQU1DLFVBQVVoRSxhQUFhaUUsZUFBZTtBQUM1QyxzQkFBTUMsUUFBUWxFLGFBQWFrRSxTQUFTO0FBQ3BDLHNCQUFNeEQsTUFBTSxNQUFNbEIsaUJBQWlCd0UsU0FBU0QsTUFBTUcsS0FBSztBQUN2RCx1QkFBT3hEO0FBQUFBLGNBQ1QsU0FBU08sR0FBUTtBQUFFLHVCQUFPLEVBQUVMLElBQUksT0FBT3VELFVBQVUsQ0FBQ2xELEdBQUdtRCxXQUFXQyxPQUFPcEQsQ0FBQyxDQUFDLEVBQUU7QUFBQSxjQUFHO0FBQUEsWUFDaEY7QUFBQSxVQUNGLENBQUM7QUFBQTtBQUFBLFFBaEJIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWdCSztBQUFBLFNBckJQO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F1QkEsS0F4QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQXlCQTtBQUFBLE9BM0ZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0E2RkE7QUFFSjtBQUFDdkIsR0EvSnVCRCxhQUFXO0FBQUEsVUFDaEJKLE9BQU87QUFBQTtBQUFBaUYsS0FERjdFO0FBQVcsSUFBQTZFO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwidXNlUmVmIiwidXNlU3RhdGUiLCJMb2NrIiwiVW5sb2NrIiwidXNlVXNlciIsIkd1aWRlZFBhdGgiLCJSZWFjdE1hcmtkb3duIiwicnVuVGVzdHNJbldvcmtlciIsIlJvYWRtYXBQYXRoIiwiX3MiLCJ1c2VyIiwiaXRlbXMiLCJzZXRJdGVtcyIsInNlbGVjdGVkU2x1ZyIsInNldFNlbGVjdGVkU2x1ZyIsInNlbGVjdGVkSXRlbSIsInNldFNlbGVjdGVkSXRlbSIsInNlbGVjdGVkTG9ja2VkIiwic2V0U2VsZWN0ZWRMb2NrZWQiLCJzaG93UHJhY3RpY2UiLCJzZXRTaG93UHJhY3RpY2UiLCJwdXJjaGFzZXMiLCJzZXRQdXJjaGFzZXMiLCJwdXJjaGFzZWRTZXQiLCJTZXQiLCJyZXMiLCJmZXRjaCIsIm9rIiwiaiIsImpzb24iLCJBcnJheSIsImlzQXJyYXkiLCJlIiwibWFwIiwicCIsIml0ZW1JZCIsInBhdGhzIiwiYnkiLCJpdCIsInBhdGhJZCIsInB1c2giLCJrIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJhIiwiYiIsIm9yZGVyIiwiY29udGFpbmVyUmVmIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaXRlbSIsIkJvb2xlYW4iLCJsb2NrZWQiLCJpc1BybyIsInN0YXJ0UHVyY2hhc2UiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYWNrYWdlSWQiLCJjaGVja291dFVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImFsZXJ0IiwiaGFzIiwic2x1ZyIsImljb24iLCJ0aXRsZSIsInN1bW1hcnkiLCJjb250ZW50UHJldmlldyIsImNvbnRlbnQiLCJpZCIsImxlc3NvbiIsInNwbGl0IiwidGFza1Byb21wdCIsImNoZWNrIiwiY29kZSIsInN0YXJ0ZXIiLCJzdGFydGVyQ29kZSIsInRlc3RzIiwibWVzc2FnZXMiLCJtZXNzYWdlIiwiU3RyaW5nIiwiX2MiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsicm9hZG1hcC1wYXRoLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyLvu79pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTG9jaywgVW5sb2NrIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZVVzZXIgfSBmcm9tICdAL2hvb2tzL3VzZS11c2VyJztcbmltcG9ydCB7IEd1aWRlZFBhdGggfSBmcm9tICcuL2d1aWRlZC1wYXRoJztcbmltcG9ydCBSZWFjdE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJztcbmltcG9ydCB7IHJ1blRlc3RzSW5Xb3JrZXIgfSBmcm9tICdAL2xpYi90ZXN0UnVubmVyJztcblxudHlwZSBSb2FkbWFwSXRlbSA9IHtcbiAgc2x1Zzogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdW1tYXJ5Pzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBwYXRoSWQ6IHN0cmluZztcbiAgb3JkZXI/OiBudW1iZXI7XG4gIGlzUHJvPzogYm9vbGVhbjtcbiAgY29udGVudD86IHN0cmluZztcbiAgY29udGVudFByZXZpZXc/OiBzdHJpbmc7XG4gIHN0YXJ0ZXJDb2RlPzogc3RyaW5nO1xuICB0ZXN0cz86IGFueVtdO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm9hZG1hcFBhdGgoKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgeyB1c2VyIH0gPSB1c2VVc2VyKCk7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8Um9hZG1hcEl0ZW1bXT4oW10pO1xuICBjb25zdCBbc2VsZWN0ZWRTbHVnLCBzZXRTZWxlY3RlZFNsdWddID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW0sIHNldFNlbGVjdGVkSXRlbV0gPSB1c2VTdGF0ZTxSb2FkbWFwSXRlbSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRMb2NrZWQsIHNldFNlbGVjdGVkTG9ja2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dQcmFjdGljZSwgc2V0U2hvd1ByYWN0aWNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3B1cmNoYXNlcywgc2V0UHVyY2hhc2VzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IHB1cmNoYXNlZFNldCA9IHVzZU1lbW8oKCkgPT4gbmV3IFNldChwdXJjaGFzZXMpLCBbcHVyY2hhc2VzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvcm9hZG1hcCcpO1xuICAgICAgICBpZiAoIXJlcy5vaykgcmV0dXJuO1xuICAgICAgICBjb25zdCBqID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgc2V0SXRlbXMoQXJyYXkuaXNBcnJheShqLml0ZW1zKSA/IGouaXRlbXMgOiBbXSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIGlnbm9yZSAqLyB9XG4gICAgfSkoKTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9tb25ldGl6YXRpb24vcHVyY2hhc2VzJyk7XG4gICAgICAgIGlmICghcmVzLm9rKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGogPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqLnB1cmNoYXNlcykpIHNldFB1cmNoYXNlcyhqLnB1cmNoYXNlcy5tYXAoKHA6YW55KSA9PiBwLml0ZW1JZCkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBpZ25vcmUgKi8gfVxuICAgIH0pKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBwYXRocyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGJ5OiBSZWNvcmQ8c3RyaW5nLCBSb2FkbWFwSXRlbVtdPiA9IHt9O1xuICAgIGZvciAoY29uc3QgaXQgb2YgaXRlbXMpIChieVtpdC5wYXRoSWRdIHx8PSBbXSkucHVzaChpdCk7XG4gICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKGJ5KSkgYnlba10uc29ydCgoYSwgYikgPT4gKGEub3JkZXIgfHwgMCkgLSAoYi5vcmRlciB8fCAwKSk7XG4gICAgcmV0dXJuIGJ5O1xuICB9LCBbaXRlbXNdKTtcblxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghc2VsZWN0ZWRTbHVnKSB7IHNldFNlbGVjdGVkSXRlbShudWxsKTsgc2V0U2VsZWN0ZWRMb2NrZWQoZmFsc2UpOyByZXR1cm47IH1cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvcm9hZG1hcC8ke2VuY29kZVVSSUNvbXBvbmVudChzZWxlY3RlZFNsdWcpfWApO1xuICAgICAgICBpZiAoIXJlcy5vaykgcmV0dXJuO1xuICAgICAgICBjb25zdCBqID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRJdGVtKGouaXRlbSB8fCBudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0ZWRMb2NrZWQoQm9vbGVhbihqLmxvY2tlZCB8fCBqLml0ZW0/LmlzUHJvKSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIGlnbm9yZSAqLyB9XG4gICAgfSkoKTtcbiAgfSwgW3NlbGVjdGVkU2x1Z10pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHN0YXJ0UHVyY2hhc2UoaXRlbUlkOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvbW9uZXRpemF0aW9uL2NyZWF0ZS1wYXltZW50Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJywgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGFja2FnZUlkOiAncm9hZG1hcF9pdGVtJywgaXRlbUlkIH0pLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBqID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGlmIChqPy5jaGVja291dFVybCkgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBqLmNoZWNrb3V0VXJsO1xuICAgIH0gY2F0Y2ggKGUpIHsgYWxlcnQoJ0ZhbGhhIGFvIGluaWNpYXIgY29tcHJhJyk7IH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICB7T2JqZWN0LmtleXMocGF0aHMpLm1hcCgocGF0aElkKSA9PiAoXG4gICAgICAgIDxzZWN0aW9uIGtleT17cGF0aElkfSBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntwYXRoSWR9PC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTMgb3ZlcmZsb3cteC1hdXRvIHB5LTJcIj5cbiAgICAgICAgICAgIHtwYXRoc1twYXRoSWRdLm1hcCgoaXQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbG9ja2VkID0gaXQuaXNQcm8gJiYgIXB1cmNoYXNlZFNldC5oYXMoYHJvYWRtYXA6JHtpdC5zbHVnfWApO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpdC5zbHVnfSBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTQ0IHAtMyByb3VuZGVkIGJnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQgYmctc2xhdGUtNzAwXCI+e2l0Lmljb24gfHwgJ+KAoid9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHRleHQtc21cIj57aXQudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+e2l0LnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1hbWJlci01MDAgdGV4dC1ibGFjayByb3VuZGVkIHRleHQteHNcIiBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNsdWcoaXQuc2x1Zyl9Pk9wZW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge2xvY2tlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1zbGF0ZS03MDAgdGV4dC14cyByb3VuZGVkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIgb25DbGljaz17KCkgPT4gc3RhcnRQdXJjaGFzZShgcm9hZG1hcDoke2l0LnNsdWd9YCl9PjxMb2NrIHNpemU9ezE0fS8+IFBybzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXNsYXRlLTcwMCB0ZXh0LXhzIHJvdW5kZWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiBvbkNsaWNrPXsoKSA9PiB7IHNldFNlbGVjdGVkU2x1ZyhpdC5zbHVnKTsgc2V0U2hvd1ByYWN0aWNlKHRydWUpOyB9fT48VW5sb2NrIHNpemU9ezE0fS8+IFByYWN0aWNlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICApKX1cblxuICAgICAge3NlbGVjdGVkU2x1ZyAmJiBzZWxlY3RlZEl0ZW0gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay82MCBwLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCByb3VuZGVkIHctZnVsbCBtYXgtdy0zeGwgcC02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkXCI+e3NlbGVjdGVkSXRlbS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1hbWJlci0yMDBcIj57c2VsZWN0ZWRJdGVtLnN1bW1hcnl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMjAwXCIgb25DbGljaz17KCkgPT4geyBzZXRTZWxlY3RlZFNsdWcobnVsbCk7IHNldFNob3dQcmFjdGljZShmYWxzZSk7IH19PkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwcm9zZSBtYXgtdy1ub25lIHRleHQtc20gdGV4dC1ncmF5LTIwMFwiPlxuICAgICAgICAgICAgICB7c2VsZWN0ZWRMb2NrZWQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPkNvbnRlw7pkbyBQcm8g4oCUIGJsb3F1ZWFkby48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPjxSZWFjdE1hcmtkb3duPntzZWxlY3RlZEl0ZW0uY29udGVudFByZXZpZXcgfHwgc2VsZWN0ZWRJdGVtLnN1bW1hcnkgfHwgJyd9PC9SZWFjdE1hcmtkb3duPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYmctYW1iZXItNTAwIHRleHQtYmxhY2sgcHgtMyBweS0yIHJvdW5kZWRcIiBvbkNsaWNrPXsoKSA9PiBzdGFydFB1cmNoYXNlKGByb2FkbWFwOiR7c2VsZWN0ZWRJdGVtLnNsdWd9YCl9PkNvbXByYXIgUHJvPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInB4LTMgcHktMiBib3JkZXIgcm91bmRlZFwiIGhyZWY9XCIvc2lnbnVwXCI+Q3JpYXIgY29udGE8L2E+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9zZSBtYXgtdy1ub25lXCI+PFJlYWN0TWFya2Rvd24+e3NlbGVjdGVkSXRlbS5jb250ZW50IHx8IHNlbGVjdGVkSXRlbS5zdW1tYXJ5IHx8ICcnfTwvUmVhY3RNYXJrZG93bj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJnLWVtZXJhbGQtNTAwIHRleHQtYmxhY2sgcHgtMyBweS0yIHJvdW5kZWRcIiBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UHJhY3RpY2UodHJ1ZSl9PlByYXRpY2FyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHtzZWxlY3RlZFNsdWcgJiYgc2hvd1ByYWN0aWNlICYmIHNlbGVjdGVkSXRlbSAmJiAhc2VsZWN0ZWRMb2NrZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay82MCBwLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCByb3VuZGVkIHctZnVsbCBtYXgtdy00eGwgcC00IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGRcIj5QcmFjdGljZToge3NlbGVjdGVkSXRlbS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTIwMFwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dQcmFjdGljZShmYWxzZSl9PkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxHdWlkZWRQYXRoXG4gICAgICAgICAgICAgIGlkPXtgcm9hZG1hcC1zaW5nbGUtJHtzZWxlY3RlZEl0ZW0uc2x1Z31gfVxuICAgICAgICAgICAgICB0aXRsZT17c2VsZWN0ZWRJdGVtLnRpdGxlfVxuICAgICAgICAgICAgICBzdGVwcz17W3tcbiAgICAgICAgICAgICAgICBpZDogc2VsZWN0ZWRJdGVtLnNsdWcsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHNlbGVjdGVkSXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICBsZXNzb246IChzZWxlY3RlZEl0ZW0uY29udGVudCB8fCBzZWxlY3RlZEl0ZW0uc3VtbWFyeSB8fCAnJykuc3BsaXQoJ1xcblxcbicpLFxuICAgICAgICAgICAgICAgIHRhc2tQcm9tcHQ6IHNlbGVjdGVkSXRlbS5zdW1tYXJ5IHx8ICdJbXBsZW1lbnRlIGVzdGUgZXhlcmPDrWNpbycsXG4gICAgICAgICAgICAgICAgY2hlY2s6IGFzeW5jIChjb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ZXIgPSBzZWxlY3RlZEl0ZW0uc3RhcnRlckNvZGUgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlc3RzID0gc2VsZWN0ZWRJdGVtLnRlc3RzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBydW5UZXN0c0luV29ya2VyKHN0YXJ0ZXIsIGNvZGUsIHRlc3RzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGU6IGFueSkgeyByZXR1cm4geyBvazogZmFsc2UsIG1lc3NhZ2VzOiBbZT8ubWVzc2FnZSB8fCBTdHJpbmcoZSldIH07IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sImZpbGUiOiJDOi9Vc2Vycy9BbC1pbmdsaXR5L0Rvd25sb2Fkcy9zaXRlIGNvZGVmbG93L0NvZGUtRmxvdy1WaXN1YWxpemVyL2NsaWVudC9zcmMvY29tcG9uZW50cy9yb2FkbWFwLXBhdGgudHN4In0=