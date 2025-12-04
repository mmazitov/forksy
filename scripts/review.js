import { execSync } from 'child_process';
import fs from 'fs';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const diff = execSync('git diff HEAD~1 HEAD', { encoding: 'utf-8' });

const prompt = `
You are a Senior Front-End Developer with expertise in React, TypeScript, and modern web development.
Analyze the following Git diff and return a comprehensive code review in strict JSON format.
Make review comments only on the changes introduced in the diff.

${diff}

Response format:
{
  "summary": "brief overview of the code changes and main findings",
  "issues": [
    {
      "type": "major" | "minor",
      "file": "filename",
      "line": line_number,
      "comment": "clear description of the issue with specific reasoning",
      "suggestion": "recommended fix or alternative approach"
    }
  ]
}

Classification:
- "major" — Critical issues that must be fixed:
  * Potential bugs or runtime errors
  * Logic errors or incorrect implementations
  * Security vulnerabilities
  * Performance bottlenecks
  * Breaking changes
  * Missing error handling
  * Memory leaks or resource management issues

- "minor" — Improvements and recommendations:
  * Code style and consistency
  * Best practices and patterns
  * Readability improvements
  * Type safety enhancements
  * Accessibility improvements
  * Testing suggestions
  * Documentation gaps

Rules:
- Ignore lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Ignore auto-generated files and formatting-only changes
- Be constructive and specific in comments
- Provide actionable suggestions when identifying issues
- If no issues: return summary: "No issues found. Code changes look good." with empty issues array
- Focus on substantive changes, not trivial style preferences
`;

const response = await client.chat.completions.create({
	model: 'gpt-4.1-mini',
	messages: [{ role: 'user', content: prompt }],
});

fs.writeFileSync('review_output.md', response.choices[0].message.content);
