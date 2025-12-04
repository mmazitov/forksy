import fs from 'fs';
import fetch from 'node-fetch';

const diff = process.env.DIFF;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_KEY) {
	throw new Error('OPENROUTER_API_KEY is not set in environment variables');
}

if (!diff) {
	throw new Error(
		'No DIFF supplied. Make sure GitHub Actions passes it via env DIFF.',
	);
}

const prompt = `
You are a Senior Front-End Developer. Review the following code changes:
${diff}

Respond in strict JSON format:

{
  "summary": "brief overview",
  "issues": [
    {
      "type": "major" | "minor",
      "file": "filename",
      "line": 0,
      "comment": "clear description",
      "suggestion": "recommended fix"
    }
  ]
}
`;

async function runReview() {
	const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${OPENROUTER_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'code-llama-7b', // бесплатная модель
			messages: [{ role: 'user', content: prompt }],
		}),
	});

	const data = await res.json();

	let reviewText;
	if (data?.completion?.message?.content) {
		reviewText = data.completion.message.content;
	} else if (data?.text) {
		reviewText = data.text;
	} else if (data?.error) {
		throw new Error(`OpenRouter error: ${data.error.message}`);
	} else {
		throw new Error(
			'Unexpected response from OpenRouter: ' + JSON.stringify(data),
		);
	}

	// Сохраняем JSON для workflow
	fs.writeFileSync('review.json', reviewText);
	console.log('Review saved to review.json');
}

runReview().catch((err) => {
	console.error(err);
	process.exit(1);
});
