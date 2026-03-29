// Development-only logging utility
const isDev = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

function log(...args) {
	if (isDev) {
		console.log(...args);
	}
}

function error(...args) {
	if (isDev) {
		console.error(...args);
	}
}
