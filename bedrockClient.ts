// bedrockClient.ts — shared AWS Bedrock client for Sans Mercantile website backends.
//
// Replaces @google/genai. Uses the Bedrock Converse API (a single unified
// request/response shape across model providers) rather than per-provider
// InvokeModel body-building — confirmed working identically for all four
// models below via live smoke test 2026-08-10.
//
// Model selection: every model in this chain has an on-demand quota of
// 100+ requests/minute (checked via `aws service-quotas list-service-quotas
// --service-code bedrock`, 2026-08-10) -- comfortably above the "100+ per
// 5 minutes" floor. Kimi K2.5 is primary (strong general-purpose quality,
// already the established high-quota fallback across the Constellation's
// MPETI tooling); the rest are fallbacks in case Kimi itself is throttled
// or unavailable.
//
// Credentials: standard AWS SDK v3 credential chain (env vars
// AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY/AWS_SESSION_TOKEN, ~/.aws/credentials,
// or an IAM role when deployed). No API key needed in .env.

import {
  BedrockRuntimeClient,
  ConverseCommand,
  type Message,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";

// Load .env.local here, not in server.ts -- ES module imports are hoisted
// and fully evaluated before any of server.ts's own top-level code runs,
// so a dotenv.config() call in server.ts (even placed textually above this
// import) would still execute AFTER this module's top-level code has
// already read process.env.AWS_REGION. Loading it here guarantees correct
// ordering regardless of import order in whatever file imports this one.
dotenv.config({ path: ".env.local" });

const REGION = process.env.AWS_REGION || "us-east-1";

const client = new BedrockRuntimeClient({ region: REGION });

export const MODEL_CHAIN = [
  "moonshotai.kimi-k2.5",
  "deepseek.v3.2",
  "qwen.qwen3-32b-v1:0",
  "amazon.nova-lite-v1:0",
] as const;

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export interface GenerateOptions {
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  /** Prior turns for a multi-turn chat. Omit for single-shot prompts. */
  history?: ChatTurn[];
}

export interface GenerateResult {
  text: string;
  model: string;
}

function isRetryableError(err: any): boolean {
  const name = String(err?.name || err?.__type || "");
  const msg = String(err?.message || "");
  return (
    name.includes("ThrottlingException") ||
    name.includes("ServiceUnavailableException") ||
    name.includes("ModelTimeoutException") ||
    name.includes("ModelNotReadyException") ||
    msg.includes("Too many requests") ||
    msg.includes("Rate exceeded")
  );
}

/**
 * Single-shot or multi-turn text generation, walking MODEL_CHAIN on
 * throttle/service-unavailable errors. A non-retryable error (bad request,
 * validation) throws immediately rather than wasting the whole chain on a
 * failure that won't be fixed by switching models.
 */
export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<GenerateResult> {
  const { systemPrompt, maxTokens = 1024, temperature = 0.7, history = [] } = options;

  const messages: Message[] = history.map((turn) => ({
    role: turn.role === "user" ? "user" : "assistant",
    content: [{ text: turn.text }],
  }));
  messages.push({ role: "user", content: [{ text: prompt }] });

  let lastError: any = null;

  for (let i = 0; i < MODEL_CHAIN.length; i++) {
    const modelId = MODEL_CHAIN[i];
    try {
      const command = new ConverseCommand({
        modelId,
        messages,
        system: systemPrompt ? [{ text: systemPrompt }] : undefined,
        inferenceConfig: { maxTokens, temperature },
      });
      const response = await client.send(command);
      const text = response.output?.message?.content?.[0]?.text ?? "";
      return { text, model: modelId };
    } catch (err: any) {
      lastError = err;
      const isLast = i === MODEL_CHAIN.length - 1;
      if (!isRetryableError(err) || isLast) {
        throw err;
      }
      console.warn(
        `[bedrockClient] ${modelId} failed (${err?.name || err?.message}); trying next candidate`
      );
    }
  }
  throw lastError;
}

/**
 * Generates a response and parses it as JSON matching shape T. The model is
 * instructed to return ONLY JSON (no commentary, no markdown fences); the
 * response is still defensively stripped of fences and parsed, since not
 * every model in the fallback chain obeys that instruction with equal
 * discipline. Throws with the raw (truncated) text on parse failure so the
 * caller's catch block can log something actionable instead of a bare
 * "Unexpected token" error.
 */
export async function generateJSON<T = any>(
  prompt: string,
  jsonShapeDescription: string,
  options: GenerateOptions = {}
): Promise<{ data: T; model: string }> {
  const fullPrompt = `${prompt}\n\nRespond with ONLY valid JSON matching this exact shape, no markdown code fences, no commentary before or after:\n${jsonShapeDescription}`;
  const { text, model } = await generateText(fullPrompt, options);

  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  try {
    return { data: JSON.parse(cleaned) as T, model };
  } catch (e) {
    throw new Error(
      `[bedrockClient] Failed to parse JSON from model ${model}: ${(e as Error).message}. Raw (first 300 chars): ${cleaned.slice(0, 300)}`
    );
  }
}
