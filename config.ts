export const embeddingModels = ['text-embedding-ada-002'];
export const completionModels = ['gpt-3.5-turbo'];

export const namespace = 'deno-manual';

export const title = 'Deno Manual';

export const suggestions = [
  'What is Deno?',
  "Why can't my program access the network?",
  'What is the architecture of Deno KV?',
  'Where can I deploy Deno scripts?'
];

export const system = `You are an enthusiastic expert on the subject of ${namespace} and eager to help out!
Answer the question faithfully using the provided context.
Use Markdown.
Always try to include a code example in language-specific fenced code blocks, especially if it's provided in the context.
If the answer is not provided in the context, say "Sorry, I don\'t have that information.".`;

export const prompt = `Context: {CONTEXT}

Question: {QUERY}

Answer: `;
