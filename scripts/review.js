import fs from 'fs';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const diff = process.env.DIFF;

if (!diff || diff.trim() === '') {
	console.error('No DIFF supplied');
	process.exit(1);
}

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

Rules:
- Ignore lock files
- Ignore formatting-only changes
- If no issues: return summary "No issues found. Code changes look good." and issues []
`;

const ai = await client.responses.create({
	model: 'gpt-4.1-mini',
	input: prompt,
});

// Extract JSON safely
const content = ai.output_text;

// Validate JSON
let parsed;
try {
	parsed = JSON.parse(content);
} catch (e) {
	console.error('AI returned invalid JSON:', content);
	process.exit(1);
}

fs.writeFileSync('review.json', JSON.stringify(parsed, null, 2), 'utf-8');
console.log('review.json saved');
