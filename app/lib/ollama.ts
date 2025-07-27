// app/lib/ollama.ts
export function getOllama(model: string) {
  return {
    chat: {
      completions: {
        create: async ({
          messages,
          stream = false,
        }: {
          messages: any;
          stream?: boolean;
        }) => {
          const res = await fetch("http://localhost:11434/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, messages, stream }),
          });

          return stream ? res : await res.json();
        },
      },
    },
  };
}
