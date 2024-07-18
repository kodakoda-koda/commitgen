#!/usr/bin/env node

import "dotenv/config";
import { callAzureChatGPT } from "./openai_azure.js";
import { callChatGPT } from "./openai.js";
import { callGEMINI } from "./google.js";

const language = process.argv[2];
const user_prompt = process.argv[3];

const system_prompt =
  language === "ja"
    ? `あなたはGit Commit コメント生成マシンです。
    入力されたdiff形式の差分コードに対して、72文字以内のサマリーコミットコメントを生成して下さい。
    可能な限り短い日本語の文章にし、コミットコメントのみ生成してください。
    コミットコメントのはじめは「fix: 」、「feat: 」、「docs: 」、「style: 」、「refactor: 」、「perf: 」、「test: 」のいずれかで始めてください。
    それぞれの意味は以下の通りです。
    fix: バグ修正
    feat: 新機能
    docs: ドキュメントのみ変更
    style: コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など）
    refactor: 生産性を向上させるコード変更
    perf: パフォーマンスを向上させるコード変更
    test: 不足しているテストを追加または既存のテストを修正`
    : `You are a Git Commit Comment Generation Machine.
    Please generate a summary commit comment within 72 characters for the input diff-formatted code.
    Please make the English sentence as short as possible and generate only the commit comment.
    Start the commit comment with one of the following: "fix: ", "feat: ", "docs: ", "style: ", "refactor: ", "perf: ", "test: ".
    The meaning of each is as follows:
    fix: Bug fix
    feat: New feature
    docs: Documentation only changes
    style: Changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc.)
    refactor: Code changes that improve productivity
    perf: Code changes that improve performance
    test: Add missing tests or correct existing tests`;

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
      const message =
        language === "ja"
          ? "APIキーが設定されていません。"
          : "API key is not set.";
      throw new Error(message);
    }

    // No input
  } else {
    const reply =
      language === "ja"
        ? "入力がありません。コードを入力してください。"
        : "There is no input. Please enter the code.";
    throw new Error(reply);
  }

  // No language
} else {
  const reply = "No language specified. Please specify the language.";
  throw new Error(reply);
}
