import crypto from 'crypto';

import { env } from './schemas/env.zod';

const generateOauthParams = (
	method: string,
	additionalParams: Record<string, string> = {},
) => {
	const params: Record<string, string> = {
		oauth_consumer_key: env.FATSECRET_ID,
		oauth_nonce: crypto.randomBytes(16).toString('hex'),
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
		oauth_version: '1.0',
		format: 'json',
		method: method,
		...additionalParams,
	};

	// Sort parameters alphabetically
	const sortedParams = Object.keys(params)
		.sort()
		.reduce(
			(acc, key) => {
				acc[key] = params[key];
				return acc;
			},
			{} as Record<string, string>,
		);

	return sortedParams;
};

const generateSignature = (
	method: string,
	url: string,
	params: Record<string, string>,
) => {
	const signatureBaseString = [
		method.toUpperCase(),
		encodeURIComponent(url),
		encodeURIComponent(
			Object.keys(params)
				.sort()
				.map((key) => `${key}=${encodeURIComponent(params[key])}`)
				.join('&'),
		),
	].join('&');

	const signingKey = `${encodeURIComponent(env.FATSECRET_SECRET)}&`;
	return crypto
		.createHmac('sha1', signingKey)
		.update(signatureBaseString)
		.digest('base64');
};

export const createFatSecretRequest = (
	method: string,
	additionalParams: Record<string, string> = {},
) => {
	const BASE_URL = 'https://platform.fatsecret.com/rest/server.api';
	const oauthParams = generateOauthParams(method, additionalParams);
	const signature = generateSignature('GET', BASE_URL, oauthParams);

	const allParams: Record<string, string> = {
		...oauthParams,
		oauth_signature: signature,
	};

	const queryString = Object.keys(allParams)
		.map((key) => `${key}=${encodeURIComponent(allParams[key])}`)
		.join('&');

	return `${BASE_URL}?${queryString}`;
};

export const getFoodDetails = async (foodId: string) => {
	const requestUrl = createFatSecretRequest('food.get.v2', {
		food_id: foodId,
	});

	const response = await fetch(requestUrl);
	if (!response.ok) {
		throw new Error('Failed to fetch food details');
	}

	return response.json();
};
