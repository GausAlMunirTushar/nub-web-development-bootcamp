"use client";

import { useState } from "react";

const buildPrompt = `Build a campus project dashboard with Next.js.
First inspect the existing files and explain the current architecture.
Add only the requested feature, reuse existing components, and preserve current behavior.
After editing, explain each changed file and run the project's lint and build commands.
If a command fails, read the full error and fix the root cause. Do not invent backend data.`;

const reviewChecklist = [
  "Inspect the changed files and understand the code",
  "Run the app and test create, edit, and delete",
  "Read errors fully before asking AI to debug",
  "Review the final diff for unrelated changes",
];

export default function AiWorkflowCard() {
  const [copyState, setCopyState] = useState("Copy prompt");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(buildPrompt);
      setCopyState("Copied");
    } catch (error) {
      console.error("Could not copy the prompt:", error);
      setCopyState("Copy unavailable");
    }
  }

  return (
    <section className="ai-card" id="ai-workflow" aria-labelledby="ai-title">
      <div className="ai-card-main">
        <div className="ai-orb" aria-hidden="true">
          ✦
        </div>
        <div>
          <p className="eyebrow">Prompt · Inspect · Debug · Verify</p>
          <h2 id="ai-title">Use AI as a coding partner.</h2>
          <p>
            Copy a scoped prompt to your coding agent. Review every change,
            run the checks, and confirm the feature works before you keep it.
          </p>
        </div>
        <button className="button button-light" type="button" onClick={copyPrompt}>
          {copyState}
        </button>
      </div>
      <ul className="ai-checklist">
        {reviewChecklist.map((item) => (
          <li key={item}>
            <span aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
