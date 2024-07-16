#!/usr/bin/env node

import "dotenv/config";
import { callAzureChatGPT } from "./openai_azure.js";
import { callChatGPT } from "./openai.js";
import { callGEMINI } from "./google.js";

const language = process.argv[2];
const user_prompt = process.argv[3];

const system_prompt =
  language === "ja"
    ? "あなたはGit Commit コメント生成マシンです。入力されたdiff形式の差分コードに対して、72文字以内のサマリーコミットコメントを生成して下さい。可能な限り短い日本語の文章にして下さい。"
    : "You are a Git Commit Comment Generator. Please generate a summary commit comment within 72 characters for the input diff-formatted code. Please make it as short as possible.";

if (language) {
  if (user_prompt) {
    // Azure GPT-3
    if (
      process.env.AOAI_API_KEY &&
      process.env.AOAI_ENDPOINT &&
      process.env.AOAI_MODEL
    ) {
      const reply = await callAzureChatGPT(system_prompt, user_prompt);
      console.log(reply);

      // OpenAI GPT-3
    } else if (process.env.OPENAI_API_KEY) {
      const reply = await callChatGPT(system_prompt, user_prompt);
      console.log(reply);

      // Google GEMINI
    } else if (process.env.GOOGLE_API_KEY) {
      const reply = await callGEMINI(system_prompt, user_prompt);
      console.log(reply);

      // No API key
    } else {
      const reply =
        language === "ja"
          ? "APIキーが設定されていないため、サマリが生成できませんでした"
          : "The summary could not be generated because the API key is not set.";
      console.log(reply);
    }
  } else {
    const reply =
      language === "ja"
        ? "入力がありません。コードを入力してください。"
        : "There is no input. Please enter the code.";
    console.log(reply);
  }
} else {
  const reply = "No language specified. Please specify the language.";
  console.log(reply);
}
