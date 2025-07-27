// app/api/generate-chain/route.ts
import { NextResponse } from "next/server";
import { getOllama } from "@/lib/ollama";

export async function POST(req: Request) {
  const { finding } = await req.json();

  const systemPrompt = {
    role: "system",
    content: `🔥 You are ChainForge, a savage AI tactician built to help elite bug bounty hunters forge exploit chains from raw findings.

🎯 Your job is to turn weak or low-severity bugs into lethal, multi-stage attack chains — using realistic tactics grounded in known exploit paths.

🧠 Each chain must escalate impact step by step (e.g., IDOR → data leak → auth bypass → account takeover). Use real-world logic like:
- token smuggling
- S3 misconfig → SSRF
- XSS → session theft
- open redirect → OAuth abuse

🧪 Format response as a numbered list of plain-text steps with actionable reasoning. Be aggressive, smart, and never fictional. If a chain hits a dead end, pivot.

⛓️ Input starts below. Forge the chain.`,
  };

  const userPrompt = {
    role: "user",
    content: `Initial finding: ${finding}`,
  };

  const raw = await getOllama("llama3:instruct").chat.completions.create({
    messages: [systemPrompt, userPrompt],
    stream: false,
  });

  const output = raw.choices?.[0]?.message?.content;

  const steps = output
    ?.split(/\n+/)
    .filter((line: string) => line.trim() !== "")
    .map((step: string) => step.replace(/^\d+\.\s*/, "").trim());

  return NextResponse.json({ steps });
}
