# template-deno-aleph-pinecone

Starterkit for OpenAI chat client based on your own content. Main ingredients:

- Deno
- [Aleph.js](https://alephjs.org)
- [Pinecone](https://www.pinecone.io)
- [@7-docs/edge](https://www.npmjs.com/package/@7-docs/edge)
- TypeScript
- [UnoCSS](https://unocss.dev)

This template runs at [7-docs-aleph-pinecone.deno.dev](https://7-docs-aleph-pinecone.deno.dev).

## Install

- [Use this template](https://github.com/7-docs/template-deno-aleph-pinecone/generate)
- Clone your new repo
- `npm install`
- [Prepare vector database](#prepare-db)
- [Ingest content](#ingest)
- `cp .env.example .env` and paste your tokens: `OPENAI_API_KEY`, `PINECONE_URL`, `PINECONE_API_KEY`

The following commands are using `my-namespace` as set in [config.ts](./config.ts) and ingest content from the
`reactjs/react.dev` repository. By all means, you're encouraged to change them to something more original.

## Prepare db

Create a Pinecone account if you don't have one already. Then create an index:

```shell
npx 7-docs pinecone-create-index --index my-namespace
```

## Ingest

```shell
npx 7-docs ingest --source github --repo denoland/manual --files '**/*.md' --namespace manual-deno
```

## Run

```shell
deno task dev
```

## Deploy

This application can be deployed somewhere with support for Deno + edge functions. Examples:

- [Deno Deploy](https://deno.com/deploy)

Make sure to add the environment variables. Also update `project` in
[.github/workflows/deploy.yml](.github/workflows/deploy.yml#L32) to your Deno Deploy project name.
