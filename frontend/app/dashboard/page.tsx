"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Highlight, themes } from "prism-react-renderer";
import Editor from "react-simple-code-editor";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [code, setCode] = useState("print('Hello')");
  const [inputData, setInputData] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "python",
          code,
          input_data: inputData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOutput((data.output || []).join("\n"));
      } else {
        setOutput(data.detail || data.errors || "Execution failed.");
      }
    } catch (err) {
      setOutput("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#00ffb3] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00ffb3]/20 via-[#0e0e0e] to-black" />

      {/* Layout */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 md:p-8 pb-24 md:ml-16 lg:ml-64 transition-all duration-300 overflow-auto">
          {/* Typewriter */}
          <div className="mb-8">
            <iframe
              src="/examples/irregular-playback-typewriter/index.html"
              title="Typewriter Animation"
              className="w-full h-[120px] md:h-[140px] lg:h-[160px] rounded-md"
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="flex justify-center mb-12"
          >
            <Image
              src="/AI.webp"
              alt="BrainCompiler AI Logo"
              width={360}
              height={360}
              className="rounded-lg shadow-xl border-2 border-[#00ffb3]/30"
            />
          </motion.div>

          {/* Editor + Output */}
          <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
            {/* Code Section */}
            <div className="flex-1 space-y-4">
              <label className="text-lg font-semibold text-[#00ffb3]">Write Python Code:</label>
              <div className="flex h-[300px] md:h-[400px] lg:h-[60%] rounded-lg bg-[#1a1a1a] border border-[#00ffb3]/30 overflow-hidden font-mono text-sm">
                <div className="bg-[#1f1f1f] text-[#777] px-4 py-4 text-right select-none overflow-hidden">
                  {code.split("\n").map((_, i) => (
                    <div key={i} className="h-5 leading-5">{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 overflow-auto">
                  <Editor
                    value={code}
                    onValueChange={setCode}
                    highlight={code => (
                      <Highlight code={code} language="python" theme={themes.vsDark}>
                        {({ tokens, getLineProps, getTokenProps }) => (
                          <>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })} className="h-5 leading-5">
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            ))}
                          </>
                        )}
                      </Highlight>
                    )}
                    padding={16}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      backgroundColor: "#1a1a1a",
                      color: "white",
                      height: "100%",
                      overflowY: "auto",
                    }}
                  />
                </div>
              </div>

              <label className="text-lg font-semibold text-[#00ffb3]">Input (optional):</label>
              <textarea
                className="w-full h-32 md:h-40 p-4 rounded-lg bg-[#1a1a1a] border border-[#00ffb3]/30 focus:border-[#00ffb3] focus:ring-2 focus:ring-[#00ffb3]/40 text-white"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter input for your code (if any)..."
              />

              <button
                onClick={runCode}
                disabled={loading}
                className="w-full bg-[#00ffb3] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00e6a6] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Running..." : "Run Code"}
              </button>
            </div>

            {/* Output Section */}
            <div className="flex-1 space-y-4">
              <label className="text-lg font-semibold text-[#00ffb3]">Output:</label>
              <pre className="min-h-[200px] lg:h-[calc(100%-40px)] bg-[#1a1a1a] p-6 rounded-lg border border-[#00ffb3]/30 text-white text-sm overflow-auto">
                {output || "Output will appear here..."}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <footer className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap gap-6 items-center justify-center border-t border-[#00ffb3]/20 text-[#00ffb3]">
            <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Image src="/file.svg" alt="File icon" width={16} height={16} />
              Learn
            </a>
            <a href="https://vercel.com/templates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Image src="/window.svg" alt="Window icon" width={16} height={16} />
              Examples
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
              Go to nextjs.org →
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
