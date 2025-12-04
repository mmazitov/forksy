import fs from 'fs';
import fetch from 'node-fetch';

const diff = process.env.DIFF;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

const prompt = `
You are a Senior Front-End Developer. Review the following code changes:
${diff}
Respond in strict JSON format:
{
  "summary": "brief overview",
  "issues": []
}
`;

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${OPENROUTER_KEY}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		model: 'code-llama-7b',
		messages: [{ role: 'user', content: prompt }],
	}),
});

const data = await res.json();

// OpenRouter: текст может быть в data.completion.message.content
let reviewText;
if (data?.completion?.message?.content) {
	reviewText = data.completion.message.content;
} else if (data?.text) {
	reviewText = data.text;
} else {
	throw new Error(
		'Unexpected response from OpenRouter: ' + JSON.stringify(data),
	);
}

fs.writeFileSync('review.json', reviewText);
console.log('Review saved to review.json');
