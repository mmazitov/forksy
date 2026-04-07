# Agent Instructions for `mealvy-frontend`

You are an AI assistant working on `mealvy-frontend`, a React 19 / TypeScript SPA for a food-tracking and meal-planning platform.

## 🚨 CRITICAL: Context Files 🚨

Detailed project documentation and strict coding standards are extracted into separate files. **You MUST adhere to the instructions in these files.** Do not make assumptions without checking them.

1. **Rules & Coding Standards**: `.ai/rules/rules.md`
   *Defines guidelines for AI model selection, token optimization, TypeScript/React best practices, performance, state management, and security.*

2. **Project Overview & Architecture**: `.ai/project/overview.md`
   *Defines the feature-sliced folder structure, provider stack, routing, Apollo Client setup, GraphQL codegen, PWA/Service Worker, and known issues.*

3. **Code Examples**: `.ai/rules/examples.md`
   *Correct vs incorrect code patterns for every rule — check this before writing new components, hooks, or utilities.*

---

## Quick Reference: Most Used Commands

*Detailed information on architecture and environments is in the overview file. Here are the day-to-day commands:*

- **Dev Server:** `yarn dev`
- **Production Build:** `yarn build`
- **Linting:** `yarn lint`
- **Formatting:** `yarn format`
- **GraphQL Codegen:** `yarn generate` — regenerate TypeScript types and hooks after `.gql` changes

---

## Workflows & Slash Commands

You have access to specialized workflows. When the user types one of these slash commands, use the corresponding workflow from `.ai/commands/`:

- `/review` or `/code-review` — Perform a Senior Frontend Engineer code review
- `/investigate-error` — Debug React / TypeScript / Apollo runtime errors
- `/performance` — Run a performance audit
- `/extract-hook` — Extract reusable custom React hooks from components
- `/explain-code` — Explain code with analogies and diagrams
- `/coding` — General coding assistance with project conventions
- `/consolidate-memory` — Extract decisions and facts from recent sessions into memory files

---

**Note:** Do not add new project rules directly to this file. Update `.ai/rules/rules.md` or `.ai/project/overview.md` to maintain a single source of truth.

---

## Memory System

At the start of each conversation, **read `.claude/memory/recent-memory.md` in full** to restore
rolling 48-hour context (recent decisions, open questions, patterns).

For deeper historical context, read `.claude/memory/long-term-memory.md` — it contains stable
project facts, user preferences, and architecture decisions.

Active project state (sprint focus, known bugs, deferred work) is in `.claude/memory/project-memory.md`.

> Run `/consolidate-memory` after any significant work session to keep memory current.

<!-- neurotrace-start -->
## NeuroTrace Workflow

- Check NeuroTrace is available with `neurotrace_getDatabaseStatus`.
- If necessary, review pending tasks with `neurotrace_listThoughts` using type_filter "task" to understand the current backlog and priorities.
- When you already know the current file or module, use `neurotrace_getMemoriesByFile` first for file-scoped context.
- When the problem is fuzzy or unfamiliar, use `neurotrace_semanticSearch` first to discover relevant context.
- Use `neurotrace_searchThoughts` next to refine with exact terms, names, or IDs once you have concrete keywords.
- If broader context is needed, use `neurotrace_listThoughts` without filters to review recent entries.
- When you find a relevant memory and need connected context, use `neurotrace_suggestRelated` or `neurotrace_getGraphData` to expand the investigation.
- Base plans, code changes, and debugging steps on the relevant NeuroTrace context you find.
- Only save durable, high-signal memories: important decisions, non-obvious findings, root causes, concrete follow-up tasks, or unresolved hypotheses.
- Do not save routine progress updates, trivial code changes, temporary debugging notes, or facts already obvious from the code.
- Before creating a new memory, prefer updating or linking an existing related one if it already covers the same point.
<!-- neurotrace-end -->
