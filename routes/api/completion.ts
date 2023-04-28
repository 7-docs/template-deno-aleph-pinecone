import { load } from 'dotenv';
import { getCompletionHandler, pinecone } from '@7-docs/edge';
import { namespace, prompt, system } from '../../config.ts';
import type { MetaData } from '@7-docs/edge';

type QueryFn = (vector: number[]) => Promise<MetaData[]>;

const env = await load();
const getEnvVar = (key: string) => Deno.env.get(key) ?? env[key];

const OPENAI_API_KEY = getEnvVar('OPENAI_API_KEY');
const PINECONE_URL = getEnvVar('PINECONE_URL');
const PINECONE_API_KEY = getEnvVar('PINECONE_API_KEY');

const query: QueryFn = (vector: number[]) =>
  pinecone.query({ url: PINECONE_URL, token: PINECONE_API_KEY, vector, namespace });

const handler = getCompletionHandler({ OPENAI_API_KEY, query, system, prompt });

export function GET(req: Request) {
  return handler(req);
}
