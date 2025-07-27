// app/components/GearChainUI.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GearChainUI() {
  const [finding, setFinding] = useState("");
  const [chainSteps, setChainSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateChain = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-chain", {
      method: "POST",
      body: JSON.stringify({ finding }),
    });
    const data = await res.json();
    setChainSteps(data.steps || []);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center p-6 space-y-6"
      style={{
        backgroundImage: "url('/gearz-background.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">🔗 GEARZ Bug Chain Forge</h1>
      <p className="text-sm text-gray-300">Turn low severity findings into critical chains</p>

      <Input
        placeholder="Enter a vuln or finding..."
        value={finding}
        onChange={(e) => setFinding(e.target.value)}
        className="w-full max-w-lg bg-black bg-opacity-60 text-white placeholder-gray-400 border border-yellow-500"
      />

      <Button onClick={generateChain} disabled={loading}>
        {loading ? "Forging Chain..." : "Forge Attack Chain"}
      </Button>

      <div className="w-full max-w-4xl space-y-4">
        {chainSteps.map((step, i) => (
          <Textarea
            key={i}
            value={`Step ${i + 1}: ${step}`}
            className="w-full bg-black bg-opacity-60 text-green-400 border border-green-600"
            readOnly
          />
        ))}
      </div>
    </div>
  );
}
